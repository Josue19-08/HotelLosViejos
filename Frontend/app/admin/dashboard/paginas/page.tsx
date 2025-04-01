"use client"

import { useState } from "react"
import Link from "next/link"
import { FileEdit, Home, Info, BookOpen, MapPin } from "lucide-react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminFooter } from "@/components/admin/admin-footer"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { UserWelcome } from "@/components/admin/user-welcome"
import { Card } from "@/components/ui/card"

// Definición de las páginas que se pueden modificar
const paginas = [
  {
    id: "home",
    nombre: "Home",
    icono: <Home size={20} />,
    ruta: "/",
    descripcion: "Página principal del sitio web",
  },
  {
    id: "sobre-nosotros",
    nombre: "Sobre Nosotros",
    icono: <Info size={20} />,
    ruta: "/sobre-nosotros",
    descripcion: "Información sobre el hotel y su historia",
  },
  {
    id: "facilidades",
    nombre: "Facilidades",
    icono: <BookOpen size={20} />,
    ruta: "/facilidades",
    descripcion: "Servicios y comodidades que ofrece el hotel",
  },
  {
    id: "como-llegar",
    nombre: "Como llegar",
    icono: <MapPin size={20} />,
    ruta: "/como-llegar",
    descripcion: "Ubicación y direcciones para llegar al hotel",
  },
]

export default function ModificarPaginasPage() {
  const [username] = useState("USUARIO")

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <AdminHeader showWelcome={false} />
          <UserWelcome username={username} />
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8">
          <AdminSidebar />

          <div className="space-y-6">
            <Card className="p-6 border rounded-md">
              <div className="flex items-center gap-3 mb-6">
                <FileEdit className="h-6 w-6 text-teal-600" />
                <h1 className="text-2xl font-playfair font-bold text-teal-800">Modificar Páginas</h1>
              </div>

              <div className="mb-8">
                <p className="text-gray-600 text-lg">Seleccione la página que desea modificar</p>
              </div>

              <div className="space-y-4">
                {paginas.map((pagina) => (
                  <Link key={pagina.id} href={`/admin/dashboard/paginas/${pagina.id}`} className="block">
                    <div className="border rounded-lg p-4 bg-white hover:bg-teal-50 hover:border-teal-200 transition-all duration-300 hover:shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="text-teal-600 bg-teal-50 p-3 rounded-full">{pagina.icono}</div>
                        <div>
                          <h3 className="font-medium text-gray-800 text-lg">{pagina.nombre}</h3>
                          <p className="text-sm text-gray-500">{pagina.descripcion}</p>
                        </div>
                        <div className="ml-auto">
                          <span className="text-blue-500 hover:text-blue-600 hover:underline text-sm font-medium">
                            Editar →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            <Card className="p-6 border rounded-md bg-amber-50">
              <h2 className="text-lg font-medium text-amber-800 mb-3">Información importante</h2>
              <p className="text-amber-700 text-sm">
                Los cambios realizados en las páginas serán visibles inmediatamente para todos los visitantes del sitio.
                Asegúrese de revisar cuidadosamente el contenido antes de guardar los cambios.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  )
}

