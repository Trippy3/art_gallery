import { HorizontalScrollGallery } from "@/components/horizontal-scroll-gallery"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"

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
