"use client";

import { useState } from "react";

export interface Publicidad {
  id: string;
  titulo: string;
  imagenUrl: string;
  linkDestino: string;
  activa: boolean;
  fechaCreacion: string;
  ubicacion: "home" | "reservas" | "facilidades" | "todas";
}

export function useAdminPublicidad() {
  const [username] = useState("USUARIO");
  const [publicidades, setPublicidades] = useState<Publicidad[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPublicidad, setCurrentPublicidad] = useState<Publicidad | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPublicidades = publicidades.filter(
    (pub) =>
      pub.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setCurrentPublicidad(null);
    setShowForm(true);
  };

  const handleEdit = (publicidad: Publicidad) => {
    setCurrentPublicidad(publicidad);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("¿Está seguro que desea eliminar esta publicidad?")) {
      setPublicidades(publicidades.filter((pub) => pub.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    setPublicidades(publicidades.map((pub) => (pub.id === id ? { ...pub, activa: !pub.activa } : pub)));
  };

  const handleSave = (publicidad: Publicidad) => {
    if (currentPublicidad) {
      setPublicidades(publicidades.map((pub) => (pub.id === publicidad.id ? publicidad : pub)));
    } else {
      const newPublicidad = {
        ...publicidad,
        id: `pub-${Date.now()}`,
        fechaCreacion: new Date().toISOString().split("T")[0],
      };
      setPublicidades([...publicidades, newPublicidad]);
    }
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return {
    username,
    publicidades,
    showForm,
    currentPublicidad,
    searchTerm,
    filteredPublicidades,
    handleAddNew,
    handleEdit,
    handleDelete,
    handleToggleActive,
    handleSave,
    handleCancel,
    setSearchTerm,
  };
}
