"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

// Elementos decorativos para el fondo
const elements = [
  { type: "shell", size: "sm", initialPosition: { x: 10, y: 15 } },
  { type: "shell", size: "md", initialPosition: { x: 85, y: 25 } },
  { type: "shell", size: "lg", initialPosition: { x: 70, y: 85 } },
  { type: "palm", size: "sm", initialPosition: { x: 15, y: 65 } },
  { type: "palm", size: "md", initialPosition: { x: 90, y: 70 } },
  { type: "bubble", size: "sm", initialPosition: { x: 25, y: 30 } },
  { type: "bubble", size: "md", initialPosition: { x: 40, y: 80 } },
  { type: "bubble", size: "lg", initialPosition: { x: 75, y: 40 } },
  { type: "bubble", size: "sm", initialPosition: { x: 60, y: 20 } },
]

export function FloatingElements() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element, index) => (
        <FloatingElement key={index} element={element} />
      ))}
    </div>
  )
}

function FloatingElement({ element }) {
  const { type, size, initialPosition } = element

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  }

  const getElementContent = () => {
    switch (type) {
      case "shell":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-amber-200 opacity-20"
          >
            <path
              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        )
      case "palm":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-green-500 opacity-20"
          >
            <path d="M12 2L12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 2C12 2 8 5 8 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 2C12 2 16 5 16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 9C12 9 7 11 7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 9C12 9 17 11 17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      case "bubble":
        return <div className="rounded-full bg-blue-300 opacity-10 w-full h-full"></div>
      default:
        return null
    }
  }

  const animationClasses = {
    shell: "animate-float-slow",
    palm: "animate-sway",
    bubble: "animate-float",
  }

  return (
    <div
      className={cn("absolute", sizeClasses[size], animationClasses[type])}
      style={{
        left: `${initialPosition.x}%`,
        top: `${initialPosition.y}%`,
        animationDelay: `${Math.random() * 5}s`,
      }}
    >
      {getElementContent()}
    </div>
  )
}

