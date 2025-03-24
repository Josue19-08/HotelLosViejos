import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Sidebar } from "@/components/layout/sidebar"
import { ReservationForm } from "@/components/reservation/reservation-form"

export default function ReservarPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <SiteHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-[250px_1fr] gap-8">
            <Sidebar />

            <div className="space-y-8">
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-teal-700 mb-6 animate-fade-in-up">
                Reservar en Línea
              </h1>

              <div
                className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <ReservationForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

