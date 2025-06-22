import "./globals.css"
import { Playfair_Display, Montserrat } from "next/font/google"
import { PageBackground } from "@/components/ui/page-background"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})
export const metadata = {
  title: "Hotel Los Viejos",
  description: "Disfrute de nuestras instalaciones de lujo y la mejor vista al mar en Hotel Patito.",
  generator: 'v0.dev',
  icons: {
    icon: "https://emojiapi.dev/api/v1/palm_tree/64.png",
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${playfair.variable} ${montserrat.variable} light`}>
      <body className="font-montserrat">
        {/* Fondo animado para todas las páginas */}
        <PageBackground />
        {children}
      </body>
    </html>
  )
}



import './globals.css'