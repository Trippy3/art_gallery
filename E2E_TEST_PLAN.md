# E2Eテスト設計書

## テスト方針

### 基本方針

**UX/操作フローを優先し、データ整合性はテストしない**

E2Eテストの目的は「ユーザーが意図した操作を行えるか」を検証することである。コンテンツの内容（タイトル、説明文、タグの数など）は頻繁に更新されるため、E2Eでの検証は高コストかつ脆弱である。

### テスト対象の分類

| 分類 | テスト対象 | 理由 |
|------|-----------|------|
| **テストする** | ページ遷移、メニュー開閉、スクロール動作 | UXの根幹 |
| **テストする** | 要素の存在確認（タイトルがある、画像があるなど） | UI構造の担保 |
| **テストする** | レスポンシブ動作 | 複数デバイス対応 |
| **テストしない** | 特定のテキスト内容（「Torii」など） | コンテンツは変更される |
| **テストしない** | 要素の数（タグが3個あるなど） | データ量は変更される |
| **テストしない** | 特定の年やIDの存在 | 作品は追加・削除される |

### テストケース設計の原則

1. **具体的なデータに依存しない**: `expect(count).toBe(12)` ではなく `expect(count).toBeGreaterThan(0)`
2. **構造を検証する**: 「タイトルがある」は良い、「タイトルが〇〇である」は避ける
3. **操作フローを検証する**: クリック→遷移→要素表示の流れ
4. **エッジケースを検証する**: 404ページ、無効なID、空状態

---

## テストファイル構成

```
tests/
├── e2e/
│   ├── home.spec.ts           # ホームページ（ギャラリー）
│   ├── about-me.spec.ts       # About Meページ
│   ├── artwork-detail.spec.ts # アートワーク詳細ページ
│   └── navigation.spec.ts     # ナビゲーション全般
├── fixtures/
│   └── test-data.ts           # テストデータ定義（参照用）
└── helpers/
    └── selectors.ts           # 共通セレクタ定義
```

---

## 各テストファイルの責務

### home.spec.ts
ホームページの水平スクロールギャラリー機能

- ページ読み込み・基本要素の表示
- 水平スクロール動作（進捗バー、ヒント表示/非表示）
- アートワークカードの表示・インタラクション
- タイムライン年ジャンプ機能
- レスポンシブ動作

### about-me.spec.ts
About Meページのコンテンツ表示

- ページ読み込み・基本要素の表示
- 各セクション（プロフィール、制作理念、スキル）の存在
- レスポンシブ動作
- ページ間ナビゲーション

### artwork-detail.spec.ts
アートワーク詳細ページの動的ルーティング

- 有効なIDでのページ読み込み
- 無効なID（404処理）
- 各セクション（画像、作品情報、タグ）の存在
- ライトボックス機能
- 戻るナビゲーション
- レスポンシブ動作

### navigation.spec.ts
サイト全体のナビゲーション

- ヘッダー表示・固定位置
- ハンバーガーメニューの開閉
- 年別スムーズスクロール
- ページ間遷移
- ロゴクリック動作
- キーボードナビゲーション
- モバイルナビゲーション

---

## 共通セレクタ (selectors.ts)

セレクタは一元管理し、テストファイル間で再利用する。

```typescript
// 例
export const selectors = {
  header: 'header',
  menuButton: 'button[aria-label="メニュー"]',
  gallerySection: 'section#work',
  // ...
}
```

セレクタ変更時は `selectors.ts` のみを更新すればよい。

---

## テストデータ (test-data.ts)

テストデータは**参照用**として保持するが、テストはこれに依存しないよう設計する。

```typescript
// 良い例: 構造の検証
const tags = page.locator('.tag')
expect(await tags.count()).toBeGreaterThan(0)

// 悪い例: データへの依存
expect(await tags.count()).toBe(artworkData[0].tags.length)
```

---

## 実行方法

```bash
# 開発中（Chromiumのみ、高速）
pnpm test:e2e:chromium

# モバイル表示のテスト
pnpm test:e2e:mobile

# 全ブラウザテスト（CI/リリース前）
pnpm test:e2e

# UIモード（テスト選択・実行状況の可視化）
pnpm test:e2e:ui

# デバッグモード
pnpm test:e2e:debug

# 特定ファイルのみ
pnpm exec playwright test tests/e2e/home.spec.ts
```

---

## ブラウザ戦略

### 対象ブラウザ

| ブラウザ | エンジン | 用途 |
|---------|----------|------|
| Chromium | Blink | メインブラウザ、Chrome/Edge ユーザー |
| Firefox | Gecko | 異なるエンジンでの互換性検証 |
| Mobile Chrome | Blink | モバイルビューポート動作検証 |

### 除外ブラウザ

| ブラウザ | 理由 |
|---------|------|
| WebKit | Linux 環境での不安定性。Safari 検証は macOS/iOS 実機推奨 |
| Mobile Safari | WebKit と同様。実機検証を推奨 |

### 選定理由

1. **Chromium + Firefox** で主要レンダリングエンジンをカバー
2. Firefox は WebKit より安定し、CSS/JS の差異を効率的に検出
3. 実行時間とカバレッジのバランスを重視（約1.5倍の実行時間増加）
4. Safari の正確な検証には macOS/iOS 実機が必要（Linux WebKit ≠ 実際の Safari）

### モバイルテストの注意点

以下のテストはモバイル環境でスキップされる：
- `window.open()` を使用するテスト（ポップアップブロッカーの影響）
- `target="_blank"` リンクの新規タブ遷移テスト
- ホバー依存のインタラクションテスト

---

## 新規テスト追加時のガイドライン

### 追加すべきテスト
- 新機能の操作フロー（クリック→結果の確認）
- 新ページの基本表示
- 新しいインタラクション

### 追加すべきでないテスト
- 特定のコンテンツ内容の検証
- データの数や値の厳密な一致
- スタイリングの詳細（色、サイズの厳密値）

### テストケースの命名規則
```typescript
// 良い例
'should display gallery section'
'should navigate to detail page on card click'
'should close menu after year navigation'

// 悪い例
'should display 12 artworks'
'should show title "デジタルランドスケープ"'
```

---

## 保守方針

### コンテンツ変更時
- テストの修正は**不要**（データに依存していないため）

### UI構造変更時
- `selectors.ts` のセレクタを更新
- 影響を受けるテストを確認・修正

### 新機能追加時
- 操作フローのテストを追加
- データ検証テストは追加しない

---

**最終更新**: 2025-11-23
