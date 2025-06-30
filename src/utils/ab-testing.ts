/**
 * A/Bテスト機能
 * 記事のタイトルやサムネイルをランダムに出し分けて効果を測定
 */

export interface ABTestVariant {
  id: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  weight?: number; // 表示確率の重み（デフォルト: 1）
}

export interface ABTest {
  id: string;
  postSlug: string;
  variants: ABTestVariant[];
  startDate: Date;
  endDate?: Date;
  metrics: {
    [variantId: string]: {
      impressions: number;
      clicks: number;
      readingTime: number[];
      completions: number;
    };
  };
}

export class ABTestingManager {
  private tests: Map<string, ABTest> = new Map();
  private userVariants: Map<string, string> = new Map();

  constructor() {
    this.loadFromLocalStorage();
  }

  /**
   * A/Bテストを作成
   */
  createTest(postSlug: string, variants: ABTestVariant[]): ABTest {
    const test: ABTest = {
      id: this.generateId(),
      postSlug,
      variants,
      startDate: new Date(),
      metrics: {}
    };

    // 各バリアントのメトリクスを初期化
    variants.forEach(variant => {
      test.metrics[variant.id] = {
        impressions: 0,
        clicks: 0,
        readingTime: [],
        completions: 0
      };
    });

    this.tests.set(postSlug, test);
    this.saveToLocalStorage();
    return test;
  }

  /**
   * ユーザーに表示するバリアントを決定
   */
  getVariant(postSlug: string): ABTestVariant | null {
    const test = this.tests.get(postSlug);
    if (!test || (test.endDate && new Date() > test.endDate)) {
      return null;
    }

    // ユーザーが既にバリアントを持っている場合
    const userVariantKey = `${postSlug}-${this.getUserId()}`;
    const existingVariantId = this.userVariants.get(userVariantKey);
    if (existingVariantId) {
      return test.variants.find(v => v.id === existingVariantId) || null;
    }

    // 新規ユーザーの場合、重み付きランダムで選択
    const variant = this.selectRandomVariant(test.variants);
    this.userVariants.set(userVariantKey, variant.id);
    
    // インプレッションを記録
    this.recordImpression(postSlug, variant.id);
    
    return variant;
  }

  /**
   * クリックを記録
   */
  recordClick(postSlug: string, variantId: string) {
    const test = this.tests.get(postSlug);
    if (!test || !test.metrics[variantId]) return;

    test.metrics[variantId].clicks++;
    this.saveToLocalStorage();
    
    // Google Analyticsにイベント送信
    this.sendAnalyticsEvent('ab_test_click', {
      test_id: test.id,
      variant_id: variantId,
      post_slug: postSlug
    });
  }

  /**
   * 読了を記録
   */
  recordCompletion(postSlug: string, variantId: string, readingTime: number) {
    const test = this.tests.get(postSlug);
    if (!test || !test.metrics[variantId]) return;

    test.metrics[variantId].completions++;
    test.metrics[variantId].readingTime.push(readingTime);
    this.saveToLocalStorage();

    this.sendAnalyticsEvent('ab_test_completion', {
      test_id: test.id,
      variant_id: variantId,
      post_slug: postSlug,
      reading_time: readingTime
    });
  }

  /**
   * テスト結果を取得
   */
  getTestResults(postSlug: string): {
    variant: string;
    impressions: number;
    clicks: number;
    ctr: number;
    avgReadingTime: number;
    completionRate: number;
    confidence: number;
  }[] {
    const test = this.tests.get(postSlug);
    if (!test) return [];

    return test.variants.map(variant => {
      const metrics = test.metrics[variant.id];
      const ctr = metrics.impressions > 0 ? (metrics.clicks / metrics.impressions) * 100 : 0;
      const avgReadingTime = metrics.readingTime.length > 0
        ? metrics.readingTime.reduce((a, b) => a + b, 0) / metrics.readingTime.length
        : 0;
      const completionRate = metrics.clicks > 0 
        ? (metrics.completions / metrics.clicks) * 100 
        : 0;

      // 統計的有意性の簡易計算（本来はカイ二乗検定などを使用）
      const confidence = this.calculateConfidence(test, variant.id);

      return {
        variant: variant.id,
        impressions: metrics.impressions,
        clicks: metrics.clicks,
        ctr,
        avgReadingTime,
        completionRate,
        confidence
      };
    });
  }

