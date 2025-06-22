"use client";
import React from "react";
import { useState, use, useEffect } from "react";
import { InformacionBase } from "@/types/Informacion";
import { useInformacion } from "@/hooks/use-informacion";


export function HomePreview() {
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

  return (
    <div className="bg-white border rounded-md overflow-hidden">
      {/* Hero Section */}
      <div
        className="relative h-80 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url("/images/portada.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 text-white p-8 max-w-xl">
          <h1 className="text-4xl font-playfair font-bold mb-3">Bienvenidos al Hotel Los Viejos</h1>
          <p className="text-lg">
            Su paraíso en la playa le espera. Disfrute de nuestras instalaciones de lujo y la mejor vista al mar.
          </p>
        </div>
      </div>


      <div className="p-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src={data.nombreImagenBienvenida || "/placeholder.svg?height=400&width=600"}
                alt="Piscina del hotel"
                className="rounded-md w-full h-auto shadow-md"
              />
            </div>
            <div>
              <h2 className="text-3xl font-playfair font-bold text-teal-700 mb-4">
              {data.nombre ||"Bienvenidos al Hotel Los Viejos Resort"}
              </h2>
              <div className="text-gray-700 space-y-4">

                {(data.textoBienvenida || "Ubicado en la hermosa costa, Hotel Los Viejos ofrece una experiencia única de hospedaje con vistas impresionantes al océano...").split(";").map((texto, index, array) => (
                  <React.Fragment key={index}>
                    <p>{texto.trim()}</p>
                    {index < array.length - 1 && <br />}
                  </React.Fragment>
                ))}


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

