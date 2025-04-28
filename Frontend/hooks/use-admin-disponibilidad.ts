import { useState } from "react";

// Tipo para los datos de publicidad
export interface Publicidad {
  id: string;
  titulo: string;
  imagenUrl: string;
  linkDestino: string;
}

export function useDisponibilidad() {
  const [username] = useState("USUARIO");
  const [publicidades, setPublicidades] = useState<Publicidad[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPublicidad, setCurrentPublicidad] = useState<Publicidad | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPublicidades = publicidades.filter((pub) =>
    pub.titulo.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleSave = (publicidad: Publicidad) => {
    if (currentPublicidad) {
      setPublicidades(publicidades.map((pub) => (pub.id === publicidad.id ? publicidad : pub)));
    } else {
      const newPublicidad = {
        ...publicidad,
        id: `pub-${Date.now()}`,
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
    publicidades: filteredPublicidades,
    showForm,
    currentPublicidad,
    searchTerm,
    setSearchTerm,
    handleAddNew,
    handleEdit,
    handleDelete,
    handleSave,
    handleCancel,
  };
}
