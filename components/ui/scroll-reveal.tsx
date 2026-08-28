"use client"

import { useEffect, useRef, useState, ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  stagger?: boolean
  staggerDelay?: number
  threshold?: number
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  stagger = false,
  staggerDelay = 100,
  threshold = 0.1,
}: ScrollRevealProps) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          // Una vez revelado, dejamos de observar para mejorar el rendimiento
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  // Lógica de stagger aplicada a los hijos directos si stagger = true
  if (stagger) {
    return (
      <div
        ref={ref}
        className={`${className} ${isIntersecting ? "is-revealed" : "opacity-0"}`}
      >
        {isIntersecting
          ? Object.freeze(
              (Array.isArray(children) ? children : [children]).map((child, idx) => {
                if (!child) return null
                return (
                  <div
                    key={idx}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${delay + idx * staggerDelay}ms`, animationFillMode: "forwards" }}
                  >
                    {child}
                  </div>
                )
              })
            )
          : null}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`${className} ${
        isIntersecting ? "animate-fade-in-up opacity-100" : "opacity-0"
      }`}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  )
}
