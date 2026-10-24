---
name: art-gallery-dependabot
description: >
  Triage, verify, and resolve Dependabot dependency pull requests for Aviary's Art
  Gallery. Use when asked to inspect, prioritize, update, merge, or explain bot-opened
  dependency PRs in this repository. Covers its pnpm lockfile, Node 24 policy, Next.js
  checks, Playwright coverage, and project-specific holdbacks. Do not use merely to add
  the initial Dependabot configuration or for unrelated application changes.
---

# Art Gallery の Dependabot PR 対応

Dependabot PR は提案として扱い、最新の default branch と組み合わせた状態を検証してから
取り込む。PR のマージ、クローズ、rebase コメント、ブランチへの push は外部状態を変えるため、
ユーザーが明示的に許可していない限り実行しない。

## 最初に確認するもの

1. `AGENTS.md` と `CLAUDE.md` を読む。
2. `.github/dependabot.yaml`、`package.json`、`pnpm-lock.yaml`、`.nvmrc`、`.npmrc` を確認する。
3. `git status --short` で利用者の未コミット変更を把握し、変更・退避しない。
4. `gh` で default branch、オープン中の Dependabot PR、各 PR の checks と差分を取得する。

このリポジトリで現在監視する ecosystem は root の `npm`（pnpm）のみ。将来 workflow や
別の manifest が追加されるまでは、GitHub Actions、Python、Docker の手順を持ち込まない。

## 棚卸しと優先順位

一覧は依存名、更新前後の版、security advisory、major/minor/patch、グループ PR、merge 状態、
checks を含める。

```bash
gh pr list --author "app/dependabot" --state open \
  --json number,title,createdAt,labels,mergeable,mergeStateStatus,statusCheckRollup --limit 50
```

処理順は次を基本とする。

1. security update
2. Next.js / React など実行基盤の修正版
3. `npm-minor-patch` グループ
4. 個別の minor / patch
5. major update
6. `CLAUDE.md` で意図的に据え置いている更新

同じ推移的依存を直す PR や、後の PR に包含される更新を先に見分ける。PR 番号は rebase で
変わり得るため、依存名と head SHA も記録する。

## このリポジトリの不変条件

- Node.js は `>=24.22.1 <25`、pnpm は `>=10.18.2 <11`。まず `.nvmrc` に合わせ、
  `corepack` から `package.json` 指定の pnpm を使う。`@types/node` の版は実行時 Node の版ではない。
- `pnpm-lock.yaml` を npm や yarn で更新しない。
- ESLint 10 と TypeScript 7 は、`CLAUDE.md` 記載の上流互換性問題が解消するまで据え置く。
  Dependabot PR が来ても、最新の peer dependency と実動作を確認せず解除しない。
- `next.config.mjs` の `ignoreBuildErrors` により、`pnpm build` 成功だけでは型安全を確認できない。
- UI は横スクロール処理に依存する。見た目やブラウザ挙動に触れる更新では E2E に加えて
  ホーム画面のスクロールと年ジャンプを手動確認する。

## 検証方法

現在の作業ツリーを checkout で動かさない。PR ごとに `/tmp` などの隔離 worktree を作り、
最新の `origin/<default-branch>` に PR head をマージした結果を検証する。競合した場合は勝手に
解決せず、差分と選択肢を報告する。

隔離 worktree では次を実行する。

```bash
nvm install
nvm use
corepack enable
pnpm install --frozen-lockfile
pnpm audit
pnpm exec tsc --noEmit
pnpm lint
pnpm build
pnpm test:e2e
```

失敗時は PR のせいと決めつけず、同じコマンドを最新 default branch でも実行して baseline と
比較する。lint は終了コードだけでなく、警告の種類と件数が増えていないかを見る。

`pnpm-lock.yaml` はパッケージ単位で確認し、意図しない major、重複、別ツリーの downgrade が
ないかを調べる。推移的依存には `pnpm why <package>` を使う。`pnpm audit --fix` や
強制的な major 更新は行わない。

## 更新種別ごとの追加確認

### Security update

`.github/dependabot.yaml` の cooldown は version update だけに適用され、security update は
遅延しない。advisory の影響範囲、修正版、実際の依存経路を確認し、安価に修正可能なら到達性が
低くても更新を優先する。マージ後の lockfile に脆弱版が残っていないことを `pnpm why` と
`pnpm audit` で再確認する。

### Next.js / React

PR の依存をインストールした後、その版の `node_modules/next/dist/docs/` から関連ガイドを読んで
からコードや設定を変更する。公式の security advisory、release notes、migration guide を確認し、
型検査と本番ビルドの両方を必ず実行する。自動 upgrade がアプリコードを変更した場合は、依存更新と
生成されたコード変更を分けてレビューする。

### Playwright

`@playwright/test` の更新はテストランナーだけでなく同梱ブラウザも変え得る。
`node_modules/playwright-core/browsers.json` の差分を確認し、Chromium、Firefox、Mobile Chrome の
全 project を実行する。ブラウザ未導入なら、ダウンロード内容と実行環境を確認してから導入する。

### UI / CSS / icons

Tailwind、PostCSS、Lucide、Radix、Geist、Next themes の更新は、ビルドと E2E が緑でも視覚差分を
見逃し得る。ホーム、作品詳細、About Me、ライトボックス、モバイル表示を確認する。特に
`horizontal-scroll-gallery.tsx` の ref 警告を機械的に直さない。

### Major update

最初に `rg` で直接 import、ラッパー、再 export の利用連鎖を調べる。

- 未使用なら、移行より削除を提案する。
- 使用中なら、公式 migration guide と breaking changes を影響箇所へ対応付け、着手前に報告する。
- 方針で据え置きなら PR を残す。`@dependabot ignore` は将来の再起票を止めるため、ユーザーが
  明示的に望む場合だけ使う。

## グループ PR と rebase

`npm-minor-patch` は複数依存を一つに束ねる。各依存の release notes と lockfile 差分を個別に
確認し、一つでも切り分けが必要なら統合したまま無理にマージしない。

`@dependabot rebase` 後は head SHA、対象パッケージ、選択バージョンが変わっていないか再取得する。
グループ PR が別番号で作り直された場合は新 PR を棚卸しし直し、古い検証結果を流用しない。

## マージと完了報告

明示的なマージ許可がある場合だけ、リポジトリの既存慣例に合う方式でマージする。方式が判断できなければ
確認する。マージ直前に checks と head SHA が検証時点から変わっていないことを確認する。

最後に次をまとめる。

- マージ、クローズ、据え置きにした PR と理由
- PR ごとの検証コマンドと結果
- `pnpm audit` の前後
- 手動確認した画面・操作
- 残っている advisory、上流待ち、再検討条件
- 作成した follow-up PR やローカル変更
