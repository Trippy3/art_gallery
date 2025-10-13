import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function AboutMePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">私について</h1>
              <p className="text-lg text-muted-foreground">About Me</p>
            </section>

            {/* Profile Section */}
            <section className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <Image src="/artist-portrait-photo.jpg" alt="Artist Profile" fill className="object-cover" />
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Aviary</h2>
                <p className="text-muted-foreground leading-relaxed">
                  デジタルアートとビジュアルデザインを専門とするアーティストです。
                  自然と都市の融合、抽象的な形と色彩の探求をテーマに作品を制作しています。
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  2021年から本格的にデジタルアート制作を開始し、
                  独自のスタイルを追求しながら、様々な表現方法に挑戦しています。
                </p>
              </div>
            </section>

            {/* Philosophy Section */}
            <section className="space-y-6 py-8">
              <h2 className="text-3xl font-semibold text-foreground text-center">制作理念</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg bg-card border border-border space-y-3">
                  <h3 className="text-xl font-medium text-foreground">自然との対話</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    自然の有機的な形や色彩からインスピレーションを得て、 デジタルの世界で新しい表現を探求しています。
                  </p>
                </div>

                <div className="p-6 rounded-lg bg-card border border-border space-y-3">
                  <h3 className="text-xl font-medium text-foreground">抽象と具象の融合</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    抽象的な形と具体的なモチーフを組み合わせることで、
                    見る人それぞれの解釈を生み出す作品を目指しています。
                  </p>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section className="space-y-6 py-8">
              <h2 className="text-3xl font-semibold text-foreground text-center">スキル</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  "デジタルペインティング",
                  "3Dモデリング",
                  "コンセプトアート",
                  "カラーグレーディング",
                  "コンポジション",
                  "ビジュアルデザイン",
                ].map((skill) => (
                  <div key={skill} className="p-4 text-center rounded-lg bg-secondary text-secondary-foreground">
                    {skill}
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Section */}
            <section className="space-y-6 py-8 text-center">
              <h2 className="text-3xl font-semibold text-foreground">お問い合わせ</h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                作品に関するお問い合わせやコラボレーションのご相談は、 お気軽にご連絡ください。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:contact@example.com"
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  メールで連絡
                </a>
                <a
                  href="#"
                  className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors"
                >
                  SNSをフォロー
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
