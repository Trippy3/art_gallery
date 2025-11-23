# Playwright E2Eテスト実装計画

## 📊 実装状況サマリー

### ✅ 完了事項（2025-11-23時点）
- ✅ **フェーズ1**: 初期セットアップ完了
  - Playwright v1.56.0インストール済み
  - 設定ファイル作成完了
  - テストディレクトリ構造構築済み
  - package.jsonスクリプト追加済み

- ✅ **フェーズ2**: コアテスト実装完了
  - ホームページテスト: 46テストケース実装 ✅
    - 基本機能テスト: 32ケース
    - 作品向き対応テスト: 3ケース
    - ビューポートフォーカス/カードクリック: 2ケース
    - タイムラインジャンプテスト: 9ケース (NEW)
  - ナビゲーションテスト: 32テストケース実装 ✅
    - ヘッダー/メニュー: 11ケース
    - ロゴ画像表示: 2ケース (NEW)
    - 年別スムーズスクロール: 6ケース
    - ページ間遷移: 7ケース
    - その他: 6ケース
  - About Meページテスト: 48テストケース実装 ✅
    - 基本機能テスト: 43ケース（Contact section削除後）
    - ページ間ナビゲーション（年ジャンプ）: 5ケース (NEW)
  - アートワーク詳細ページテスト: 78テストケース実装 ✅
    - 基本機能テスト: 65ケース
    - 作品向き対応テスト: 3ケース
    - ライトボックス機能テスト: 10ケース

- **合計**: 204テストケース実装済み
- **テスト成功率**: 100% (204/204 passed on chromium) ✅
- **実装工数**: 約18時間

### 🔧 修正対応履歴
以下の問題を特定・修正し、全テスト成功を達成:

1. **セレクタの厳密モード違反対応**
   - `tests/helpers/selectors.ts`を更新
   - ヘッダー/フッター/ナビゲーション要素の重複マッチを解消
   - 親コンテキスト指定により特定性を向上（例: `header >> text=...`）

2. **ナビゲーションテスト修正**
   - リンククリックによるページ遷移を`Promise.all()`で適切に待機
   - `page.waitForNavigation()`との組み合わせで確実な遷移を実現

3. **About Meページテスト修正**
   - ページ構造のクラス期待値を実装に合わせて修正
   - スキル表示の特定セレクタ追加
   - メールボタンのhref取得方法を修正

4. **アートワーク詳細ページテスト修正**
   - Next.js 15の404ハンドリングに対応（ステータスコードでなくコンテンツチェック）
   - 戻るボタンのナビゲーション待機処理を改善
   - 年表示テキストのセレクタ修正

**テスト実行結果**:
- 初回: 136 passed, 32 failed
- 2回目: 163 passed, 5 failed
- 3回目: 168 passed, 0 failed ✅
- v1.1: 204 passed, 0 failed ✅ (orientation & lightbox tests追加後)
- v1.3: 202 passed, 0 failed ✅ (タイムラインジャンプテスト追加・セレクタ修正後)
- v1.4: 204 passed, 0 failed ✅ (ロゴ画像テスト追加後)

### 🎨 新機能対応履歴（2025-11-19）
**作品の向き（Orientation）サポート**:
- アートワークデータに`orientation: "portrait" | "landscape"`フィールド追加
- ギャラリーカードが向きに応じて動的にサイズ調整
  - 縦長（portrait）: 280×400 〜 400×550px
  - 横長（landscape）: 400×300 〜 600×450px
- 詳細ページの画像アスペクト比も向きに対応
  - 縦長: aspect-[3/4]
  - 横長: aspect-[4/3]
- 追加テスト: 6ケース（ホームページ3 + 詳細ページ3）

**画像ライトボックス機能**:
- 詳細ページで画像クリックで全画面表示
- 右下に虫眼鏡アイコン（ZoomIn）表示
- 背景: black/80 + backdrop-blur
- 閉じる方法: ESCキー、背景クリック、Xボタン
- ボディスクロール防止、高画質表示（quality=100）
- 追加テスト: 10ケース（ライトボックス開閉、スタイリング、キーボード操作など）

### 🎨 新機能対応履歴（2025-11-23）
**ビューポートベースのフォーカス検出**:
- 画面中央に位置するアートワークカードに自動的に情報（タイトル、説明、タグ）を表示
- `getBoundingClientRect()`を使用した厳密なビューポート中央計算
- PC/モバイル共通のUX（ホバーに依存しない）
- フォールバックとしてホバーでも情報表示
- 追加テスト: 1ケース（ビューポート中央カードのフォーカス確認）

**カードクリックナビゲーション**:
- アートワークカード全体をクリック可能に
- クリックで詳細ページを新しいタブで開く（`window.open()`）
- 「詳細を見る」ボタンは継続して表示（stopPropagationで独立動作）
- 追加テスト: 1ケース（カードクリックで新しいタブに遷移確認）

**About Meページコンテンツ更新対応**:
- アーティスト名: Aviary → Torii
- 制作理念: 「自然との対話」「抽象と具象の融合」→「自分にとっての美を見つける」「表現の模索」
- スキル: 6個 → 4個（油彩、デッサン、模写、Webページ制作）
- Contact section: 削除
- テスト修正: セレクター更新、不要テスト削除（約9テストケース削減）

### 🚧 未実装（今後の計画）
- フェーズ2: レスポンシブデザインテスト（専用ファイル）
- フェーズ3: 高度なテスト（水平スクロール詳細、テーマ、アクセシビリティ、パフォーマンス、ビジュアルリグレッション）
- フェーズ4: ページオブジェクトモデル（POM）
- フェーズ5: CI/CD統合

## 📊 現状分析

### 発見事項
- ✅ Playwrightがインストール済み (v1.56.0)
- ✅ テストファイルが存在する (4ファイル、188テスト)
- ✅ テストスクリプトが設定済み
- ✅ アプリケーションの主要機能を把握済み

### アプリケーション概要
- **フレームワーク**: Next.js 15.2.4 (App Router)
- **主要ページ**: Home (`/`), About Me (`/about_me`), Artwork Detail (`/artwork/[id]`)
- **主要機能**: 水平スクロールギャラリー、年別ナビゲーション、レスポンシブデザイン

---

## 🎯 フェーズ1: 初期セットアップ（優先度：高）

### 1.1 Playwrightインストールと設定

#### インストールコマンド
```bash
# Playwrightインストール
pnpm add -D @playwright/test

# ブラウザのインストール
pnpm exec playwright install

# 必要な型定義も追加
pnpm add -D @types/node
```

#### playwright.config.ts
```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results.json' }],
    ['list']
  ],

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
    },
  ],

  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
```

