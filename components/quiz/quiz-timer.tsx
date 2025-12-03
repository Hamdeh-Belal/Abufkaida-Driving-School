"use client"

import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuizTimerProps {
  timeRemaining: number
}

export function QuizTimer({ timeRemaining }: QuizTimerProps) {
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const isLow = timeRemaining < 5 * 60 // Less than 5 minutes

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 p-4 rounded-xl mb-4 font-mono text-2xl font-bold",
        isLow ? "bg-destructive/10 text-destructive animate-pulse" : "bg-primary/10 text-primary",
      )}
    >
      <Clock className="w-6 h-6" />
      <span dir="ltr">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  )
}
