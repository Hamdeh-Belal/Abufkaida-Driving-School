"use client"

import { useState, useRef } from "react"
import { ZoomIn, ZoomOut, Maximize, AlertCircle, Download } from "lucide-react"
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
        <div className="flex items-center gap-2">
          {!error && (
            <>
              <Button variant="ghost" size="icon" aria-label="تكبير" disabled>
                <ZoomIn className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="تصغير" disabled>
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
            </>
          )}
          <Button variant="ghost" size="icon" asChild>
            <a href={url} download title="تحميل">
              <Download className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>

      {/* PDF Frame */}
      <div 
        className="relative w-full bg-muted overflow-auto"
        style={{ 
          height: "clamp(50vh, 70vh, 80vh)",
          minHeight: "400px"
        }}
      >
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
            <div className="text-center p-4">
              <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">لم يتمكن من تحميل الكتاب</h3>
              <p className="text-muted-foreground mb-4">
                الملف غير متوفر حالياً أو يتطلب متصفح أحدث.
              </p>
              <Button asChild size="lg">
                <a href={url} download>
                  تحميل الكتاب
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-muted">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={`${url}#toolbar=1&navpanes=0&view=fitH`}
              className="w-full h-full"
              title={title}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              style={{ border: "none", display: loading ? "none" : "block" }}
              allowFullScreen
            />
          </>
        )}
      </div>

      {/* Mobile Download Hint */}
      <div className="p-4 bg-muted text-center text-sm text-muted-foreground md:hidden">
        اضغط على أيقونة التحميل للحصول على تجربة أفضل
      </div>
    </div>
  )
}
