"use client"

import { useState, useRef } from "react"
import { ZoomIn, ZoomOut, Maximize, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PdfViewerProps {
  url: string
  title: string
}

export function PdfViewer({ url, title }: PdfViewerProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleIframeError = () => {
    setError(true)
    setLoading(false)
  }

  const handleIframeLoad = () => {
    setLoading(false)
    setError(false)
  }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted">
        <h2 className="font-bold">{title}</h2>
        {!error && (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="تكبير">
              <ZoomIn className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="تصغير">
              <ZoomOut className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="ملء الشاشة"
              onClick={() => {
                iframeRef.current?.requestFullscreen()
              }}
            >
              <Maximize className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      {/* PDF Frame */}
      <div className="relative aspect-[3/4] lg:aspect-[4/3] bg-muted overflow-y-auto lg:overflow-hidden max-h-[70vh] lg:max-h-none">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">لم يتمكن من تحميل الكتاب</h3>
              <p className="text-muted-foreground mb-4">
                الملف غير متوفر حالياً. يمكنك تحميل النسخة من الزر أعلاه.
              </p>
              <Button asChild>
                <a href={url} download>
                  تحميل الكتاب
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={`${url}#toolbar=1&navpanes=1&scrollbar=1`}
              className="w-full h-full"
              title={title}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              style={{ border: "none" }}
            />
          </>
        )}
      </div>

      {/* Mobile Message */}
      {!error && (
        <div className="p-4 bg-muted text-center text-sm text-muted-foreground lg:hidden">
          للحصول على تجربة أفضل، يمكنك تحميل الكتاب ومشاهدته على جهازك
        </div>
      )}
    </div>
  )
}
