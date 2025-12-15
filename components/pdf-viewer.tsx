"use client"

import { useState, useRef } from "react"
import {
  ZoomIn,
  ZoomOut,
  Maximize,
  AlertCircle,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface PdfViewerProps {
  url: string
  title: string
}

export function PdfViewer({ url, title }: PdfViewerProps) {
  const [error, setError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleFullscreen = () => {
    if (!containerRef.current) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      containerRef.current.requestFullscreen?.()
    }
  }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted">
        <h2 className="font-bold">{title}</h2>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" disabled>
            <ZoomIn className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" disabled>
            <ZoomOut className="w-5 h-5" />
          </Button>

          {/* Fullscreen */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="ملء الشاشة"
            onClick={handleFullscreen}
          >
            <Maximize className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <a href={url} download title="تحميل">
              <Download className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>

      {/* PDF Container */}
      <div
        ref={containerRef}
        className="w-full bg-muted relative"
        style={{
          height: "clamp(50vh, 70vh, 80vh)",
          minHeight: "400px",
        }}
      >
        {!error ? (
          <object
            data={`${url}#zoom=85&toolbar=0&navpanes=0`}
            type="application/pdf"
            width="100%"
            height="100%"
            onError={() => setError(true)}
          >
            {/* Android / unsupported fallback */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center p-6">
              <AlertCircle className="w-12 h-12 text-muted-foreground" />
              <p className="text-muted-foreground leading-relaxed">
                على أجهزة Android يتم فتح ملفات PDF في تطبيق خارجي
                للحصول على أفضل تجربة
              </p>
              <div className="flex gap-3">
                <Button asChild size="lg">
                  <a href={url} target="_blank" rel="noopener">
                    فتح الكتاب
                  </a>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <a href={url} download>
                    تحميل
                  </a>
                </Button>
              </div>
            </div>
          </object>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <AlertCircle className="w-12 h-12 text-destructive" />
            <p className="text-muted-foreground">
              تعذر عرض الملف داخل الصفحة
            </p>
            <Button asChild size="lg">
              <a href={url} download>
                تحميل الكتاب
              </a>
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Hint */}
      <div className="p-4 bg-muted text-center text-sm text-muted-foreground md:hidden">
        📱 على الهاتف، يُفضل فتح أو تحميل الملف لقراءة أفضل
      </div>
    </div>
  )
}
