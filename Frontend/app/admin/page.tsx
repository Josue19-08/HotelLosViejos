import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { LoginForm } from "@/components/admin/login-form"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-teal-50 to-blue-50">
        <div className="w-full max-w-md px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-playfair font-bold text-teal-700">Módulo Administrativo</h1>
            <p className="text-gray-600 mt-2">Acceso exclusivo para personal autorizado</p>
          </div>

          <LoginForm />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

