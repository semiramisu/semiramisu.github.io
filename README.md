# セミラミスの庭

https://semiramisu.com/

データサイエンスの仕事、読書、日々の考察を綴る個人ブログ。
Astro 6 によるフルスクラッチ構成、デザインシステムは「Terminal Garden」(ダークファースト・ターミナル風)。

## 開発

```bash
pnpm install
pnpm dev          # localhost:4321
pnpm build        # 本番ビルド (Pagefindインデックス生成込み)
pnpm preview      # ビルド結果のプレビュー
pnpm check        # 型チェック
```

Node 22 以上が必要(`.nvmrc` 参照)。

## 記事の書き方

`src/content/posts/YYYY_MM_DD.md` を作成:

```markdown
---
title: 記事タイトル
published: 2026-06-12
description: 一覧やOGPに使われる説明文
tags: [タグ1, タグ2]
category: カテゴリ名
draft: false
---

本文(Markdown)。数式は $KaTeX$ 記法、コードブロックはシンタックスハイライト対応。
```

ファイル名がそのままURLスラグになる(`/posts/YYYY_MM_DD/`)。
画像は `src/content/posts/media/` に置き `./media/ファイル名` で相対参照。

## 構成

- ホスティング: Netlify(mainブランチへのpushで自動デプロイ)
- 検索: Pagefind / コメント: giscus / フォーム: Netlify Forms
- 収益化(AdSense/寄付)とGAはNetlifyの環境変数で制御(`.env.example` 参照)
- 詳細は `CLAUDE.md` を参照
