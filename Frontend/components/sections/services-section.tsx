import Image from "next/image"
import { ParallaxSection } from "@/components/ui/parallax-section"
import { Button } from "@/components/ui/button"

export function ServicesSection() {
  return (
    <>
      <ParallaxSection>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-[450px] md:h-full overflow-hidden group">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nxsmWbNTJX2BwbHigcTC2hzM1sbwtt.png"
                alt="Vista de playa tropical"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-8">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-teal-700 mb-6">
                Bienvenidos al Hotel Patito
              </h2>
              <p className="text-gray-700 mb-5 text-lg">
                Ubicado en la hermosa costa, Hotel Patito ofrece una experiencia única de hospedaje con vistas
                impresionantes al océano. Nuestras habitaciones están diseñadas para brindar el máximo confort y
                relajación durante su estadía.
              </p>
              <p className="text-gray-700 mb-5 text-lg">
                Disfrute de nuestras instalaciones de primera clase, incluyendo piscina infinita, restaurante gourmet, y
                acceso directo a la playa. Nuestro personal está dedicado a hacer de su visita una experiencia
                inolvidable.
              </p>
              <p className="text-gray-700 mb-5 text-lg">
                Ya sea que visite por negocios o placer, Hotel Patito es su hogar lejos del hogar.
              </p>
              <p className="text-gray-700 mb-5 text-lg">
                Nuestro compromiso es brindarle una experiencia excepcional, donde cada detalle ha sido cuidadosamente
                pensado para su comodidad y disfrute. Desde el momento de su llegada, será recibido con la calidez y
                hospitalidad que nos caracteriza.
              </p>

              <div className="mt-8 flex gap-4">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">Conocer más sobre nosotros</Button>
                <Button variant="outline" className="border-teal-600 text-teal-700 hover:bg-teal-50">
                  Ver galería
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>
    </>
  )
}

