"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface PageBackgroundProps {
  className?: string
}

export function PageBackground({ className }: PageBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar el tamaño del canvas al tamaño de la ventana
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Inicializar el tamaño
    resizeCanvas()

    // Actualizar el tamaño cuando cambie la ventana
    window.addEventListener("resize", resizeCanvas)

    // Crear partículas para el efecto de fondo
    const particles: Particle[] = []
    const particleCount = 50

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = this.getRandomColor()
        this.opacity = Math.random() * 0.3 + 0.1 // Reducimos la opacidad para un efecto más sutil
      }

      getRandomColor() {
        // Usamos colores más claros y pastel
        const colors = [
          "rgba(180, 230, 230, ", // teal claro
          "rgba(200, 230, 255, ", // azul claro
          "rgba(255, 230, 180, ", // ámbar claro
          "rgba(220, 250, 235, ", // verde menta claro
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Rebote en los bordes
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = `${this.color}${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
    }

    // Inicializar partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Función para dibujar líneas entre partículas cercanas
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            if (!ctx) return
            ctx.beginPath()
            // Líneas más claras y sutiles
            ctx.strokeStyle = `rgba(180, 230, 230, ${0.05 - distance / 2000})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.closePath()
          }
        }
      }
    }

    // Función de animación
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Actualizar y dibujar partículas
      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      // Conectar partículas cercanas
      connectParticles()

      requestAnimationFrame(animate)
    }

    // Iniciar animación
    animate()

    // Limpiar al desmontar
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 -z-10 bg-gradient-to-b from-blue-50 to-amber-50", className)}
    />
  )
}

