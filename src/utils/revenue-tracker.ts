/**
 * ブログ収益管理ユーティリティ
 * 
 * 注意：このファイルはローカルでの管理用です。
 * 実際の会計処理は税理士に相談することをお勧めします。
 */

export interface RevenueRecord {
  id: string;
  date: Date;
  type: 'adsense' | 'amazon' | 'rakuten' | 'donation' | 'other';
  amount: number;
  description: string;
  source?: string; // 例：記事URL、商品名など
}

export interface ExpenseRecord {
  id: string;
  date: Date;
  category: 'hosting' | 'domain' | 'tools' | 'books' | 'other';
  amount: number;
  description: string;
  receipt?: string; // 領収書のファイルパス
}

export class RevenueTracker {
  private revenues: RevenueRecord[] = [];
  private expenses: ExpenseRecord[] = [];

  /**
   * 収益を記録
   */
  addRevenue(record: Omit<RevenueRecord, 'id'>) {
    this.revenues.push({
      ...record,
      id: this.generateId(),
    });
  }

  /**
   * 経費を記録
   */
  addExpense(record: Omit<ExpenseRecord, 'id'>) {
    this.expenses.push({
      ...record,
      id: this.generateId(),
    });
  }

  /**
   * 期間の収益合計を取得
   */
  getTotalRevenue(startDate: Date, endDate: Date): number {
    return this.revenues
      .filter(r => r.date >= startDate && r.date <= endDate)
      .reduce((sum, r) => sum + r.amount, 0);
  }

  /**
   * 期間の経費合計を取得
   */
  getTotalExpenses(startDate: Date, endDate: Date): number {
    return this.expenses
      .filter(e => e.date >= startDate && e.date <= endDate)
      .reduce((sum, e) => sum + e.amount, 0);
  }

  /**
   * 期間の所得を計算
   */
  getNetIncome(startDate: Date, endDate: Date): number {
    const revenue = this.getTotalRevenue(startDate, endDate);
    const expenses = this.getTotalExpenses(startDate, endDate);
    return revenue - expenses;
  }

  /**
   * 年間サマリーを生成
   */
  getYearlySummary(year: number) {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const revenueByType = this.revenues
      .filter(r => r.date.getFullYear() === year)
      .reduce((acc, r) => {
        acc[r.type] = (acc[r.type] || 0) + r.amount;
        return acc;
      }, {} as Record<string, number>);

    const expenseByCategory = this.expenses
      .filter(e => e.date.getFullYear() === year)
      .reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
      }, {} as Record<string, number>);

    return {
      year,
      revenue: {
        total: this.getTotalRevenue(startDate, endDate),
        byType: revenueByType,
      },
      expenses: {
        total: this.getTotalExpenses(startDate, endDate),
        byCategory: expenseByCategory,
      },
      netIncome: this.getNetIncome(startDate, endDate),
      taxableIncome: this.calculateTaxableIncome(year),
    };
  }

  /**
   * 課税所得を計算（簡易版）
   */
  private calculateTaxableIncome(year: number): {
    amount: number;
    requiresDeclaration: boolean;
    type: 'none' | 'miscellaneous' | 'business';
  } {
    const summary = this.getYearlySummary(year);
    const netIncome = summary.netIncome;

    // 副業の場合（給与所得がある場合）
    const isSubWork = true; // TODO: 設定から取得

    if (isSubWork) {
      // 副業は20万円超で確定申告必要
      return {
        amount: netIncome,
        requiresDeclaration: netIncome > 200000,
        type: netIncome > 200000 ? 'miscellaneous' : 'none',
      };
    } else {
      // 専業は48万円超で確定申告必要
      return {
        amount: netIncome,
        requiresDeclaration: netIncome > 480000,
        type: netIncome > 480000 ? 'business' : 'none',
      };
    }
  }

  /**
   * CSVエクスポート
   */
  exportToCSV(year: number): string {
    const revenues = this.revenues.filter(r => r.date.getFullYear() === year);
    const expenses = this.expenses.filter(e => e.date.getFullYear() === year);

    let csv = '日付,種別,カテゴリ,金額,説明,ソース\n';

    // 収益
    revenues.forEach(r => {
      csv += `${r.date.toISOString().split('T')[0]},収益,${r.type},${r.amount},"${r.description}","${r.source || ''}"\n`;
    });

    // 経費
    expenses.forEach(e => {
      csv += `${e.date.toISOString().split('T')[0]},経費,${e.category},-${e.amount},"${e.description}","${e.receipt || ''}"\n`;
    });

    return csv;
  }

  /**
   * データの保存（LocalStorage）
   */
  save() {
    localStorage.setItem('blog_revenues', JSON.stringify(this.revenues));
    localStorage.setItem('blog_expenses', JSON.stringify(this.expenses));
  }

  /**
   * データの読み込み
   */
  load() {
    const revenues = localStorage.getItem('blog_revenues');
    const expenses = localStorage.getItem('blog_expenses');

    if (revenues) {
      this.revenues = JSON.parse(revenues).map((r: any) => ({
        ...r,
        date: new Date(r.date),
      }));
    }

    if (expenses) {
      this.expenses = JSON.parse(expenses).map((e: any) => ({
        ...e,
        date: new Date(e.date),
      }));
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// 使用例
/*
const tracker = new RevenueTracker();
tracker.load();

// AdSense収益を記録
tracker.addRevenue({
  date: new Date('2024-12-01'),
  type: 'adsense',
  amount: 5000,
  description: 'Google AdSense 12月分',
});

// Amazonアソシエイト収益を記録
tracker.addRevenue({
  date: new Date('2024-12-15'),
  type: 'amazon',
  amount: 1200,
  description: '技術書籍の紹介料',
  source: '/posts/book-review-2024',
});

// 経費を記録
tracker.addExpense({
  date: new Date('2024-12-01'),
  category: 'domain',
  amount: 1500,
  description: 'ドメイン更新費用',
  receipt: 'receipts/domain-2024.pdf',
});

// 年間サマリーを表示
const summary = tracker.getYearlySummary(2024);
console.log(summary);

// CSVエクスポート
const csv = tracker.exportToCSV(2024);
console.log(csv);

// データを保存
tracker.save();
*/