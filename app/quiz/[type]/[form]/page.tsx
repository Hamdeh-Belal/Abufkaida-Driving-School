import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { QuizClient } from "@/components/quiz/quiz-client"

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
  const params: Array<{ type: string; form: string }> = []
  
  Object.entries(quizData).forEach(([type, data]) => {
    for (let i = 1; i <= data.count; i++) {
      params.push({
        type,
        form: String(i),
      })
    }
  })
  
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; form: string }>
}): Promise<Metadata> {
  const { type, form } = await params
  const quiz = quizData[type]
  if (!quiz) return { title: "غير موجود" }

  return {
    title: `نموذج ${form} - ${quiz.title} | مدرسة أبو فخيدة`,
    description: `امتحان تدريبي - نموذج ${form} من ${quiz.title}`,
  }
}

export default async function QuizFormPage({
  params,
}: {
  params: Promise<{ type: string; form: string }>
}) {
  const { type, form } = await params
  const quiz = quizData[type]
  const formNum = Number.parseInt(form)

  if (!quiz || isNaN(formNum) || formNum < 1 || formNum > quiz.count) {
    notFound()
  }

  return <QuizClient type={type} formNum={formNum} folder={quiz.folder} title={quiz.title} totalForms={quiz.count} />
}
