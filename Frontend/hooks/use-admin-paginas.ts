"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Home, Info, BookOpen, MapPin } from "lucide-react";

export function useAdminPaginas() {
  const router = useRouter();
  const params = useParams();
  const pageId = params.pageId as string;

  const [username] = useState("USUARIO");
  const [isSaving, setIsSaving] = useState(false);

  const paginasDisponibles = [
    { id: "home", nombre: "Home", icono: Home },
    { id: "sobre-nosotros", nombre: "Sobre Nosotros", icono: Info },
    { id: "facilidades", nombre: "Facilidades", icono: BookOpen },
    { id: "como-llegar", nombre: "Cómo llegar", icono: MapPin },
  ];

  const paginaExiste = paginasDisponibles.some((p) => p.id === pageId);

  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (paginaExiste) {
      setFormData({});
    }
  }, [pageId, paginaExiste]);

  const handleFormChange = (data: any) => {
    setFormData(data);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert("Cambios guardados con éxito");
  };

  const handleBack = () => {
    router.push("/admin/dashboard/paginas");
  };

  const getNombrePagina = () => {
    const pagina = paginasDisponibles.find((p) => p.id === pageId);
    return pagina ? pagina.nombre : "Página";
  };

  return {
    username,
    isSaving,
    formData,
    paginaExiste,
    handleFormChange,
    handleSave,
    handleBack,
    getNombrePagina,
    pageId,
    paginasDisponibles,
  };
}
