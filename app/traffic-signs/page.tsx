import type { Metadata } from "next"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { TrafficSignsClient } from "@/components/traffic-signs-client"

export const metadata: Metadata = {
  title: "إشارات المرور | مدرسة أبو فخيدة لتعليم السياقة",
  description: "تعرف على جميع إشارات المرور ومعانيها - شاخصات التحذير والإرشاد والإعلام",
  keywords: ["إشارات مرور", "شاخصات", "تحذير", "إرشاد", "قواعد مرور", "رخصة قيادة"],
}

export default function TrafficSignsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav items={[{ label: "إشارات المرور" }]} />
      <TrafficSignsClient />
    </div>
  )
}
