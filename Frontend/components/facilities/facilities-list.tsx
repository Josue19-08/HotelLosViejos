import { FacilityCard } from "@/components/facilities/facility-card"
import type { Facility } from "@/types"

interface FacilitiesListProps {
  facilities: Facility[]
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