### 1.2 ディレクトリ構造
```
tests/
├── e2e/
│   ├── home.spec.ts                 # ホームページテスト
│   ├── about-me.spec.ts             # About Meページテスト
│   ├── artwork-detail.spec.ts       # アートワーク詳細ページテスト
│   ├── navigation.spec.ts           # ナビゲーションテスト
│   ├── responsive.spec.ts           # レスポンシブテスト
│   ├── horizontal-scroll.spec.ts    # 水平スクロールテスト
│   ├── theme.spec.ts                # テーマ切り替えテスト
│   └── accessibility.spec.ts        # アクセシビリティテスト
├── fixtures/
│   ├── test-data.ts                 # テストデータ
│   └── custom-fixtures.ts           # カスタムフィクスチャ
├── page-objects/
│   ├── HomePage.ts                  # ホームページPOM
│   ├── AboutMePage.ts               # About MeページPOM
│   └── ArtworkDetailPage.ts         # アートワーク詳細ページPOM
└── helpers/
    ├── selectors.ts                 # セレクタ定義
    └── test-utils.ts                # テストユーティリティ
```

### 1.3 package.jsonスクリプト追加
```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:report": "playwright show-report",
    "test:e2e:chromium": "playwright test --project=chromium",
    "test:e2e:mobile": "playwright test --project=mobile-chrome"
  }
}
```

---

## 🧪 フェーズ2: コアテスト実装（優先度：高）

### 2.1 ホームページテスト (`tests/e2e/home.spec.ts`)

#### テストケース

**ページロードと基本要素**
- [ ] ページが正常にロードされる
- [ ] ヒーローセクションが表示される
- [ ] 水平スクロールギャラリーが表示される
- [ ] タイムラインインジケーター「History」が表示される
- [ ] ヘッダーとフッターが表示される

**水平スクロール機能**
- [ ] 垂直スクロールで水平移動が発生する
- [ ] スクロール進捗が正しく計算される（0から1の範囲）
- [ ] タイムラインの進捗バーが更新される
- [ ] アートワークが順次表示される（stagger animation）
- [ ] タイムラインの年マーカー（2021-2024）が表示される

**アートワークカード表示**
- [ ] 8つのアートワークカードが存在する
- [ ] 各カードに画像が表示される
- [ ] 各カードにタイトルが表示される
- [ ] 各カードに年が表示される
- [ ] 各カードに説明が表示される
- [ ] 各カードにタグが表示される
- [ ] 交互レイアウト（上下）が正しく機能する
- [ ] 「詳細を見る」ボタンが表示される

**インタラクション**
- [ ] スクロールヒント「スクロールして作品を見る →」が初期表示される
- [ ] スクロール開始後にヒントが消える（progress > 0.1）
- [ ] アートワークカードホバーでオーバーレイが表示される
- [ ] ホバー時に画像がズーム（scale-110）される
- [ ] 「詳細を見る」ボタンクリックで詳細ページへ遷移
- [ ] リンクが新しいタブで開く

#### サンプルコード
```typescript
import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load home page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Aviary/)
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('section#work')).toBeVisible()
  })

  test('should display timeline indicator', async ({ page }) => {
    const timeline = page.locator('text=History')
    await expect(timeline).toBeVisible()
  })

  test('should display all 8 artworks', async ({ page }) => {
    const artworkCards = page.locator('[data-testid="artwork-card"]')
    await expect(artworkCards).toHaveCount(8)
  })

  test('should show scroll hint initially', async ({ page }) => {
    const hint = page.locator('text=スクロールして作品を見る')
    await expect(hint).toBeVisible()
  })

  test('should hide scroll hint after scrolling', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 500))
    await page.waitForTimeout(1000)
    const hint = page.locator('text=スクロールして作品を見る')
    await expect(hint).not.toBeVisible()
  })

  test('should navigate to artwork detail on click', async ({ page }) => {
    const detailButton = page.locator('text=詳細を見る').first()
    await detailButton.click()
    await expect(page).toHaveURL(/\/artwork\/\d+/)
  })
})
```

### 2.2 ナビゲーションテスト (`tests/e2e/navigation.spec.ts`)

#### テストケース

**ヘッダーナビゲーション**
- [ ] ヘッダーが固定表示される（fixed position）
- [ ] 「Aviary's Art Gallery」ロゴが表示される
- [ ] ロゴクリックでトップへ戻る
- [ ] ハンバーガーメニューアイコンが表示される
- [ ] スクロール後もヘッダーが表示される

**ハンバーガーメニュー**
- [ ] メニューアイコンクリックでドロップダウンが開く
- [ ] メニューアイコンがXアイコンに変わる
- [ ] 「私について」リンクが表示される
- [ ] 年別ナビゲーションセクション「History」が表示される
- [ ] 2024年、2023年、2022年、2021年ボタンが表示される
- [ ] Xアイコンクリックでメニューが閉じる

**年別スクロール機能**
- [ ] 「2024年」クリックで該当セクションへスムーズスクロール
- [ ] 「2023年」クリックで該当セクションへスムーズスクロール
- [ ] 「2022年」クリックで該当セクションへスムーズスクロール
- [ ] 「2021年」クリックで該当セクションへスムーズスクロール
- [ ] スクロール後にメニューが自動で閉じる
- [ ] スクロール先の年マーカーが画面中央に表示される

**ページ間ナビゲーション**
- [ ] 「私について」クリックで/about_meへ遷移
- [ ] /about_meページでヘッダーが表示される
- [ ] /about_meからロゴクリックでホームへ戻る

#### サンプルコード
```typescript
import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display header with logo', async ({ page }) => {
    const logo = page.locator('text=Aviary\'s Art Gallery')
    await expect(logo).toBeVisible()
  })

  test('should open hamburger menu', async ({ page }) => {
    const menuButton = page.locator('button[aria-label="メニュー"]')
    await menuButton.click()

    const aboutLink = page.locator('text=私について')
    await expect(aboutLink).toBeVisible()
  })

  test('should navigate to about page', async ({ page }) => {
    const menuButton = page.locator('button[aria-label="メニュー"]')
    await menuButton.click()

    const aboutLink = page.locator('text=私について')
    await aboutLink.click()

    await expect(page).toHaveURL('/about_me')
  })

  test('should scroll to year 2024', async ({ page }) => {
    const menuButton = page.locator('button[aria-label="メニュー"]')
    await menuButton.click()

    const year2024Button = page.locator('text=2024年')
    await year2024Button.click()

    await page.waitForTimeout(1000) // Wait for smooth scroll

    // Check if year marker is visible
    const yearMarker = page.locator('[id="year-2024"]')
    await expect(yearMarker).toBeInViewport()
  })

  test('should close menu after navigation', async ({ page }) => {
    const menuButton = page.locator('button[aria-label="メニュー"]')
    await menuButton.click()

    const year2024Button = page.locator('text=2024年')
    await year2024Button.click()

    await page.waitForTimeout(1500)

    const aboutLink = page.locator('text=私について')
    await expect(aboutLink).not.toBeVisible()
  })
})
```

### 2.3 About Meページテスト (`tests/e2e/about-me.spec.ts`)

#### テストケース

**ページロードと基本要素**
- [ ] ページが正常にロードされる（/about_me）
- [ ] ヘッダーとフッターが表示される
- [ ] ページタイトルが正しい
- [ ] ヒーローセクション「私について / About Me」が表示される

