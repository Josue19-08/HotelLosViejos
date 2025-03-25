import { FacilityCard } from "@/components/facilities/facility-card"
import { FacilidadBase } from "@/types/Facilidad"

interface FacilitiesListProps {
  facilities: FacilidadBase[]
}

export function FacilitiesList({ facilities }: FacilitiesListProps) {
  return (
    <div className="space-y-8">
      {facilities.map((facility, index) => (
        <div
          key={facility.id}
          className="opacity-0 animate-fade-in-up"
          style={{ animationDelay: `${index * 0.2}s`, animationFillMode: "forwards" }}
        >
          <FacilityCard facility={facility} />
        </div>
      ))}
    </div>
  )
}

