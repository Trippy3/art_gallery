"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { ArtworkCard } from "./artwork-card";
import { artworks } from "@/lib/data/artworks";

export function HorizontalScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const isScrollingToYear = useRef(false);

  // メモ化して再レンダリング時に同じ参照を維持
  const reversedArtworks = useMemo(() => [...artworks].reverse(), []);
  const totalArtworks = artworks.length;

  // Initialize cardRefs array
  if (cardRefs.current.length !== totalArtworks) {
    cardRefs.current = Array(totalArtworks).fill(null);
  }

  // Calculate which card is closest to the screen center
  const calculateFocusedIndex = useCallback(() => {
    const screenCenter = window.innerWidth / 2;
    let minDistance = Infinity;
    let closestIndex = -1;

    cardRefs.current.forEach((cardRef, index) => {
      if (cardRef) {
        const rect = cardRef.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - screenCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      }
    });

    return closestIndex;
  }, []);

  // 指定年にスクロールする関数
  const scrollToYear = useCallback((year: number, retryCount = 0) => {
    const container = containerRef.current;
    const scrollContent = scrollRef.current;

    // refsが準備できていない場合はリトライ
    if (!container || !scrollContent) {
      if (retryCount < 5) {
        setTimeout(() => scrollToYear(year, retryCount + 1), 100);
      }
      return;
    }

    // 指定年の最初の作品（その年の最新月）を見つける
    // artworksのyearは "2024-03" のような形式なので startsWith で検索
    const targetIndex = reversedArtworks.findIndex(
      (a) => a.year.startsWith(year.toString())
    );
    if (targetIndex === -1) return;

    const targetElement = cardRefs.current[targetIndex];

    // cardRefが準備できていない場合はリトライ
    if (!targetElement) {
      if (retryCount < 5) {
        setTimeout(() => scrollToYear(year, retryCount + 1), 100);
      }
      return;
    }

    // スクロール計算に必要な値
    const maxScroll = scrollContent.scrollWidth - window.innerWidth;
    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight;
    // scrollStartが負にならないようにして、ページトップでprogress=0を保証
    const scrollStart = Math.max(0, containerTop - window.innerHeight);
    const scrollEnd = containerTop + containerHeight - window.innerHeight;
    const scrollRange = scrollEnd - scrollStart;

    // カードの位置を取得（getBoundingClientRectは変換後の位置を返すが、
    // 親子関係にあるため差分を取ると自然な相対位置が得られる）
    const scrollContentRect = scrollContent.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    // scrollContent 座標系でのカードの相対位置
    const cardLeftInContent = targetRect.left - scrollContentRect.left;
    const cardCenterInContent = cardLeftInContent + targetRect.width / 2;

    // カードを画面中央に配置するための targetProgress を計算
    const targetProgress = Math.max(
      0,
      Math.min(1, (cardCenterInContent - window.innerWidth / 2) / maxScroll)
    );

    // progress から scrollY を計算
    const targetScrollY = scrollStart + targetProgress * scrollRange;

    // スクロール実行
    isScrollingToYear.current = true;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });

    // スクロール完了後にフラグをリセット
    setTimeout(() => {
      isScrollingToYear.current = false;
      // ハッシュをクリア（履歴を汚さない）
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }, 1000);
  }, [reversedArtworks]);

  // ハッシュ変更を監視してスクロール
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#year-")) {
        const year = parseInt(hash.replace("#year-", ""), 10);
        if (!isNaN(year)) {
          // DOMの準備を待ってからスクロール
          setTimeout(() => {
            scrollToYear(year);
          }, 100);
        }
      }
    };

    // 初回マウント時にハッシュをチェック
    handleHashChange();

    // hashchange イベントを監視
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [scrollToYear]);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContent = scrollRef.current;
    if (!container || !scrollContent) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // scrollStartが負にならないようにして、ページトップでprogress=0を保証
      const scrollStart = Math.max(0, containerTop - windowHeight);
      const scrollEnd = containerTop + containerHeight - windowHeight;
      const scrollRange = scrollEnd - scrollStart;

      const progress = Math.max(
        0,
        Math.min(1, (scrollTop - scrollStart) / scrollRange),
      );

      setScrollProgress(progress);

      // Apply horizontal transform
      const maxScroll = scrollContent.scrollWidth - window.innerWidth;
      const translateX = -progress * maxScroll;

      scrollContent.style.transform = `translateX(${translateX}px)`;

      // Update focused index based on viewport center
      const newFocusedIndex = calculateFocusedIndex();
      setFocusedIndex(newFocusedIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [calculateFocusedIndex]);

  const containerHeight =
    typeof window !== "undefined"
      ? scrollRef.current
        ? scrollRef.current.scrollWidth -
          window.innerWidth +
          window.innerHeight * 1.5
        : 4000
      : 4000;

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative"
      style={{ height: `${containerHeight}px` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Timeline indicator */}
        <div className="absolute top-24 left-4 sm:left-8 z-10">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground font-mono">
              History
            </span>
            <div className="w-32 h-1 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        {scrollProgress < 0.1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <p className="text-xs text-muted-foreground">
              スクロールして作品を見る →
            </p>
          </div>
        )}

        <div
          ref={scrollRef}
          className="absolute top-0 left-0 h-screen flex flex-col justify-center will-change-transform"
          style={{ paddingLeft: "100vw", paddingRight: "100vw" }}
        >
          <div className="relative flex items-center gap-8 sm:gap-12 md:gap-16">
            <div className="absolute top-1/2 left-[-20vw] right-[-20vw] h-0.5 bg-accent/30 -translate-y-1/2 z-0" />

            {reversedArtworks.map((artwork, index) => {
              const isAbove = index % 2 === 0;

              return (
                <div
                  key={artwork.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  id={`year-${artwork.year}`}
                  className="relative flex-shrink-0 flex flex-col items-center gap-4"
                >
                  <div className="relative z-10 flex flex-col items-center">
                    {isAbove && (
                      <div className="mb-4">
                        <ArtworkCard
                          artwork={artwork}
                          index={index}
                          scrollProgress={scrollProgress}
                          totalArtworks={totalArtworks}
                          isFocused={index === focusedIndex}
                        />
                      </div>
                    )}

                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-accent border-4 border-background shadow-lg" />
                      <div className="mt-2 px-3 py-1 text-xs font-mono font-medium bg-accent text-accent-foreground rounded-full">
                        {artwork.year}
                      </div>
                    </div>

                    {!isAbove && (
                      <div className="mt-4">
                        <ArtworkCard
                          artwork={artwork}
                          index={index}
                          scrollProgress={scrollProgress}
                          totalArtworks={totalArtworks}
                          isFocused={index === focusedIndex}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
