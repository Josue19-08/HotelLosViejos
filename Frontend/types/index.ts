import type React from "react"
// Simplificar la interfaz Facility
export interface Facility {
  id: string
  name: string
  description: string
  image: string
  // Mantenemos estos campos como opcionales por si se quieren usar en el futuro
  features?: string[]
  isAvailable?: boolean
  openingHours?: string
}

// Resto del código existente...
export interface HotelInfo {
  name: string
  slogan: string
  description: string
  longDescription: string[]
  mission: string
  vision: string
  foundedYear: number
  contactInfo: ContactInfo
  logo: string
}

export interface ContactInfo {
  address: string
  phone: string
  email: string
  hours: string
}

export interface NavItem {
  title: string
  href: string
  icon?: React.ReactNode
  isActive?: boolean
}

export interface HeroContent {
  title: string
  subtitle: string
  primaryButtonText: string
  secondaryButtonText: string
  backgroundImage: string
}

export interface RoomType {
  id: string
  name: string
  description: string
  price: number
  capacity: {
    adults: number
    children: number
  }
  amenities: string[]
  images: GalleryImage[]
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  width: number
  height: number
  featured?: boolean
}

export interface Promotion {
  id: string
  title: string
  description: string
  discountPercentage?: number
  validUntil?: string
  buttonText: string
}

export interface Advertisement {
  id: number
  src: string
  alt: string
  title: string
  description: string
}

export interface LocationInfo {
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  directions: string[]
  transportOptions: TransportOption[]
}

export interface TransportOption {
  type: string
  title: string
  description: string
  details?: string[]
}

