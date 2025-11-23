# Aviary's Art Gallery

趣味で描いている油絵作品を展示するポートフォリオサイトです。ユニークな横スクロールタイムラインインターフェースで作品を閲覧できます。

## 主な機能

- **横スクロールギャラリー**: スクロールジャッキング技術による直感的な作品閲覧
- **タイムライン表示**: 年別マーカーによる作品の時系列表示
- **タイムラインジャンプ**: ヘッダーメニューから年を選択して該当年の作品へスムーズスクロール
- **作品詳細ページ**: 各作品の詳細情報を個別ページで表示
- **画像ライトボックス**: 作品詳細ページで画像をクリックして全画面表示
- **About Me ページ**: アーティストプロフィール、制作理念、スキル紹介
- **レスポンシブデザイン**: モバイル、タブレット、デスクトップ対応
- **OGP対応**: SNSシェア時に最適な画像・タイトル・説明を表示

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | Next.js 15.2.4 (App Router) |
| React | v19 |
| 言語 | TypeScript v5 (strict mode) |
| スタイリング | Tailwind CSS v4 |
| UIコンポーネント | shadcn/ui (New York style) + Radix UI |
| アイコン | Lucide React |
| テーマ | next-themes |
| パッケージマネージャー | pnpm |
| E2Eテスト | Playwright |

## 開発環境のセットアップ

### 必要条件

- Node.js 18.x 以上
- pnpm

### インストール

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動 (http://localhost:3000)
pnpm dev

# 本番ビルド
pnpm build

# 本番サーバーの起動
pnpm start

# リント実行
pnpm lint
```

## プロジェクト構成

```
art_gallery/
├── app/
│   ├── layout.tsx              # ルートレイアウト
│   ├── page.tsx                # メインページ
│   ├── globals.css             # グローバルスタイル・CSS変数
│   ├── about_me/
│   │   └── page.tsx            # About Meページ
│   └── artwork/
│       └── [id]/
│           └── page.tsx        # 作品詳細ページ
├── components/
│   ├── ui/                     # shadcn/ui コンポーネント
│   ├── header.tsx              # ナビゲーションヘッダー
│   ├── hero.tsx                # ヒーローセクション
│   ├── horizontal-scroll-gallery.tsx  # 横スクロールギャラリー
│   ├── artwork-card.tsx        # 作品カード
│   ├── footer.tsx              # フッター
│   └── theme-provider.tsx      # テーマプロバイダー
├── lib/
│   ├── utils.ts                # ユーティリティ関数
│   └── data/
│       └── artworks.ts         # 作品データ
├── public/                     # 静的アセット（画像）
└── tests/
    ├── e2e/                    # E2Eテスト
    ├── fixtures/               # テストデータ
    └── helpers/                # テストヘルパー
```

## 作品の追加方法

### 1. 作品データの編集

`lib/data/artworks.ts` の `artworks` 配列に新しい作品を追加します：

```typescript
{
  id: 13,                           // ユニークなID
  title: '作品タイトル',              // 作品名（日本語）
  year: '2025',                     // 制作年
  month: '01',                      // 制作月（タイムライン順序用）
  description: '作品の説明文',        // 説明（日本語）
  image: '/images/artwork.jpg',     // 画像パス（public/配下）
  tags: ['油彩', 'F10号'],           // タグ（日本語）
  orientation: 'portrait',          // 'portrait' | 'landscape'
}
```

### 2. 画像の配置

作品画像を `public/images/` ディレクトリに配置します。

### 3. 向きの設定

`orientation` プロパティで画像の向きを指定：
- `portrait`: 縦長（デフォルト）
- `landscape`: 横長

## E2Eテスト

### テストの実行

```bash
# E2Eテスト実行（ヘッドレスモード）
pnpm test:e2e

# UIモードでテスト実行
pnpm test:e2e:ui

# 特定のテストファイルを実行
pnpm exec playwright test tests/e2e/home.spec.ts

# デバッグモードで実行
pnpm exec playwright test --debug
```

### テストファイル

| ファイル | 内容 |
|---------|------|
| `home.spec.ts` | ホームページ、ギャラリー、タイムラインジャンプ |
| `about-me.spec.ts` | About Meページ、ページ間ナビゲーション |
| `artwork-detail.spec.ts` | 作品詳細ページ、ライトボックス |
| `navigation.spec.ts` | ヘッダー、メニュー、年別スクロール |

### テスト設定

テスト設定は `playwright.config.ts` で管理されています。テストは開発サーバー（`http://localhost:3000`）に対して実行されます。

## テーマのカスタマイズ

テーマカラーは `app/globals.css` のCSS変数で定義されています：

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  /* その他のカラー変数 */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ダークモードのカラー変数 */
}
```

## パスエイリアス

`@/` エイリアスを使用してインポートを簡潔に記述できます：

```typescript
import { Component } from "@/components/component"
import { artworks } from "@/lib/data/artworks"
```

## 注意事項

### v0.app同期

このリポジトリはv0.appと自動同期されています。v0.app上での変更は自動的にこのリポジトリにプッシュされます。ローカルでの変更は上書きされる可能性があるため注意してください。

### ビルド設定

`next.config.mjs` では以下の設定が有効になっています（v0.appのデフォルト）：
- ESLint: ビルド時のエラーを無視
- TypeScript: ビルドエラーを無視
- Images: 最適化を無効化

### コンテンツの言語

UIは日本語で表示されます。コンテンツを変更する際は言語の一貫性を保ってください。

## OGP設定

SNSでシェアした際に表示される画像・タイトル・説明が自動設定されます。

### 動作

| ページ | OGP画像 |
|--------|---------|
| トップページ | 最新作品の画像（`year`で降順ソート） |
| 作品詳細ページ | 該当作品の画像 |

### 環境変数

本番環境では `metadataBase` に正しいドメインを設定するため、以下の環境変数を使用します：

| 変数名 | 説明 |
|--------|------|
| `VERCEL_URL` | Vercelが自動設定（優先使用） |
| `NEXT_PUBLIC_BASE_URL` | カスタムドメイン用（例: `https://example.com`） |

Vercelデプロイの場合は自動で設定されるため、追加設定は不要です。

---
以下はv0生成時のREADME

# Portfolio page design

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/trippy3s-projects/v0-portfolio-page-design)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/NA8UrIoBSVG)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/trippy3s-projects/v0-portfolio-page-design](https://vercel.com/trippy3s-projects/v0-portfolio-page-design)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/NA8UrIoBSVG](https://v0.app/chat/projects/NA8UrIoBSVG)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
