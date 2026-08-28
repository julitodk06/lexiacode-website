"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    let circuits: Circuit[] = []
    
    // Posición del mouse para interactividad
    const mouse = { x: -1000, y: -1000, radius: 120 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initElements()
    }

    class Particle {
      x: number; y: number; vx: number; vy: number
      size: number; opacity: number; color: string

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth)
        this.y = Math.random() * (canvas?.height || window.innerHeight)
        this.vx = (Math.random() - 0.5) * 0.25
        this.vy = (Math.random() - 0.5) * 0.25
        this.size = Math.random() * 1.5 + 0.5
        this.opacity = Math.random() * 0.3 + 0.05
        this.color = Math.random() > 0.5 ? "#c9a227" : "#00d4ff"
      }

      update() {
        // Interacción gravitatoria sutil con el ratón
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius
          this.x -= (dx / dist) * force * 0.5
          this.y -= (dy / dist) * force * 0.5
        }

        this.x += this.vx
        this.y += this.vy
        if (canvas) {
          if (this.x < 0 || this.x > canvas.width) this.vx *= -1
          if (this.y < 0 || this.y > canvas.height) this.vy *= -1
        }
      }

      draw() {
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        
        // Ajuste de color del canvas dinámico en base al tema
        const isLight = document.documentElement.classList.contains("light")
        ctx!.fillStyle = isLight 
          ? (this.color === "#c9a227" ? "#b8860b" : "#008b8b") 
          : this.color
          
        ctx!.globalAlpha = isLight ? this.opacity * 0.7 : this.opacity
        ctx!.fill()
        ctx!.globalAlpha = 1
      }
    }

    class Circuit {
      startX: number; startY: number
      segments: { x: number; y: number }[]
      pulsePos: number; pulseSpeed: number; opacity: number

      constructor() {
        this.startX = Math.random() * (canvas?.width || window.innerWidth)
        this.startY = Math.random() * (canvas?.height || window.innerHeight)
        this.segments = this.generatePath()
        this.pulsePos = Math.random()
        this.pulseSpeed = Math.random() * 0.006 + 0.002
        this.opacity = Math.random() * 0.15 + 0.05
      }

      generatePath() {
        const segs = [{ x: this.startX, y: this.startY }]
        let x = this.startX, y = this.startY
        for (let i = 0; i < Math.floor(Math.random() * 3) + 2; i++) {
          if (Math.random() > 0.5) x += (Math.random() - 0.5) * 140
          else y += (Math.random() - 0.5) * 140
          segs.push({ x, y })
        }
        return segs
      }

      update() {
        this.pulsePos += this.pulseSpeed
        if (this.pulsePos > 1) this.pulsePos = 0
      }

      draw() {
        const isLight = document.documentElement.classList.contains("light")
        
        ctx!.beginPath()
        ctx!.moveTo(this.segments[0].x, this.segments[0].y)
        for (let i = 1; i < this.segments.length; i++) {
          ctx!.lineTo(this.segments[i].x, this.segments[i].y)
        }
        ctx!.strokeStyle = isLight ? "#b8860b" : "#c9a227"
        ctx!.globalAlpha = this.opacity * (isLight ? 0.15 : 0.25)
        ctx!.lineWidth = 0.8
        ctx!.stroke()

        this.segments.forEach((seg) => {
          ctx!.beginPath()
          ctx!.arc(seg.x, seg.y, 1.5, 0, Math.PI * 2)
          ctx!.fillStyle = isLight ? "#b8860b" : "#c9a227"
          ctx!.globalAlpha = this.opacity * 0.3
          ctx!.fill()
        })

        const pulseIndex = Math.floor(this.pulsePos * (this.segments.length - 1))
        if (this.segments[pulseIndex]) {
          const px = this.segments[pulseIndex].x
          const py = this.segments[pulseIndex].y
          ctx!.beginPath()
          ctx!.arc(px, py, 3, 0, Math.PI * 2)
          ctx!.fillStyle = isLight ? "#008b8b" : "#00d4ff"
          ctx!.globalAlpha = 0.5
          ctx!.fill()

          const gradient = ctx!.createRadialGradient(px, py, 0, px, py, 10)
          gradient.addColorStop(0, isLight ? "rgba(0,139,139,0.3)" : "rgba(0,212,255,0.3)")
          gradient.addColorStop(1, "rgba(0,0,0,0)")
          ctx!.beginPath()
          ctx!.arc(px, py, 10, 0, Math.PI * 2)
          ctx!.fillStyle = gradient
          ctx!.globalAlpha = 1
          ctx!.fill()
        }
        ctx!.globalAlpha = 1
      }
    }

    function drawGrid() {
      if (!canvas) return
      const isLight = document.documentElement.classList.contains("light")
      const gridSize = 80
      ctx!.strokeStyle = isLight ? "#e0e5eb" : "#1a2a3a"
      ctx!.lineWidth = 0.3
      ctx!.globalAlpha = isLight ? 0.35 : 0.15
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx!.beginPath(); ctx!.moveTo(x, 0); ctx!.lineTo(x, canvas.height); ctx!.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx!.beginPath(); ctx!.moveTo(0, y); ctx!.lineTo(canvas.width, y); ctx!.stroke()
      }
      ctx!.globalAlpha = 1
    }

    function initElements() {
      particles = Array.from({ length: 45 }, () => new Particle())
      circuits = Array.from({ length: 5 }, () => new Circuit())
    }

    function animate() {
      if (!canvas) return
      const isLight = document.documentElement.classList.contains("light")
      
      // DECISIÓN DE ACCESIBILIDAD: El fondo se pinta dinámicamente según el tema activo para garantizar 100% de legibilidad en claro u oscuro
      if (isLight) {
        ctx!.fillStyle = "rgba(253,253,254,0.96)"
        ctx!.fillRect(0, 0, canvas.width, canvas.height)
      } else {
        // En modo oscuro, dejamos el lienzo transparente para mostrar la imagen de fondo de circuitos en alta resolución
        ctx!.clearRect(0, 0, canvas.width, canvas.height)
      }

      drawGrid()

      circuits.forEach((c) => { c.update(); c.draw() })
      particles.forEach((p) => { p.update(); p.draw() })

      // Particle connections
      ctx!.strokeStyle = isLight ? "#b8860b" : "#c9a227"
      ctx!.lineWidth = 0.3
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 90) {
            ctx!.globalAlpha = (1 - dist / 90) * (isLight ? 0.08 : 0.12)
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
          }
        }
      }
      
      // Mouse interaction connection glow
      for (let i = 0; i < particles.length; i++) {
        const dx = mouse.x - particles[i].x
        const dy = mouse.y - particles[i].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.radius - 20) {
          ctx!.strokeStyle = isLight ? "rgba(0,139,139,0.15)" : "rgba(0,212,255,0.25)"
          ctx!.lineWidth = 0.4
          ctx!.beginPath()
          ctx!.moveTo(particles[i].x, particles[i].y)
          ctx!.lineTo(mouse.x, mouse.y)
          ctx!.stroke()
        }
      }

      ctx!.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX
        mouse.y = e.touches[0].clientY
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX
        mouse.y = e.touches[0].clientY
      }
    }

    const handleTouchEnd = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    const timer = setTimeout(() => {
      resize()
      animate()
    }, 150)

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      cancelAnimationFrame(animationId)
    }
  }, [theme]) // Reactiva en cambios de tema para sincronización visual de colores

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none transition-colors duration-300"
    />
  )
}
