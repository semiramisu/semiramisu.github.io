# パフォーマンス監視ガイド

このブログでは GitHub Actions を使用して自動的にパフォーマンスを監視しています。

## 🚦 Lighthouse CI

### 概要
- プッシュごとに自動的に Lighthouse を実行
- Performance、Accessibility、Best Practices、SEO のスコアを測定
- プルリクエストにコメントで結果を通知

### 設定
`.lighthouserc.json` で以下の閾値を設定しています：
- Performance: 80点以上
- Accessibility: 90点以上
- Best Practices: 90点以上
- SEO: 90点以上

### 手動実行
```bash
# ローカルでLighthouse を実行
pnpm build
npx lighthouse http://localhost:4321 --view
```

## 🖼️ 画像自動最適化

### 概要
- 新しい画像がプッシュされると自動的に最適化
- WebP形式への変換
- JPEG/PNGの圧縮

### 最適化設定
- WebP品質: 85%
- JPEG品質: 85%（プログレッシブ）
- PNG圧縮レベル: 9

### 手動で既存画像を最適化
```bash
# 依存関係をインストール
pnpm add -D sharp glob

# 通常の最適化
node scripts/batch-optimize-images.js

# レスポンシブ画像も生成
node scripts/batch-optimize-images.js --responsive
```

### 最適化された画像の使用方法
```astro
---
import { Image } from 'astro:assets';
import OptimizedImage from '@/components/OptimizedImage.astro';

// 最適化された画像パス
const optimizedImage = '/optimized/my-image.webp';
---

<!-- Astroコンポーネントを使用 -->
<OptimizedImage src="/my-image.jpg" alt="説明" />

<!-- または直接使用 -->
<picture>
  <source srcset="/optimized/my-image.webp" type="image/webp">
  <img src="/optimized/my-image.jpg" alt="説明">
</picture>
```

## 📊 週次パフォーマンスレポート

### 概要
- 毎週日曜日に自動実行
- GitHub Issue として結果を投稿
- Core Web Vitals を含む詳細なメトリクス

### 手動実行
Actions タブから "Performance Report" ワークフローを手動実行できます。

## トラブルシューティング

### Lighthouse CI が失敗する場合
1. ビルドが成功しているか確認
2. `.lighthouserc.json` の設定を確認
3. スコアの閾値を調整

### 画像最適化が動作しない場合
1. 画像パスが正しいか確認
2. sharp のインストールを確認
3. ファイル権限を確認

## 参考リンク
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [Core Web Vitals](https://web.dev/vitals/)