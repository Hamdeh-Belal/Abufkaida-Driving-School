import Link from "next/link"
import { BookOpen, HelpCircle, FileText, TrafficCone } from "lucide-react"

const dashboardCards = [
  {
    title: "أسئلة التؤوريا",
    description: "تدرب على أسئلة امتحان التؤوريا للخصوصي والشحن والعمومي",
    icon: HelpCircle,
    href: "/quiz",
    color: "bg-secondary",
  },
  {
    title: "كتب التؤوريا",
    description: "اطلع على كتب التؤوريا للخصوصي والشحن الخفيف",
    icon: BookOpen,
    href: "/books",
    color: "bg-accent",
  },
  {
    title: "إشارات المرور",
    description: "تعرف على جميع إشارات المرور ومعانيها",
    icon: TrafficCone,
    href: "/traffic-signs",
    color: "bg-primary",
  },
  {
    title: "الوثائق المطلوبة",
    description: "تعرف على الوثائق والمستندات المطلوبة للتسجيل",
    icon: FileText,
    href: "/documents",
    color: "bg-secondary",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-20 lg:py-32">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('/driving-school-road-highway.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-balance">مدرسة أبو فخيدة لتعليم السياقة</h1>
            <p className="text-xl lg:text-2xl opacity-90 mb-8 leading-relaxed">
              نحن نساعدك في الحصول على رخصة القيادة من خلال دورات تدريبية متكاملة ومواد تعليمية شاملة
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/quiz"
                className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
              >
                ابدأ التدريب الآن
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/10 font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/30"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Cards */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">خدماتنا التعليمية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {dashboardCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`absolute top-0 left-0 w-24 h-24 ${card.color} opacity-10 rounded-full -translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500`}
                />
                <div className={`inline-flex p-4 rounded-xl ${card.color} text-white mb-4`}>
                  <card.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

  
    </div>
  )
}
