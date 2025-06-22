"use client"

import { Search, Plus, Trash2, Pencil } from "lucide-react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminFooter } from "@/components/admin/admin-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useOferta } from "@/hooks/use-ofertas"
import { DateSelector } from "@/components/reservation/date-selector"
import { useTemporadaStore } from "@/lib/seasonData"

export default function GestionarOfertasPage() {
  const {
    altaPercentage,
    bajaPercentage,
    setAltaPercentage,
    setBajaPercentage,
  } = useTemporadaStore()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAlta = localStorage.getItem("altaPercentage")
      const storedBaja = localStorage.getItem("bajaPercentage")

      if (storedAlta !== null) setAltaPercentage(storedAlta)
      if (storedBaja !== null) setBajaPercentage(storedBaja)
    }
  }, [])

  const {
    offers,
    newOfferTitle,
    setNewOfferTitle,
    newOfferDescription,
    setNewOfferDescription,
    newOfferPercentage,
    setNewOfferPercentage,
    newOfferApplies,
    setNewOfferApplies,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    addOffer,
    updateOffer,
    removeOffer,
    saveChanges,
  } = useOferta()

  // Copia editable de ofertas para la edición en UI
  const [editedOffers, setEditedOffers] = useState<{ [id: string]: typeof offers[0] }>({})
  // Para mensajes de error simples
  const [errorMsg, setErrorMsg] = useState<string>("")

  useEffect(() => {
    const editCopy = offers.reduce((acc, offer) => {
      acc[offer.id] = { ...offer }
      return acc
    }, {} as { [id: string]: typeof offers[0] })
    setEditedOffers(editCopy)
  }, [offers])

  // Validación para porcentaje solo números y entre 0 y 100
  function handlePercentageChange(value: string, setValue: (v: string) => void) {
    // Permitir solo números y punto decimal, máximo 100
    if (/^\d{0,3}(\.\d{0,2})?$/.test(value)) {
      if (value === "" || Number(value) <= 100) {
        setValue(value)
        setErrorMsg("")
      }
    }
  }

  // Validar que todos los datos obligatorios estén y porcentaje válido
  function validateOffer(offer: typeof offers[0] | {
    titulo: string,
    descripcion: string,
    porcentaje: string,
    aplica: string,
    fechaInicio: string | Date | undefined,
    fechaFin: string | Date | undefined,
  }): string | null {
    if (!offer.titulo.trim()) return "El título es obligatorio."
    if (!offer.descripcion.trim()) return "La descripción es obligatoria."
    if (!offer.porcentaje || isNaN(Number(offer.porcentaje)) || Number(offer.porcentaje) <= 0 || Number(offer.porcentaje) > 100)
      return "El porcentaje debe ser un número entre 1 y 100."
    if (!offer.aplica) return "Debe seleccionar a qué aplica la oferta."
    if (!offer.fechaInicio) return "Debe seleccionar la fecha de inicio."
    if (!offer.fechaFin) return "Debe seleccionar la fecha de fin."
    // Fecha inicio <= fecha fin
    const inicio = new Date(offer.fechaInicio)
    const fin = new Date(offer.fechaFin)
    if (inicio > fin) return "La fecha de inicio no puede ser mayor a la fecha de fin."
    return null
  }

  // Verifica si la oferta está vigente (según fecha actual)
  function isOfferActive(offer: typeof offers[0]) {
    const today = new Date()
    const start = new Date(offer.fechaInicio)
    const end = new Date(offer.fechaFin)
    return today >= start && today <= end
  }

  // Handler para agregar nueva oferta con validación
  function handleAddOffer() {
    const newOffer = {
      titulo: newOfferTitle,
      descripcion: newOfferDescription,
      porcentaje: newOfferPercentage,
      aplica: newOfferApplies,
      fechaInicio: checkInDate ? checkInDate.toISOString() : undefined,
      fechaFin: checkOutDate ? checkOutDate.toISOString() : undefined,
    }
    const error = validateOffer(newOffer as any)
    if (error) {
      setErrorMsg(error)
      return
    }
    setErrorMsg("")
    addOffer()
  }

  // Handler para actualizar oferta con validación y control de edición si está vigente
  function handleUpdateOffer(offerId: string) {
    const offer = editedOffers[offerId]
    const error = validateOffer(offer)
    if (error) {
      setErrorMsg(error)
      return
    }
    setErrorMsg("")
    if (isOfferActive(offer)) {
      alert("No se puede modificar una oferta que está vigente.")
      return
    }
    updateOffer(offer)
  }

  // Handler para eliminar oferta con validación si está vigente
  function handleRemoveOffer(offerId: string) {
    const offer = offers.find(o => o.id === offerId)
    if (!offer) return
    if (isOfferActive(offer)) {
      alert("No se puede eliminar una oferta que está vigente.")
      return
    }
    removeOffer(offerId)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="border-b bg-white print:hidden">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <AdminHeader showWelcome={false} />
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8">
          <div className="print:hidden">
            <AdminSidebar />
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <Search className="w-6 h-6 text-teal-600" />
              <h1 className="text-2xl font-semibold text-gray-800">Gestionar Temporadas y Ofertas</h1>
            </div>

{/* TEMPORADAS */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">TEMPORADAS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="alta">ALTA</Label>
                    <div className="relative">
                      <Input id="alta" type="number" value={altaPercentage} onChange={(e) => setAltaPercentage(e.target.value)} />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="baja">BAJA</Label>
                    <div className="relative">
                      <Input id="baja" type="number" value={bajaPercentage} onChange={(e) => setBajaPercentage(e.target.value)} />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">OFERTAS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* NUEVA OFERTA */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <Input
                    value={newOfferTitle}
                    onChange={(e) => setNewOfferTitle(e.target.value)}
                    placeholder="Título"
                    required
                  />
                  <Input
                    value={newOfferDescription}
                    onChange={(e) => setNewOfferDescription(e.target.value)}
                    placeholder="Descripción"
                    required
                  />
                  <div className="relative">
                    <Input
                      value={newOfferPercentage}
                      onChange={(e) => handlePercentageChange(e.target.value, setNewOfferPercentage)}
                      placeholder="0"
                      className="pr-8"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>

                  <Select value={newOfferApplies} onValueChange={setNewOfferApplies}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todas">Todas</SelectItem>
                      <SelectItem value="ESTANDAR">Solo estándar</SelectItem>
                      <SelectItem value="JUNIOR">Solo junior</SelectItem>
                    </SelectContent>
                  </Select>

                  <DateSelector id="check-in" label="Inicio" selectedDate={checkInDate} onDateChange={setCheckInDate} />
                  <DateSelector
                    id="check-out"
                    label="Fin"
                    selectedDate={checkOutDate}
                    minDate={checkInDate}
                    onDateChange={setCheckOutDate}
                  />

                  <div className="md:col-span-3 flex justify-end">
                    <Button onClick={handleAddOffer} className="bg-teal-600 hover:bg-teal-700">
                      <Plus className="w-4 h-4 mr-2" /> Agregar Oferta
                    </Button>
                  </div>
                </div>

                {errorMsg && <p className="text-red-600 font-semibold">{errorMsg}</p>}

                {/* LISTADO */}
                <Separator />
                <div className="space-y-4">
                  {offers.length > 0 ? (
                    offers.map((offer) => {
                      const active = isOfferActive(offer)
                      return (
                        <div key={offer.id} className="space-y-4 border p-4 rounded-lg bg-white shadow-sm">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-800">{offer.titulo}</h4>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input
                              value={editedOffers[offer.id]?.titulo || ""}
                              onChange={(e) =>
                                setEditedOffers((prev) => ({
                                  ...prev,
                                  [offer.id]: { ...prev[offer.id], titulo: e.target.value },
                                }))
                              }
                              placeholder="Título"
                              disabled={active}
                              required
                            />
                            <Input
                              value={editedOffers[offer.id]?.descripcion || ""}
                              onChange={(e) =>
                                setEditedOffers((prev) => ({
                                  ...prev,
                                  [offer.id]: { ...prev[offer.id], descripcion: e.target.value },
                                }))
                              }
                              placeholder="Descripción"
                              disabled={active}
                              required
                            />
                            <div className="relative">
                              <Input
                                value={editedOffers[offer.id]?.porcentaje || ""}
                                onChange={(e) => {
                                  const val = e.target.value
                                  if (/^\d{0,3}(\.\d{0,2})?$/.test(val)) {
                                    if (val === "" || Number(val) <= 100) {
                                      setEditedOffers((prev) => ({
                                        ...prev,
                                        [offer.id]: { ...prev[offer.id], porcentaje: val },
                                      }))
                                      setErrorMsg("")
                                    }
                                  }
                                }}
                                placeholder="0"
                                className="pr-8"
                                disabled={active}
                                required
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                            </div>

                            <Select
                              value={editedOffers[offer.id]?.aplica || "Todas"}
                              onValueChange={(value) =>
                                setEditedOffers((prev) => ({
                                  ...prev,
                                  [offer.id]: { ...prev[offer.id], aplica: value },
                                }))
                              }
                              disabled={active}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Todas" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Todas">Todas</SelectItem>
                                <SelectItem value="ESTANDAR">Solo estándar</SelectItem>
                                <SelectItem value="JUNIOR">Solo junior</SelectItem>
                              </SelectContent>
                            </Select>

                            <DateSelector
                              id={`edit-start-${offer.id}`}
                              label="Inicio"
                              selectedDate={new Date(editedOffers[offer.id]?.fechaInicio || offer.fechaInicio)}
                              onDateChange={(date) =>
                                setEditedOffers((prev) => ({
                                  ...prev,
                                  [offer.id]: { ...prev[offer.id], fechaInicio: date?.toISOString() },
                                }))
                              }
                              minDate={undefined}
                              disabled={active}
                            />
                            <DateSelector
                              id={`edit-end-${offer.id}`}
                              label="Fin"
                              selectedDate={new Date(editedOffers[offer.id]?.fechaFin || offer.fechaFin)}
                              minDate={new Date(editedOffers[offer.id]?.fechaInicio || offer.fechaInicio)}
                              onDateChange={(date) =>
                                setEditedOffers((prev) => ({
                                  ...prev,
                                  [offer.id]: { ...prev[offer.id], fechaFin: date?.toISOString() },
                                }))
                              }
                              disabled={active}
                            />

                            <div className="flex space-x-2 md:col-span-3 justify-end">


                              <Dialog>
                                        <DialogTrigger asChild>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-red-600 hover:text-red-700 border-red-300"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>¿Estás seguro de que deseas eliminar esta oferta?</DialogTitle>
                                          </DialogHeader>
                                          <DialogFooter>
                                            <DialogClose asChild>
                                              <Button variant="ghost">Cancelar</Button>
                                            </DialogClose>
                                           <Button
                                                                           variant="outline"
                                                                           size="sm"
                                                                           onClick={() => handleRemoveOffer(offer.id)}
                                                                           disabled={active}
                                                                           className="bg-red-600 hover:bg-red-700 text-white"
                                                                         >
                                                                           <Trash2 className="w-4 h-4" /> Eliminar
                                                                         </Button>
                                          </DialogFooter>
                                        </DialogContent>
                                      </Dialog>


                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleUpdateOffer(offer.id)}
                                disabled={active}
                                className="flex items-center gap-1"
                              >
                                <Pencil className="w-4 h-4" /> Guardar
                              </Button>
                            </div>
                          </div>
                          {active && (
                            <p className="text-xs text-green-700 font-semibold">
                              Oferta vigente: no se puede modificar ni eliminar.
                            </p>
                          )}
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-center text-gray-500">No hay ofertas registradas.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  )
}
