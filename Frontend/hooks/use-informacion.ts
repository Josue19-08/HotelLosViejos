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
        setInformacion(datos[0]);
      } catch (error) {
        console.error("Error al obtener información:", error);
      }
    }

    fetchData();
  }, []);

  return {
      id: informacion ? informacion.id : 0,
      textoSobreNosotros: informacion ? informacion.textoSobreNosotros : "",
      textoBienvenida: informacion ? informacion.textoBienvenida : "",
      nombreImagenBienvenida: informacion ? informacion.nombreImagenBienvenida : "",
      nombre: informacion ? informacion.nombre : "",
  };
};
