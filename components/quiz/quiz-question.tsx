"use client"

import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"

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

interface QuizQuestionProps {
  question: Question
  selectedAnswer?: number
  isChecked: boolean
  isReviewMode: boolean
  onSelectAnswer: (index: number) => void
}

// Function to process HTML content and fix image paths
function processContent(html: string): string {
  // Replace image paths to point to /data/images/
  return html
    .replace(/src="images\//g, 'src="/data/images/')
    .replace(/src='images\//g, "src='/data/images/")
    .replace(/src="images\\/g, 'src="/data/images/')
    .replace(/src='images\\/g, "src='/data/images/")
}

// Function to remove number prefix from choice text
function removeNumberPrefix(text: string): string {
  // Remove leading "1\n", "2\n", "3\n", "4\n" etc.
  return text.replace(/^\d+\s*\n/, "").trim()
}

export function QuizQuestion({ question, selectedAnswer, isChecked, isReviewMode, onSelectAnswer }: QuizQuestionProps) {
  const correctAnswerIndex = question.choices.findIndex((c) => c.isCorrectResult)

  return (
    <div className="p-6">
      {/* Question Text */}
      <div
        className="question-content text-lg leading-relaxed mb-6 pb-4 border-b border-border"
        dangerouslySetInnerHTML={{ __html: processContent(question.text) }}
      />

      {/* Answer Choices */}
      <div className="space-y-3">
        {question.choices.map((choice, index) => {
          const isSelected = selectedAnswer === index
          const isCorrect = choice.isCorrectResult
          const showCorrect = isChecked && isCorrect
          const showIncorrect = isChecked && isSelected && !isCorrect

          return (
            <button
              key={index}
              onClick={() => !isChecked && onSelectAnswer(index)}
              disabled={isChecked}
              className={cn(
                "w-full text-right p-4 rounded-xl border-2 transition-all flex items-start gap-3",
                !isChecked && !isSelected && "border-border hover:border-primary/50 hover:bg-muted/50",
                !isChecked && isSelected && "border-primary bg-primary/10",
                showCorrect && "border-success bg-success/10",
                showIncorrect && "border-error bg-error/10",
                isChecked && !showCorrect && !showIncorrect && "border-border opacity-60",
              )}
            >
              {/* Choice Number */}
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm",
                  !isChecked && !isSelected && "bg-muted",
                  !isChecked && isSelected && "bg-primary text-primary-foreground",
                  showCorrect && "bg-success text-white",
                  showIncorrect && "bg-error text-white",
                )}
              >
                {showCorrect ? <Check className="w-5 h-5" /> : showIncorrect ? <X className="w-5 h-5" /> : index + 1}
              </div>

              {/* Choice Content */}
              <div className="flex-1">
                <div className="answer-content" dangerouslySetInnerHTML={{ __html: processContent(removeNumberPrefix(choice.text)) }} />
              </div>
            </button>
          )
        })}
      </div>

      {/* Show correct answer indicator in review mode */}
      {isReviewMode && (
        <div className="mt-4 p-4 bg-success/10 rounded-xl text-success flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span>الإجابة الصحيحة: {correctAnswerIndex + 1}</span>
        </div>
      )}
    </div>
  )
}
