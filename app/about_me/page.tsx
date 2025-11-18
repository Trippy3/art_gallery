import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";

export default function AboutMePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                私について
              </h1>
              <p className="text-lg text-muted-foreground">About Me</p>
            </section>

            {/* Profile Section */}
            <section className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src="/palette.jpg"
                  alt="Artist Profile"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  Torii
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  趣味で油絵を描いています。
                  美術展で西洋絵画を見るのも好きで、企画展はだいたい図録も買ってしまいます。
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  2021年頃から絵画教室に通っています。
                  元々デジタルで描いていたのですが教室に通い始めてからはアナログメインです。
                </p>
              </div>
            </section>

            {/* Philosophy Section */}
            <section className="space-y-6 py-8">
              <h2 className="text-3xl font-semibold text-foreground text-center">
                制作理念
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg bg-card border border-border space-y-3">
                  <h3 className="text-xl font-medium text-foreground">
                    自分にとっての美を見つける
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    絵画という創作だからこそ、自分が綺麗で美しいと思えるものだけを描いていたいと思っています。
                  </p>
                </div>

                <div className="p-6 rounded-lg bg-card border border-border space-y-3">
                  <h3 className="text-xl font-medium text-foreground">
                    表現の模索
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    油彩には多くの画材や材料が関わるので、たくさんの道具を試す中で表現を模索できればと考えています。
                  </p>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section className="space-y-6 py-8">
              <h2 className="text-3xl font-semibold text-foreground text-center">
                スキル
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {["油彩", "デッサン", "模写", "Webページ制作"].map((skill) => (
                  <div
                    key={skill}
                    className="p-4 text-center rounded-lg bg-secondary text-secondary-foreground"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
