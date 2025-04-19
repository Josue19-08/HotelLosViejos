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

import { updateHabitaciones, registerHabitaciones } from "@/lib/HabitacionData"
import { MultiSelect } from "@/components/admin/rooms/multi-select"
import { useHabitacion, useCaracteristisca  } from "@/hooks/use-habitacion"



export default function EditarHabitacionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tipo = searchParams.get("tipo") || ""
  const numero = searchParams.get("numero") || ""
 const habitaciones = useHabitacion()
 const caracteristica = useCaracteristisca()

// Asegúrate de que cada caracteristica tenga un `id` y `titulo` correctos.
const todasLasCaracteristicas = caracteristica.map((c) => ({
  value: c.id,        // Usamos un valor único (id) como value
  label: c.titulo,    // Lo que se muestra en la interfaz
  data: c             // El objeto completo para referencia
}));

  const [username] = useState("USUARIO")
  const [isSaving, setIsSaving] = useState(false)


   const [formData, setFormData] = useState({
       id: "",
       tarifaDiariaBase: 0,
       nombreImagen: "",
       caracteristicas: [] as string[],
       numero: "",
       estado: "",
       tipo: "",
     })


  const [filePreview, setFilePreview] = useState("")
  const [imageInputValue, setImageInputValue] = useState("");
   const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Actualiza el valor temporal mientras el usuario escribe
      setImageInputValue(e.target.value);
    };

    const handleAcceptClick = () => {
      // Actualiza la previsualización y formData al presionar "Aceptar"
      setFilePreview(imageInputValue); // Actualiza la previsualización de la imagen
      setFormData((prev) => ({ ...prev, nombreImagen: imageInputValue })); // Actualiza formData
      console.log("Nuevo valor de imagen:", imageInputValue);  // Agrega este log para verificar
    };


   useEffect(() => {
     if (!numero || habitaciones.length === 0) return;

     const habitacion = habitaciones.find((h) => String(h.id) === numero);

     if (habitacion) {
       setFormData({
         id: habitacion.id || 0,
         tarifaDiariaBase: habitacion.tarifaDiariaBase || 0,
         nombreImagen: habitacion.nombreImagen || "",
        caracteristicas: (habitacion.caracteristicas || []).map((c: any) => c.id),
         numero: habitacion.numero || "",
         estado: habitacion.estado || "",
         tipo: habitacion.tipo || "",
       });
       setFilePreview(habitacion.nombreImagen || "");
     }
   }, [habitaciones, numero]);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tarifaDiariaBase" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  // Manejar cambio de características
  const handleCaracteristicasChange = (selectedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      caracteristicas: selectedValues,
    }))
  }

const handleSave = async () => {
  setIsSaving(true);



  const habitacionData: any = {
      id: formData.id,
      numero: Number(formData.numero),
      tarifaDiariaBase: formData.tarifaDiariaBase,
      nombreImagen: formData.nombreImagen,
      estado: formData.estado,
      tipo: formData.tipo,
      caracteristicasIds: formData.caracteristicas

   }


console.log("Datos que se van a guardar:", habitacionData);

  if (!formData.numero || !formData.estado || !formData.tipo || !formData.tarifaDiariaBase) {
    alert("Por favor completa todos los campos obligatorios.");
    setIsSaving(false);
    return;
  }

 if (formData.id) {
    await updateHabitaciones( habitacionData );
  } else {
    await registerHabitaciones(habitacionData);
  }

  alert("Cambios guardados correctamente");
  router.push("/admin/dashboard/habitaciones");
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
                        name="tarifaDiariaBase"
                        type="number"
                        value={formData.tarifaDiariaBase}
                        onChange={handleChange}
                        className="pl-7 w-24"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                                  <Label htmlFor="numero">Número de habitación</Label>
                                  <Input
                                    id="numero"
                                    name="numero"
                                    type="number"
                                    value={formData.numero}
                                    onChange={handleChange}
                                    className="w-32"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="estado">Estado</Label>
                                  <select
                                    id="estado"
                                    name="estado"
                                    value={formData.estado}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2"
                                  >
                                    <option value="">Selecciona un estado</option>
                                                                        <option value="LIBRE">Libre</option>
                                                                        <option value="OCUPADA">Ocupada</option>
                                                                        <option value="MANTENIMIENTO">En mantenimiento</option>
                                                                        <option value="LIMPIEZA">En Limpieza</option>
                                                                        <option value="DESHABILITADA">Deshabilitada</option>
                                  </select>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="tipo">Tipo de habitación</Label>
                                  <select
                                    id="tipo"
                                    name="tipo"
                                    value={formData.tipo}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2"
                                  >
                                    <option value="">Selecciona un tipo</option>
                                                                        <option value="ESTANDAR">Estándar</option>
                                                                        <option value="JUNIOR">Junior</option>
                                  </select>
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
                          src={filePreview}
                          onError={() => setFilePreview("/placeholder.svg")}
                          alt="Imagen de habitación"
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-400">Sin imagen</div>
                      )}

                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Subir nueva imagen</Label>
                    <div className="border rounded-md p-4 bg-gray-50">
                      <div className="flex items-center gap-2 mb-4">
                        <Input
                          id="nombreImagen"
                          name="nombreImagen"
                          placeholder="https://ejemplo.com/imagen.jpg"
                          value={imageInputValue}
                          onChange={handleImageUrlChange}
                          className="flex-1"
                        />

                      </div>

                      <div className="flex justify-end gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, nombreImagen: "" }))
                            setFilePreview("")
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button
                                      size="sm"
                                      className="bg-teal-600 hover:bg-teal-700"
                                      onClick={handleAcceptClick} // Actualiza la imagen de previsualización y formData
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

