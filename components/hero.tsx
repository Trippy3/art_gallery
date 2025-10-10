export function Hero() {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <p className="text-sm text-muted-foreground mb-4">こんにちは</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-6 leading-relaxed text-balance">
          デジタルアートを通じて、
          <br />
          時間と空間を表現しています。
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
          各作品は時系列に沿って配置されており、横スクロールで作品の変遷をご覧いただけます。
        </p>
      </div>
    </section>
  )
}
