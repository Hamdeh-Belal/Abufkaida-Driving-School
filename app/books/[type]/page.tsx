import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { PdfViewer } from "@/components/pdf-viewer"
import { Download, TrafficCone } from "lucide-react"
import { Button } from "@/components/ui/button"

const bookData: Record<string, { title: string; pdf: string; description: string }> = {
  private: {
    title: "كتاب تيؤوريا الخصوصي",
    pdf: "/pdf/private-book.pdf",
    description: "كتاب التؤوريا الشامل للخصوصي",
  },
  heavy: {
    title: "كتاب تيؤوريا الشحن",
    pdf: "/pdf/heavy-book.pdf",
    description: "كتاب التؤوريا للشحن الخفيف",
  },
}

export async function generateStaticParams() {
  return Object.keys(bookData).map((type) => ({
    type,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>
}): Promise<Metadata> {
  const { type } = await params
  const book = bookData[type]
  if (!book) return { title: "كتاب غير موجود" }

  return {
    title: `${book.title} | مدرسة أبو فخيدة لتعليم السياقة`,
    description: book.description,
  }
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type } = await params
  const book = bookData[type]

  if (!book) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav items={[{ label: "كتب التؤوريا", href: "/books" }, { label: book.title }]} />

      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">{book.title}</h1>
        <p className="text-muted-foreground">{book.description}</p>
      </div>

      {/* Action Buttons - At the top */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Button asChild size="lg">
          <a href={book.pdf} download>
            <Download className="w-5 h-5 ml-2" />
            تحميل الكتاب PDF
          </a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/traffic-signs">
            <TrafficCone className="w-5 h-5 ml-2" />
            اذهب إلى إشارات المرور
          </Link>
        </Button>
      </div>

      {/* PDF Viewer */}
      <PdfViewer url={book.pdf} title={book.title} />
    </div>
  )
}
