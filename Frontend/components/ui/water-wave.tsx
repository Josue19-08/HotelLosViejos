"use client"

import { useEffect, useRef } from "react"

interface WaterWaveProps {
  color?: string
}

export function WaterWave({ color = "#0d9488" }: WaterWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    // Ajustar el tamaño del canvas
    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Parámetros de las olas
    const waves = [
      { frequency: 0.02, amplitude: 10, speed: 0.05, offset: 0 },
      { frequency: 0.03, amplitude: 15, speed: 0.03, offset: 0 },
      { frequency: 0.015, amplitude: 5, speed: 0.07, offset: 0 },
    ]

    // Función de animación
    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Actualizar y dibujar cada ola
      waves.forEach((wave) => {
        wave.offset += wave.speed

        ctx.beginPath()
        ctx.moveTo(0, canvas.height)

        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x * wave.frequency + wave.offset) * wave.amplitude + canvas.height / 2
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.closePath()

        ctx.fillStyle = color
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

