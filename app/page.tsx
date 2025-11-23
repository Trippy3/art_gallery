import type { Metadata } from "next"
import { HorizontalScrollGallery } from "@/components/horizontal-scroll-gallery"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import { artworks } from "@/lib/data/artworks"

// 最新の作品を取得（yearで降順ソート）
const latestArtwork = [...artworks].sort((a, b) =>
  b.year.localeCompare(a.year)
)[0]

export const metadata: Metadata = {
  title: "Aviary's Art Gallery",
  description: "これまでに制作したアートワークを紹介します",
  openGraph: {
    title: "Aviary's Art Gallery",
    description: "これまでに制作したアートワークを紹介します",
    type: "website",
    images: [
      {
        url: latestArtwork.image,
        alt: latestArtwork.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aviary's Art Gallery",
    description: "これまでに制作したアートワークを紹介します",
    images: [latestArtwork.image],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <HorizontalScrollGallery />
      <Footer />
    </main>
  )
}
