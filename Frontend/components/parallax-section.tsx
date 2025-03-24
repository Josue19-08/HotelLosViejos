"use client"

import { useRef, useEffect } from "react"

export function ParallaxSection({ children, speed = 0.1 }) {
  const ref = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const scrollY = window.scrollY
      const element = ref.current
      const elementTop = element.getBoundingClientRect().top + scrollY
      const elementHeight = element.offsetHeight
      const viewportHeight = window.innerHeight

      const relativePos = scrollY + viewportHeight - elementTop

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