**プロフィールセクション**
- [x] アーティスト写真が表示される
- [x] 画像のaltテキストが「Artist Profile」
- [x] アーティスト名「Torii」が表示される
- [x] バイオグラフィーテキストが表示される（2段落）
- [x] グリッドレイアウトが正しい（画像と文章が横並び）
- [x] バイオに「油絵」の記述がある
- [x] バイオに「2021年」の記述がある

**制作理念セクション**
- [x] セクションタイトル「制作理念」が表示される
- [x] 「自分にとっての美を見つける」カードが表示される
- [x] 「自分にとっての美を見つける」の説明文が表示される
- [x] 「表現の模索」カードが表示される
- [x] 「表現の模索」の説明文が表示される
- [x] 2つのカードがグリッドレイアウトで表示される

**スキルセクション**
- [x] セクションタイトル「スキル」が表示される
- [x] 4つのスキルバッジが表示される
- [x] スキル: 油彩
- [x] スキル: デッサン
- [x] スキル: 模写
- [x] スキル: Webページ制作
- [x] グリッドレイアウトが正しい（2-3列）

**注意**: Contact sectionはページから削除されたため、関連テストは削除済み

#### サンプルコード
```typescript
import { test, expect } from '@playwright/test'

test.describe('About Me Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about_me')
  })

  test('should load about page successfully', async ({ page }) => {
    await expect(page).toHaveURL('/about_me')
    const heading = page.locator('text=私について')
    await expect(heading).toBeVisible()
  })

  test('should display artist profile', async ({ page }) => {
    const artistName = page.locator('text=Torii')
    await expect(artistName).toBeVisible()

    const artistImage = page.locator('img[alt="Artist Profile"]')
    await expect(artistImage).toBeVisible()
  })

  test('should display philosophy section', async ({ page }) => {
    const title = page.locator('text=制作理念')
    await expect(title).toBeVisible()

    const beauty = page.locator('text=自分にとっての美を見つける')
    await expect(beauty).toBeVisible()

    const expression = page.locator('text=表現の模索')
    await expect(expression).toBeVisible()
  })

  test('should display all 4 skills', async ({ page }) => {
    const skills = [
      '油彩',
      'デッサン',
      '模写',
      'Webページ制作'
    ]

    for (const skill of skills) {
      await expect(page.locator(`text=${skill}`)).toBeVisible()
    }
  })
})
```

### 2.4 アートワーク詳細ページテスト (`tests/e2e/artwork-detail.spec.ts`)

#### テストケース

**動的ルーティング（全8作品）**
- [ ] /artwork/1が正常にロードされる
- [ ] /artwork/2が正常にロードされる
- [ ] /artwork/3が正常にロードされる
- [ ] /artwork/4が正常にロードされる
- [ ] /artwork/5が正常にロードされる
- [ ] /artwork/6が正常にロードされる
- [ ] /artwork/7が正常にロードされる
- [ ] /artwork/8が正常にロードされる
- [ ] /artwork/99（存在しない）で404ページが表示される
- [ ] /artwork/0（無効なID）で404ページが表示される
- [ ] /artwork/abc（無効な形式）で404またはエラー処理

**ページ構成（id=1を代表例として）**
- [ ] ヘッダーに戻るボタン「ギャラリーに戻る」が表示される
- [ ] 戻るボタンにArrowLeftアイコンが表示される
- [ ] アートワーク画像が表示される
- [ ] 画像のaspect ratioが3:4
- [ ] 年バッジ「2021」が表示される
- [ ] タイトル「デジタルランドスケープ」が表示される
- [ ] 短い説明「抽象的な風景をデジタルで表現」が表示される
- [ ] 「作品について」セクションタイトルが表示される
- [ ] 詳細説明（fullDescription）が表示される

**作品情報セクション**
- [ ] 「作品情報」セクションタイトルが表示される
- [ ] 「制作年」ラベルと値が表示される
- [ ] 「技法・材質」ラベルと値が表示される
- [ ] 「サイズ」ラベルと値が表示される
- [ ] グリッドレイアウトが正しい（2列）

**タグ表示**
- [ ] 「タグ」セクションタイトルが表示される
- [ ] 各作品の全タグが表示される
- [ ] タグがpill形式で表示される
- [ ] 複数タグが横並びで表示される

**ナビゲーション**
- [ ] 戻るボタンクリックでホームページ（/）へ遷移
- [ ] 戻るボタンのhrefが正しい

**全作品データ検証**
- [ ] ID 1: デジタルランドスケープ、2021、デジタルアート
- [ ] ID 2: アーバンリズム、2021、デジタルアート
- [ ] ID 3: オーガニックフォーム、2022、ミックスメディア
- [ ] ID 4: カラーハーモニー、2022、デジタルアート
- [ ] ID 5: テクスチャーレイヤー、2023、ミックスメディア
- [ ] ID 6: ライトアンドシャドウ、2023、デジタルアート
- [ ] ID 7: フルイドモーション、2024、デジタルアート
- [ ] ID 8: ミニマルスペース、2024、デジタルアート

#### サンプルコード
```typescript
import { test, expect } from '@playwright/test'

const artworks = [
  { id: 1, title: 'デジタルランドスケープ', year: '2021', medium: 'デジタルアート' },
  { id: 2, title: 'アーバンリズム', year: '2021', medium: 'デジタルアート' },
  { id: 3, title: 'オーガニックフォーム', year: '2022', medium: 'ミックスメディア' },
  { id: 4, title: 'カラーハーモニー', year: '2022', medium: 'デジタルアート' },
  { id: 5, title: 'テクスチャーレイヤー', year: '2023', medium: 'ミックスメディア' },
  { id: 6, title: 'ライトアンドシャドウ', year: '2023', medium: 'デジタルアート' },
  { id: 7, title: 'フルイドモーション', year: '2024', medium: 'デジタルアート' },
  { id: 8, title: 'ミニマルスペース', year: '2024', medium: 'デジタルアート' },
]

test.describe('Artwork Detail Page', () => {
  test('should display 404 for non-existent artwork', async ({ page }) => {
    await page.goto('/artwork/99')
    // Check for not-found page or 404 indicator
    await expect(page.locator('text=not found').or(page.locator('text=404'))).toBeVisible()
  })

  artworks.forEach(artwork => {
    test(`should display artwork ${artwork.id}: ${artwork.title}`, async ({ page }) => {
      await page.goto(`/artwork/${artwork.id}`)

      // Check title
      await expect(page.locator(`text=${artwork.title}`)).toBeVisible()

      // Check year badge
      await expect(page.locator(`text=${artwork.year}`).first()).toBeVisible()

      // Check medium in specifications
      await expect(page.locator(`text=${artwork.medium}`)).toBeVisible()

      // Check back button
      const backButton = page.locator('text=ギャラリーに戻る')
      await expect(backButton).toBeVisible()
    })
  })

  test('should have correct layout for artwork detail', async ({ page }) => {
    await page.goto('/artwork/1')

    // Check for main sections
    const image = page.locator('img[alt="デジタルランドスケープ"]')
    await expect(image).toBeVisible()

    const aboutSection = page.locator('text=作品について')
    await expect(aboutSection).toBeVisible()

    const specsSection = page.locator('text=作品情報')
    await expect(specsSection).toBeVisible()

    const tagsSection = page.locator('text=タグ')
    await expect(tagsSection).toBeVisible()
  })

  test('should navigate back to home', async ({ page }) => {
    await page.goto('/artwork/1')

    const backButton = page.locator('text=ギャラリーに戻る')
    await backButton.click()

    await expect(page).toHaveURL('/')
  })
})
```

