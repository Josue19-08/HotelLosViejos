import Link from "next/link"
import { BookOpen, Palmtree, MapPin, Phone, Info, CreditCard, Calendar } from "lucide-react"
import { AdCarousel } from "@/components/ad-carousel"

export function Sidebar() {
  return (
    <aside className="space-y-6">
      <nav className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y">
          <NavItem href="/" icon={<Palmtree size={18} />} active>
            Home
          </NavItem>
          <NavItem href="/sobre-nosotros" icon={<Info size={18} />}>
            Sobre Nosotros
          </NavItem>
          <NavItem href="/facilidades" icon={<BookOpen size={18} />}>
            Facilidades
          </NavItem>
          <NavItem href="/como-llegar" icon={<MapPin size={18} />}>
            Como llegar?
          </NavItem>
          <NavItem href="/tarifas" icon={<CreditCard size={18} />}>
            Tarifas
          </NavItem>
          <NavItem href="/reservar" icon={<Calendar size={18} />}>
            Reservar en Línea
          </NavItem>
          <NavItem href="/contactenos" icon={<Phone size={18} />}>
            Contáctenos
          </NavItem>
        </ul>
      </nav>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h3 className="font-bold font-playfair text-amber-800 p-3 bg-amber-50 border-b">Ofertas Especiales</h3>
        <AdCarousel />
      </div>
    </aside>
  )
}

function NavItem({ href, children, icon, active = false }) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-2 px-4 py-3 transition-all duration-300 ${
          active
            ? "bg-teal-50 text-teal-600 border-l-4 border-teal-500"
            : "text-gray-700 hover:bg-teal-50 hover:text-teal-600 hover:pl-5"
        }`}
      >
        {icon}
        {children}
      </Link>
    </li>
  )
}

