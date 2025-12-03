"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { QuizTimer } from "./quiz-timer"
import { QuizNavigation } from "./quiz-navigation"
import { QuizQuestion } from "./quiz-question"
import { QuizResultModal } from "./quiz-result-modal"
import { QuizTimeoutModal } from "./quiz-timeout-modal"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Check, RotateCcw } from "lucide-react"

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

interface QuizData {
  formNum: number
  questions: Question[]
}

interface QuizClientProps {
  type: string
  formNum: number
  folder: string
  title: string
  totalForms: number
}

interface QuizState {
  currentQuestion: number
  answers: Record<number, number>
  checkedQuestions: Set<number>
  timeRemaining: number
  isFinished: boolean
  isReviewMode: boolean
}

const STORAGE_KEY_PREFIX = "quiz_state_"
const TOTAL_TIME = 40 * 60 // 40 minutes in seconds

export function QuizClient({ type, formNum, folder, title, totalForms }: QuizClientProps) {
  const router = useRouter()
  const storageKey = `${STORAGE_KEY_PREFIX}${type}_${formNum}`

  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    checkedQuestions: new Set(),
    timeRemaining: TOTAL_TIME,
    isFinished: false,
    isReviewMode: false,
  })
  const [showResultModal, setShowResultModal] = useState(false)
  const [showTimeoutModal, setShowTimeoutModal] = useState(false)
  const [score, setScore] = useState(0)

  // Load quiz data
  useEffect(() => {
    async function loadQuiz() {
      try {
        const response = await fetch(`/data/${folder}/form${formNum}.json`)
        if (!response.ok) throw new Error("Failed to load quiz data")
        const data = await response.json()
        setQuizData(data)
      } catch {
        setError("فشل تحميل بيانات الامتحان")
      } finally {
        setLoading(false)
      }
    }
    loadQuiz()
  }, [folder, formNum])

  // Load saved state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setState({
            ...parsed,
            checkedQuestions: new Set(parsed.checkedQuestions || []),
          })
        } catch {
          // Invalid saved state, use default
        }
      }
    }
  }, [storageKey])

  // Save state to localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && !state.isFinished) {
      const toSave = {
        ...state,
        checkedQuestions: Array.from(state.checkedQuestions),
      }
      localStorage.setItem(storageKey, JSON.stringify(toSave))
    }
  }, [state, storageKey])

  // Timer countdown
  useEffect(() => {
    if (state.isFinished || state.timeRemaining <= 0) return

    const timer = setInterval(() => {
      setState((prev) => {
        const newTime = prev.timeRemaining - 1
        if (newTime <= 0) {
          setShowTimeoutModal(true)
          return { ...prev, timeRemaining: 0 }
        }
        return { ...prev, timeRemaining: newTime }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [state.isFinished, state.timeRemaining])

  const handleSelectAnswer = useCallback((answerIndex: number) => {
    setState((prev) => {
      if (prev.checkedQuestions.has(prev.currentQuestion) || prev.isFinished) {
        return prev
      }
      return {
        ...prev,
        answers: { ...prev.answers, [prev.currentQuestion]: answerIndex },
      }
    })
  }, [])

  const handleCheckAnswer = useCallback(() => {
    setState((prev) => {
      if (prev.answers[prev.currentQuestion] === undefined) return prev
      const newChecked = new Set(prev.checkedQuestions)
      newChecked.add(prev.currentQuestion)
      return { ...prev, checkedQuestions: newChecked }
    })
  }, [])

  const handleNavigate = useCallback((questionIndex: number) => {
    setState((prev) => ({ ...prev, currentQuestion: questionIndex }))
  }, [])

  const handlePrev = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentQuestion: Math.max(0, prev.currentQuestion - 1),
    }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleNext = useCallback(() => {
    if (!quizData) return
    setState((prev) => ({
      ...prev,
      currentQuestion: Math.min(quizData.questions.length - 1, prev.currentQuestion + 1),
    }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [quizData])

  const calculateScore = useCallback(() => {
    if (!quizData) return 0
    let correct = 0
    quizData.questions.forEach((q, idx) => {
      const selectedAnswer = state.answers[idx]
      if (selectedAnswer !== undefined && q.choices[selectedAnswer]?.isCorrectResult) {
        correct++
      }
    })
    return correct
  }, [quizData, state.answers])

  const handleFinish = useCallback(() => {
    const finalScore = calculateScore()
    setScore(finalScore)
    setState((prev) => ({ ...prev, isFinished: true }))
    setShowResultModal(true)
    localStorage.removeItem(storageKey)
  }, [calculateScore, storageKey])

  const handleRestart = useCallback(() => {
    setState({
      currentQuestion: 0,
      answers: {},
      checkedQuestions: new Set(),
      timeRemaining: TOTAL_TIME,
      isFinished: false,
      isReviewMode: false,
    })
    setShowResultModal(false)
    setShowTimeoutModal(false)
    localStorage.removeItem(storageKey)
  }, [storageKey])

  const handleReview = useCallback(() => {
    setState((prev) => ({ ...prev, isReviewMode: true, currentQuestion: 0 }))
    setShowResultModal(false)
  }, [])

  const handleContinueAfterTimeout = useCallback(() => {
    setShowTimeoutModal(false)
  }, [])

  const handleNextForm = useCallback(() => {
    const nextForm = formNum < totalForms ? formNum + 1 : 1
    router.push(`/quiz/${type}/${nextForm}`)
  }, [formNum, totalForms, router, type])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">جاري تحميل الامتحان...</p>
        </div>
      </div>
    )
  }

  if (error || !quizData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error || "حدث خطأ"}</p>
          <Button onClick={() => window.location.reload()}>
            <RotateCcw className="w-4 h-4 ml-2" />
            إعادة المحاولة
          </Button>
        </div>
      </div>
    )
  }

  const currentQ = quizData.questions[state.currentQuestion]
  const allAnswered = Object.keys(state.answers).length === quizData.questions.length
  const allChecked = state.checkedQuestions.size === quizData.questions.length
  const isCurrentChecked = state.checkedQuestions.has(state.currentQuestion)

  return (
    <div className="container mx-auto px-4 py-6">
      <BreadcrumbNav
        items={[
          { label: "أسئلة التؤوريا", href: "/quiz" },
          { label: title, href: `/quiz/${type}` },
          { label: `نموذج ${formNum}` },
        ]}
      />

      <div className="flex flex-col-reverse lg:flex-row gap-6">
        {/* Sidebar - Question Navigation */}
        <div className="lg:w-72 shrink-0">
          <div className="sticky top-20">
            <QuizTimer timeRemaining={state.timeRemaining} />
            <QuizNavigation
              totalQuestions={quizData.questions.length}
              currentQuestion={state.currentQuestion}
              answers={state.answers}
              checkedQuestions={state.checkedQuestions}
              isFinished={state.isFinished}
              questions={quizData.questions}
              onNavigate={handleNavigate}
            />
          </div>
        </div>

        {/* Main Content - Question */}
        <div className="flex-1 min-w-0">
          <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
            {/* Question Header */}
            <div className="bg-primary text-primary-foreground p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">
                  السؤال {state.currentQuestion + 1} من {quizData.questions.length}
                </h2>
                {state.isReviewMode && <span className="px-3 py-1 bg-white/20 rounded-full text-sm">وضع المراجعة</span>}
              </div>
            </div>

            {/* Question Content */}
            <QuizQuestion
              question={currentQ}
              selectedAnswer={state.answers[state.currentQuestion]}
              isChecked={isCurrentChecked || state.isFinished}
              isReviewMode={state.isReviewMode || state.isFinished}
              onSelectAnswer={handleSelectAnswer}
            />

            {/* Navigation Buttons */}
            <div className="p-4 border-t border-border bg-muted flex flex-wrap items-center justify-between gap-4">
              <Button variant="outline" onClick={handlePrev} disabled={state.currentQuestion === 0}>
                <ChevronRight className="w-4 h-4 ml-2" />
                السابق
              </Button>

              <div className="flex gap-2">
                {!state.isFinished && !state.isReviewMode && (
                  <Button
                    variant="secondary"
                    onClick={handleCheckAnswer}
                    disabled={state.answers[state.currentQuestion] === undefined || isCurrentChecked}
                  >
                    <Check className="w-4 h-4 ml-2" />
                    تحقق من الإجابة
                  </Button>
                )}

                {allAnswered && !state.isFinished && (
                  <Button variant="default" onClick={handleFinish}>
                    أنهِ الامتحان
                  </Button>
                )}
              </div>

              <Button
                variant="outline"
                onClick={handleNext}
                disabled={state.currentQuestion === quizData.questions.length - 1}
              >
                التالي
                <ChevronLeft className="w-4 h-4 mr-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Result Modal */}
      <QuizResultModal
        isOpen={showResultModal}
        score={score}
        total={quizData.questions.length}
        passingScore={25}
        onRestart={handleRestart}
        onReview={handleReview}
        onNextForm={handleNextForm}
      />

      {/* Timeout Modal */}
      <QuizTimeoutModal isOpen={showTimeoutModal} onContinue={handleContinueAfterTimeout} onNextForm={handleNextForm} />
    </div>
  )
}
