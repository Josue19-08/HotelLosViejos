import { useState } from "react"

export interface Offer {
  id: number
  description: string
  percentage: string
  applies: string
}

export function useAdminOfertas() {
  const [altaPercentage, setAltaPercentage] = useState("")
  const [bajaPercentage, setBajaPercentage] = useState("")
  const [newOfferDescription, setNewOfferDescription] = useState("")
  const [newOfferPercentage, setNewOfferPercentage] = useState("")
  const [newOfferApplies, setNewOfferApplies] = useState("")
  const [offers, setOffers] = useState<Offer[]>([
    { id: 1, description: "", percentage: "", applies: "Todas, estándar, junior" },
  ])

  const addOffer = () => {
    if (newOfferDescription && newOfferPercentage) {
      setOffers([
        ...offers,
        {
          id: offers.length + 1,
          description: newOfferDescription,
          percentage: newOfferPercentage,
          applies: newOfferApplies || "Todas, estándar, junior",
        },
      ])
      setNewOfferDescription("")
      setNewOfferPercentage("")
      setNewOfferApplies("")
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
    altaPercentage,
    bajaPercentage,
    setAltaPercentage,
    setBajaPercentage,
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
