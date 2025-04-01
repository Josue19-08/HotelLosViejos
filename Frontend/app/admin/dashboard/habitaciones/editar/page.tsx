"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Hotel, Save, ArrowLeft, Upload } from "lucide-react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminFooter } from "@/components/admin/admin-footer"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { UserWelcome } from "@/components/admin/user-welcome"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MultiSelect } from "@/components/admin/rooms/multi-select"

// Datos de ejemplo para las habitaciones
const habitacionesData = {
  standard: {
    descripcion:
      "Lorem ipsum dolor sit amet, maiores ornare ac fermentum, imperdiet ut vivamus a, nam lectus at nunc. Cum quam euismod sem, semper ut potenti pellentesque quisque. In eget sapien sed, sit duis vestibulum ultricies, placerat morbi amet vel, nullam in in lorem vel. In molestie elit dui dictum, praesent nascetur pulvinar sed, in dolor pede in aliquam, risus nec error quis pharetra.",
    tarifa: 120,
    imagen: "/placeholder.svg?height=200&width=300",
    caracteristicas: ["wifi", "tv", "aire"],
  },
  junior: {
    descripcion:
      "Habitación Junior con espacio adicional y vistas parciales al mar. Incluye una cama king size, baño privado con amenidades premium, aire acondicionado, TV de pantalla plana y acceso a WiFi de alta velocidad.",
    tarifa: 180,
    imagen: "/placeholder.svg?height=200&width=300",
    caracteristicas: ["wifi", "tv", "aire", "minibar", "vista"],
  },
  deluxe: {
    descripcion:
      "Habitación Deluxe con vistas panorámicas al océano. Incluye una cama king size, sala de estar, baño privado con jacuzzi, aire acondicionado, TV de pantalla plana, minibar y acceso a WiFi de alta velocidad.",
    tarifa: 250,
    imagen: "/placeholder.svg?height=200&width=300",
    caracteristicas: ["wifi", "tv", "aire", "minibar", "vista", "jacuzzi", "sala"],
  },
}

// Lista de todas las características posibles
const todasLasCaracteristicas = [
  { value: "wifi", label: "WiFi" },
  { value: "tv", label: "TV" },
  { value: "aire", label: "Aire acondicionado" },
  { value: "minibar", label: "Minibar" },
  { value: "vista", label: "Vista al mar" },
  { value: "jacuzzi", label: "Jacuzzi" },
  { value: "sala", label: "Sala de estar" },
  { value: "balcon", label: "Balcón" },
  { value: "desayuno", label: "Desayuno incluido" },
  { value: "caja", label: "Caja fuerte" },
]

export default function EditarHabitacionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tipo = searchParams.get("tipo") || ""
  const numero = searchParams.get("numero") || ""

  const [username] = useState("USUARIO")
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    descripcion: "",
    tarifa: 0,
    imagen: "",
    caracteristicas: [] as string[],
  })
  const [filePreview, setFilePreview] = useState("")
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setFormData((prev) => ({
      ...prev,
      imagen: url,
    }))
    setFilePreview(url)
  }

  // Cargar datos iniciales
  useEffect(() => {
    if (tipo && habitacionesData[tipo as keyof typeof habitacionesData]) {
      setFormData(habitacionesData[tipo as keyof typeof habitacionesData])
      setFilePreview(habitacionesData[tipo as keyof typeof habitacionesData].imagen)
    }
  }, [tipo])

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tarifa" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  // Manejar cambio de características
  const handleCaracteristicasChange = (selectedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      caracteristicas: selectedValues,
    }))
  }

  // Manejar selección de archivo
  // Guardar cambios
  const handleSave = async () => {
    setIsSaving(true)

    // Simulación de guardado
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Aquí iría la lógica real para guardar los cambios en la base de datos
    console.log("Guardando cambios:", {
      tipo,
      numero,
      ...formData,
      imagen: formData.imagen,
    })

    setIsSaving(false)

    // Mostrar mensaje de éxito y volver a la lista
    alert("Cambios guardados correctamente")
    router.push("/admin/dashboard/habitaciones")
  }

  // Volver a la lista de habitaciones
  const handleBack = () => {
    router.push("/admin/dashboard/habitaciones")
  }

  // Obtener título según el tipo
  const getTipoTitulo = () => {
    const tipos = {
      standard: "Standard",
      junior: "Junior",
      deluxe: "Deluxe",
    }
    return tipos[tipo as keyof typeof tipos] || tipo
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
            <Card className="p-6 border rounded-md">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Hotel className="h-6 w-6 text-teal-600" />
                  <h1 className="text-2xl font-playfair font-bold text-teal-800">Modificar Habitación</h1>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Volver
                  </Button>

                  <Button
                    className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Guardar cambios
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-medium text-gray-800">{getTipoTitulo()}</h2>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="tarifa" className="whitespace-nowrap">
                      Tarifa Diaria:
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                      <Input
                        id="tarifa"
                        name="tarifa"
                        type="number"
                        value={formData.tarifa}
                        onChange={handleChange}
                        className="pl-7 w-24"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <div className="border rounded-md">
                    <Textarea
                      id="descripcion"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleChange}
                      rows={8}
                      className="min-h-[200px] resize-y"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Características</Label>
                  <MultiSelect
                    options={todasLasCaracteristicas}
                    selected={formData.caracteristicas}
                    onChange={handleCaracteristicasChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Imagen actual</Label>
                    <div className="border rounded-md overflow-hidden bg-gray-50 flex items-center justify-center h-[200px]">
                      {filePreview ? (
                        <img
                          src={filePreview || "/placeholder.svg"}
                          alt="Imagen de habitación"
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <span className="text-sm">No hay imagen</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Subir nueva imagen</Label>
                    <div className="border rounded-md p-4 bg-gray-50">
                      <div className="flex items-center gap-2 mb-4">
                        <Input
                          id="imagen"
                          type="text"
                          placeholder="https://ejemplo.com/imagen.jpg"
                          value={formData.imagen}
                          onChange={handleImageUrlChange}
                          className="flex-1"
                        />

                      </div>

                      <div className="flex justify-end gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, imagen: "" }))
                            setFilePreview("")
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-700"
                          onClick={() => setFilePreview(formData.imagen)}
                        >
                          Aceptar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  )
}

