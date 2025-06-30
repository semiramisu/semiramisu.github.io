# OGP（Open Graph Protocol）実装ガイド

## 📸 OGPとは？

OGP（Open Graph Protocol）は、SNSでURLを共有した際に表示される画像・タイトル・説明文を制御するメタデータです。

## 🚨 現在の問題点と解決策

### 問題1: 動的OGP画像生成が機能していない
- **原因**: Netlifyでは動的画像生成に制限がある
- **解決策**: デフォルトのOGP画像を用意して使用

### 問題2: OGPタグの実装が不完全
- **原因**: BaseHead.astroでの実装が簡易的
- **解決策**: 専用のOGPTagsコンポーネントを作成

## ✅ 実装内容

### 1. OGPTagsコンポーネント
`src/components/OGPTags.astro`を作成：
- 記事ページ用の詳細なOGPタグ
- デフォルトOGP画像の設定
- Twitter Card対応

### 2. デフォルトOGP画像の準備

#### 手動で作成する場合
1. **サイズ**: 1200x630px（推奨）
2. **ファイル名**:
   - `public/ogp-default.png`（サイト全体用）
   - `public/ogp-default-post.png`（記事用）

#### Canvaで作成する場合
1. [Canva](https://www.canva.com/)にアクセス
2. 「カスタムサイズ」で1200x630pxを指定
3. デザインを作成
4. PNG形式でダウンロード

#### 推奨デザイン要素
- サイト名「セミラミスの庭」
- キャッチコピー
- ブランドカラー（紫系グラデーション）
- 読みやすいフォントサイズ（タイトル: 60px以上）

## 🔍 OGPの確認方法

### 1. Facebook Sharing Debugger
- URL: https://developers.facebook.com/tools/debug/
- URLを入力して「Debug」をクリック
- 画像やタイトルが正しく表示されるか確認

### 2. Twitter Card Validator
- URL: https://cards-dev.twitter.com/validator
- URLを入力して確認
- 「Card Preview」で表示を確認

### 3. LINE OGP Checker
- URL: https://poker.line.naver.jp/
- LINEでの表示を確認

## 🛠️ トラブルシューティング

### OGP画像が表示されない場合

1. **キャッシュの問題**
   - Facebook: Sharing Debuggerで「Scrape Again」
   - Twitter: 新しいURLパラメータを追加（例: ?v=2）

2. **画像サイズの問題**
   - 最小: 200x200px
   - 推奨: 1200x630px
   - 最大: 5MB

3. **パスの問題**
   - 絶対URLで指定されているか確認
   - HTTPSで配信されているか確認

### よくある間違い

```html
<!-- ❌ 間違い: 相対パス -->
<meta property="og:image" content="/ogp-default.png">

<!-- ✅ 正しい: 絶対URL -->
<meta property="og:image" content="https://semiramisu.github.io/ogp-default.png">
```

## 📝 今後の改善案

### 1. 記事ごとの動的OGP画像
- Cloudinary等の画像生成サービスを利用
- ビルド時に静的生成する方法を検討

### 2. A/Bテスト
- 複数のOGPデザインを用意
- クリック率を測定して最適化

### 3. 多言語対応
- 日本語版と英語版でOGP画像を分ける
- og:localeタグの活用

## 🎨 OGP画像テンプレート（HTML/CSS）

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      width: 1200px;
      height: 630px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Noto Sans JP', sans-serif;
      color: white;
      position: relative;
      overflow: hidden;
    }
    
    .container {
      text-align: center;
      z-index: 2;
      padding: 60px;
    }
    
    .title {
      font-size: 72px;
      font-weight: bold;
      margin-bottom: 20px;
      line-height: 1.2;
    }
    
    .subtitle {
      font-size: 32px;
      opacity: 0.9;
      margin-bottom: 40px;
    }
    
    .brand {
      position: absolute;
      bottom: 40px;
      right: 40px;
      font-size: 24px;
      opacity: 0.6;
    }
    
    .decoration {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
    }
    
    .decoration-1 {
      width: 400px;
      height: 400px;
      top: -200px;
      right: -100px;
    }
    
    .decoration-2 {
      width: 300px;
      height: 300px;
      bottom: -150px;
      left: -100px;
    }
  </style>
</head>
<body>
  <div class="decoration decoration-1"></div>
  <div class="decoration decoration-2"></div>
  
  <div class="container">
    <h1 class="title">セミラミスの庭</h1>
    <p class="subtitle">日々の発見と思いを綴る、知識と経験の交差点</p>
  </div>
  
  <div class="brand">semiramisu.github.io</div>
</body>
</html>
```

このHTMLをブラウザで開いてスクリーンショットを撮ることで、OGP画像を作成できます。

---

最終更新: 2024-12-27