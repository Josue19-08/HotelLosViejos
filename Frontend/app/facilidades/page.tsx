import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Sidebar } from "@/components/layout/sidebar"
import { FacilitiesList } from "@/components/facilities/facilities-list"
import { facilities } from "@/lib/data"

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <SiteHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-[250px_1fr] gap-8">
            <Sidebar />

            <div className="space-y-8">
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-teal-700 mb-6">Facilidades</h1>

              <FacilitiesList facilities={facilities} />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

