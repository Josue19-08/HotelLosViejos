import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Sidebar } from "@/components/layout/sidebar"
import { LocationMap } from "@/components/location/location-map"
import { DirectionsInfo } from "@/components/location/directions-info"
import { locationInfo } from "@/lib/data"

export default function ComoLlegarPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <SiteHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-[250px_1fr] gap-8">
            <Sidebar />

            <div className="space-y-8">
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-teal-700 mb-6 animate-fade-in-up">
                ¿Cómo llegar?
              </h1>

              <DirectionsInfo directions={locationInfo.directions} />

              <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <LocationMap address={locationInfo.address} coordinates={locationInfo.coordinates} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

