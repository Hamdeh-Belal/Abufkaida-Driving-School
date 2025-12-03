import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin, Facebook, MessageCircle } from "lucide-react"

const footerSections = [
  {
    title: "الرئيسية",
    links: [
      { label: "الصفحة الرئيسية", href: "/" },
      { label: "كتب التؤوريا", href: "/books" },
      { label: "أسئلة التؤوريا", href: "/quiz" },
    ],
  },
  {
    title: "الوثائق المطلوبة",
    links: [
      { label: "الخصوصي", href: "/documents#private" },
      { label: "الشحن الخفيف", href: "/documents#heavy" },
      { label: "العمومي", href: "/documents#public" },
    ],
  },
  {
    title: "أسئلة التؤوريا",
    links: [
      { label: "خصوصي", href: "/quiz/private" },
      { label: "شحن خفيف", href: "/quiz/heavy" },
      { label: "عمومي", href: "/quiz/public" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">اتصل بنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5 shrink-0" />
                <span>رام الله التحتا - خلف البنك العربي</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 shrink-0" />
                <a href="tel:0298347" className="hover:underline" dir="ltr">
                  02-988-347
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 shrink-0" />
                <a href="tel:0599894300" className="hover:underline" dir="ltr">
                  0599-894-300
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <a
                href="https://wa.me/972599894300"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                aria-label="واتساب"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100071088489995&mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                aria-label="فيسبوك"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/the logo.png" alt="Logo" width={80} height={80} />
            <span className="font-bold">مدرسة أبو فخيدة لتعليم السياقة</span>
          </div>
          <p className="text-sm opacity-80">جميع الحقوق محفوظة &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
