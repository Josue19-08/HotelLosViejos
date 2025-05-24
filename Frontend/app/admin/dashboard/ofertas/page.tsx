"use client"

import { Search, Plus, Trash2 } from "lucide-react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminFooter } from "@/components/admin/admin-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useAdminOfertas } from "@/hooks/use-admin-ofertas"

export default function GestionarOfertasPage() {
  const {
    altaPercentage,
    bajaPercentage,
    setAltaPercentage,
    setBajaPercentage,
    newOfferDescription,
    setNewOfferDescription,
    newOfferPercentage,
    setNewOfferPercentage,
    newOfferApplies,
    setNewOfferApplies,
    offers,
    addOffer,
    updateOffer,
    removeOffer,
  } = useAdminOfertas()

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
                      <Input id="alta" value={altaPercentage} onChange={(e) => setAltaPercentage(e.target.value)} placeholder="0" className="pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="baja">BAJA</Label>
                    <div className="relative">
                      <Input id="baja" value={bajaPercentage} onChange={(e) => setBajaPercentage(e.target.value)} placeholder="0" className="pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* OFERTAS */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">OFERTAS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* NUEVA OFERTA */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <Input value={newOfferDescription} onChange={(e) => setNewOfferDescription(e.target.value)} placeholder="Descripción" />
                  <div className="relative">
                    <Input value={newOfferPercentage} onChange={(e) => setNewOfferPercentage(e.target.value)} placeholder="0" className="pr-8" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                  <Select value={newOfferApplies} onValueChange={setNewOfferApplies}>
                    <SelectTrigger><SelectValue placeholder="Todas, estándar, junior" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todas, estándar, junior">Todas</SelectItem>
                      <SelectItem value="Solo estándar">Solo estándar</SelectItem>
                      <SelectItem value="Solo junior">Solo junior</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="md:col-span-3 flex justify-end">
                    <Button onClick={addOffer} className="bg-teal-600 hover:bg-teal-700">
                      <Plus className="w-4 h-4 mr-2" /> Agregar Oferta
                    </Button>
                  </div>
                </div>

                {/* LISTADO */}
                <Separator />
                <div className="space-y-4">
                  {offers.map((offer, index) => (
                    <div key={offer.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-800">Oferta {index + 1}</h4>
                        {offers.length > 1 && (
                          <Button variant="outline" size="sm" onClick={() => removeOffer(offer.id)} className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input value={offer.description} onChange={(e) => updateOffer(offer.id, "description", e.target.value)} placeholder="Descripción" />
                        <div className="relative">
                          <Input value={offer.percentage} onChange={(e) => updateOffer(offer.id, "percentage", e.target.value)} placeholder="0" className="pr-8" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                        </div>
                        <Select value={offer.applies} onValueChange={(v) => updateOffer(offer.id, "applies", v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Todas, estándar, junior">Todas</SelectItem>
                            <SelectItem value="Solo estándar">Solo estándar</SelectItem>
                            <SelectItem value="Solo junior">Solo junior</SelectItem>
                            <SelectItem value="Solo suites">Solo suites</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {index < offers.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline">Cancelar</Button>
              <Button className="bg-teal-600 hover:bg-teal-700">Guardar Cambios</Button>
            </div>
          </div>
        </div>
      </main>

      <AdminFooter className="print:hidden" />
    </div>
  )
}
