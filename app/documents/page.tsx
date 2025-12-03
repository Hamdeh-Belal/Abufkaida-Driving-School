import type { Metadata } from "next"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Check, Camera, CreditCard, Calendar, Clock, FileText, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "الوثائق المطلوبة | مدرسة أبو فخيدة لتعليم السياقة",
  description:
    "تعرف على الوثائق والمستندات المطلوبة للتسجيل في مدرسة أبو فخيدة لتعليم السياقة - الخصوصي، الشحن الخفيف، العمومي",
  keywords: ["وثائق", "مستندات", "تسجيل", "رخصة قيادة", "خصوصي", "شحن", "عمومي"],
}

const documentTypes = [
  {
    id: "private",
    title: "الخصوصي",
    icon: CreditCard,
    color: "bg-primary",
    requirements: [
      { icon: Camera, text: "صورتين شخصيات" },
      { icon: CreditCard, text: "صورة عن الهوية" },
      {
        icon: Calendar,
        text: "العمر 17 سنة فما فوق، ويتقدم للإمتحان النظري والعملي ولكن لا يستلم الرخصة قبل سن 17.5",
      },
    ],
  },
  {
    id: "heavy",
    title: "الشحن الخفيف",
    icon: FileText,
    color: "bg-secondary",
    requirements: [
      { icon: Camera, text: "أربع صور شخصية" },
      { icon: CreditCard, text: "صورتين عن الهوية" },
      {
        icon: Calendar,
        text: "العمر 17.5 فما فوق يتقدم للإمتحان النظري والعملي ولكن لا يستلم الرخصة قبل سن 18",
      },
    ],
  },
  {
    id: "public",
    title: "العمومي",
    icon: Award,
    color: "bg-accent",
    requirements: [
      { icon: Camera, text: "أربع صور شخصية" },
      { icon: CreditCard, text: "صورة عن الهوية" },
      { icon: CreditCard, text: "صورة عن الرخصة" },
      {
        icon: FileText,
        text: "شهادة مدرسية مصدقة على ان لا تقل عن 8 سنوات دراسة",
      },
      { icon: Check, text: "حسن سلوك" },
      { icon: Calendar, text: "العمر لا يقل عن 21 سنة" },
      { icon: Clock, text: "الرخصة لا تقل عن سنتين" },
    ],
  },
]

export default function DocumentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav items={[{ label: "الوثائق المطلوبة" }]} />

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">الوثائق المطلوبة</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          تعرف على الوثائق والمستندات المطلوبة للتسجيل في كل نوع من أنواع الرخص
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {documentTypes.map((type) => (
          <div
            key={type.id}
            id={type.id}
            className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden scroll-mt-24"
          >
            {/* Header */}
            <div className={`${type.color} text-white p-6 text-center`}>
              <type.icon className="w-12 h-12 mx-auto mb-3" />
              <h2 className="text-2xl font-bold">{type.title}</h2>
            </div>

            {/* Requirements List */}
            <div className="p-6">
              <h3 className="font-bold text-lg mb-4">المتطلبات:</h3>
              <ul className="space-y-4">
                {type.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="p-2 bg-muted rounded-lg shrink-0">
                      <req.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="leading-relaxed">{req.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
