import { useEffect, useState } from "react"
import { FacilidadBase } from "@/types/Facilidad"
import { useFacilidad } from "@/hooks/use-facilidades"

interface FacilidadesData {
  facilidades: FacilidadBase[]
}

export function FacilidadesPreview() {
  const { facilidades } = useFacilidad()
  const [data, setData] = useState<FacilidadesData>({ facilidades: [] })

  // Este useEffect actualiza el estado cuando se cargan las facilidades
  useEffect(() => {
    if (facilidades && facilidades.length > 0) {
      setData({ facilidades })
    }
  }, [facilidades])

  return (
    <div className="bg-white border rounded-md overflow-hidden">
      <div className="p-6">
        <h1 className="text-3xl font-playfair font-bold text-teal-700 mb-8">Facilidades</h1>

        <div className="space-y-6">
          {data.facilidades.length > 0 ? (
            data.facilidades.map((facilidad) => (
              <div key={facilidad.id || facilidad._uuid} className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]">
                  <div className="h-full">
                    <img
                      src={facilidad.nombreImagen || "/placeholder.svg?height=300&width=400"}
                      alt={facilidad.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-medium text-teal-700 mb-3">
                      {facilidad.titulo || "Nombre de la facilidad"}
                    </h2>
                    <p className="text-gray-700">{facilidad.descripcion || "Descripción de la facilidad..."}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">No hay facilidades para mostrar</div>
          )}
        </div>
      </div>
    </div>
  )
}

