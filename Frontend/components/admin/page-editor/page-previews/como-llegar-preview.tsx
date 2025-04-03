"use client"

import { LocationMap } from "@/components/location/location-map"
import { useContacto } from "@/hooks/use-contacto"

interface ComoLlegarData {
  direccion: string
  correo: string
  telefono: string
  codigoPostal: string
  coordenadas: {
    latitud: string
    longitud: string
  }
  instrucciones: string
}

interface ComoLlegarPreviewProps {
  data: ComoLlegarData
}

export function ComoLlegarPreview({ data }: ComoLlegarPreviewProps) {
  const contacto = useContacto();
  const coordenadasValidas = Number(contacto.latitud) !== 0 && Number(contacto.longitud) !== 0;

  return (
    <div className="bg-white border rounded-md overflow-hidden">
      <div className="p-6">
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium text-teal-700 mb-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-teal-600"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Cómo encontrarnos
            </h2>

            <p className="text-gray-700">{contacto.direccion || "Dirección no establecida"}</p>

            {(contacto.telefono || contacto.correo || contacto.codigoPostal) && (
              <div className="mt-4 space-y-2">
                {contacto.telefono && (
                  <p className="text-gray-700 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-teal-600"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    {contacto.telefono}
                  </p>
                )}

                {contacto.correo && (
                  <p className="text-gray-700 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-teal-600"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    {contacto.correo}
                  </p>
                )}

                {contacto.codigoPostal && (
                  <p className="text-gray-700 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-teal-600"
                    >
                      <path d="M21.73 18.35 20 14l-1.73 4.35a1.4 1.4 0 0 0 1.32 1.65h.82a1.4 1.4 0 0 0 1.32-1.65Z"></path>
                      <path d="M18.27 18.35 16.54 14l-1.73 4.35a1.4 1.4 0 0 0 1.32 1.65h.82a1.4 1.4 0 0 0 1.32-1.65Z"></path>
                      <path d="m2 9 2 9h16l2-9"></path>
                      <path d="M4 9h16"></path>
                      <path d="m4 9-2 9"></path>
                      <path d="m20 9 2 9"></path>
                      <path d="M15 4h2a3 3 0 0 1 3 3v2"></path>
                      <path d="M9 4H7a3 3 0 0 0-3 3v2"></path>
                    </svg>
                    Código Postal: {contacto.codigoPostal}
                  </p>
                )}
              </div>
            )}
          </div>

          {coordenadasValidas && (
            <LocationMap
              address={contacto.direccion || "Ubicación no establecida"}
              lat= {Number(contacto.latitud) || 0}
              lng= {Number(contacto.longitud) || 0}
            />
          )}

          {data.instrucciones && (
            <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
              
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