### 2.5 レスポンシブデザインテスト (`tests/e2e/responsive.spec.ts`)

#### テストケース

**モバイルビューポート（375px × 667px）**
- [ ] ホームページが正常に表示される
- [ ] ハンバーガーメニューが表示される
- [ ] メニューが全画面表示される
- [ ] 水平スクロールギャラリーが機能する
- [ ] アートワークカードのサイズが調整される（280px幅）
- [ ] タイムラインインジケーターが表示される
- [ ] About Meページのレイアウトが縦積み（1列）
- [ ] アートワーク詳細ページが縦積み（1列）

**タブレットビューポート（768px × 1024px）**
- [ ] ホームページが正常に表示される
- [ ] アートワークカードのサイズが中サイズ（350px幅）
- [ ] About Meページのレイアウトが2列グリッド
- [ ] スキルグリッドが3列表示
- [ ] アートワーク詳細ページが2列グリッド

**デスクトップビューポート（1920px × 1080px）**
- [ ] ホームページが正常に表示される
- [ ] アートワークカードのサイズが大サイズ（400px幅）
- [ ] ホバーエフェクトがデスクトップ版で機能する
- [ ] コンテンツが中央に配置される（max-width制約）
- [ ] 全てのインタラクションが正常に機能する

**横画面モード（Mobile Landscape）**
- [ ] 横向きで正常に表示される
- [ ] 水平スクロールギャラリーが機能する
- [ ] メニューが適切に表示される

#### サンプルコード
```typescript
import { test, expect, devices } from '@playwright/test'

test.describe('Responsive Design', () => {
  test('should display correctly on mobile', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 13']
    })
    const page = await context.newPage()

    await page.goto('/')

    // Check hamburger menu is visible
    const menuButton = page.locator('button[aria-label="メニュー"]')
    await expect(menuButton).toBeVisible()

    // Check artwork cards are sized for mobile
    const artworkCard = page.locator('[data-testid="artwork-card"]').first()
    const box = await artworkCard.boundingBox()
    expect(box?.width).toBeLessThanOrEqual(300)

    await context.close()
  })

  test('should display correctly on tablet', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPad Pro']
    })
    const page = await context.newPage()

    await page.goto('/about_me')

    // Check grid layout on about page
    const philosophyCards = page.locator('.grid').first()
    await expect(philosophyCards).toBeVisible()

    await context.close()
  })

  test('should display correctly on desktop', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    })
    const page = await context.newPage()

    await page.goto('/')

    // Check large artwork cards
    const artworkCard = page.locator('[data-testid="artwork-card"]').first()
    const box = await artworkCard.boundingBox()
    expect(box?.width).toBeGreaterThanOrEqual(350)

    await context.close()
  })

  test('should handle orientation change', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 13'],
      viewport: { width: 844, height: 390 } // Landscape
    })
    const page = await context.newPage()

    await page.goto('/')

    await expect(page.locator('section#work')).toBeVisible()

    await context.close()
  })
})
```

---

## 🚀 フェーズ3: 高度なテスト（優先度：中）

### 3.1 水平スクロールテスト (`tests/e2e/horizontal-scroll.spec.ts`)

#### テストケース

**スクロール計算**
- [ ] スクロール進捗が0から1の範囲で計算される
- [ ] スクロール開始位置が正しい（containerTop - windowHeight）
- [ ] スクロール終了位置が正しい（containerTop + containerHeight - windowHeight）
- [ ] 進捗バーの幅が正しく更新される

**水平トランスフォーム**
- [ ] translateXの計算が正しい（-progress * maxScroll）
- [ ] maxScrollの計算が正しい（scrollWidth - innerWidth）
- [ ] transformスタイルが正しく適用される
- [ ] スムーズなアニメーションで移動する

**アートワーク表示アニメーション**
- [ ] 各アートワークのopacityがprogressに応じて変化する
- [ ] 各アートワークのscaleがprogressに応じて変化する（0.8 → 1.0）
- [ ] staggerアニメーションが機能する（index * 0.8のオフセット）
- [ ] 8つのアートワークが順次表示される

**タイムライン表示**
- [ ] タイムラインの水平線が表示される
- [ ] 年マーカーが正しい位置に配置される
- [ ] 年マーカーのスタイルが正しい（円形、アクセントカラー）
- [ ] 年ラベルが読みやすく表示される

**パフォーマンス**
- [ ] スクロール時のFPSが50fps以上
- [ ] will-change-transformが適用されている
- [ ] レイアウトシフトが最小限

### 3.2 テーマ切り替えテスト (`tests/e2e/theme.spec.ts`)

#### テストケース

**ダークモード**
- [ ] ダークモードが適用される
- [ ] 背景色が暗色になる
- [ ] テキスト色が明色になる
- [ ] アクセントカラーが変更される
- [ ] 画像のコントラストが保たれる

**ライトモード**
- [ ] ライトモードが適用される
- [ ] 背景色が明色になる
- [ ] テキスト色が暗色になる
- [ ] デフォルトのカラースキームが適用される

**テーマ永続性**
- [ ] テーマ設定がlocalStorageに保存される
- [ ] ページリロード後もテーマが維持される
- [ ] ページ遷移後もテーマが維持される
- [ ] ブラウザの既定設定が尊重される

**全ページでのテーマ適用**
- [ ] ホームページでテーマが正しく適用される
- [ ] About Meページでテーマが正しく適用される
- [ ] アートワーク詳細ページでテーマが正しく適用される

### 3.3 アクセシビリティテスト (`tests/e2e/accessibility.spec.ts`)

#### テストケース

**キーボードナビゲーション**
- [ ] Tabキーでフォーカスが移動する
- [ ] フォーカス状態が視認可能
- [ ] Enterキーでリンクを開ける
- [ ] Enterキーでボタンをクリックできる
- [ ] Escapeキーでメニューを閉じられる
- [ ] フォーカストラップがメニュー内で機能する

**ARIA属性**
- [ ] ハンバーガーメニューにaria-labelが設定されている
- [ ] 画像にaltテキストが設定されている
- [ ] ランドマークロール（main, header, footer, nav）が適切
- [ ] 見出しの階層が正しい（h1, h2, h3）

**カラーコントラスト**
- [ ] テキストと背景のコントラスト比が4.5:1以上（WCAG AA）
- [ ] 大きなテキストのコントラスト比が3:1以上
- [ ] インタラクティブ要素のコントラスト比が適切

