import { Facebook } from "lucide-react"

export function FloatingButton() {
  return (
    <a
      href="https://www.facebook.com/profile.php?id=100071088489995&mibextid=wwXIfr"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 p-4 bg-[#1877f2] text-white rounded-full shadow-lg hover:scale-110 transition-transform"
      aria-label="تابعنا على فيسبوك"
    >
      <Facebook className="w-6 h-6" />
    </a>
  )
}
