import Link from "next/link"
import { ChevronLeft, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav aria-label="مسار التنقل" className="mb-6">
      <ol
        className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="flex items-center gap-2"
        >
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1" itemProp="item">
            <Home className="w-4 h-4" />
            <span itemProp="name">الرئيسية</span>
          </Link>
          <meta itemProp="position" content="1" />
          <ChevronLeft className="w-4 h-4" />
        </li>
        {items.map((item, index) => (
          <li
            key={index}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className="flex items-center gap-2"
          >
            {item.href ? (
              <Link href={item.href} className="hover:text-primary transition-colors" itemProp="item">
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span itemProp="name" className="text-foreground font-medium">
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(index + 2)} />
            {index < items.length - 1 && <ChevronLeft className="w-4 h-4" />}
          </li>
        ))}
      </ol>
    </nav>
  )
}
