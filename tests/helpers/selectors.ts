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
  year2021Link: 'text=2021年',

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
  artistName: 'main >> h2:has-text("Aviary")',
  philosophyTitle: 'h2:has-text("制作理念")',
  skillsTitle: 'h2:has-text("スキル")',
  contactTitle: 'h2:has-text("お問い合わせ")',
  emailButton: 'a:has-text("メールで連絡")',
  snsButton: 'a:has-text("SNSをフォロー")',

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
