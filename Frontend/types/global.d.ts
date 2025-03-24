// Definiciones globales para TypeScript

// Leaflet
declare global {
  interface Window {
    L: any
    initGoogleMap?: () => void
  }
}

export {}

