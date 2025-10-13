import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

const artworks = [
  {
    id: 1,
    title: "デジタルランドスケープ",
    year: "2021",
    description: "抽象的な風景をデジタルで表現",
    image: "/abstract-digital-landscape-art.jpg",
    tags: ["デジタル", "風景", "抽象"],
    fullDescription:
      "このデジタルアート作品は、自然の風景を抽象的な形で再解釈したものです。色彩の層を重ねることで、見る者に深い感情的な体験を提供します。デジタルツールを使用することで、従来の絵画では表現できない独特の質感と光の効果を実現しました。",
    medium: "デジタルアート",
    dimensions: "3000 x 2000 px",
  },
  {
    id: 2,
    title: "アーバンリズム",
    year: "2021",
    description: "都市の鼓動を視覚化",
    image: "/urban-rhythm-geometric-art.jpg",
    tags: ["都市", "幾何学", "リズム"],
    fullDescription:
      "都市の持つエネルギーとリズムを幾何学的なパターンで表現した作品です。建築物の直線と曲線、光と影のコントラストが織りなす都市の美しさを捉えています。現代都市の複雑さと秩序を同時に感じられる構成になっています。",
    medium: "デジタルアート",
    dimensions: "2500 x 3500 px",
  },
  {
    id: 3,
    title: "オーガニックフォーム",
    year: "2022",
    description: "自然の形態からインスピレーション",
    image: "/organic-forms-nature-inspired-art.jpg",
    tags: ["自然", "有機的", "フォーム"],
    fullDescription:
      "自然界に存在する有機的な形態からインスピレーションを得た作品です。植物の成長パターンや水の流れなど、自然の持つ美しい曲線を抽象化して表現しています。柔らかな色彩と流動的なフォルムが調和した作品です。",
    medium: "ミックスメディア",
    dimensions: "4000 x 3000 px",
  },
  {
    id: 4,
    title: "カラーハーモニー",
    year: "2022",
    description: "色彩の調和を探求",
    image: "/color-harmony-abstract-art.jpg",
    tags: ["色彩", "調和", "抽象"],
    fullDescription:
      "色彩理論に基づいた調和のとれた配色を探求した抽象作品です。補色や類似色の関係性を視覚的に表現し、見る者に心地よい視覚体験を提供します。色彩が持つ感情的な力を最大限に引き出すことを目指しました。",
    medium: "デジタルアート",
    dimensions: "3500 x 2500 px",
  },
  {
    id: 5,
    title: "テクスチャーレイヤー",
    year: "2023",
    description: "質感の重なりを表現",
    image: "/texture-layers-mixed-media-art.jpg",
    tags: ["テクスチャ", "レイヤー", "ミックス"],
    fullDescription:
      "異なる質感を持つ素材を重ね合わせることで、深みのある視覚体験を創出した作品です。デジタルとアナログの技法を組み合わせ、触覚的な要素を視覚的に表現しています。層の重なりが生み出す複雑な表情が特徴です。",
    medium: "ミックスメディア",
    dimensions: "3000 x 4000 px",
  },
  {
    id: 6,
    title: "ライトアンドシャドウ",
    year: "2023",
    description: "光と影の対比",
    image: "/light-and-shadow-contrast-art.jpg",
    tags: ["光", "影", "対比"],
    fullDescription:
      "光と影の劇的な対比を通じて、空間の深さと立体感を表現した作品です。明暗のコントラストが生み出すドラマチックな効果により、見る者の視線を引き込みます。光の持つ力強さと影の持つ神秘性を同時に感じられる構成です。",
    medium: "デジタルアート",
    dimensions: "2800 x 3800 px",
  },
  {
    id: 7,
    title: "フルイドモーション",
    year: "2024",
    description: "流動的な動きを捉える",
    image: "/fluid-motion-abstract-art.jpg",
    tags: ["流動", "動き", "ダイナミック"],
    fullDescription:
      "流体の動きをデジタルで再現し、その美しさと力強さを表現した作品です。水や空気の流れが持つ自然な美しさを、鮮やかな色彩とダイナミックな構図で捉えています。静止画でありながら動きを感じさせる表現を追求しました。",
    medium: "デジタルアート",
    dimensions: "4500 x 3000 px",
  },
  {
    id: 8,
    title: "ミニマルスペース",
    year: "2024",
    description: "ミニマリズムの美学",
    image: "/minimal-space-contemporary-art.jpg",
    tags: ["ミニマル", "空間", "シンプル"],
    fullDescription:
      "ミニマリズムの哲学に基づき、余白と要素の配置を慎重に考慮した作品です。少ない要素で最大限の表現を目指し、シンプルさの中に深い意味を込めています。静寂と調和を感じられる空間を創出しました。",
    medium: "デジタルアート",
    dimensions: "3000 x 3000 px",
  },
]

export default function ArtworkDetailPage({ params }: { params: { id: string } }) {
  const artwork = artworks.find((a) => a.id === Number.parseInt(params.id))

  if (!artwork) {
    notFound()
  }

  return (
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
              <Image src={artwork.image || "/placeholder.svg"} alt={artwork.title} fill className="object-cover" />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center space-y-6">
              {/* Year badge */}
              <div className="inline-block w-fit px-3 py-1 text-xs font-mono bg-accent text-accent-foreground rounded-full">
                {artwork.year}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-medium text-foreground text-balance">{artwork.title}</h1>

              {/* Short description */}
              <p className="text-lg text-muted-foreground leading-relaxed">{artwork.description}</p>

              {/* Full description */}
              <div className="pt-4 border-t border-border">
                <h2 className="text-sm font-medium text-foreground mb-3">作品について</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{artwork.fullDescription}</p>
              </div>

              {/* Specifications */}
              <div className="pt-4 border-t border-border space-y-3">
                <h2 className="text-sm font-medium text-foreground mb-3">作品情報</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">制作年</p>
                    <p className="text-foreground font-medium">{artwork.year}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">メディウム</p>
                    <p className="text-foreground font-medium">{artwork.medium}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground mb-1">サイズ</p>
                    <p className="text-foreground font-medium">{artwork.dimensions}</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-border">
                <h2 className="text-sm font-medium text-foreground mb-3">タグ</h2>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
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
  )
}
