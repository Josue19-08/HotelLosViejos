"use client";
import { getAllInformation } from "@/lib/Informacion";
import type { InformacionBase } from "@/types/Informacion";
import { useEffect, useState } from "react";

export const useInformacion = () => {
  const [informacion, setInformacion] = useState<InformacionBase>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const datos = await getAllInformation();
        console.log("Información obtenida:", datos);
        setInformacion(datos[0]);
      } catch (error) {
        console.error("Error al obtener información:", error);
      }
    }

    fetchData();
  }, []);

  return {
    id: informacion.id  || 0,
    textoSobreNosotros: informacion.textoSobreNosotros  || "",
    textoBienvenida: informacion.textoBienvenida    || "",
    nombre: informacion.nombre  || "",
    nombreImagenBienvenida: informacion.nombreImagenBienvenida  || "",
  };
};
