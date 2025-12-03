import type { Metadata } from "next"
import Link from "next/link"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { BookOpen, ArrowLeft, Car, Truck } from "lucide-react"

export const metadata: Metadata = {
  title: "كتب التؤوريا | مدرسة أبو فخيدة لتعليم السياقة",
  description: "كتب التؤوريا للخصوصي والشحن الخفيف - مدرسة أبو فخيدة لتعليم السياقة",
  keywords: ["كتب", "تؤوريا", "خصوصي", "شحن", "تعليم قيادة"],
}

const books = [
  {
    id: "private",
    title: "كتاب تيؤوريا الخصوصي",
    description: "كتاب شامل يحتوي على جميع المعلومات النظرية اللازمة للحصول على رخصة الخصوصي",
    icon: Car,
    color: "bg-primary",
    href: "/books/private",
  },
  {
    id: "heavy",
    title: "كتاب تيؤوريا الشحن",
    description: "كتاب متخصص في قواعد القيادة للشحن الخفيف والمركبات الثقيلة",
    icon: Truck,
    color: "bg-secondary",
    href: "/books/heavy",
  },
]

export default function BooksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav items={[{ label: "كتب التؤوريا" }]} />

      <div className="text-center mb-12">
        <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
          <BookOpen className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">كتب التؤوريا</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          اختر الكتاب المناسب لنوع الرخصة التي تريد الحصول عليها
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {books.map((book) => (
          <Link
            key={book.id}
            href={book.href}
            className="group bg-card rounded-2xl border border-border p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`inline-flex p-4 rounded-xl ${book.color} text-white mb-6`}>
              <book.icon className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-3">{book.title}</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">{book.description}</p>
            <div className="flex items-center text-primary font-medium">
              <span>اقرأ الكتاب</span>
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-2 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
