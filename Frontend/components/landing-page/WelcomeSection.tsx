
"use client"; 
import Image from "next/image"
import { ParallaxSection } from "@/components/ui/parallax-section"
import { getAllInformation } from "@/lib/Informacion"
import type { InformacionBase } from "@/types/Informacion"
import { useEffect } from "react"

interface WelcomeSectionProps {
  content: {
    title: string
    paragraphs: string[]
    image: {
      src: string
      alt: string
    }
    primaryButton: {
      text: string
      href: string
    }
    secondaryButton: {
      text: string
      href: string
    }
  }
}

export function WelcomeSection({ content }: WelcomeSectionProps) {

  const { title, paragraphs, image } = content

  console.log("Inicio de la aplicación")
    useEffect(() => {
    
        async function fetchData() {
          try {
            const data = await getAllInformation()
            console.log("Información obtenida:", data)
          } catch (error) {
            console.error("Error al obtener información:", error)
          }
        }
    
        fetchData()
      }, [])
  // const [informacion, setInformacion] = useState<InformacionBase[] | null>(null)

   // Se ejecuta solo al montar el componente

  return (
    <ParallaxSection>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative h-[450px] md:h-full overflow-hidden group">
            <Image
              src={image.src || "/placeholder.svg?height=600&width=800"}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="p-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-teal-700 mb-6">{title}</h2>

            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-5 text-lg">
                {paragraph}
              </p>
            ))}

          </div>
        </div>
      </div>
    </ParallaxSection>
  )
}
