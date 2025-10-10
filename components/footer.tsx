export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">アートポートフォリオ</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              デジタルアートと抽象表現を通じて、
              <br />
              新しい視覚体験を創造しています。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">コンタクト</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:contact@example.com" className="hover:text-foreground transition-colors">
                  contact@example.com
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">リンク</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#work" className="hover:text-foreground transition-colors">
                  作品
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  プロフィール
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  お問い合わせ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Art Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
