# パフォーマンス改善計画

Lighthouse CI の初回実行結果に基づいて、以下の改善を実施していきます。

## 現在のスコア（2025年6月）

- Performance: 56-69 点
- Accessibility: 88 点
- Best Practices: 70 点
- SEO: 90 点

## 主な問題点と改善策

### 1. 画像最適化（最優先）

**問題**
- WebP形式が使われていない
- レスポンシブ画像が実装されていない
- 画像サイズが最適化されていない

**改善策**
```bash
# 既存の画像を一括最適化
node scripts/batch-optimize-images.js
```

### 2. Largest Contentful Paint (LCP) の改善

**問題**
- LCP: 9-11秒（目標: 2.5秒以下）
- ヒーロー画像の遅延読み込み

**改善策**
- FeaturedPostsCarousel の最初の画像の loading="eager" に変更
- 画像の事前読み込み（preload）を追加

### 3. フォント読み込みの最適化

**問題**
- font-display が設定されていない
- Web フォントの読み込み中にテキストが表示されない

**改善策**
```css
@font-face {
  font-family: 'YourFont';
  src: url('/fonts/your-font.woff2') format('woff2');
  font-display: swap; /* 追加 */
}
```

### 4. レンダリングブロッキングリソースの削減

**問題**
- CSS ファイルがレンダリングをブロックしている

**改善策**
- Critical CSS の実装強化
- 非クリティカルな CSS の遅延読み込み

### 5. JavaScript の最適化

**問題**
- Total Blocking Time が長い
- メインスレッドの作業が多い

**改善策**
- 不要な JavaScript の削除
- 重い処理の Web Worker 化
- コード分割の実装

### 6. アクセシビリティの改善

**問題**
- カラーコントラストが不十分
- リンクに識別可能な名前がない
- タッチターゲットが小さい

**改善策**
- テーマカラーの見直し
- aria-label の追加
- クリック可能な要素のサイズ拡大（最小 44x44px）

### 7. キャッシュの設定

**問題**
- 静的アセットのキャッシュが設定されていない

**改善策**
- Netlify の _headers ファイルでキャッシュヘッダーを設定

## 段階的な改善目標

### Phase 1（1週間）
- 画像最適化の実施
- フォント表示の改善
- 目標スコア: Performance 70+

### Phase 2（2週間）
- LCP の改善
- JavaScript の最適化
- 目標スコア: Performance 75+

### Phase 3（3週間）
- アクセシビリティの改善
- キャッシュ戦略の実装
- 目標スコア: Performance 80+, Accessibility 90+

## モニタリング

- 毎週日曜日に自動でパフォーマンスレポートを生成
- プッシュごとに Lighthouse CI で確認
- 改善の進捗を GitHub Issues で追跡