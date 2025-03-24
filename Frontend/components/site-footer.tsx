import Link from "next/link"
import { WaterWave } from "@/components/ui/water-wave"

export function SiteFooter() {
  return (
    <footer className="bg-teal-800 text-white py-6 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">Copyright © Hotel Patito {new Date().getFullYear()}</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="/politica-privacidad" className="text-sm hover:underline">
              Política de Privacidad
            </Link>
            <Link href="/terminos-condiciones" className="text-sm hover:underline">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>

      {/* Olas en el footer */}
      <div className="absolute bottom-0 left-0 right-0 h-12 opacity-10">
        <WaterWave color="#ffffff" />
      </div>
    </footer>
  )
}