**スクリーンリーダー対応**
- [ ] ページタイトルが適切
- [ ] 画像のaltテキストが説明的
- [ ] リンクのテキストが文脈を持つ
- [ ] ボタンのラベルが明確

### 3.4 パフォーマンステスト (`tests/e2e/performance.spec.ts`)

#### テストケース

**ページロード時間**
- [ ] ホームページのロード時間が3秒以内
- [ ] About Meページのロード時間が3秒以内
- [ ] アートワーク詳細ページのロード時間が3秒以内

**Core Web Vitals**
- [ ] First Contentful Paint（FCP）が1.5秒以内
- [ ] Largest Contentful Paint（LCP）が2.5秒以内
- [ ] Cumulative Layout Shift（CLS）が0.1以下
- [ ] First Input Delay（FID）が100ms以内

**画像最適化**
- [ ] 画像が遅延ロードされる
- [ ] 画像サイズが適切（過剰に大きくない）
- [ ] 画像フォーマットが最適化されている

**JavaScript実行**
- [ ] Total Blocking Time（TBT）が300ms以内
- [ ] JavaScriptバンドルサイズが適切
- [ ] 不要なJavaScriptが読み込まれていない

#### サンプルコード
```typescript
import { test, expect } from '@playwright/test'

test.describe('Performance', () => {
  test('should meet Core Web Vitals thresholds', async ({ page }) => {
    await page.goto('/')

    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lcp = entries.find(e => e.entryType === 'largest-contentful-paint')
          resolve({ lcp: lcp?.startTime })
        }).observe({ entryTypes: ['largest-contentful-paint'] })

        setTimeout(() => resolve({ lcp: null }), 5000)
      })
    })

    expect(metrics.lcp).toBeLessThan(2500)
  })

  test('should load page within 3 seconds', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime

    expect(loadTime).toBeLessThan(3000)
  })
})
```

### 3.5 ビジュアルリグレッションテスト (`tests/e2e/visual-regression.spec.ts`)

#### テストケース

**ページスクリーンショット**
- [ ] ホームページのスクリーンショット（初期状態）
- [ ] ホームページのスクリーンショット（スクロール後）
- [ ] About Meページのスクリーンショット
- [ ] アートワーク詳細ページのスクリーンショット（各作品）
- [ ] ハンバーガーメニュー開いた状態のスクリーンショット

**コンポーネントスクリーンショット**
- [ ] アートワークカード（通常状態）
- [ ] アートワークカード（ホバー状態）
- [ ] ヘッダー（通常状態）
- [ ] ヘッダー（メニュー開いた状態）
- [ ] フッター

**テーマ比較**
- [ ] ダークモードとライトモードの比較
- [ ] 各ページのテーマ別スクリーンショット

**レスポンシブ比較**
- [ ] モバイル、タブレット、デスクトップの比較
- [ ] 各ビューポートでのレイアウト確認

#### サンプルコード
```typescript
import { test, expect } from '@playwright/test'

test.describe('Visual Regression', () => {
  test('should match homepage snapshot', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled'
    })
  })

  test('should match about page snapshot', async ({ page }) => {
    await page.goto('/about_me')
    await expect(page).toHaveScreenshot('about-page.png', {
      fullPage: true
    })
  })

  test('should match artwork detail snapshot', async ({ page }) => {
    await page.goto('/artwork/1')
    await expect(page).toHaveScreenshot('artwork-detail-1.png')
  })

  test('should match dark mode snapshot', async ({ page }) => {
    await page.goto('/')
    await page.emulateMedia({ colorScheme: 'dark' })
    await expect(page).toHaveScreenshot('homepage-dark.png')
  })
})
```

---

## 🔧 フェーズ4: テストインフラと補助ツール

### 4.1 ページオブジェクトモデル (POM)

#### HomePage.ts
```typescript
import { Page, Locator } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly header: Locator
  readonly heroSection: Locator
  readonly gallerySection: Locator
  readonly timelineIndicator: Locator
  readonly scrollHint: Locator
  readonly artworkCards: Locator
  readonly menuButton: Locator

  constructor(page: Page) {
    this.page = page
    this.header = page.locator('header')
    this.heroSection = page.locator('section').first()
    this.gallerySection = page.locator('section#work')
    this.timelineIndicator = page.locator('text=History')
    this.scrollHint = page.locator('text=スクロールして作品を見る')
    this.artworkCards = page.locator('[data-testid="artwork-card"]')
    this.menuButton = page.locator('button[aria-label="メニュー"]')
  }

  async goto() {
    await this.page.goto('/')
  }

  async openMenu() {
    await this.menuButton.click()
  }

  async scrollToYear(year: number) {
    await this.openMenu()
    await this.page.locator(`text=${year}年`).click()
  }

  async clickArtwork(index: number) {
    await this.artworkCards.nth(index).locator('text=詳細を見る').click()
  }

  async getArtworkCount() {
    return await this.artworkCards.count()
  }

  async scrollPage(pixels: number) {
    await this.page.evaluate((px) => window.scrollBy(0, px), pixels)
  }

  async waitForScrollAnimation() {
    await this.page.waitForTimeout(1000)
  }
}
```

#### AboutMePage.ts
```typescript
import { Page, Locator } from '@playwright/test'

export class AboutMePage {
  readonly page: Page
  readonly heroSection: Locator
  readonly profileImage: Locator
  readonly artistName: Locator
  readonly philosophySection: Locator
  readonly skillsSection: Locator

  constructor(page: Page) {
    this.page = page
    this.heroSection = page.locator('text=私について')
    this.profileImage = page.locator('img[alt="Artist Profile"]')
    this.artistName = page.locator('text=Torii')
    this.philosophySection = page.locator('text=制作理念')
    this.skillsSection = page.locator('text=スキル')
  }

  async goto() {
    await this.page.goto('/about_me')
  }

  async getSkills() {
    return await this.page.locator('.grid div').allTextContents()
  }
}
```

#### ArtworkDetailPage.ts
```typescript
import { Page, Locator } from '@playwright/test'

export class ArtworkDetailPage {
  readonly page: Page
  readonly backButton: Locator
  readonly artworkImage: Locator
  readonly yearBadge: Locator
  readonly title: Locator
  readonly description: Locator
  readonly fullDescription: Locator
  readonly specsSection: Locator
  readonly tagsSection: Locator

  constructor(page: Page) {
    this.page = page
    this.backButton = page.locator('text=ギャラリーに戻る')
    this.artworkImage = page.locator('img[alt]').first()
    this.yearBadge = page.locator('.rounded-full').first()
    this.title = page.locator('h1')
    this.description = page.locator('p').first()
    this.fullDescription = page.locator('text=作品について').locator('..')
    this.specsSection = page.locator('text=作品情報').locator('..')
    this.tagsSection = page.locator('text=タグ').locator('..')
  }

  async goto(id: number) {
    await this.page.goto(`/artwork/${id}`)
  }

  async goBack() {
    await this.backButton.click()
  }

  async getArtworkTitle() {
    return await this.title.textContent()
  }

  async getTags() {
    return await this.tagsSection.locator('span').allTextContents()
  }

  async getSpecifications() {
    const specsText = await this.specsSection.textContent()
    return specsText
  }
}
```

