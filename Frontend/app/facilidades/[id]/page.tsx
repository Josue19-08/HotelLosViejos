import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Sidebar } from "@/components/layout/sidebar"
import { FloatingElements } from "@/components/ui/floating-elements"
import { FacilityDetail } from "@/components/facilities/facility-detail"
import { facilities } from "@/lib/data"
import { notFound } from "next/navigation"

interface FacilityDetailPageProps {
  params: {
    id: string
  }
}

export default function FacilityDetailPage({ params }: FacilityDetailPageProps) {
  const facility = facilities.find((f) => f.id === params.id)

  if (!facility) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <FloatingElements />
      <SiteHeader />

      <main className="flex-1 bg-gradient-to-b from-teal-50 to-amber-50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-[250px_1fr] gap-8">
            <Sidebar />

            <div className="space-y-8">
              <FacilityDetail facility={facility} />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

/*
// IMPLEMENTACIÓN CON DATOS DINÁMICOS
import { getFacilityById } from "@/lib/data"

export default async function FacilityDetailPage({ params }: FacilityDetailPageProps) {
  const facility = await getFacilityById(params.id);
  
  if (!facility) {
    notFound();
  }
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <FloatingElements />
      <SiteHeader />

      <main className="flex-1 bg-gradient-to-b from-teal-50 to-amber-50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-[250px_1fr] gap-8">
            <Sidebar />

            <div className="space-y-8">
              <FacilityDetail facility={facility} />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
*/

