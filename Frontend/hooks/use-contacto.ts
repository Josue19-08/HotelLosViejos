"use client";
import { useEffect, useState } from "react";
import { getContact } from "@/lib/ContactoData";
import { ContactoBase } from "@/types/Contacto";

export const useContacto = () => {
  const [contacto, setContacto] = useState<ContactoBase | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const contactos = await getContact();
        setContacto(contactos[0] || null);
      } catch (error) {
        console.error("Error al obtener contactos:", error);
      }
    }

    fetchData();
  }, []);

  return contacto ?? {
    id: 0,
    correo: "",
    telefono: "",
    codigoPostal: "",
    direccion: "",
    latitud: "",
    longitud: "",
  };
};