### 4.2 テストデータとフィクスチャ

#### test-data.ts
```typescript
export const artworkData = [
  {
    id: 1,
    title: 'デジタルランドスケープ',
    year: '2021',
    description: '抽象的な風景をデジタルで表現',
    image: '/abstract-digital-landscape-art.jpg',
    tags: ['デジタル', '風景', '抽象'],
    medium: 'デジタルアート',
    dimensions: '3000 x 2000 px',
  },
  {
    id: 2,
    title: 'アーバンリズム',
    year: '2021',
    description: '都市の鼓動を視覚化',
    image: '/urban-rhythm-geometric-art.jpg',
    tags: ['都市', '幾何学', 'リズム'],
    medium: 'デジタルアート',
    dimensions: '2500 x 3500 px',
  },
  {
    id: 3,
    title: 'オーガニックフォーム',
    year: '2022',
    description: '自然の形態からインスピレーション',
    image: '/organic-forms-nature-inspired-art.jpg',
    tags: ['自然', '有機的', 'フォーム'],
    medium: 'ミックスメディア',
    dimensions: '4000 x 3000 px',
  },
  {
    id: 4,
    title: 'カラーハーモニー',
    year: '2022',
    description: '色彩の調和を探求',
    image: '/color-harmony-abstract-art.jpg',
    tags: ['色彩', '調和', '抽象'],
    medium: 'デジタルアート',
    dimensions: '3500 x 2500 px',
  },
  {
    id: 5,
    title: 'テクスチャーレイヤー',
    year: '2023',
    description: '質感の重なりを表現',
    image: '/texture-layers-mixed-media-art.jpg',
    tags: ['テクスチャ', 'レイヤー', 'ミックス'],
    medium: 'ミックスメディア',
    dimensions: '3000 x 4000 px',
  },
  {
    id: 6,
    title: 'ライトアンドシャドウ',
    year: '2023',
    description: '光と影の対比',
    image: '/light-and-shadow-contrast-art.jpg',
    tags: ['光', '影', '対比'],
    medium: 'デジタルアート',
    dimensions: '2800 x 3800 px',
  },
  {
    id: 7,
    title: 'フルイドモーション',
    year: '2024',
    description: '流動的な動きを捉える',
    image: '/fluid-motion-abstract-art.jpg',
    tags: ['流動', '動き', 'ダイナミック'],
    medium: 'デジタルアート',
    dimensions: '4500 x 3000 px',
  },
  {
    id: 8,
    title: 'ミニマルスペース',
    year: '2024',
    description: 'ミニマリズムの美学',
    image: '/minimal-space-contemporary-art.jpg',
    tags: ['ミニマル', '空間', 'シンプル'],
    medium: 'デジタルアート',
    dimensions: '3000 x 3000 px',
  },
]

export const years = ['2021', '2022', '2023', '2024']

export const skills = [
  '油彩',
  'デッサン',
  '模写',
  'Webページ制作',
]
```

#### custom-fixtures.ts
```typescript
import { test as base } from '@playwright/test'
import { HomePage } from '../page-objects/HomePage'
import { AboutMePage } from '../page-objects/AboutMePage'
import { ArtworkDetailPage } from '../page-objects/ArtworkDetailPage'

type Fixtures = {
  homePage: HomePage
  aboutPage: AboutMePage
  artworkPage: ArtworkDetailPage
}

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page)
    await use(homePage)
  },

  aboutPage: async ({ page }, use) => {
    const aboutPage = new AboutMePage(page)
    await use(aboutPage)
  },

  artworkPage: async ({ page }, use) => {
    const artworkPage = new ArtworkDetailPage(page)
    await use(artworkPage)
  },
})

export { expect } from '@playwright/test'
```

### 4.3 テストヘルパー

#### test-utils.ts
```typescript
import { Page } from '@playwright/test'

export async function waitForHydration(page: Page) {
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(500) // Wait for React hydration
}

export async function scrollToElement(page: Page, selector: string) {
  await page.locator(selector).scrollIntoViewIfNeeded()
}

export async function takeFullPageScreenshot(page: Page, name: string) {
  await page.screenshot({
    path: `screenshots/${name}.png`,
    fullPage: true,
  })
}

export async function getComputedStyle(page: Page, selector: string, property: string) {
  return await page.$eval(selector, (el, prop) => {
    return window.getComputedStyle(el).getPropertyValue(prop as string)
  }, property)
}

export async function waitForAnimation(page: Page, duration: number = 1000) {
  await page.waitForTimeout(duration)
}

export async function clearLocalStorage(page: Page) {
  await page.evaluate(() => localStorage.clear())
}

export async function setLocalStorageItem(page: Page, key: string, value: string) {
  await page.evaluate(({ k, v }) => {
    localStorage.setItem(k, v)
  }, { k: key, v: value })
}

export async function getLocalStorageItem(page: Page, key: string) {
  return await page.evaluate((k) => {
    return localStorage.getItem(k)
  }, key)
}
```

#### selectors.ts
```typescript
export const selectors = {
  // Header
  header: 'header',
  logo: 'header >> text=Aviary\'s Art Gallery',
  menuButton: 'button[aria-label="メニュー"]',
  closeButton: 'button[aria-label="メニュー"]', // Same button, different icon

  // Navigation Menu
  menuDropdown: 'nav',
  aboutLink: 'nav >> text=私について',
  year2025Link: 'text=2025年',
  year2024Link: 'text=2024年',
  year2023Link: 'text=2023年',
  year2022Link: 'text=2022年',

  // Home Page
  heroSection: 'section:first-of-type',
  gallerySection: 'section#work',
  timelineIndicator: 'section#work >> text=History',
  scrollHint: 'text=スクロールして作品を見る',
  artworkCard: '[data-testid="artwork-card"]',
  viewDetailsButton: 'text=詳細を見る',

  // Artwork Card
  artworkImage: 'img[alt]',
  artworkTitle: 'h3',
  artworkYear: '.rounded-full',
  artworkDescription: 'p',
  artworkTags: '.rounded span',

  // About Page
  aboutHero: 'main >> h1:has-text("私について")',
  artistImage: 'img[alt="Artist Profile"]',
  artistName: 'main >> h2:has-text("Torii")',
  philosophyTitle: 'h2:has-text("制作理念")',
  skillsTitle: 'h2:has-text("スキル")',
  // Note: Contact section removed from About Me page

  // Artwork Detail Page
  backButton: 'text=ギャラリーに戻る',
  artworkDetailImage: 'img[alt]',
  artworkDetailTitle: 'h1',
  aboutWorkSection: 'text=作品について',
  specsSection: 'text=作品情報',
  tagsSection: 'text=タグ',

  // Footer
  footer: 'footer',
}
```

---

## 📈 フェーズ5: CI/CD統合

### 5.1 GitHub Actions設定

