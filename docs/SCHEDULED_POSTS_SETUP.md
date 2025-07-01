# 予約投稿の自動ビルド設定

このドキュメントでは、予約投稿を自動的に公開するための設定方法を説明します。

## 概要

静的サイトジェネレーター（Astro）の特性上、予約投稿された記事は公開時刻になっても自動的に表示されません。そのため、毎日12時に自動的に再ビルドを行うGitHub Actionsを設定します。

## 設定方法

### 1. Netlifyビルドフックの作成

1. Netlifyのダッシュボードにログイン
2. 対象のサイトを選択
3. `Site settings` → `Build & deploy` → `Build hooks` に移動
4. `Add build hook` をクリック
5. 名前を入力（例：`scheduled-rebuild`）
6. ブランチを選択（通常は `main`）
7. `Save` をクリック
8. 生成されたURLをコピー

### 2. GitHub Secretsの設定

1. GitHubリポジトリの `Settings` → `Secrets and variables` → `Actions` に移動
2. `New repository secret` をクリック
3. Name: `NETLIFY_BUILD_HOOK_URL`
4. Value: 先ほどコピーしたNetlifyビルドフックのURL
5. `Add secret` をクリック

## 動作確認

### 手動実行

1. GitHubリポジトリの `Actions` タブに移動
2. `Scheduled Rebuild for Posts` ワークフローを選択
3. `Run workflow` をクリック
4. Netlifyのダッシュボードでビルドが開始されることを確認

### 自動実行

- 毎日日本時間12:00（UTC 3:00）に自動実行されます
- Actions タブでワークフローの実行履歴を確認できます

## トラブルシューティング

### ビルドフックが動作しない場合

`NETLIFY_BUILD_HOOK_URL` secretが正しく設定されていない場合、代替手段として空のコミットを作成して再ビルドをトリガーします。

### タイムゾーンについて

- Cron式はUTC時間で指定します
- 日本時間12:00 = UTC 3:00
- 夏時間の考慮は不要（日本は夏時間を採用していないため）

## 注意事項

- この設定により、毎日12時に自動的にサイトが再ビルドされます
- ビルド回数に制限がある場合は、Netlifyのプランを確認してください
- 不要になった場合は、GitHub Actionsのワークフローを無効化できます