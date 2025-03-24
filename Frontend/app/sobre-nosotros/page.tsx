"use client";

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Sidebar } from "@/components/layout/sidebar"
import { AboutHero } from "@/components/about/about-hero"
import { AboutContent } from "@/components/about/about-content"
import { AboutGallery } from "@/components/about/about-gallery"
import { hotelInfo, galleryImages } from "@/lib/data"
import { useInformacion } from "@/hooks/use-informacion";

export default function SobreNosotrosPage() {

  const { textoSobreNosotros } = useInformacion();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <SiteHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-[250px_1fr] gap-8">
            <Sidebar />

            <div className="space-y-12">
              <AboutHero title="Sobre Nosotros" />
              <AboutContent content={textoSobreNosotros} />
              <AboutGallery images={galleryImages} />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

