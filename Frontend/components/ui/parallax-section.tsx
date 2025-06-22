"use client"

import type React from "react"

import { useRef, useEffect } from "react"

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
}

export function ParallaxSection({ children, speed = 0.1 }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const scrollY = window.scrollY
      const element = ref.current
      const elementTop = element.getBoundingClientRect().top + scrollY
      const elementHeight = element.offsetHeight
      const viewportHeight = window.innerHeight

      // Calcular la posición relativa del elemento en la ventana
      const relativePos = scrollY + viewportHeight - elementTop

      // Solo aplicar el efecto cuando el elemento está visible
      if (relativePos > 0 && relativePos < elementHeight + viewportHeight) {
        const translateY = (relativePos - viewportHeight) * speed
        element.style.transform = `translateY(${translateY}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [speed])

  return (
    <div ref={ref} className="transition-transform duration-300 ease-out">
      {children}
    </div>
  )
}

