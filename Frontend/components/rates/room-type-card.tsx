import Image from "next/image";
import { Check } from "lucide-react";
import type { HabitacionBase } from "@/types/Habitacion";

interface RoomTypeCardProps {
  habitacion: HabitacionBase;
}

export function RoomTypeCard({ habitacion }: RoomTypeCardProps) {
  const { numero, tipo, tarifaDiariaBase, caracteristicas, nombreImagen } = habitacion;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden transform transition-all duration-500 hover:shadow-xl">
      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        <div className="relative h-[250px] md:h-full overflow-hidden group">
          {nombreImagen ? (
            <Image
              src={nombreImagen}
              alt={`Imagen de la habitación ${numero}`}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
              Imagen no disponible
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-teal-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-playfair font-bold text-teal-700 mb-1">
                Habitación {tipo}
              </h2>
              <p className="text-sm text-gray-600">Número {numero}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Desde</p>
              <p className="text-2xl font-bold text-teal-600">
                ${tarifaDiariaBase.toFixed(2)}
                <span className="text-sm font-normal">/noche</span>
              </p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-600 mb-2">Características:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {caracteristicas.map((c) => (
                <li key={c.id} className="flex items-center text-gray-700">
                  <Check className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0" />
                  <span>{c.titulo}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
