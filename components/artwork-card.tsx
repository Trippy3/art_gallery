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
        opacity: cardProgress,
        transform: `scale(${0.8 + cardProgress * 0.2})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative w-full h-full">
        <Image
          src={artwork.image || "/placeholder.svg"}
          alt={artwork.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay - shown when focused or hovered */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent transition-opacity duration-500 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Content - slides up when focused or hovered */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${
            showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-medium text-foreground mb-2 text-balance">
            {artwork.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {artwork.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {artwork.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Details button */}
          <Link
            href={`/artwork/${artwork.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm">
              詳細を見る
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
