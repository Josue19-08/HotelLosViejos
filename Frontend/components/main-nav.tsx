import Link from "next/link"

export function MainNav() {
  return (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/sobre-nosotros" active>
        Sobre Nosotros
      </NavLink>
      <NavLink href="/facilidades">Facilidades</NavLink>
      <NavLink href="/como-llegar">Como llegar?</NavLink>
      <NavLink href="/tarifas">Tarifas</NavLink>
      <NavLink href="/reservar">Reservar</NavLink>
      <NavLink href="/contactenos">Contáctenos</NavLink>
    </>
  )
}

function NavLink({ href, children, active = false }) {
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

