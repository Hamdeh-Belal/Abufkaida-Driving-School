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
  title: "مدرسة أبو فخيدة لتعليم السياقة - رام الله",
  description:
    "مدرسة أبو فخيدة لتعليم السياقة في رام الله. تعلم قيادة السيارات، أسئلة التؤوريا، كتب التؤوريا، إشارات المرور، رخصة القيادة",
  keywords: [
    "مدرسة سياقة",
    "تعليم سياقة",
    "رام الله",
    "تؤوريا",
    "رخصة قيادة",
    "إشارات مرور",
    "أبو فخيدة",
    "مدرسة قيادة",
    "دراسة النظري",
    "اختبار القيادة",
    "كتاب القيادة",
  ],
  authors: [{ name: "مدرسة أبو فخيدة لتعليم السياقة" }],
  openGraph: {
    title: "مدرسة أبو فخيدة لتعليم السياقة - رام الله",
    description:
      "مدرسة أبو فخيدة لتعليم السياقة في رام الله. تعلم قيادة السيارات، أسئلة التؤوريا، كتب التؤوريا، إشارات المرور",
    locale: "ar_PS",
    type: "website",
    url: "https://abufkaida-driving-school.netlify.app",
  },
  alternates: {
    languages: {
      ar: "https://abufkaida-driving-school.netlify.app",
    },
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  verification: {
    google: "Q-41ECLY4g-GCrdlAb9pwHV-EvTq3lI3sEeIIfCnK8c",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
}

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
  width: "device-width",
  initialScale: 1,
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://abufkaida-driving-school.netlify.app",
  name: "مدرسة أبو فخيدة لتعليم السياقة",
  description: "مدرسة متخصصة في تعليم قيادة السيارات في رام الله",
  url: "https://abufkaida-driving-school.netlify.app",
  telephone: "+970-2-2951111",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Municipality St 60",
    addressLocality: "رام الله",
    addressRegion: "Palestine",
    postalCode: "",
    addressCountry: "PS",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "31.904972304639575",
    longitude: "35.196686688704695",
  },
  sameAs: [],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    ratingCount: "1",
  },
  areaServed: {
    "@type": "State",
    name: "Palestine",
  },
  image: "https://abufkaida-driving-school.netlify.app/the%20logo.png",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
