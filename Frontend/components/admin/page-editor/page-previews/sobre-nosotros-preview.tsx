import { useGaleria } from "@/hooks/use-galeria";
import { useInformacion } from "@/hooks/use-informacion";

interface ImagenGaleria {
  id: string;
  url: string;
  titulo?: string;
}

export function SobreNosotrosPreview() {
  const { galerias } = useGaleria();
  const { textoSobreNosotros } = useInformacion();
  return (
    <div className="bg-white border rounded-md overflow-hidden">
      <div className="p-6">
        <h1 className="text-3xl font-playfair font-bold text-teal-700 mb-6">
          Sobre Nosotros
        </h1>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <p className="text-gray-700 whitespace-pre-line">
            {textoSobreNosotros || "Texto sobre nosotros..."}
          </p>
        </div>

        <h2 className="text-2xl font-playfair font-medium text-teal-700 mb-4">
          Nuestra Galería
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
          <div className="rounded-md overflow-hidden">
            <img
              src={
                galerias[0]?.nombreImagen ||
                "/placeholder.svg?height=400&width=600"
              }
              alt="Imagen principal"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="bg-white p-4 rounded-md">
            <h3 className="text-lg font-medium text-teal-700 mb-3">
              Explora nuestras imágenes
            </h3>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
              {galerias.length > 0 ? (
                galerias.slice(1).map((imagen) => (
                  <div key={imagen.id} className="mb-2">
                    <img
                      src={imagen.nombreImagen || "/placeholder.svg"}
                      alt={imagen.descripcion || "Imagen de galería"}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    {imagen.descripcion && (
                      <p className="text-sm text-gray-600 mt-1">
                        {imagen.descripcion}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No hay imágenes en la galería
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
