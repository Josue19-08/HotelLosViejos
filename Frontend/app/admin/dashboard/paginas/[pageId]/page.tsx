"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminFooter } from "@/components/admin/admin-footer";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { UserWelcome } from "@/components/admin/user-welcome";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileEdit } from "lucide-react";

import { HomeEditor } from "@/components/admin/page-editor/page-templates/home-editor";
import { SobreNosotrosEditor } from "@/components/admin/page-editor/page-templates/sobre-nosotros-editor";
import { FacilidadesEditor } from "@/components/admin/page-editor/page-templates/facilidades-editor";
import { ComoLlegarEditor } from "@/components/admin/page-editor/page-templates/como-llegar-editor";

import { HomePreview } from "@/components/admin/page-editor/page-previews/home-preview";
import { SobreNosotrosPreview } from "@/components/admin/page-editor/page-previews/sobre-nosotros-preview";
import { FacilidadesPreview } from "@/components/admin/page-editor/page-previews/facilidades-preview";
import { ComoLlegarPreview } from "@/components/admin/page-editor/page-previews/como-llegar-preview";

import { useAdminPaginas } from "@/hooks/use-admin-paginas";

export default function EditarPaginaPage() {
  const {
    username,
    isSaving,
    formData,
    paginaExiste,
    handleFormChange,
    handleSave,
    handleBack,
    getNombrePagina,
    pageId,
  } = useAdminPaginas();

  if (!paginaExiste) {
    return (
      <div className="min-h-screen flex flex-col relative">
        <div className="border-b bg-white">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <AdminHeader showWelcome={false} />
            <UserWelcome username={username} />
          </div>
        </div>

        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8">
            <AdminSidebar />
            <Card className="p-6 border rounded-md">
              <div className="text-center py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Página no encontrada</h1>
                <p className="text-gray-600 mb-6">La página que intenta editar no existe.</p>
                <Button onClick={handleBack} className="bg-teal-600 hover:bg-teal-700">
                  Volver a la lista de páginas
                </Button>
              </div>
            </Card>
          </div>
        </main>

        <AdminFooter />
      </div>
    );
  }

  const renderEditor = () => {
    switch (pageId) {
      case "home":
        return <HomeEditor />;
      case "sobre-nosotros":
        return <SobreNosotrosEditor />;
      case "facilidades":
        return <FacilidadesEditor  onChange={handleFormChange} />;
      case "como-llegar":
        return <ComoLlegarEditor />;
      default:
        return <div>Editor no disponible</div>;
    }
  };

  const renderPreview = () => {
    switch (pageId) {
      case "home":
        return <HomePreview/>;
      case "sobre-nosotros":
        return <SobreNosotrosPreview />;
      case "facilidades":
        return <FacilidadesPreview data={formData} />;
      case "como-llegar":
        return <ComoLlegarPreview data={formData} />;
      default:
        return <div>Vista previa no disponible</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <AdminHeader showWelcome={false} />
          <UserWelcome username={username} />
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8">
          <AdminSidebar />

          <div className="space-y-6">
            <Card className="p-6 border rounded-md">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FileEdit className="h-6 w-6 text-teal-600" />
                  <h1 className="text-2xl font-playfair font-bold text-teal-800">Editar: {getNombrePagina()}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
                    <ArrowLeft size={16} />
                    Volver
                  </Button>
                </div>
              </div>

              {renderEditor()}
            </Card>

            <Card className="p-6 border rounded-md bg-blue-50">
              <h2 className="text-lg font-medium text-blue-800 mb-3">Vista previa de la página</h2>
              {renderPreview()}
            </Card>
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
}
