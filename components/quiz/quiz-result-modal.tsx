"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trophy, ThumbsDown, RotateCcw, Eye, ArrowLeft } from "lucide-react"

interface QuizResultModalProps {
  isOpen: boolean
  score: number
  total: number
  passingScore: number
  onRestart: () => void
  onReview: () => void
  onNextForm: () => void
}

export function QuizResultModal({
  isOpen,
  score,
  total,
  passingScore,
  onRestart,
  onReview,
  onNextForm,
}: QuizResultModalProps) {
  const passed = score >= passingScore
  const percentage = Math.round((score / total) * 100)

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">نتيجة الامتحان</DialogTitle>
        </DialogHeader>

        <div className="text-center py-6">
          {/* Icon */}
          <div className={`inline-flex p-6 rounded-full mb-4 ${passed ? "bg-success/10" : "bg-error/10"}`}>
            {passed ? (
              <Trophy className={`w-16 h-16 text-success`} />
            ) : (
              <ThumbsDown className={`w-16 h-16 text-error`} />
            )}
          </div>

          {/* Score */}
          <div className="text-5xl font-bold mb-2">
            <span className={passed ? "text-success" : "text-error"}>{score}</span>
            <span className="text-muted-foreground">/{total}</span>
          </div>

          {/* Percentage */}
          <div className="text-xl text-muted-foreground mb-4">{percentage}%</div>

          {/* Result Message */}
          <div className={`text-xl font-bold ${passed ? "text-success" : "text-error"}`}>
            {passed ? "مبروك! لقد نجحت" : "للأسف، لم تنجح"}
          </div>
          <p className="text-muted-foreground mt-2">
            {passed
              ? "أحسنت! استمر في التدريب للحصول على نتائج أفضل"
              : `تحتاج إلى ${passingScore} إجابة صحيحة على الأقل للنجاح`}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button onClick={onNextForm} className="w-full">
            <ArrowLeft className="w-4 h-4 ml-2" />
            اذهب إلى نموذج آخر
          </Button>
          <Button variant="outline" onClick={onRestart} className="w-full bg-transparent">
            <RotateCcw className="w-4 h-4 ml-2" />
            إعادة الامتحان
          </Button>
          <Button variant="ghost" onClick={onReview} className="w-full">
            <Eye className="w-4 h-4 ml-2" />
            مراجعة الامتحان
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
