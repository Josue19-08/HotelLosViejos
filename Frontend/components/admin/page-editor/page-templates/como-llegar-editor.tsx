"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, MapIcon, Save } from "lucide-react";
import { useContacto } from "@/hooks/use-contacto";
import { Textarea } from "@/components/ui/textarea";
import { updateContact } from "@/lib/ContactoData";
import { ContactoBase } from "@/types/Contacto";

export function ComoLlegarEditor() {

  const contacto = useContacto();


  const [data, setData] = useState<ContactoBase>({
    id: contacto.id,
    correo: contacto.correo,
    telefono: contacto.telefono,
    codigoPostal: contacto.codigoPostal,
    direccion: contacto.direccion,
    latitud: contacto.latitud,
    longitud: contacto.longitud
  });

  useEffect(() => {
    if (contacto && JSON.stringify(data) !== JSON.stringify(contacto)) {
      setData({ ...contacto }); // Solo actualiza si los datos cambiaron realmente
    }
  }, [contacto]);

  const [isSaving, setIsSaving] = useState(false)


  const handleSave = async () => {
    setIsSaving(true)

    updateContact(data);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSaving(false)
    alert("Cambios guardados con éxito");
    window.location.reload();
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
  
    // Actualiza directamente la propiedad en data sin intentar acceder a `coordenadas`
    const newData = { ...data, [name]: value };
  
    setData(newData);
    // onChange(newData);
  };

  const handleVerificarCoordenadas = () => {
    // Abrir Google Maps con las coordenadas actuales
    const url = `https://www.google.com/maps?q=${Number(data.latitud)},${Number(data.longitud)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="border-t pt-6">
        <h2 className="text-xl font-medium text-gray-800 mb-4">
          Información de contacto
        </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="direccion"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"
            >
              <MapPin size={16} />
              Dirección completa
            </label>
            {/* <Input
              id="direccion"
              name="direccion"
              value={direccion}
              onChange={handleChange}
              className="w-full"
              placeholder="Ej: San Francisco de Coyote, Guanacaste, Costa Rica"
            /> */}

            <Textarea
              id="direccion"
              name="direccion"
              value={data.direccion}
              onChange={handleChange}
              className="w-full"
              placeholder="Ej: San Francisco de Coyote, Guanacaste, Costa Rica"
              rows={10}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="telefono"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"
              >
                <Phone size={16} />
                Teléfono
              </label>
              <Input
                id="telefono"
                name="telefono"
                value={data.telefono}
                onChange={handleChange}
                className="w-full"
                placeholder="Ej: +506 2222-3333"
              />
            </div>

            <div>
              <label
                htmlFor="correo"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"
              >
                <Mail size={16} />
                Correo electrónico
              </label>
              <Input
                id="correo"
                name="correo"
                value={data.correo}
                onChange={handleChange}
                className="w-full"
                placeholder="Ej: info@hotellosviejo.com"
                type="email"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="codigoPostal"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"
            >
              <MapIcon size={16} />
              Código Postal
            </label>
            <Input
              id="codigoPostal"
              name="codigoPostal"
              value={data.codigoPostal}
              onChange={handleChange}
              className="w-full"
              placeholder="Ej: 50101"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-xl font-medium text-gray-800 mb-4">
          Ubicación en el mapa
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="latitud"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Latitud
              </label>
              <Input
                id="latitud"
                name="latitud"
                value={data.latitud}
                onChange={handleChange}
                className="w-full"
                placeholder="Ej: 9.7489"
              />
            </div>
            <div>
              <label
                htmlFor="longitud"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Longitud
              </label>
              <Input
                id="longitud"
                name="longitud"
                value={data.longitud}
                onChange={handleChange}
                className="w-full"
                placeholder="Ej: -85.2755"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleVerificarCoordenadas}
              className="flex items-center gap-2"
            >
              <MapPin size={16} />
              Verificar coordenadas en Google Maps
            </Button>
          </div>
        </div>

        <Button 
          
          onClick={handleSave}
          className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2"
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
              <Save size={16} />
              Guardar cambios
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
