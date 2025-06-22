import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"

export function SiteHeader() {
  return (
    <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 sm:h-16 sm:w-16">
            <Image
              src="/placeholder.svg?height=64&width=64"
              alt="Logo Hotel Patito"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-teal-600">Hotel Patito</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <MainNav />
        </nav>
        <Button variant="outline" size="sm" className="md:hidden">
          <span className="sr-only">Menú</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </div>
    </header>
  )
}

