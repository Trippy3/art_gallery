"use client";

import { useEffect, useRef, useState } from "react";
import { ArtworkCard } from "./artwork-card";
import { artworks } from "@/lib/data/artworks";

export function HorizontalScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const reversedArtworks = [...artworks].reverse();

  useEffect(() => {
    const container = containerRef.current;
    const scrollContent = scrollRef.current;
    if (!container || !scrollContent) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrollStart = containerTop - windowHeight;
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
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerHeight =
    typeof window !== "undefined"
      ? scrollRef.current
        ? scrollRef.current.scrollWidth -
          window.innerWidth +
          window.innerHeight * 1.5
        : 4000
      : 4000;

  const years = Array.from(new Set(artworks.map((a) => a.year))).sort();

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
