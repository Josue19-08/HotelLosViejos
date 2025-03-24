"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AdCarousel } from "@/components/ui/ad-carousel"
import { navigationItems } from "@/lib/data"
import type { NavItem as NavItemType } from "@/types"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="space-y-6">
      <nav className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y">
          {navigationItems.map((item) => (
            <NavItem
              key={item.href}
              item={{
                ...item,
                isActive: pathname === item.href,
              }}
            />
          ))}
        </ul>
      </nav>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h3 className="font-bold font-playfair text-amber-800 p-3 bg-amber-50 border-b">Ofertas Especiales</h3>
        <AdCarousel />
      </div>
    </aside>
  )
}

interface NavItemProps {
  item: NavItemType
}

function NavItem({ item }: NavItemProps) {
  const { title, href, icon, isActive } = item

  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-2 px-4 py-3 transition-all duration-300 ${
          isActive
            ? "bg-teal-50 text-teal-600 border-l-4 border-teal-500"
            : "text-gray-700 hover:bg-teal-50 hover:text-teal-600 hover:pl-5"
        }`}
      >
        {icon}
        {title}
      </Link>
    </li>
  )
}

