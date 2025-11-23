"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { ArrowLeft, X, ZoomIn } from "lucide-react";
import type { Artwork } from "@/lib/data/artworks";

type Props = {
  artwork: Artwork;
};

export function ArtworkDetailClient({ artwork }: Props) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Determine aspect ratio based on orientation
  const aspectRatioClass =
    artwork.orientation === "landscape"
      ? "aspect-[4/3]" // 横長: 4:3
      : "aspect-[3/4]"; // 縦長: 3:4 (デフォルト)

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen]);

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  ギャラリーに戻る
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Image */}
              <div
                className={`relative ${aspectRatioClass} rounded-lg overflow-hidden bg-secondary cursor-pointer`}
                onClick={() => setIsLightboxOpen(true)}
              >
                <Image
                  src={artwork.image || "/placeholder.svg"}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                />
                {/* Zoom icon box */}
                <div className="absolute bottom-3 right-3 p-2 bg-background/80 hover:bg-background rounded-lg backdrop-blur-sm transition-colors shadow-lg">
                  <ZoomIn className="h-5 w-5 text-foreground" />
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center space-y-6">
                {/* Year badge */}
                <div className="inline-block w-fit px-3 py-1 text-xs font-mono bg-accent text-accent-foreground rounded-full">
                  {artwork.year}
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl font-medium text-foreground text-balance">
                  {artwork.title}
                </h1>

                {/* Short description */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {artwork.description}
                </p>

                {/* Full description */}
                <div className="pt-4 border-t border-border">
                  <h2 className="text-sm font-medium text-foreground mb-3">
                    作品について
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {artwork.fullDescription}
                  </p>
                </div>

                {/* Specifications */}
                <div className="pt-4 border-t border-border space-y-3">
                  <h2 className="text-sm font-medium text-foreground mb-3">
                    作品情報
                  </h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">制作年</p>
                      <p className="text-foreground font-medium">
                        {artwork.year}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">技法・材質</p>
                      <p className="text-foreground font-medium">
                        {artwork.medium}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground mb-1">サイズ</p>
                      <p className="text-foreground font-medium">
                        {artwork.dimensions}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="pt-4 border-t border-border">
                  <h2 className="text-sm font-medium text-foreground mb-3">
                    タグ
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {artwork.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="閉じる"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Image container */}
          <div
            className="relative max-w-[90vw] max-h-[90vh] w-fit h-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={artwork.image || "/placeholder.svg"}
              alt={artwork.title}
              width={2000}
              height={2000}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
              quality={100}
            />
          </div>

          {/* Image info */}
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <p className="text-white text-sm font-medium drop-shadow-lg">
              {artwork.title} ({artwork.year})
            </p>
          </div>
        </div>
      )}
    </>
  );
}
