import type { Metadata } from "next"
import Link from "next/link"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { MapPin, Phone, Clock, Facebook, MessageCircle, Car } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "اتصل بنا | مدرسة أبو فخيدة لتعليم السياقة",
  description: "تواصل معنا - مدرسة أبو فخيدة لتعليم السياقة - رام الله التحتا خلف البنك العربي",
  keywords: ["اتصل بنا", "مدرسة سياقة", "رام الله", "أبو فخيدة"],
}

const contactInfo = [
  {
    icon: MapPin,
    label: "العنوان",
    value: "Municipality St 60",
    href: "https://maps.google.com/?q=31.904972304639575,35.196686688704695",
  },
  {
    icon: Phone,
    label: "هاتف المكتب",
    value: "02-988-347",
    href: "tel:+972298347",
    dir: "ltr",
  },
]

const mobileNumbers = [
  { name: "أبو بسام", number: "0599-786-346", href: "tel:+970599786346" },
  { name: "محمد أبو فخيدة", number: "0599-894-300", href: "tel:+970599894300" },
  { name: "غسان", number: "0599-803-319", href: "tel:+970599803319" },
]

const workingHours = [
  { day: "السبت - الخميس", hours: "8:00 صباحاً - 6:00 مساءً" },
  { day: "الجمعة", hours: "مغلق" },
]

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav items={[{ label: "اتصل بنا" }]} />

      <div className="text-center mb-12">
        <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
          <Car className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">اتصل بنا</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          نحن هنا لمساعدتك في الحصول على رخصة القيادة. تواصل معنا في أي وقت
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Contact Information */}
        <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
          <div className="bg-primary text-primary-foreground p-6">
            <h2 className="text-2xl font-bold">معلومات التواصل</h2>
          </div>

          <div className="p-6 space-y-6">
            {contactInfo.map((info, idx) => (
              <a
                key={idx}
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : undefined}
                rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-start gap-4 p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors group"
              >
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">{info.label}</div>
                  <div className="font-bold text-lg" dir={info.dir || "rtl"}>
                    {info.value}
                  </div>
                </div>
              </a>
            ))}

            {/* Mobile Numbers */}
            <div className="pt-4 border-t border-border">
              <h3 className="font-bold mb-4">أرقام الهاتف المحمول</h3>
              <div className="space-y-3">
                {mobileNumbers.map((mobile, idx) => (
                  <a
                    key={idx}
                    href={mobile.href}
                    className="flex items-start gap-4 p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors group"
                  >
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">{mobile.name}</div>
                      <div className="font-bold text-lg" dir="ltr">
                        {mobile.number}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4 border-t border-border">
              <h3 className="font-bold mb-4">تابعنا على</h3>
              <div className="flex gap-4">
                <a
                  href="https://wa.me/972599894300"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>واتساب</span>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100071088489995&mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 bg-[#1877f2] text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Facebook className="w-5 h-5" />
                  <span>فيسبوك</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Working Hours & Quick Links */}
        <div className="space-y-6">
          {/* Working Hours */}
          <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
            <div className="bg-secondary text-secondary-foreground p-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Clock className="w-6 h-6" />
                ساعات العمل
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {workingHours.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <span className="font-medium">{item.day}</span>
                    <span className={item.hours === "مغلق" ? "text-destructive" : "text-muted-foreground"}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
            <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" asChild className="h-auto py-4 bg-transparent">
                <Link href="/quiz">
                  <div className="text-center">
                    <div className="font-bold">أسئلة التؤوريا</div>
                    <div className="text-xs text-muted-foreground">ابدأ التدريب</div>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-auto py-4 bg-transparent">
                <Link href="/books">
                  <div className="text-center">
                    <div className="font-bold">كتب التؤوريا</div>
                    <div className="text-xs text-muted-foreground">اقرأ الكتب</div>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-auto py-4 bg-transparent">
                <Link href="/traffic-signs">
                  <div className="text-center">
                    <div className="font-bold">إشارات المرور</div>
                    <div className="text-xs text-muted-foreground">تعرف عليها</div>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-auto py-4 bg-transparent">
                <Link href="/documents">
                  <div className="text-center">
                    <div className="font-bold">الوثائق المطلوبة</div>
                    <div className="text-xs text-muted-foreground">المستندات</div>
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="mt-12 max-w-5xl mx-auto">
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
          <div className="aspect-[2/1] bg-muted">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=31.904972,35.196687&z=16&output=embed"
            />
          </div>
          <div className="p-4 bg-muted text-center text-muted-foreground">
            <p>رام الله التحتا - خلف البنك العربي</p>
          </div>
        </div>
      </div>
    </div>
  )
}
