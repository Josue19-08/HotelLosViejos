"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const ads = [
  {
    id: 1,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nxsmWbNTJX2BwbHigcTC2hzM1sbwtt.png",
    alt: "Playa tropical con aguas turquesas",
    title: "Descubre nuestro paraíso",
    description: "Disfruta de nuestras playas de ensueño",
  },
  {
    id: 2,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-N30RG5fSAB0uQgxiOZF94yq7cbZxX1.png",
    alt: "Publicidad de Heineken",
    title: "Happy Hour",
    description: "2x1 en bebidas de 5pm a 7pm",
  },
  {
    id: 3,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NTKGCu6mBkymknD1f5eX0txceL42tc.png",
    alt: "Publicidad de AirPods",
    title: "Música en la playa",
    description: "Alquiler de equipos de sonido disponible",
  },
  {
    id: 4,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fBwcJMzUmITwndFFyzvwqxQtU8lJOG.png",
    alt: "Playa con palmeras y sombrillas",
    title: "Relájate en la playa",
    description: "Camastros y sombrillas disponibles",
  },
]

export function AdCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (isHovering) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isHovering])

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + ads.length) % ads.length)
  }

  return (
    <div
      className="relative w-full h-[300px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0 overflow-hidden">
        {ads.map((ad, index) => (
          <div
            key={ad.id}
            className={cn(
              "absolute inset-0 transition-all duration-500 ease-in-out",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0",
            )}
          >
            <div className="relative w-full h-full">
              <Image src={ad.src || "/placeholder.svg"} alt={ad.alt} fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                <h4 className="font-bold text-lg">{ad.title}</h4>
                <p className="text-sm">{ad.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center gap-1 p-2">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex ? "bg-white w-4" : "bg-white/50",
            )}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

