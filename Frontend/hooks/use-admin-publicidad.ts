
import { useState, useEffect } from "react";
import type { PublicidadBase } from "@/types/Publicidad";
import {
  getAllAds,
  registerAd,
  updateAd,
  deleteAd,
} from "@/lib/Publicidad";



export function usePublicidad() {
  const [ads, setAds] = useState<PublicidadBase[]>([]);
  const [newAdNombre, setNewAdNombre] = useState("");
  const [newAdTitulo, setNewAdTitulo] = useState("");
  const [newAdDescripcion, setNewAdDescripcion] = useState("");
  const [newAdImagen, setNewAdImagen] = useState("");
  const [newAdEnlace, setNewAdEnlace] = useState("");

  const [editedAds, setEditedAds] = useState<{ [id: number]: PublicidadBase }>({});

  useEffect(() => {
    const editCopy = ads.reduce((acc, ad) => {
      acc[ad.id!] = { ...ad };
      return acc;
    }, {} as { [id: number]: PublicidadBase });
    setEditedAds(editCopy);
  }, [ads]);

  useEffect(() => {
    async function fetchPublicidad() {
      try {
        const data = await getAllAds();
        setAds(data);
      } catch (error) {
        console.error("Error al obtener publicidad:", error);
      }
    }
    fetchPublicidad();
  }, []);

  const addPublicidad = async () => {
    try {
      const nuevaPublicidad: Omit<PublicidadBase, "id"> = {
        nombre: newAdNombre,
        titulo: newAdTitulo,
        descripcion: newAdDescripcion,
        imagen: newAdImagen,
        enlace: newAdEnlace,
      };
      const success = await registerAd(nuevaPublicidad);
      if (success) {
        const data = await getAllAds();
        setAds(data);
        setNewAdNombre("");
        setNewAdTitulo("");
        setNewAdDescripcion("");
        setNewAdImagen("");
        setNewAdEnlace("");
      } else {
        alert("No se pudo crear la publicidad");
      }
    } catch (error) {
      console.error("Error al crear publicidad:", error);
    }

  };

  const updatePublicidad = async (publicidadEditada: PublicidadBase) => {
    try {
      const payload: PublicidadBase = {
        id: publicidadEditada.id!,
        nombre: publicidadEditada.nombre?.trim() || "",
        titulo: publicidadEditada.titulo?.trim() || "",
        descripcion: publicidadEditada.descripcion?.trim() || "",
        imagen: publicidadEditada.imagen?.trim() || "",
        enlace: publicidadEditada.enlace?.trim() || "",
      };

      const success = await updateAd(payload);
      if (success) {
        const data = await getAllAds();
        setAds(data);
      } else {
        alert("No se pudo actualizar la publicidad");
      }
    } catch (error) {
      console.error("Error al actualizar publicidad:", error);
    }

  };

  const removePublicidad = async (id: number) => {
    try {
      const success = await deleteAd(id);
      if (success) {
        setAds(prev => prev.filter(ad => ad.id !== id));
      } else {
        alert("No se pudo eliminar la publicidad");
      }
    } catch (error) {
      console.error("Error eliminando publicidad:", error);
    }
  };

  return {
    ads,
    newAdNombre,
    setNewAdNombre,
    newAdTitulo,
    setNewAdTitulo,
    newAdDescripcion,
    setNewAdDescripcion,
    newAdImagen,
    setNewAdImagen,
    newAdEnlace,
    setNewAdEnlace,
    addPublicidad,
    updatePublicidad,
    removePublicidad,
  };
}
