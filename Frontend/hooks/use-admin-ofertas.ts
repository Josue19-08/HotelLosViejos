import { useState } from "react"

export interface Offer {
  id: number
  description: string
  percentage: string
  applies: string
}

export function useAdminOfertas() {
  const [newOfferDescription, setNewOfferDescription] = useState("")
  const [newOfferPercentage, setNewOfferPercentage] = useState("")
  const [newOfferApplies, setNewOfferApplies] = useState("")
  const [offers, setOffers] = useState<Offer[]>([
    { id: 1, description: "", percentage: "", applies: "Todas, estándar, junior" },
  ])
  const [newOfferStartDate, setNewOfferStartDate] = useState<Date | undefined>(undefined)
  const [newOfferEndDate, setNewOfferEndDate] = useState<Date | undefined>(undefined)


  const addOffer = () => {
    if (newOfferDescription && newOfferPercentage) {
      setOffers([
        ...offers,
        {
          id: offers.length + 1,
          description: newOfferDescription,
          percentage: newOfferPercentage,
          applies: newOfferApplies || "Todas, estándar, junior",
          startDate: newOfferStartDate,
          endDate: newOfferEndDate,
        },
      ])
      setNewOfferDescription("")
      setNewOfferPercentage("")
      setNewOfferApplies("")
      setNewOfferStartDate(undefined)
      setNewOfferEndDate(undefined)
    }
  }

  const updateOffer = (id: number, field: keyof Offer, value: string) => {
    setOffers((prev) =>
      prev.map((offer) =>
        offer.id === id ? { ...offer, [field]: value } : offer
      )
    )
  }

  const removeOffer = (id: number) => {
    setOffers((prev) => prev.filter((offer) => offer.id !== id))
  }

  return {
    newOfferDescription,
    setNewOfferDescription,
    newOfferPercentage,
    setNewOfferPercentage,
    newOfferApplies,
    setNewOfferApplies,
    offers,
    addOffer,
    updateOffer,
    removeOffer,
  }
}
