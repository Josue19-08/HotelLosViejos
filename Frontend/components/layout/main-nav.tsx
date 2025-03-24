"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navigationItems } from "@/lib/data"

export function MainNav() {
  const pathname = usePathname()

  return (
    <>
      {navigationItems.map((item) => (
        <NavLink key={item.href} href={item.href} active={pathname === item.href}>
          {item.title}
        </NavLink>
      ))}
    </>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  active?: boolean
}

function NavLink({ href, children, active = false }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`font-montserrat ${active ? "text-teal-600" : "text-gray-600 hover:text-teal-600"} font-medium relative group`}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full"></span>
    </Link>
  )
}

