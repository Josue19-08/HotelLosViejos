import Image from "next/image"
import Link from "next/link"
import { hotelInfo } from "@/lib/data"

export function SiteHeader() {
  return (
    <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <div className="relative h-16 w-16 sm:h-24 sm:w-24">
            <Image
              src={hotelInfo.logo || "/placeholder.svg"}
              alt={`Logo ${hotelInfo.name}`}
              width={96}
              height={96}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-800">{hotelInfo.name}</h1>
        </Link>
      </div>
    </header>
  )
}