#### .github/workflows/playwright.yml
```yaml
name: Playwright E2E Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  schedule:
    - cron: '0 0 * * *' # Daily at midnight

jobs:
  test:
    name: Run Playwright Tests
    runs-on: ubuntu-latest
    timeout-minutes: 20

    strategy:
      fail-fast: false
      matrix:
        browser: [chromium, firefox, webkit]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Install Playwright browsers
        run: pnpm exec playwright install --with-deps ${{ matrix.browser }}

      - name: Run Playwright tests
        run: pnpm test:e2e --project=${{ matrix.browser }}
        env:
          CI: true

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-results-${{ matrix.browser }}
          path: test-results/
          retention-days: 30

      - name: Upload Playwright report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report-${{ matrix.browser }}
          path: playwright-report/
          retention-days: 30

      - name: Upload screenshots on failure
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: screenshots-${{ matrix.browser }}
          path: test-results/**/screenshots/
          retention-days: 7

  mobile-test:
    name: Run Mobile Tests
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Install Playwright
        run: pnpm exec playwright install --with-deps chromium

      - name: Run mobile tests
        run: pnpm test:e2e:mobile
        env:
          CI: true

      - name: Upload mobile test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: mobile-test-results
          path: test-results/
          retention-days: 30

  deploy-report:
    name: Deploy Test Report
    needs: [test, mobile-test]
    if: always()
    runs-on: ubuntu-latest

    steps:
      - name: Download all artifacts
        uses: actions/download-artifact@v3

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./playwright-report
```

### 5.2 .gitignore更新
```gitignore
# Playwright
/test-results/
/playwright-report/
/playwright/.cache/
/screenshots/
```

---

## 📊 実装優先順位とスケジュール

### 実装優先順位マトリクス

| フェーズ | テストカテゴリ | 優先度 | 複雑度 | 推定工数 | 実装順序 |
|---------|---------------|--------|--------|----------|---------|
| 1 | 初期セットアップ | 🔴 高 | 🟢 低 | 2h | 1 |
| 2 | ホームページ基本テスト | 🔴 高 | 🟡 中 | 4h | 2 |
| 2 | ナビゲーションテスト | 🔴 高 | 🟡 中 | 3h | 3 |
| 2 | About Meページテスト | 🔴 高 | 🟢 低 | 2h | 4 |
| 2 | アートワーク詳細テスト | 🔴 高 | 🟡 中 | 3h | 5 |
| 2 | レスポンシブテスト | 🟡 中 | 🟡 中 | 3h | 6 |
| 3 | 水平スクロールテスト | 🔴 高 | 🔴 高 | 4h | 7 |
| 3 | テーマ切り替えテスト | 🟡 中 | 🟢 低 | 2h | 8 |
| 3 | アクセシビリティテスト | 🟡 中 | 🟡 中 | 3h | 9 |
| 3 | パフォーマンステスト | 🟡 中 | 🔴 高 | 4h | 10 |
| 3 | ビジュアルリグレッション | 🟢 低 | 🟡 中 | 3h | 11 |
| 4 | POM実装 | 🟡 中 | 🟡 中 | 4h | 12 |
| 4 | テストヘルパー作成 | 🟡 中 | 🟢 低 | 2h | 13 |
| 5 | CI/CD統合 | 🟡 中 | 🟡 中 | 2h | 14 |

**合計推定工数**: 41時間

### 推奨実装スケジュール

#### Week 1: 基盤構築
- **Day 1-2**: フェーズ1 初期セットアップ（2h）
- **Day 3-4**: ホームページ基本テスト（4h）
- **Day 5**: ナビゲーションテスト（3h）

#### Week 2: コアページテスト
- **Day 1**: About Meページテスト（2h）
- **Day 2-3**: アートワーク詳細テスト（3h）
- **Day 4-5**: レスポンシブテスト（3h）

#### Week 3: 高度なテスト
- **Day 1-2**: 水平スクロールテスト（4h）
- **Day 3**: テーマ切り替えテスト（2h）
- **Day 4-5**: アクセシビリティテスト（3h）

#### Week 4: パフォーマンスと統合
- **Day 1-2**: パフォーマンステスト（4h）
- **Day 3**: ビジュアルリグレッション（3h）
- **Day 4**: POM実装（4h）
- **Day 5**: テストヘルパー + CI/CD（4h）

---

## 🎯 テストカバレッジ目標

### カバレッジ目標

- **ページカバレッジ**: 100%
  - ✓ ホームページ (`/`)
  - ✓ About Meページ (`/about_me`)
  - ✓ アートワーク詳細ページ (`/artwork/[id]` × 8)
  - ✓ 404ページ

- **機能カバレッジ**: 90%以上
  - ✓ 水平スクロールギャラリー
  - ✓ 年別ナビゲーション
  - ✓ ハンバーガーメニュー
  - ✓ アートワークカードインタラクション
  - ✓ ページ遷移
  - ✓ レスポンシブレイアウト
  - ✓ テーマ切り替え（もし実装されている場合）

- **クリティカルパスカバレッジ**: 100%
  - ✓ ホームページロード → アートワーク閲覧 → 詳細ページ
  - ✓ ホームページ → About Me → ホームへ戻る
  - ✓ 年別ナビゲーション → 該当年へスクロール

- **ブラウザカバレッジ**:
  - ✓ Chromium (Desktop)
  - ✓ Firefox (Desktop)
  - ✓ WebKit (Desktop)
  - ✓ Mobile Chrome (iOS/Android)
  - ✓ Mobile Safari (iOS)

---

## 📏 成功指標（KPI）

### 1. テスト実行効率
- ✅ 全テストがCI環境で10分以内に完了
- ✅ 並列実行により実行時間を50%短縮
- ✅ テスト成功率98%以上
- ✅ Flaky test率5%以下

### 2. 品質指標
- ✅ プロダクションバグ検出率70%以上
- ✅ リグレッション検出率90%以上
- ✅ 致命的バグのリリース前検出率100%
- ✅ 平均バグ発見時間24時間以内

### 3. 保守性指標
- ✅ テストコードのメンテナンス時間が開発時間の10%以下
- ✅ テストの脆弱性（flakiness）が5%以下
- ✅ 新規テスト追加時間が30分以内
- ✅ テストコードレビュー時間が15分以内

### 4. カバレッジ指標
- ✅ ページカバレッジ100%
- ✅ 機能カバレッジ90%以上
- ✅ クリティカルパス100%
- ✅ アクセシビリティ準拠率95%以上（WCAG AA）

---

## 🚀 次のステップ

### 即座に実行可能なアクション

1. **今すぐ開始**:
   ```bash
   pnpm add -D @playwright/test
   pnpm exec playwright install
   ```

2. **設定ファイル作成**:
   - `playwright.config.ts`を作成
   - `tests/`ディレクトリを作成

3. **最初のテスト作成**:
   - `tests/e2e/home.spec.ts`から開始
   - 基本的なページロードテストを実装

4. **継続的改善**:
   - 週次でテストカバレッジをレビュー
   - フィードバックに基づいてテストを調整
   - パフォーマンスメトリクスを監視

