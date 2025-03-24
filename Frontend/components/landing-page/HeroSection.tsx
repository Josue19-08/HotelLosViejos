import Image from "next/image"
import type { HeroContent } from "@/types"

interface HeroSectionProps {
  content: HeroContent
}

export function HeroSection({ content }: HeroSectionProps) {
  const { title, subtitle, backgroundImage } = content

  return (
    <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage || "/placeholder.svg?height=1080&width=1920"}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      </div>

      <div className="relative h-full flex items-center z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-xl animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white drop-shadow-md mb-4">{title}</h2>
            <p className="text-lg md:text-xl text-white drop-shadow-md">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

