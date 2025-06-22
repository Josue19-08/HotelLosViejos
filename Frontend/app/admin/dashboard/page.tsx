"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminFooter } from "@/components/admin/admin-footer"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { UserWelcome } from "@/components/admin/user-welcome"

export default function AdminDashboardPage() {
  const [username] = useState("USUARIO")

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

          <div className="bg-white p-6 border rounded-md min-h-[400px]">
            <h1 className="text-2xl font-playfair font-bold text-teal-800 mb-6">Módulo Administrativo</h1>

            <div className="p-4 bg-gray-50 rounded-md text-gray-500 text-center">
              Seleccione una opción del menú para comenzar
            </div>
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  )
}

