"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function WavyBackground({
  children,
  className,
  containerClassName,
  colors = ["#38b2ac", "#4fd1c5", "#81e6d9", "#f6e05e"],
  waveWidth = 50,
  backgroundFill = "#0d9488",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) {
  const containerRef = useRef(null)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    setShouldAnimate(true)
  }, [])

  const animationSpeed = {
    slow: "25s",
    medium: "15s",
    fast: "10s",
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-teal-600",
        containerClassName,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        {...props}
      >
        <g clipPath="url(#clip0_1_2)">
          <rect width="100%" height="100%" fill={backgroundFill} />
          {Array.from({ length: 5 }).map((_, i) => {
            const waveHeightMultiplier = 0.2 + i * 0.1
            return (
              <path
                key={`wave-${i}`}
                d={`M 0 ${800 * waveHeightMultiplier} C 360 ${
                  800 * (waveHeightMultiplier - 0.1)
                }, 720 ${800 * (waveHeightMultiplier + 0.1)}, 1440 ${
                  800 * waveHeightMultiplier
                } V 800 H 0 V ${800 * waveHeightMultiplier} Z`}
                fill={colors[i % colors.length]}
                fillOpacity={waveOpacity}
              >
                <animate
                  attributeName="d"
                  values={`
                    M 0 ${800 * waveHeightMultiplier} C 360 ${
                      800 * (waveHeightMultiplier - 0.1)
                    }, 720 ${800 * (waveHeightMultiplier + 0.1)}, 1440 ${
                      800 * waveHeightMultiplier
                    } V 800 H 0 V ${800 * waveHeightMultiplier} Z;
                    M 0 ${800 * waveHeightMultiplier} C 360 ${
                      800 * (waveHeightMultiplier + 0.1)
                    }, 720 ${800 * (waveHeightMultiplier - 0.1)}, 1440 ${
                      800 * waveHeightMultiplier
                    } V 800 H 0 V ${800 * waveHeightMultiplier} Z;
                    M 0 ${800 * waveHeightMultiplier} C 360 ${
                      800 * (waveHeightMultiplier - 0.1)
                    }, 720 ${800 * (waveHeightMultiplier + 0.1)}, 1440 ${
                      800 * waveHeightMultiplier
                    } V 800 H 0 V ${800 * waveHeightMultiplier} Z
                  `}
                  dur={animationSpeed[speed]}
                  repeatCount="indefinite"
                  begin={shouldAnimate ? "0s" : "999999s"}
                />
              </path>
            )
          })}
        </g>
        <defs>
          <clipPath id="clip0_1_2">
            <rect width="1440" height="800" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div
        className={cn("relative z-10 flex flex-col items-center justify-center w-full", className)}
        style={{
          backdropFilter: `blur(${blur}px)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

