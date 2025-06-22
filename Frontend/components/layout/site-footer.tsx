import Link from "next/link"
import { WaterWave } from "@/components/ui/water-wave"
import { hotelInfo } from "@/lib/data"

export function SiteFooter() {
  return (
    <footer className="bg-teal-100 text-teal-800 py-6 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            Copyright © {hotelInfo.name} {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="/politica-privacidad" className="text-sm hover:underline">
              Política de Privacidad
            </Link>
            <Link href="/terminos-condiciones" className="text-sm hover:underline">
              Términos y Condiciones
            </Link>
            <Link
              href="/admin"
              className="text-sm font-medium text-teal-700 hover:underline flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Administración
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-12 opacity-10">
        <WaterWave color="#0d9488" />
      </div>
    </footer>
  )
}
