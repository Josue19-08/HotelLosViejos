"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageEditor } from "../image-editor";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, MoveUp, MoveDown, Save } from "lucide-react";
import { useInformacion } from "@/hooks/use-informacion";
import { InformacionBase } from "@/types/Informacion";
import { useGaleria } from "@/hooks/use-galeria";
import { updateInformation } from "@/lib/Informacion";

interface ImagenGaleria {
  id: string;
  url: string;
  titulo?: string;
}

interface SobreNosotrosData {
  historia: string;
  imagenPrincipal: string;
  imagenesGaleria: ImagenGaleria[];
}


export function SobreNosotrosEditor() {
  
  const info = useInformacion();

  const { galerias } = useGaleria();

  const [data, setData] = useState<InformacionBase>({
    id: info.id,
    textoSobreNosotros: info.textoSobreNosotros,
    textoBienvenida: info.textoBienvenida,
    nombre: info.nombre,
    nombreImagenBienvenida: info.nombreImagenBienvenida,
  });

  useEffect(() => {
    if (!data.id && info.id) {
      setData({ ...info });
    }
  }, [info]);

  const [isSaving, setIsSaving] = useState(false);

 

  
  const handleSave = async () => {
    setIsSaving(true);

    updateInformation(data);
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

  const handleImageChange = (field: keyof SobreNosotrosData, url: string) => {
    const newData = { ...data, [field]: url };
    setData(newData);
  };

  const handleAddImage = () => {
    const newImage: ImagenGaleria = {
      id: Date.now().toString(),
      url: "/placeholder.svg?height=200&width=300",
      titulo: "",
    };

    const newData = {
      ...data,
      imagenesGaleria: [...galerias, newImage],
    };

    setData(newData);
  };

  const handleRemoveImage = (id: Number) => {
    const newData = {
      ...data,
      imagenesGaleria: galerias.filter((img) => img.id !== id),
    };

    setData(newData);
  };

  const handleImageTitleChange = (id: number, titulo: string) => {
    const newData = {
      ...data,
      imagenesGaleria: galerias.map((img) =>
        img.id === id ? { ...img, titulo } : img
      ),
    };

    setData(newData);
  };

  const handleImageUrlChange = (id: Number, url: string) => {
    const newData = {
      ...data,
      imagenesGaleria: galerias.map((img) =>
        img.id === id ? { ...img, url } : img
      ),
    };

    setData(newData);
  };

  const moveImage = (id: Number, direction: "up" | "down") => {
    const index = galerias.findIndex((img) => img.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === galerias.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const newImagenes = [...galerias];
    const temp = newImagenes[index];
    newImagenes[index] = newImagenes[newIndex];
    newImagenes[newIndex] = temp;

    const newData = {
      ...data,
      imagenesGaleria: newImagenes,
    };

    setData(newData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium text-gray-800 mb-2">
          Contenido principal
        </h2>
        <label
          htmlFor="textoSobreNosotros"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Texto de Sobre Nosotros
        </label>
        <Textarea
          id="textoSobreNosotros"
          name="textoSobreNosotros"
          value={data.textoSobreNosotros}
          onChange={handleChange}
          rows={10}
          className="w-full"
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

      <div className="border-t pt-6">
        <div className="mb-4">
          <h2 className="text-xl font-medium text-gray-800 mb-2">
            Nuestra Galería
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen principal de la galería
            </label>
            <ImageEditor
              currentImageUrl={info.nombreImagenBienvenida || ""}
              onImageChange={(url) => handleImageChange("imagenPrincipal", url)}
            />
          </div>

          <div className="border-t pt-4 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-medium text-gray-700">
                Imágenes de la galería
              </h3>
              <Button
                type="button"
                onClick={handleAddImage}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus size={16} />
                Agregar imagen
              </Button>
            </div>

            {galerias.length === 0 ? (
              <div className="text-center py-8 border rounded-md bg-gray-50">
                <p className="text-gray-500">No hay imágenes en la galería</p>
                <Button
                  type="button"
                  onClick={handleAddImage}
                  variant="outline"
                  size="sm"
                  className="mt-2 flex items-center gap-1 mx-auto"
                >
                  <Plus size={16} />
                  Agregar imagen
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {galerias.map((imagen, index) => (
                  <div
                    key={imagen.id}
                    className="border rounded-md p-4 relative"
                  >
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-gray-500 hover:text-blue-500"
                        onClick={() => moveImage(imagen.id || 0, "up")}
                        disabled={index === 0}
                      >
                        <MoveUp size={16} />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-gray-500 hover:text-blue-500"
                        onClick={() => moveImage(imagen.id || 0, "down")}
                        disabled={index === galerias.length - 1}
                      >
                        <MoveDown size={16} />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-gray-500 hover:text-red-500"
                        onClick={() => handleRemoveImage(imagen.id || 0)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div>
                        <img
                          src={imagen.nombreImagen || "/placeholder.svg"}
                          alt={imagen.descripcion || "Imagen de galería"}
                          className="w-full h-40 object-cover rounded-md"
                        />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Título de la imagen (opcional)
                          </label>
                          <Input
                            value={imagen.descripcion || ""}
                            onChange={(e) =>
                              handleImageTitleChange(
                                imagen.id || 0,
                                e.target.value
                              )
                            }
                            placeholder="Ej: Playa, Atardecer, etc."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            URL de la imagen
                          </label>
                          <div className="flex gap-2">
                            <Input
                              value={imagen.nombreImagen}
                              onChange={(e) =>
                                handleImageUrlChange(
                                  imagen.id || 0,
                                  e.target.value
                                )
                              }
                              placeholder="URL de la imagen"
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
