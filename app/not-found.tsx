import Link from "next/link"
import { Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-primary mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">الصفحة غير موجودة</h1>
        <p className="text-muted-foreground mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 ml-2" />
              الصفحة الرئيسية
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/quiz">
              <Search className="w-4 h-4 ml-2" />
              أسئلة التؤوريا
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
