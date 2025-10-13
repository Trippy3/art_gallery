"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface Artwork {
  id: number
  title: string
  year: string
  description: string
  image: string
  tags: string[]
}

interface ArtworkCardProps {
  artwork: Artwork
  index: number
  scrollProgress: number
}

export function ArtworkCard({ artwork, index, scrollProgress }: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Calculate individual card progress for staggered animations
  const cardProgress = Math.max(0, Math.min(1, scrollProgress * 8 - index * 0.8))

  return (
    <Card
      className="relative flex-shrink-0 w-[280px] sm:w-[350px] md:w-[400px] h-[400px] sm:h-[500px] md:h-[550px] overflow-hidden group cursor-pointer transition-all duration-500"
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

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0 md:opacity-100"
          }`}
        />

        {/* Content */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-6 transition-transform duration-500 ${
            isHovered ? "translate-y-0" : "translate-y-4 md:translate-y-0"
          }`}
        >
          {/* Year badge */}
          <div className="inline-block px-3 py-1 mb-3 text-xs font-mono bg-accent text-accent-foreground rounded-full">
            {artwork.year}
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-medium text-foreground mb-2 text-balance">{artwork.title}</h3>

          {/* Description */}
          <p
            className={`text-sm text-muted-foreground mb-4 leading-relaxed transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0 md:opacity-100"
            }`}
          >
            {artwork.description}
          </p>

          {/* Tags */}
          <div
            className={`flex flex-wrap gap-2 mb-4 transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0 md:opacity-100"
            }`}
          >
            {artwork.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded">
                {tag}
              </span>
            ))}
          </div>

          {/* View Details button */}
          <Link href={`/artwork/${artwork.id}`} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="sm"
              className={`transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0 md:opacity-100"}`}
            >
              詳細を見る
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
