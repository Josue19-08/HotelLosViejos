"use client"

import { useState } from "react"
import { Image, Plus, Search } from "lucide-react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminFooter } from "@/components/admin/admin-footer"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { UserWelcome } from "@/components/admin/user-welcome"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PublicidadList } from "@/components/admin/publicidad/publicidad-list"
import { PublicidadForm } from "@/components/admin/publicidad/publicidad-form"

// Tipo para los datos de publicidad
export interface Publicidad {
  id: string
  titulo: string
  imagenUrl: string
  linkDestino: string
}

// Datos de ejemplo para publicidades
const publicidadesIniciales: Publicidad[] = [
  {
    id: "pub-1",
    titulo: "Oferta Especial Verano",
    imagenUrl: "/placeholder.svg?height=300&width=500",
    linkDestino: "https://ejemplo.com/oferta-verano",
  },
  {
    id: "pub-2",
    titulo: "Descuento en Reservas Anticipadas",
    imagenUrl: "/placeholder.svg?height=300&width=500",
    linkDestino: "https://ejemplo.com/reservas-anticipadas",
  },
  {
    id: "pub-3",
    titulo: "Promoción Fin de Semana",
    imagenUrl: "/placeholder.svg?height=300&width=500",
    linkDestino: "https://ejemplo.com/promo-finde",
  },
]

export default function PublicidadPage() {
  const [username] = useState("USUARIO")
  const [publicidades, setPublicidades] = useState<Publicidad[]>(publicidadesIniciales)
  const [showForm, setShowForm] = useState(false)
  const [currentPublicidad, setCurrentPublicidad] = useState<Publicidad | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar publicidades según el término de búsqueda
  const filteredPublicidades = publicidades.filter((pub) => pub.titulo.toLowerCase().includes(searchTerm.toLowerCase()))

  // Manejar creación de nueva publicidad
  const handleAddNew = () => {
    setCurrentPublicidad(null)
    setShowForm(true)
  }

  // Manejar edición de publicidad existente
  const handleEdit = (publicidad: Publicidad) => {
    setCurrentPublicidad(publicidad)
    setShowForm(true)
  }

  // Manejar eliminación de publicidad
  const handleDelete = (id: string) => {
    if (window.confirm("¿Está seguro que desea eliminar esta publicidad?")) {
      setPublicidades(publicidades.filter((pub) => pub.id !== id))
    }
  }

  // Manejar guardado de publicidad (nueva o editada)
  const handleSave = (publicidad: Publicidad) => {
    if (currentPublicidad) {
      // Actualizar existente
      setPublicidades(publicidades.map((pub) => (pub.id === publicidad.id ? publicidad : pub)))
    } else {
      // Crear nueva
      const newPublicidad = {
        ...publicidad,
        id: `pub-${Date.now()}`,
      }
      setPublicidades([...publicidades, newPublicidad])
    }
    setShowForm(false)
  }

  // Manejar cancelación del formulario
  const handleCancel = () => {
    setShowForm(false)
  }

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
            {showForm ? (
              <Card className="p-6 border rounded-md">
                <div className="flex items-center gap-3 mb-6">
                  <Image className="h-6 w-6 text-teal-600" />
                  <h1 className="text-2xl font-playfair font-bold text-teal-800">
                    {currentPublicidad ? "Editar Publicidad" : "Nueva Publicidad"}
                  </h1>
                </div>

                <PublicidadForm publicidad={currentPublicidad} onSave={handleSave} onCancel={handleCancel} />
              </Card>
            ) : (
              <Card className="p-6 border rounded-md">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Image className="h-6 w-6 text-teal-600" />
                    <h1 className="text-2xl font-playfair font-bold text-teal-800">Administrar Publicidad</h1>
                  </div>

                  <Button onClick={handleAddNew} className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Nueva Publicidad
                  </Button>
                </div>

                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Buscar publicidad..."
                      className="pl-10 pr-4 py-2 w-full border rounded-md"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <PublicidadList publicidades={filteredPublicidades} onEdit={handleEdit} onDelete={handleDelete} />
              </Card>
            )}
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  )
}

