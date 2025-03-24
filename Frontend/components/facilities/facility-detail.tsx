import Image from "next/image"
import type { Facility } from "@/types"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface FacilityDetailProps {
  facility: Facility
}

export function FacilityDetail({ facility }: FacilityDetailProps) {
  const { name, description, image } = facility

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <Button variant="outline" size="sm" asChild>
          <Link href="/facilidades" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Volver a Facilidades
          </Link>
        </Button>
      </div>

      <h1
        className="text-3xl md:text-4xl font-playfair font-bold text-teal-700 animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        {name}
      </h1>

      <div
        className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-lg animate-fade-in-up"
        style={{ animationDelay: "0.3s" }}
      >
        <Image
          src={image || "/placeholder.svg?height=400&width=800"}
          alt={name}
          fill
          className="object-cover animate-pulse-subtle"
        />
      </div>

      <div
        className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 animate-fade-in-up"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="prose prose-teal max-w-none">
          <p className="text-gray-700 text-lg">{description}</p>
        </div>
      </div>
    </div>
  )
}

