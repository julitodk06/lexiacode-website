"use client"

import { useEffect, useRef } from "react"

interface Block {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  pulsePhase: number
  pulseSpeed: number
  colorVariant: number
}

// ─── Isometric cube with 3 visible faces ──────────────────────────────────
// The outer hexagon has 6 points. Center C connects to 3 alternating vertices
// (top, bottom-right, bottom-left) splitting the hex into 3 rhombus faces.
function drawCube(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  s: number,        // half-height of the cube
  opacity: number,
  topColor: string,
  leftColor: string,
  rightColor: string,
  edgeColor: string,
) {
  const w = s * Math.cos(Math.PI / 6)   // horizontal half-width ≈ 0.866s
  const h = s * 0.5                     // vertical slant step = s * sin(30°)

  // 6 hexagon vertices + center
  const TOP    = { x: cx,      y: cy - s }
  const TR     = { x: cx + w,  y: cy - h }
  const BR     = { x: cx + w,  y: cy + h }
  const BOT    = { x: cx,      y: cy + s }
  const BL     = { x: cx - w,  y: cy + h }
  const TL     = { x: cx - w,  y: cy - h }
  const C      = { x: cx,      y: cy }

  // ── Top face: TOP → TR → C → TL ───────────────────────────────────────
  ctx.beginPath()
  ctx.moveTo(TOP.x, TOP.y)
  ctx.lineTo(TR.x,  TR.y)
  ctx.lineTo(C.x,   C.y)
  ctx.lineTo(TL.x,  TL.y)
  ctx.closePath()
  ctx.fillStyle = `rgba(${topColor}, ${opacity * 0.30})`
  ctx.fill()
  ctx.strokeStyle = `rgba(${edgeColor}, ${opacity * 0.80})`
  ctx.lineWidth = 0.9
  ctx.stroke()

  // ── Right face: TR → BR → BOT → C ─────────────────────────────────────
  ctx.beginPath()
  ctx.moveTo(TR.x,  TR.y)
  ctx.lineTo(BR.x,  BR.y)
  ctx.lineTo(BOT.x, BOT.y)
  ctx.lineTo(C.x,   C.y)
  ctx.closePath()
  ctx.fillStyle = `rgba(${rightColor}, ${opacity * 0.14})`
  ctx.fill()
  ctx.strokeStyle = `rgba(${edgeColor}, ${opacity * 0.65})`
  ctx.lineWidth = 0.8
  ctx.stroke()

  // ── Left face: TL → C → BOT → BL ──────────────────────────────────────
  ctx.beginPath()
  ctx.moveTo(TL.x,  TL.y)
  ctx.lineTo(C.x,   C.y)
  ctx.lineTo(BOT.x, BOT.y)
  ctx.lineTo(BL.x,  BL.y)
  ctx.closePath()
  ctx.fillStyle = `rgba(${leftColor}, ${opacity * 0.08})`
  ctx.fill()
  ctx.strokeStyle = `rgba(${edgeColor}, ${opacity * 0.50})`
  ctx.lineWidth = 0.7
  ctx.stroke()

  // ── Ambient glow ───────────────────────────────────────────────────────
  const grd = ctx.createRadialGradient(cx, cy - s * 0.25, 0, cx, cy, s * 2.4)
  grd.addColorStop(0, `rgba(${edgeColor}, ${opacity * 0.18})`)
  grd.addColorStop(1, `rgba(${edgeColor}, 0)`)
  ctx.beginPath()
  ctx.arc(cx, cy, s * 2.4, 0, Math.PI * 2)
  ctx.fillStyle = grd
  ctx.fill()
}

