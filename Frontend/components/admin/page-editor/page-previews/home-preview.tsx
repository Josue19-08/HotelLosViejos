interface HomePageData {
  titulo: string
  subtitulo: string
  descripcionBienvenida: string
  imagenHero: string
  imagenPiscina: string
}

interface HomePreviewProps {
  data: HomePageData
}

export function HomePreview({ data }: HomePreviewProps) {
  return (
    <div className="bg-white border rounded-md overflow-hidden">
      {/* Hero Section */}
      <div
        className="relative h-80 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${data.imagenHero || "/placeholder.svg?height=400&width=800"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 text-white p-8 max-w-xl">
          <h1 className="text-4xl font-playfair font-bold mb-3">{data.titulo || "Bienvenidos al Hotel Los Viejos"}</h1>
          <p className="text-lg">
            {data.subtitulo ||
              "Su paraíso en la playa le espera. Disfrute de nuestras instalaciones de lujo y la mejor vista al mar."}
          </p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="p-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src={data.imagenPiscina || "/placeholder.svg?height=400&width=600"}
                alt="Piscina del hotel"
                className="rounded-md w-full h-auto shadow-md"
              />
            </div>
            <div>
              <h2 className="text-3xl font-playfair font-bold text-teal-700 mb-4">
                Bienvenidos al Hotel Los Viejos Resort
              </h2>
              <div className="text-gray-700 space-y-4">
                <p className="whitespace-pre-line">
                  {data.descripcionBienvenida ||
                    "Ubicado en la hermosa costa, Hotel Los Viejos ofrece una experiencia única de hospedaje con vistas impresionantes al océano..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

