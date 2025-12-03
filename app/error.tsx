"use client"

import Link from "next/link"
import { AlertTriangle, Home, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex p-4 bg-destructive/10 rounded-full mb-6">
          <AlertTriangle className="w-12 h-12 text-destructive" />
        </div>
        <h1 className="text-3xl font-bold mb-4">حدث خطأ</h1>
        <p className="text-muted-foreground mb-8">عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={reset} variant="default">
            <RotateCcw className="w-4 h-4 ml-2" />
            حاول مرة أخرى
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="w-4 h-4 ml-2" />
              الصفحة الرئيسية
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
