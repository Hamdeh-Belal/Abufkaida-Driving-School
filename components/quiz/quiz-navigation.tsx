"use client"

import { cn } from "@/lib/utils"

interface Choice {
  text: string
  images: { path: string; id: string }[]
  isCorrectResult: boolean
}

interface Question {
  text: string
  questionNum: number
  choices: Choice[]
}

interface QuizNavigationProps {
  totalQuestions: number
  currentQuestion: number
  answers: Record<number, number>
  checkedQuestions: Set<number>
  isFinished: boolean
  questions: Question[]
  onNavigate: (index: number) => void
}

export function QuizNavigation({
  totalQuestions,
  currentQuestion,
  answers,
  checkedQuestions,
  isFinished,
  questions,
  onNavigate,
}: QuizNavigationProps) {
  const getQuestionStatus = (index: number) => {
    const isAnswered = answers[index] !== undefined
    const isChecked = checkedQuestions.has(index)
    const isCurrent = index === currentQuestion

    if (isFinished && isAnswered) {
      const isCorrect = questions[index]?.choices[answers[index]]?.isCorrectResult
      return isCorrect ? "correct" : "incorrect"
    }

    if (isChecked) {
      const isCorrect = questions[index]?.choices[answers[index]]?.isCorrectResult
      return isCorrect ? "correct" : "incorrect"
    }

    if (isCurrent) return "current"
    if (isAnswered) return "answered"
    return "unanswered"
  }

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <h3 className="font-bold mb-3 text-center">تنقل بين الأسئلة</h3>
      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const status = getQuestionStatus(i)

          return (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className={cn(
                "w-full aspect-square rounded-lg font-bold text-sm transition-all",
                status === "current" && "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2",
                status === "answered" && "bg-secondary/50 text-secondary-foreground",
                status === "correct" && "bg-success text-white",
                status === "incorrect" && "bg-error text-white",
                status === "unanswered" && "bg-muted hover:bg-muted/80",
              )}
              aria-label={`السؤال ${i + 1}`}
            >
              {i + 1}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted" />
          <span>غير مجاب</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-secondary/50" />
          <span>تم الإجابة</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success" />
          <span>صحيح</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-error" />
          <span>خاطئ</span>
        </div>
      </div>
    </div>
  )
}