  /**
   * 最も効果的なバリアントを取得
   */
  getWinningVariant(postSlug: string): ABTestVariant | null {
    const results = this.getTestResults(postSlug);
    if (results.length === 0) return null;

    // CTRと完了率の組み合わせでスコアを計算
    const scored = results.map(r => ({
      ...r,
      score: (r.ctr * 0.4 + r.completionRate * 0.6) * (r.confidence / 100)
    }));

    // 最高スコアのバリアントを返す
    const winner = scored.reduce((a, b) => a.score > b.score ? a : b);
    const test = this.tests.get(postSlug);
    
    return test?.variants.find(v => v.id === winner.variant) || null;
  }

  /**
   * プライベートメソッド
   */
  private recordImpression(postSlug: string, variantId: string) {
    const test = this.tests.get(postSlug);
    if (!test || !test.metrics[variantId]) return;

    test.metrics[variantId].impressions++;
    this.saveToLocalStorage();
  }

  private selectRandomVariant(variants: ABTestVariant[]): ABTestVariant {
    const totalWeight = variants.reduce((sum, v) => sum + (v.weight || 1), 0);
    let random = Math.random() * totalWeight;

    for (const variant of variants) {
      random -= (variant.weight || 1);
      if (random <= 0) return variant;
    }

    return variants[0];
  }

  private calculateConfidence(test: ABTest, variantId: string): number {
    // 簡易的な信頼度計算（サンプル数に基づく）
    const metrics = test.metrics[variantId];
    const sampleSize = metrics.impressions;
    
    if (sampleSize < 100) return 0;
    if (sampleSize < 500) return 50;
    if (sampleSize < 1000) return 80;
    return 95;
  }

  private getUserId(): string {
    let userId = localStorage.getItem('ab_test_user_id');
    if (!userId) {
      userId = this.generateId();
      localStorage.setItem('ab_test_user_id', userId);
    }
    return userId;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private sendAnalyticsEvent(eventName: string, parameters: any) {
    if (typeof gtag !== 'undefined') {
      // @ts-ignore
      gtag('event', eventName, parameters);
    }
  }

  private saveToLocalStorage() {
    const data = {
      tests: Array.from(this.tests.entries()),
      userVariants: Array.from(this.userVariants.entries())
    };
    localStorage.setItem('ab_tests', JSON.stringify(data));
  }

  private loadFromLocalStorage() {
    const stored = localStorage.getItem('ab_tests');
    if (!stored) return;

    try {
      const data = JSON.parse(stored);
      this.tests = new Map(data.tests);
      this.userVariants = new Map(data.userVariants);
    } catch (e) {
      console.error('Failed to load A/B tests:', e);
    }
  }
}

// 使用例
/*
const abTesting = new ABTestingManager();

// テストを作成
abTesting.createTest('how-to-use-pandas', [
  {
    id: 'original',
    title: 'Pandasの使い方完全ガイド',
    weight: 1
  },
  {
    id: 'keyword-focused',
    title: '【2024年最新】Pandas使い方｜データ分析初心者向け完全ガイド',
    weight: 1
  }
]);

// ユーザーに表示するバリアントを取得
const variant = abTesting.getVariant('how-to-use-pandas');
if (variant && variant.title) {
  document.title = variant.title;
}

// クリックを記録
document.addEventListener('click', () => {
  if (variant) {
    abTesting.recordClick('how-to-use-pandas', variant.id);
  }
});
*/