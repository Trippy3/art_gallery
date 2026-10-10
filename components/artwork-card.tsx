"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Artwork } from "@/lib/data/artworks";

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
  scrollProgress: number;
  totalArtworks: number;
  isFocused?: boolean; // Whether this card is currently centered on screen
}

export function ArtworkCard({
  artwork,
  index,
  scrollProgress,
  totalArtworks,
  isFocused = false,
}: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Show content when focused (scroll-based) or hovered (PC fallback)
  const showContent = isFocused || isHovered;

  // Handle card click to navigate to detail page (opens in new tab)
  const handleCardClick = () => {
    window.open(`/artwork/${artwork.id}`, '_blank', 'noopener,noreferrer');
  };

  // Calculate individual card progress for staggered animations
  // Dynamic calculation based on total artworks count for future-proof scaling
  const staggerMultiplier = totalArtworks * 0.8; // Scale based on total count
  const delayPerCard = 0.5; // Reduced from 0.8 for smoother, earlier reveals

  const cardProgress = Math.max(
    0,
    Math.min(1, scrollProgress * staggerMultiplier - index * delayPerCard),
  );

  // Determine card dimensions based on orientation
  const isLandscape = artwork.orientation === "landscape";
  const sizeClasses = isLandscape
    ? "w-[400px] sm:w-[500px] md:w-[600px] h-[300px] sm:h-[380px] md:h-[450px]" // 横長
    : "w-[280px] sm:w-[350px] md:w-[400px] h-[400px] sm:h-[500px] md:h-[550px]"; // 縦長（デフォルト）

  return (
    <Card
      className={`relative flex-shrink-0 ${sizeClasses} overflow-hidden group cursor-pointer transition-all duration-500`}
      style={{
        // The focused card is always fully opaque: on small screens the
        // scroll-based fade-in is not finished when the first cards reach
        // the center, which would leave a whitish haze over the artwork.
        opacity: isFocused ? 1 : cardProgress,
        transform: `scale(${0.8 + cardProgress * 0.2})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative w-full h-full">
        <Image
          src={artwork.image || "/placeholder.svg"}
          alt={artwork.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Info overlay - shown when focused or hovered.
            Confined to the bottom of the card (content-sized, ~2/5 at most)
            so the artwork itself stays clearly visible, especially on mobile.
            Tags and the full description live on the detail page. */}
        <div
          data-testid="artwork-card-overlay"
          className={`absolute bottom-0 left-0 right-0 px-4 pt-5 pb-3 sm:px-5 sm:pt-8 sm:pb-4 bg-gradient-to-t from-background via-background/80 to-transparent transition-all duration-500 ${
            showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {/* Title */}
          <h3 className="text-base sm:text-xl font-medium text-foreground mb-2 md:mb-1 truncate">
            {artwork.title}
          </h3>

          {/* Description - one line, md+ only to keep the overlay short */}
          <p className="hidden md:block text-sm text-muted-foreground mb-2 truncate">
            {artwork.description}
          </p>

          {/* View Details button - opens in new tab */}
          <Link
            href={`/artwork/${artwork.id}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // Prevent card click when button is clicked
          >
            <Button variant="outline" size="sm" className="h-7 text-xs sm:h-8 sm:text-sm">
              詳細を見る
              <ExternalLink className="size-3.5 sm:ml-2 sm:size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
