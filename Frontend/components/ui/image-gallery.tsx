"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import type { GalleryImage } from "@/types"
import { GaleriaBase } from "@/types/Galeria"

interface ImageGalleryProps {
  images: GaleriaBase[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  // Establecer la primera imagen como la seleccionada inicialmente
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Asegurarse de que hay imágenes disponibles
  if (!images || images.length === 0) {
    return <div>No hay imágenes disponibles</div>
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Imagen principal grande (ocupa 2 columnas en desktop) */}
        <div className="md:col-span-2 aspect-[4/3] overflow-hidden rounded-lg">
          <div className="relative w-full h-full cursor-pointer" onClick={() => setLightboxOpen(true)}>
            <Image
              src={images[selectedImageIndex].nombreImagen || "/placeholder.svg?height=600&width=800"}
              alt={images[selectedImageIndex].descripcion || "Imagen de galería"}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
        </div>

        {/* Galería de miniaturas a la derecha */}
        <div className="md:col-span-1 flex flex-col space-y-4 h-full">
          <h3 className="font-playfair text-lg font-semibold text-teal-700 mb-2">Explora nuestras imágenes</h3>

          <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-[400px] pr-2">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={cn(
                  "aspect-square overflow-hidden rounded-md cursor-pointer transition-all duration-200",
                  selectedImageIndex === index ? "ring-2 ring-teal-500 ring-offset-2" : "opacity-80 hover:opacity-100",
                )}
                onClick={() => setSelectedImageIndex(index)}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.nombreImagen || "/placeholder.svg?height=200&width=200"}
                    alt={image.descripcion || "Imagen de galería"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <p className="text-sm text-gray-600 italic">{images[selectedImageIndex].descripcion}</p>
          </div>
        </div>
      </div>

      {/* Modal para ver imagen ampliada */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-transparent border-none">
          <div className="relative w-full" style={{ height: "80vh" }}>
            <Image
              src={images[selectedImageIndex].nombreImagen || "/placeholder.svg?height=800&width=1200"}
              alt={images[selectedImageIndex].descripcion || "Imagen de galería"}
              fill
              className="object-contain"
            />

            {/* Navegación del lightbox */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
              }}
            >
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
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
              }}
            >
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
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

