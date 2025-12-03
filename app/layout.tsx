import type React from "react"
import type { Metadata, Viewport } from "next"
import { Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingButton } from "@/components/floating-button"

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
})

export const metadata: Metadata = {
  title: "مدرسة أبو فخيدة لتعليم السياقة",
  description:
    "مدرسة أبو فخيدة لتعليم السياقة - رام الله. تعلم قيادة السيارات، أسئلة التؤوريا، كتب التؤوريا، إشارات المرور",
  keywords: ["مدرسة سياقة", "تعليم سياقة", "رام الله", "تؤوريا", "رخصة قيادة", "إشارات مرور", "أبو فخيدة"],
  authors: [{ name: "مدرسة أبو فخيدة لتعليم السياقة" }],
  openGraph: {
    title: "مدرسة أبو فخيدة لتعليم السياقة",
    description:
      "مدرسة أبو فخيدة لتعليم السياقة - رام الله. تعلم قيادة السيارات، أسئلة التؤوريا، كتب التؤوريا، إشارات المرور",
    locale: "ar_PS",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingButton />
        <Analytics />
      </body>
    </html>
  )
}
