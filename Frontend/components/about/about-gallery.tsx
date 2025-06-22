import { ImageGallery } from "@/components/ui/image-gallery"
import type { GalleryImage } from "@/types"
import { GaleriaBase } from "@/types/Galeria"

interface AboutGalleryProps {
  images: GaleriaBase[]
}

export function AboutGallery({ images }: AboutGalleryProps) {
  return (
    <section>
      <h2 className="text-2xl font-playfair font-bold text-teal-700 mb-6">Nuestra Galería</h2>

      <ImageGallery images={images} />
    </section>
  )
}
