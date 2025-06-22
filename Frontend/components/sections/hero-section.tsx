import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1920x1080-hd-beach-khfbqt2io95uf0zy.jpg-necezoLBqssVM6PdsQcaHnGmxbIau9.jpeg"
          alt="Bungalows sobre agua cristalina en paraíso tropical"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      </div>

      <div className="relative h-full flex items-center z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-xl animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white drop-shadow-md mb-4">
              Bienvenidos al Hotel Patito
            </h2>
            <p className="text-lg md:text-xl text-white drop-shadow-md mb-8">
              Su paraíso en la playa le espera. Disfrute de nuestras instalaciones de lujo y la mejor vista al mar.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white animate-pulse-subtle">
                Reservar Ahora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 backdrop-blur-sm text-white border-white hover:bg-white/30"
              >
                Ver Habitaciones
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

