"use client"

import { useState, useEffect } from "react"
import { TrafficCone, Filter, Info, AlertTriangle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TrafficSign {
  id: string
  cat: string
  img: string
  description: string
  note?: string
}

const categories = [
  { id: "all", label: "الكل" },
  { id: "شاخصات تحذير", label: "تحذير" },
  { id: "شاخصات الإرشاد", label: "إرشاد" },
  { id: "شاخصات الإستعلام", label: "إعلام" },
  { id: "الشاخصات المساعدة", label: "مساعدة" },
  { id: "الآلات الضوئية", label: "إشارات ضوئية" },
  { id: "الإشارات المرسومة على سطح الطريق", label: "إشارات الطريق" },
]

const importantNotes = `أسئلة مهمة جدا مكررة في امتحان التؤوريا:

سؤال مهم: الإشارة ب-8:
أ- يجوز تجاوز مركبة آلية تسير على عجلتين
ب- يجوز تجاوز مركبة غير ميكانيكية تسير على أكثر من عجلتين
ج- لا يجوز تجاوز مركبة ميكانيكية تسير على أكثر من عجلتين (✔)
د- جميع الإجابات صحيحة

• الهدف من إشارات السير هو: تنظيم حركة السير في الطريق وتحذير وإرشاد السائقين.
• إشارة على شكل مثلث: إشارة تحذير تحذرنا من خطر أو عائق أو متغير ما على الطريق.
• إشارة سير على شكل دائرة: إشارة إرشاد وهي ملزمة (ممنوعات ومسموحيات).
• إشارة سير على شكل مربع: إعلام تدلنا على أماكن واتجاهات على الطريق.
• إشارات السير التي تمنع دخول المركبات الآلية: ب–1، ب–2، ب–14
• إشارات السير التي تمنع دخول الدراجات النارية: ب–1، ب–2، ب–13، ب–14
• نهاية طريق البلدية هي الإشارة ب–25
• الإشارة التي تجبرك على إعطاء حق الأولوية: الإشارة ب–36
• لون لافتة الإرشاد قبل مفرق داخل أو خارج المدن: أخضر
• لون لافتة الإرشاد قبل مفرق طرق سريعة: أزرق
• هل يجوز إقامة الشاخصة ج–1 خارج المدن؟ نعم
• هل يجوز لمركبة غير تكسي عمومي الوقوف عند الإشارة ب–58 لإنزال الركاب؟ نعم للإنزال فقط
• عندما توجد إشارة قف في المفترق يجب التوقف في المكان الذي نشاهد منه حركة السير إذا لم يوجد خط توقف أو ممر مشاة.
• الإشارة التي تلزم السائق أن يعطي حق الأولوية للمشاة في المنعطفات عند الانعطاف: هـ–8
• المسافة بين إشارة التحذير وما نحذر منه حوالي 150م في العادة.
• أشر الى الإشارات التي تعتبر إشارات مساعدة على الطريق: و7 – و8
• أشر إلى رقم الإشارة التي تعني ضوء أصفر في المفترق: هـ–5
• ما هو المشترك بين الإشارتين ب–36 و ب–37؟ يجب إعطاء حق الأولوية في الطريق القاطعة أمامك.
• يظهر في الإشارة الضوئية بعد الضوء الأحمر: الأحمر والأصفر معاً.
• توضع الإشارة أ-28 - وضعها فوق الإشارات أ 28 أو أ 29 أو أ 30 حسب الوضع.
• هل كلمة "قف" المكتوبة على سطح الطريق تلزم التوقف؟ لا تلزم التوقف إلا بموجب الإشارة ب–37.
• ب–41، ب–43، ب–44، ب–47: ينهيها المفترق القريب فقط
• ب–28، ب–29: ينهيها المفترق و الإشارة ج-1 و الإشارة ب-32
• هل يجوز توقف مركبة داخل الخليج د-18؟ لإصعاد و إنزال الركاب فقط لنوع المركبة المسموح توقفها بموجب الشاخصة فقط.

ملاحظات:
• هل الإشارات المرسومة على سطح الطريق ملزمة؟ نعم.
• تنهي الإشارات بـ 41، 43، 44، 46، 47، (المقترق القريب فقط).
• تنهي الإشارات بـ 48، 49، 51 تنفيذ أحكام الشاخصة.
• إشارة قف بـ 37 إذا وضعت على يسار الشارع: تلزم فقط بالوقوف لمن ينوي الاستدارة يساراً أو يساراً حذوة فرس.
• سائق المركبة الذي يتوقف عند إشارة (قف) قبل ملتقى سكة جديد عليه: إيقاف عمل الراديو إن يفتح الشبابيك والنظر لجانبي السكة
• متى يجب الوقوف قبل ملتقى سكة الحديد: عند قدوم قطار أو عندما تكون هنالك إشارات السير بـ 37، أو عند زوال الحاجز أو عند عمل الإشارة الضوئية،
• في طريق مقسمة إلى مسالك وضعت في الجهة اليمين الإشارة رقم بـ 37 عندها مفعولها على جميع المسالك.
• ما هو المشترك بين الإشارتين بـ 36، بـ 37: يجب الوقوف قبل إعطاء حق الأولوية في الطريق القاطعة أمامك.
• أي ضوء يظهر في الإشارة الضوئية بعد الضوء الأحمر: الأحمر والأصفر معاً.
• كيف تتصرف عند الاقتراب من الإشارة رقم 36: يجب التمهل… أمامك ممر لعبور المشاة على بعد 150 متر.
• هل كلمة قف المكتوبة على سطح الطريق تلزم التوقف: لا تلزم التوقف إلا بموجب إشارة قف بـ 37.
• وظيفة الإشارات الضوئية: تنظيم انسياب حركة السير وإعطاء حق الأولوية.
• هل يجوز أن تقام الشاخصة ج–1 خارج المدن؟ نعم.
• هل يجوز لمركبة غير تكسي عمومي الوقوف عند الإشارة ب–58 لإنزال الركاب؟ نعم.
• هل الإشارات المساعدة إشارات سير؟ نعم.
• العمل بموجب الضوء الأصفر: التصرف حسب رأي السائق لما يجري في الملتقى.
• هل الإشارات بيد تلاميذ المدارس ملزمة؟ نعم فهي إشارات متنقلة حسب القانون.
• هل الإشارات بيد عمال الأشغال ملزمة؟ نعم عندما يستمع الإشارة سر وقف عند الحاجز.`

export function TrafficSignsClient() {
  const [signs, setSigns] = useState<TrafficSign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    async function loadSigns() {
      try {
        const response = await fetch("/data/traffic-signs.json")
        if (!response.ok) throw new Error("Failed to load traffic signs")
        const data = await response.json()
        setSigns(data)
      } catch {
        setError("فشل تحميل بيانات إشارات المرور")
      } finally {
        setLoading(false)
      }
    }
    loadSigns()
  }, [])

  const filteredSigns = signs.filter((sign) => {
    const matchesCategory = selectedCategory === "all" || sign.cat === selectedCategory
    return matchesCategory
  })

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">جاري تحميل إشارات المرور...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            <RotateCcw className="w-4 h-4 ml-2" />
            إعادة المحاولة
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
          <TrafficCone className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">إشارات المرور</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">تعرف على جميع إشارات المرور ومعانيها</p>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border p-4 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-5 h-5 text-muted-foreground" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                selectedCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Signs Count */}
      <p className="text-muted-foreground mb-4">
        عرض {filteredSigns.length} من {signs.length} إشارة
      </p>

      {/* Signs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredSigns.map((sign) => (
          <div
            key={sign.id}
            className="bg-card rounded-xl border border-border overflow-hidden shadow hover:shadow-lg transition-shadow"
          >
            {/* Sign Image */}
            <div className="aspect-square bg-muted flex items-center justify-center p-6">
              <img
                src={`/data/${sign.img.replace(/\\/g, "/")}`}
                alt={sign.description}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            </div>

            {/* Sign Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-primary">{sign.id}</span>
                <span className="text-xs px-2 py-1 bg-muted rounded-full">{sign.cat}</span>
              </div>
              <p className="text-sm leading-relaxed">{sign.description}</p>
              {sign.note && (
                <div className="mt-3 p-2 bg-muted rounded-lg flex items-start gap-2">
                  <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground">{sign.note}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredSigns.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">لا توجد نتائج مطابقة للبحث</p>
        </div>
      )}

      {/* Important Notes Section */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
        <div className="bg-primary text-primary-foreground p-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            ملاحظات مهمة - أسئلة مكررة في امتحان التؤوريا
          </h2>
        </div>
        <div className="p-6">
          <div className="prose prose-sm max-w-none">
            {importantNotes.split("\n").map((line, idx) => (
              <p
                key={idx}
                className={cn(
                  "mb-2 leading-relaxed",
                  line.startsWith("•") && "pr-4",
                  line.includes("(✔)") && "text-success font-medium",
                )}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