export function BlockchainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animFrameId: number
    let blocks: Block[] = []

    // Paleta LexiaCode: oro (#C9A227) + cian (#64B4DC)
    const GOLD  = "201, 162, 39"
    const CYAN  = "100, 180, 220"

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      initBlocks()
    }

    const initBlocks = () => {
      const density = Math.floor((canvas.width * canvas.height) / 20000)
      const count   = Math.max(16, Math.min(density, 32))
      blocks = Array.from({ length: count }, () => ({
        x:            Math.random() * canvas.width,
        y:            Math.random() * canvas.height,
        vx:           (Math.random() - 0.5) * 0.28,
        vy:           (Math.random() - 0.5) * 0.22,
        size:         Math.random() * 18 + 10,
        opacity:      Math.random() * 0.45 + 0.30,
        pulsePhase:   Math.random() * Math.PI * 2,
        pulseSpeed:   Math.random() * 0.012 + 0.005,
        colorVariant: Math.floor(Math.random() * 3),  // 0=gold, 1=cyan, 2=mix
      }))
    }

    const getColors = (variant: number) => {
      if (variant === 1) return { top: CYAN, left: CYAN, right: CYAN, edge: CYAN }
      if (variant === 2) return { top: GOLD, left: CYAN, right: GOLD, edge: GOLD }
      return { top: GOLD, left: GOLD, right: GOLD, edge: GOLD }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update block positions
      for (const b of blocks) {
        b.x += b.vx
        b.y += b.vy
        b.pulsePhase += b.pulseSpeed

        // Wrap around edges
        if (b.x < -80)                   b.x = canvas.width  + 80
        if (b.x >  canvas.width  + 80)   b.x = -80
        if (b.y < -80)                   b.y = canvas.height + 80
        if (b.y >  canvas.height + 80)   b.y = -80
      }

      // ── Connection lines between nearby blocks ─────────────────────────
      const now = Date.now()
      for (let i = 0; i < blocks.length; i++) {
        for (let j = i + 1; j < blocks.length; j++) {
          const a = blocks[i]
          const b = blocks[j]
          const dx   = b.x - a.x
          const dy   = b.y - a.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const MAX  = 240

          if (dist >= MAX) continue

          const t = 1 - dist / MAX
          const lineAlpha  = t * 0.28
          const lineWidth  = t * 1.4 + 0.2

          // ── Dashed line (data pipe) ──────────────────────────────────
          const dashOffset = (now / 35) % 24
          ctx.save()
          ctx.setLineDash([7, 10])
          ctx.lineDashOffset = -dashOffset

          const lineGrad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
          lineGrad.addColorStop(0,   `rgba(${GOLD}, ${lineAlpha})`)
          lineGrad.addColorStop(0.5, `rgba(${CYAN}, ${lineAlpha * 1.4})`)
          lineGrad.addColorStop(1,   `rgba(${GOLD}, ${lineAlpha})`)

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = lineGrad
          ctx.lineWidth   = lineWidth
          ctx.stroke()
          ctx.setLineDash([])
          ctx.restore()

          // ── Traveling signal pulse on the line ───────────────────────
          const baseSpeed = 900
          const pct     = ((now / baseSpeed + i * 0.17 + j * 0.23) % 1)
          const px      = a.x + dx * pct
          const py      = a.y + dy * pct
          const pulseR  = t * 3.5 + 0.5
          const pColor  = CYAN
          const pGrd    = ctx.createRadialGradient(px, py, 0, px, py, pulseR * 2)
          pGrd.addColorStop(0, `rgba(${pColor}, ${t * 0.9})`)
          pGrd.addColorStop(1, `rgba(${pColor}, 0)`)
          ctx.beginPath()
          ctx.arc(px, py, pulseR * 2, 0, Math.PI * 2)
          ctx.fillStyle = pGrd
          ctx.fill()
        }
      }

      // ── Draw cubes ────────────────────────────────────────────────────
      for (const b of blocks) {
        const pulse   = b.opacity * (0.72 + 0.28 * Math.sin(b.pulsePhase))
        const size    = b.size
        const cols    = getColors(b.colorVariant)
        drawCube(ctx, b.x, b.y, size, Math.min(pulse, 1), cols.top, cols.left, cols.right, cols.edge)
      }

      animFrameId = requestAnimationFrame(draw)
    }

    const timer = setTimeout(() => {
      resize()
      draw()
    }, 150)

    window.addEventListener("resize", resize)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(animFrameId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.88 }}
    />
  )
}
