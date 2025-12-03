import type { Metadata } from "next"
import Link from "next/link"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { HelpCircle, ArrowLeft, Car, Truck, Bus } from "lucide-react"

export const metadata: Metadata = {
  title: "أسئلة التؤوريا | مدرسة أبو فخيدة لتعليم السياقة",
  description: "تدرب على أسئلة امتحان التؤوريا للخصوصي والشحن الخفيف والعمومي",
  keywords: ["أسئلة", "تؤوريا", "امتحان", "تدريب", "خصوصي", "شحن", "عمومي"],
}

const quizTypes = [
  {
    id: "private",
    title: "أسئلة التؤوريا خصوصي",
    description: "تدرب على أسئلة امتحان التؤوريا للخصوصي - 29 نموذج امتحان",
    icon: Car,
    color: "bg-primary",
    href: "/quiz/private",
    forms: 29,
  },
  {
    id: "heavy",
    title: "أسئلة التؤوريا شحن خفيف",
    description: "تدرب على أسئلة امتحان التؤوريا للشحن الخفيف - 29 نموذج امتحان",
    icon: Truck,
    color: "bg-secondary",
    href: "/quiz/heavy",
    forms: 29,
  },
  {
    id: "public",
    title: "أسئلة التؤوريا عمومي",
    description: "تدرب على أسئلة امتحان التؤوريا للعمومي - نماذج امتحانات متعددة",
    icon: Bus,
    color: "bg-accent",
    href: "/quiz/public",
    forms: 29,
  },
]

export default function QuizPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav items={[{ label: "أسئلة التؤوريا" }]} />

      <div className="text-center mb-12">
        <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
          <HelpCircle className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">أسئلة التؤوريا</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          اختر نوع الرخصة وابدأ التدريب على أسئلة الامتحان النظري
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {quizTypes.map((quiz) => (
          <Link
            key={quiz.id}
            href={quiz.href}
            className="group bg-card rounded-2xl border border-border overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`${quiz.color} text-white p-6 text-center`}>
              <quiz.icon className="w-16 h-16 mx-auto mb-3" />
              <div className="text-3xl font-bold">{quiz.forms}</div>
              <div className="text-sm opacity-90">نموذج امتحان</div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-3">{quiz.title}</h2>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{quiz.description}</p>
              <div className="flex items-center text-primary font-medium">
                <span>ابدأ التدريب</span>
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
