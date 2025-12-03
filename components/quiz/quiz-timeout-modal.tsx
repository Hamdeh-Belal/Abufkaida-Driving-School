"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Clock, Play, ArrowLeft } from "lucide-react"

interface QuizTimeoutModalProps {
  isOpen: boolean
  onContinue: () => void
  onNextForm: () => void
}

export function QuizTimeoutModal({ isOpen, onContinue, onNextForm }: QuizTimeoutModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">انتهى الوقت</DialogTitle>
        </DialogHeader>

        <div className="text-center py-6">
          <div className="inline-flex p-6 bg-warning/10 rounded-full mb-4">
            <Clock className="w-16 h-16 text-warning" />
          </div>

          <p className="text-muted-foreground">
            لقد انتهى الوقت المخصص للامتحان. يمكنك الاستمرار أو الانتقال إلى امتحان آخر.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button onClick={onNextForm} className="w-full">
            <ArrowLeft className="w-4 h-4 ml-2" />
            الانتقال إلى الامتحان التالي
          </Button>
          <Button variant="outline" onClick={onContinue} className="w-full bg-transparent">
            <Play className="w-4 h-4 ml-2" />
            الاستمرار بالامتحان
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