---

## 📚 参考資料

### 公式ドキュメント
- [Playwright公式ドキュメント](https://playwright.dev/)
- [Next.js Testing Guide](https://nextjs.org/docs/testing)
- [WCAG 2.1ガイドライン](https://www.w3.org/WAI/WCAG21/quickref/)

### ベストプラクティス
- Playwrightのページオブジェクトモデル
- E2Eテストのアンチパターン
- フレーキーテストの回避方法
- CI/CDパイプラインの最適化

---

**最終更新**: 2025-11-23
**バージョン**: 1.4
**作成者**: Claude Code Assistant

---

## 📝 追加テストケース詳細（v1.1）

### ホームページ - 作品向き対応テスト
1. **縦長・横長カードの異なるサイズ表示**
   - 縦長カードと横長カードが異なるサイズで表示される
   - カードが正しくレンダリングされる

2. **向きに関わらず正しくレンダリング**
   - すべてのアートワークが向きに関わらず正しく表示される
   - 合計12作品が表示される

3. **全作品に向きデータが存在**
   - 全作品に`orientation`フィールドが存在
   - 縦長・横長の両方が存在する
   - 合計数が正しい

### アートワーク詳細ページ - 作品向き対応テスト
1. **縦長作品の3:4アスペクト比表示**
   - 縦長作品（ID 5など）で`aspect-[3/4]`クラスが適用される
   - 画像コンテナが正しく表示される

2. **横長作品の4:3アスペクト比表示**
   - 横長作品（ID 1など）で`aspect-[4/3]`クラスが適用される
   - 画像コンテナが正しく表示される

3. **向きデータの整合性検証**
   - 全作品に`orientation`フィールドが存在
   - 縦長・横長の両方が存在する

### アートワーク詳細ページ - ライトボックス機能テスト
1. **画像クリックでライトボックス開く**
   - 画像をクリックするとライトボックスが開く
   - ライトボックス要素が表示される

2. **ESCキーでライトボックスを閉じる**
   - ESCキーを押すとライトボックスが閉じる
   - アニメーション後に非表示になる

3. **背景クリックでライトボックスを閉じる**
   - 背景をクリックするとライトボックスが閉じる

4. **Xボタンでライトボックスを閉じる**
   - Xボタンをクリックするとライトボックスが閉じる

5. **ライトボックススタイリング**
   - 背景が半透明の黒（black/80）
   - backdrop-blurが適用される
   - z-indexが正しく設定される

6. **画像がobject-containで表示**
   - 画像がアスペクト比を保持して表示される
   - object-containクラスが適用される

7. **閉じるボタンが正しく表示**
   - 右上にXボタンが表示される
   - ホバー時にスタイルが変化する

8. **ライトボックス開いた時のボディスクロール防止**
   - ライトボックスが開くと背景のスクロールが無効化される

9. **画像が高画質で表示**
   - quality={100}で画像が表示される
   - 画像サイズが適切

10. **作品タイトルと年が表示**
    - ライトボックス内に作品情報が表示される
    - タイトルと年が正しく表示される

## 📝 追加テストケース詳細（v1.2）

### ホームページ - ビューポートフォーカス機能テスト
1. **画面中央のカードにフォーカス表示**
   - スクロールで画面中央に来たカードに情報オーバーレイが表示される
   - `opacity-100`クラスが適用される

### ホームページ - カードクリックナビゲーションテスト
1. **カードクリックで新しいタブに遷移**
   - カードをクリックすると新しいタブで詳細ページが開く
   - `context.waitForEvent('page')`で新しいタブを検出
   - URLが`/artwork/\d+`パターンに一致

### About Meページ - コンテンツ更新対応テスト
1. **アーティスト名「Torii」の表示**
   - h2要素でアーティスト名が表示される
   - セレクタ: `main >> h2:has-text("Torii")`

2. **制作理念カードの表示**
   - 「自分にとっての美を見つける」カードが表示される
   - 「表現の模索」カードが表示される
   - 各カードに説明文が含まれる

3. **4つのスキルバッジの表示**
   - 油彩、デッサン、模写、Webページ制作
   - exact matchを使用して厳密にマッチ（例: `page.getByText('油彩', { exact: true })`）

### テストセレクタ更新詳細
- `artistName`: `'main >> h2:has-text("Torii")'`（旧: Aviary）
- `contactTitle`, `emailButton`, `snsButton`: 削除（Contact section削除のため）
- スキルテストで`getByText(skill, { exact: true })`を使用（厳密マッチ）

### 🎯 新機能対応履歴（2025-11-23 追加）
**タイムラインジャンプ機能（URLハッシュ方式）**:
- ヘッダーメニューから年を選択して該当年の作品にジャンプ
- URLハッシュ（`#year-YYYY`）を使用したナビゲーション状態管理
- ホームページでは`window.location.hash`が`hashchange`イベントを発火
- 他ページからは`router.push()`でホームに遷移後スクロール
- `getBoundingClientRect()`を使用したtransform適用後の正確な位置計算
- refs未準備時のリトライ機構（最大5回、100ms間隔）
- スクロール完了後のハッシュクリア（履歴汚染防止）

**追加テスト**:
- home.spec.ts: 9ケース（Timeline Year Jump セクション）
  - 各年（2022-2025）へのジャンプ
  - メニュー自動クローズ
  - URLハッシュ更新確認
  - タイムライン全スクロール後の動作確認
  - 連続ジャンプ動作確認
  - 選択年の最新月へのジャンプ確認
- about-me.spec.ts: 3ケース（Navigation from About Page セクション追加）
  - About Meページから各年へのジャンプ（2024, 2025, 2022）
- navigation.spec.ts: セレクタ修正
  - 年月ID指定から接頭辞マッチへ変更（`[id="year-2025-01"]` → `[id^="year-2025"]`）

**技術的な修正点**:
1. 作品検索: `a.year === year.toString()` → `a.year.startsWith(year.toString())`
   - 作品のyear形式は"2024-03"のようなYYYY-MM形式のため
2. 位置計算: `getBoundingClientRect()`で親子要素の差分から相対位置を取得
3. メモ化: `useMemo`で`reversedArtworks`をメモ化し`useEffect`の不要な再実行を防止

## 📝 追加テストケース詳細（v1.4）

### ナビゲーション - ロゴ画像表示テスト
**ヘッダーロゴ機能**:
- サイトロゴ画像（`aviary_logo_1.png`）をヘッダーに追加
- ロゴはタイトルの左側に32x32pxで表示
- Next.js Imageコンポーネントを使用
- ロゴとタイトルは同一Linkでラップ、クリックでトップページへ遷移

**追加テスト**:
- navigation.spec.ts: 2ケース（Header Navigation セクション内）
  - `should display logo image`: ロゴ画像が表示されることを確認
  - `should have alt text on logo image`: ロゴのaltテキストが「Aviary Logo」であることを確認

**セレクタ追加**:
- `logoImage`: `'header >> img[alt="Aviary Logo"]'`
- `logoLink`: `'header >> a[href="/"]'`
