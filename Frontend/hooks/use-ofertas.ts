import { useState, useEffect } from "react";
import type { OfertaBase } from "@/types/Oferta";
import { getAllOffers, registerOffer, updateOffer as apiUpdateOffer, deleteOffer as apiDeleteOffer } from "@/lib/OfertaData";


export function useOferta() {
  const [offers, setOffers] = useState<OfertaBase[]>([]);
  const [newOfferTitle, setNewOfferTitle] = useState("");
    const [newOfferDescription, setNewOfferDescription] = useState("");
    const [newOfferPercentage, setNewOfferPercentage] = useState("");
    const [newOfferApplies, setNewOfferApplies] = useState("Todas");
    const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
    const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
    const [editedOffers, setEditedOffers] = useState<{ [id: number]: OfertaBase }>({});



useEffect(() => {

  const editCopy = offers.reduce((acc, offer) => {
    acc[offer.id] = { ...offer };
    return acc;
  }, {} as { [id: string]: typeof offers[0] });
  setEditedOffers(editCopy);
}, [offers]);



  useEffect(() => {
    async function fetchOffers() {
      try {
        const data = await getAllOffers();
        setOffers(data);
      } catch (error) {
        console.error("Error al obtener ofertas:", error);
      }
    }
    fetchOffers();
  }, []);

  const addOffer = async () => {
    try {
      const ofertaNueva = {
        titulo: newOfferTitle,
        descripcion: newOfferDescription,
        porcentaje: Number(newOfferPercentage),
        aplica: newOfferApplies,
        fechaInicio: checkInDate?.toISOString(),
        fechaFin: checkOutDate?.toISOString(),
      };
      const success = await registerOffer(ofertaNueva);
      if (success) {
        // Recarga ofertas desde API
        const data = await getAllOffers();
        setOffers(data);
        setNewOfferTitle("");
        setNewOfferDescription("");
        setNewOfferPercentage("");
        setNewOfferApplies("Todas");
        setCheckInDate(undefined);
        setCheckOutDate(undefined);
      } else {
        alert("No se pudo crear la oferta");
      }
    } catch (error) {
      console.error("Error al crear oferta:", error);
    }
  };


const updateOffer = async (ofertaEditada: any) => {
  try {
    // Normaliza los datos para el backend
    const ofertaParaActualizar = {
      id: ofertaEditada.id,
      titulo: ofertaEditada.titulo?.trim() || "",
      descripcion: ofertaEditada.descripcion?.trim() || "",
      porcentaje: parseFloat(ofertaEditada.porcentaje) || 0,
      aplica: ofertaEditada.aplica,
      fechaInicio: ofertaEditada.fechaInicio || new Date().toISOString(),
      fechaFin: ofertaEditada.fechaFin || new Date().toISOString(),
    };

    const success = await apiUpdateOffer(ofertaParaActualizar);
    if (success) {
      const data = await getAllOffers();
      setOffers(data);
    } else {
      alert("No se pudo actualizar la oferta");
    }
  } catch (error) {
    console.error("Error al actualizar oferta:", error);
  }
};


  const removeOffer = async (id: number) => {
    try {
      const success = await apiDeleteOffer(id);
      if (success) {
        setOffers(prev => prev.filter(offer => offer.id !== id));
      } else {
        alert("No se pudo eliminar la oferta");
      }
    } catch (error) {
      console.error("Error eliminando oferta:", error);
    }
  };

  const saveChanges = async () => {
    // Opcional: podrías guardar todos los cambios en lote
    // O simplemente usar updateOffer individualmente
  };
 return {
    offers,
    newOfferTitle,
    setNewOfferTitle,
    newOfferDescription,
    setNewOfferDescription,
    newOfferPercentage,
    setNewOfferPercentage,
    newOfferApplies,
    setNewOfferApplies,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    addOffer,
    updateOffer,
    removeOffer,
    saveChanges,
  };
}

