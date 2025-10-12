export function Hero() {
  return (
    <section className="pt-32 pb-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <p className="text-sm text-muted-foreground mb-4">ようこそ！</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-6 leading-relaxed text-balance">
          これまでに制作した
          <br />
          アートワークを紹介します
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
          各作品は時系列に沿って配置されています。スクロールで作品の変遷を辿ってください。
        </p>
      </div>
    </section>
  );
}
