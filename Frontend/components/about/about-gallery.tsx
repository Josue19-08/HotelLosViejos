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

/*
// EJEMPLO DE IMPLEMENTACIÓN CON PAGINACIÓN Y CARGA DINÁMICA

"use client"

import { useState, useEffect } from "react"
import { ImageGallery } from "@/components/ui/image-gallery"
import { GalleryImage } from "@/types"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'

interface AboutGalleryProps {
  initialImages: GalleryImage[];
  totalPages: number;
}

export function AboutGallery({ initialImages, totalPages }: AboutGalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  async function loadMoreImages() {
    if (currentPage >= totalPages) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(`/api/gallery?page=${nextPage}&limit=6`);
      
      if (!response.ok) {
        throw new Error('Error al cargar más imágenes');
      }
      
      const data = await response.json();
      
      // Añadir nuevas imágenes al estado
      setImages(prevImages => [
        ...prevImages,
        ...data.items.map(item => ({
          id: item.id.toString(),
          src: item.imageUrl,
          alt: item.description || 'Imagen de galería',
          width: item.width || 800,
          height: item.height || 600,
          featured: item.featured || false
        }))
      ]);
      
      setCurrentPage(nextPage);
    } catch (err) {
      setError('No se pudieron cargar más imágenes. Intente nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <section>
      <h2 className="text-2xl font-playfair font-bold text-teal-700 mb-6">
        Nuestra Galería
      </h2>
      
      <ImageGallery images={images} />
      
      {currentPage < totalPages && (
        <div className="mt-6 text-center">
          <Button 
            onClick={loadMoreImages} 
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando...
              </>
            ) : (
              'Cargar más imágenes'
            )}
          </Button>
          
          {error && (
            <p className="text-red-500 mt-2 text-sm">{error}</p>
          )}
        </div>
      )}
    </section>
  )
}
*/

