"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToYear = (year: number) => {
    const element = document.getElementById(`year-${year}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-lg font-medium text-foreground">
              Aviary's Art Gallery
            </h1>
          </div>

          {/* Menu Button - now visible on all screen sizes */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-foreground"
            aria-label="メニュー"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a
                href="#work"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                私について
              </a>

              <div className="pt-4 mt-4 border-t border-border">
                <p className="text-lg text-muted-foreground mb-3 font-medium">
                  History
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => scrollToYear(2024)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    2024年
                  </button>
                  <button
                    onClick={() => scrollToYear(2023)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    2023年
                  </button>
                  <button
                    onClick={() => scrollToYear(2022)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    2022年
                  </button>
                  <button
                    onClick={() => scrollToYear(2021)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    2021年
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
