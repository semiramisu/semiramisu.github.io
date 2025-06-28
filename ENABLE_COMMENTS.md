# コメント機能（Giscus）を有効にする方法

コメント機能は現在無効化されています。有効にするには以下の手順に従ってください。

## 手順

### 1. Giscusの設定

1. [giscus.app](https://giscus.app) にアクセス
2. 以下の設定を入力：
   - **リポジトリ**: `semiramisu/semiramisu.github.io`
   - **ページ ↔ Discussions マッピング**: `pathname`
   - **Discussion カテゴリー**: `Announcements`（または任意のカテゴリー）
   - **機能**: お好みで選択
   - **テーマ**: `preferred_color_scheme`

3. 生成されたスクリプトから以下の値をコピー：
   - `data-repo-id` の値
   - `data-category-id` の値

### 2. Comments.astroの更新

`src/components/Comments.astro`を開き、以下の部分を更新：

```astro
data-repo-id="YOUR_REPO_ID"     // ← ここに取得したrepo-idを設定
data-category-id="YOUR_CATEGORY_ID"  // ← ここに取得したcategory-idを設定
```

### 3. コメント機能を有効化

`src/layouts/PostLayout.astro`の87行目付近：

```astro
{/* <Comments lang="ja" /> */}
```

を以下に変更：

```astro
<Comments lang="ja" />
```

### 4. GitHubの設定

1. リポジトリの Settings > General に移動
2. Features セクションで「Discussions」を有効化
3. [github.com/apps/giscus](https://github.com/apps/giscus) でGiscusアプリをインストール

## 注意事項

- repo-idとcategory-idは公開情報なので、セキュリティ上の問題はありません
- Discussionsを有効にしないとコメント機能は動作しません
- コメントはGitHub Discussionsに保存されます