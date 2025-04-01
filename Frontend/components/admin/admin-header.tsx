"use client"

import Image from "next/image"
import { hotelInfo } from "@/lib/data"

interface AdminHeaderProps {
  showWelcome?: boolean
}

export function AdminHeader({ showWelcome = true }: AdminHeaderProps) {
  return (
    <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 sm:h-20 sm:w-20">
            <Image
              src={hotelInfo.logo || "/placeholder.svg"}
              alt={`Logo ${hotelInfo.name}`}
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-amber-800">{hotelInfo.name}</h1>
            {showWelcome ? (
              <p className="text-sm text-gray-600">Módulo Administrativo</p>
            ) : (
              <span className="ml-1 text-sm text-gray-600">Módulo Administrativo</span>
            )}
          </div>
        </div>

        {/* Futuro: espacio para info del usuario o botón de cerrar sesión */}
        {/* <div className="text-sm text-gray-600">Usuario: admin</div> */}
      </div>
    </header>
  )
}
