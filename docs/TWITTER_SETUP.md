# X（Twitter）自動投稿機能のセットアップガイド

このガイドでは、ブログの新規投稿を自動的にX（Twitter）に投稿する機能のセットアップ方法を説明します。

## 概要

- 新しいブログ記事をプッシュすると自動的にXに投稿されます
- ドラフト記事は投稿されません
- 同じ記事が重複して投稿されることはありません
- コミットメッセージに `[skip-tweet]` を含めることで自動投稿をスキップできます

## セットアップ手順

### 1. X Developer Portalでアプリを作成

1. [X Developer Portal](https://developer.twitter.com/en/portal/dashboard) にアクセス
2. 「Create Project」をクリック
3. プロジェクト名を入力（例：「Blog Auto Tweet」）
4. アプリを作成し、以下の権限を設定：
   - **Read and write** 権限を有効化
   - **App permissions** で「Read and write」を選択

### 2. API認証情報を取得

Developer Portalで以下の4つの認証情報を取得：

- **API Key** (Consumer Key)
- **API Key Secret** (Consumer Secret)
- **Access Token**
- **Access Token Secret**

⚠️ これらの情報は一度しか表示されないので、必ず安全な場所に保存してください。

### 3. GitHub Secretsに認証情報を設定

GitHubリポジトリで以下の手順を実行：

1. リポジトリの「Settings」タブを開く
2. 左メニューから「Secrets and variables」→「Actions」を選択
3. 「New repository secret」をクリック
4. 以下の4つのシークレットを追加：

| Name | Value |
|------|-------|
| `TWITTER_API_KEY` | X Developer Portalで取得したAPI Key |
| `TWITTER_API_SECRET` | X Developer Portalで取得したAPI Key Secret |
| `TWITTER_ACCESS_TOKEN` | X Developer Portalで取得したAccess Token |
| `TWITTER_ACCESS_TOKEN_SECRET` | X Developer Portalで取得したAccess Token Secret |

### 4. 動作確認

1. 新しいブログ記事を作成（`src/contents/posts/` に `.md` ファイルを追加）
2. `draft: false` になっていることを確認
3. 変更をコミット＆プッシュ
4. GitHubの「Actions」タブで実行状況を確認
5. Xアカウントに自動投稿されているか確認

## 投稿内容のカスタマイズ

自動投稿される内容は以下の形式です：

```
📝 ブログを更新しました！

「記事タイトル」

記事の説明文（最大100文字）

#タグ1 #タグ2 #タグ3

続きはこちら👇
https://semiramisu.github.io/posts/[記事ID]
```

## トラブルシューティング

### 投稿されない場合

1. GitHub Actionsの実行ログを確認
2. API認証情報が正しく設定されているか確認
3. X APIの利用制限に達していないか確認

### 重複投稿を防ぐ

- `.github/tweeted/` ディレクトリに投稿履歴が保存されます
- このディレクトリを削除しないでください

### 自動投稿をスキップしたい場合

コミットメッセージに `[skip-tweet]` を含めてください：

```bash
git commit -m "記事を更新 [skip-tweet]"
```

## 注意事項

- X APIの無料プランでは月間の投稿数に制限があります（執筆時点で1,500件/月）
- 投稿内容は280文字以内に自動調整されます
- ハッシュタグは最大3つまで自動的に追加されます

## サポート

問題が発生した場合は、GitHubのIssuesでお問い合わせください。