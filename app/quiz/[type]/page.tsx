import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { FileText } from "lucide-react"

const quizData: Record<string, { title: string; folder: string; count: number }> = {
  private: {
    title: "أسئلة التؤوريا خصوصي",
    folder: "private-forms",
    count: 29,
  },
  heavy: {
    title: "أسئلة التؤوريا شحن خفيف",
    folder: "heavy-forms",
    count: 29,
  },
  public: {
    title: "أسئلة التؤوريا عمومي",
    folder: "public-forms",
    count: 32,
  },
}

export async function generateStaticParams() {
  return Object.keys(quizData).map((type) => ({
    type,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>
}): Promise<Metadata> {
  const { type } = await params
  const quiz = quizData[type]
  if (!quiz) return { title: "غير موجود" }

  return {
    title: `${quiz.title} | مدرسة أبو فخيدة لتعليم السياقة`,
    description: `تدرب على نماذج امتحان ${quiz.title}`,
  }
}

export default async function QuizTypePage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type } = await params
  const quiz = quizData[type]

  if (!quiz) {
    notFound()
  }

  const forms = Array.from({ length: quiz.count }, (_, i) => i + 1)

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav items={[{ label: "أسئلة التؤوريا", href: "/quiz" }, { label: quiz.title }]} />

      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">{quiz.title}</h1>
        <p className="text-muted-foreground">اختر نموذج الامتحان الذي تريد التدرب عليه</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {forms.map((num) => (
          <Link
            key={num}
            href={`/quiz/${type}/${num}`}
            className="group bg-card rounded-xl border border-border p-6 text-center shadow hover:shadow-lg transition-all hover:-translate-y-1 hover:border-primary"
          >
            <div className="inline-flex p-3 bg-muted rounded-full mb-3 group-hover:bg-primary/10 transition-colors">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="font-bold text-lg mb-1">نموذج {num}</div>
            <div className="text-xs text-muted-foreground">30 سؤال</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
