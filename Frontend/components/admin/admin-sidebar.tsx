"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, FileEdit, CalendarCheck, Hotel, BarChart, Search, Image, Percent } from "lucide-react"

interface NavItemProps {
  href: string
  children: React.ReactNode
  icon: React.ReactNode
  active?: boolean
}

const menuItems = [
  { label: "Home", href: "/admin/dashboard", icon: <Home size={18} /> },
  { label: "Modificar Páginas", href: "/admin/dashboard/paginas", icon: <FileEdit size={18} /> },
  { label: "Listado de reservaciones", href: "/admin/dashboard/reservaciones", icon: <CalendarCheck size={18} /> },
  { label: "Administrar habitaciones", href: "/admin/dashboard/habitaciones", icon: <Hotel size={18} /> },
  { label: "Ver estado del hotel hoy", href: "/admin/dashboard/estado", icon: <BarChart size={18} /> },
  {
    label: "Consultar disponibilidad de habitaciones",
    href: "/admin/dashboard/disponibilidad",
    icon: <Search size={18} />,
  },
  { label: "Publicidad", href: "/admin/dashboard/publicidad", icon: <Image size={18} /> },
  { label: "Ofertas y Temporadas", href: "/admin/dashboard/ofertas", icon: <Percent size={18} /> },
]

export function AdminSidebar() {
  const currentPath = usePathname()

  return (
    <aside className="space-y-6">
      <nav className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y">
          {menuItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              active={currentPath.startsWith(item.href)} // 👈 Aquí hacemos match flexible
            >
              {item.label}
            </NavItem>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

function NavItem({ href, children, icon, active = false }: NavItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-2 px-4 py-3 transition-all duration-300 ${
          active
            ? "bg-teal-50 text-teal-600 border-l-4 border-teal-500 font-semibold" // Más marcado el activo 🔥
            : "text-gray-700 hover:bg-teal-50 hover:text-teal-600 hover:pl-5"
        }`}
      >
        {icon}
        {children}
      </Link>
    </li>
  )
}
