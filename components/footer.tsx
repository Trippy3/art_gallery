export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Aviary's Art Gallery</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              これまでに制作した
              <br />
              アートワークを紹介します
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">コンタクト</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://bento.me/hiro-torii"
                  className="hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Profile Page
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/hirot_san"
                  className="hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X (Twitter)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">リンク</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/Trippy3/art_gallery"
                  className="hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} hiro-torii. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
