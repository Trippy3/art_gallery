import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-6xl font-medium text-foreground">404</h1>
        <p className="text-xl text-muted-foreground">作品が見つかりませんでした</p>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            ギャラリーに戻る
          </Button>
        </Link>
      </div>
    </main>
  )
}
