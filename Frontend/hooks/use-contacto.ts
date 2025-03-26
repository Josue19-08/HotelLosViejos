"use client";
import { useEffect, useState } from "react";
import { getContact } from "@/lib/ContactoData";
import { ContactoBase } from "@/types/Contacto";

export const useContacto = () => {
  const [contacto, setContacto] = useState<ContactoBase>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const contactos = await getContact();
        setContacto(contactos[0]);
      } catch (error) {
        console.error("Error al obtener contactos:", error);
      }
    }

    fetchData();
  }, []);

  return {
    id: contacto.id,
    correo: contacto.correo,
    telefono: contacto.telefono,
    codigoPostal: contacto.codigoPostal,
    direccion: contacto.direccion,
  };
};
