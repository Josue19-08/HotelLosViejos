"use client";

import type React from "react";

import { useState, use, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageEditor } from "../image-editor";
import { InformacionBase } from "@/types/Informacion";
import { useInformacion } from "@/hooks/use-informacion";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateInformation } from "@/lib/Informacion";

interface HomePageData {
  titulo: string;
  subtitulo: string;
  descripcionBienvenida: string;
  imagenHero: string;
  imagenPiscina: string;
}

export function HomeEditor() {
  const info = useInformacion();

  const [data, setData] = useState<InformacionBase>({
    id: info.id,
    textoSobreNosotros: info.textoSobreNosotros,
    textoBienvenida: info.textoBienvenida,
    nombreImagenBienvenida: info.nombreImagenBienvenida,
    nombre: info.nombre,
  });

  useEffect(() => {
    if (!data.id && info.id) {
      setData({ ...info });
    }
  }, [info]);

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);

    updateInformation(data)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSaving(false);
    alert("Cambios guardados con éxito");
    window.location.reload();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newData = { ...data, [name]: value };
    setData(newData);
  };

  const handleImageChange = (field: keyof HomePageData, url: string) => {
    const newData = { ...data, [field]: url };
    setData(newData);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-700">
          Sección Bienvenida
        </h3>

        <div>
          <label
            htmlFor="textoBienvenida"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Texto de bienvenida
          </label>
          <Textarea
            id="textoBienvenida"
            name="textoBienvenida"
            value={data.textoBienvenida}
            onChange={handleChange}
            rows={8}
            className="w-full"
          />
        </div>

        <ImageEditor
          label="Imagen de la piscina"
          currentImageUrl={data.nombreImagenBienvenida || ""}
          onImageChange={(url) => handleImageChange("nombreImagenBienvenida", url)}
        />
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
  );
}
