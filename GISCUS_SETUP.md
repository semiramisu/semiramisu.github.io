# Giscus セットアップガイド

コメント機能を有効にするには、以下の手順に従ってください：

## 1. Giscusを有効化

1. https://github.com/apps/giscus にアクセス
2. 「Install」をクリック
3. リポジトリ `semiramisu/semiramisu.github.io` を選択

## 2. リポジトリの設定

1. リポジトリの Settings > General に移動
2. Features セクションで「Discussions」を有効化

## 3. Giscus設定の取得

1. https://giscus.app にアクセス
2. 以下の設定を入力：
   - リポジトリ: `semiramisu/semiramisu.github.io`
   - ページ ↔ Discussions マッピング: `pathname`
   - Discussion カテゴリー: `Announcements`
   - 機能: すべてチェック
   - テーマ: `preferred_color_scheme`

3. 生成されたスクリプトから以下の値をコピー：
   - `data-repo-id`
   - `data-category-id`

## 4. コンポーネントの更新

`src/components/Comments.astro` を開き、以下の値を更新：

```astro
data-repo-id="YOUR_REPO_ID"  // ← ここに取得したrepo-idを設定
data-category-id="YOUR_CATEGORY_ID"  // ← ここに取得したcategory-idを設定
```

## 5. 確認

記事ページにアクセスして、コメント機能が表示されることを確認してください。

---

注意: repo-idとcategory-idは公開情報なので、セキュリティ上の問題はありません。