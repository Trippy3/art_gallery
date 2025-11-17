import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { artworks } from "@/lib/data/artworks";
import { ArrowLeft } from "lucide-react";

export default async function ArtworkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artwork = artworks.find((a) => a.id === Number.parseInt(id));

  if (!artwork) {
    notFound();
  }

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
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-secondary">
                <Image
                  src={artwork.image || "/placeholder.svg"}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                />
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
    </>
  );
}
