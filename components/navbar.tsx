"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "الرئيسية", href: "/" },
  {
    label: "الوثائق المطلوبة",
    href: "/documents",
    children: [
      { label: "الخصوصي", href: "/documents#private" },
      { label: "الشحن الخفيف", href: "/documents#heavy" },
      { label: "العمومي", href: "/documents#public" },
    ],
  },
  {
    label: "كتب التؤوريا",
    href: "/books",
    children: [
      { label: "كتاب تيؤوريا الخصوصي", href: "/books/private" },
      { label: "كتاب تيؤوريا الشحن", href: "/books/heavy" },
    ],
  },
  {
    label: "أسئلة التؤوريا",
    href: "/quiz",
    children: [
      { label: "أسئلة التؤوريا خصوصي", href: "/quiz/private" },
      { label: "أسئلة التؤوريا شحن خفيف", href: "/quiz/heavy" },
      { label: "أسئلة التؤوريا عمومي", href: "/quiz/public" },
    ],
  },
  { label: "إشارات المرور", href: "/traffic-signs" },
  { label: "اتصل بنا", href: "/contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/the logo.png" alt="Logo" width={120} height={120} />
            <span className="font-bold text-lg hidden sm:block">مدرسة أبو فخيدة</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href} className="relative group">
                {item.children ? (
                  <div className="relative">
                    <button
                      className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                      onMouseEnter={() => setOpenDropdown(item.href)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div
                      className={cn(
                        "absolute top-full right-0 mt-1 bg-card text-card-foreground rounded-lg shadow-xl min-w-48 overflow-hidden transition-all duration-200",
                        openDropdown === item.href
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2",
                      )}
                      onMouseEnter={() => setOpenDropdown(item.href)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-0"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link href={item.href} className="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            mobileOpen ? "max-h-[80vh] pb-4" : "max-h-0",
          )}
        >
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <div>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                      onClick={() => setOpenDropdown(openDropdown === item.href ? null : item.href)}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn("w-4 h-4 transition-transform", openDropdown === item.href && "rotate-180")}
                      />
                    </button>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-200 mr-4",
                        openDropdown === item.href ? "max-h-96" : "max-h-0",
                      )}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
