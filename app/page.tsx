"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { LanguageProvider } from "@/lib/language-context"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { ContactSection } from "@/components/landing/contact-section"
import Image from "next/image"
import {
  Building2, Landmark, CheckCircle2, Factory, Leaf, Sun, Gem, Briefcase,
  FileText, ShieldCheck, Cpu, Globe, Lock, Coins, Zap, BarChart3, Layers,
  Fingerprint, ArrowRight, Users, Clock, Sparkles, ChevronRight
} from "lucide-react"

// ─── CONSTANTES DE DATOS FUSIONADOS ──────────────────────────────────────────

const HERO_CHECKS = [
  "Diseño funcional y estrategia de producto",
  "Modelado de workflows para smart contracts",
  "Análisis preliminar de viabilidad técnica y riesgos",
  "Coordinación con profesionales y auditores externos",
]

const STATS = [
  { value: "Solidity", label: "Desarrollo y pruebas", icon: ShieldCheck },
  { value: "ERC-3643", label: "Estándar de referencia", icon: Cpu },
  { value: "Compliance", label: "Enfoque by-design", icon: Lock },
  { value: "IA & SaaS", label: "Automatizaciones y APIs", icon: Zap },
]

const PARTNERS = [
  {
    name: "Polygon",
    node: (
      <div className="flex items-center gap-3 font-sans">
        <svg viewBox="0 0 40 40" className="w-10 h-10 text-foreground/90" fill="currentColor">
          <path d="M28.064 10.978l-7.235-4.18c-1.285-.742-2.873-.742-4.158 0l-7.235 4.18c-1.285.742-2.079 2.117-2.079 3.602v8.36c0 1.485.794 2.86 2.079 3.602l7.235 4.18c1.285.742 2.873.742 4.158 0l7.235-4.18c1.285-.742 2.079-2.117 2.079-3.602v-8.36c0-1.485-.794-2.86-2.079-3.602zm-9.314 13.918l-3.324-1.921v-3.842l3.324-1.921 3.324 1.921v3.842l-3.324 1.921zm10.393-2.545l-3.324 1.921-3.324-1.921v-3.842l3.324-1.921 3.324 1.921v3.842z"/>
        </svg>
        <span className="text-3xl font-bold text-foreground/90 tracking-tight lowercase">polygon</span>
      </div>
    )
  },
  {
    name: "Circle",
    node: (
      <div className="flex items-center gap-3 font-sans">
        <svg viewBox="0 0 32 32" className="w-9 h-9 text-foreground/90" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M16 4 A12 12 0 1 1 4 16" />
          <path d="M16 28 A12 12 0 1 1 28 16" />
          <circle cx="16" cy="16" r="4" fill="currentColor" stroke="none" />
        </svg>
        <span className="text-2xl font-bold tracking-[0.12em] text-foreground/90 uppercase mt-0.5">CIRCLE</span>
      </div>
    )
  },
  {
    name: "AWS",
    node: (
      <div className="flex items-center gap-3 font-sans">
        <div className="relative flex flex-col items-center">
          <span className="text-[32px] font-bold text-foreground/90 tracking-tighter leading-none mb-1">aws</span>
          <svg viewBox="0 0 100 30" className="w-16 h-4 text-[#FF9900]" fill="currentColor">
            <path d="M10 15 Q 50 30 90 10 Q 80 20 60 25 Q 30 30 10 15 Z" />
            <path d="M85 5 L95 15 L80 15 Z" />
          </svg>
        </div>
      </div>
    )
  },
  {
    name: "Ethereum",
    node: (
      <div className="flex items-center gap-3 font-sans">
        <svg viewBox="0 0 32 48" className="w-7 h-10 text-foreground/80" fill="currentColor">
          <path d="M15.925 23.969L15.918 24l-11.956-7.054L15.925 0l11.956 16.945-11.956 7.024z" opacity="0.6"/>
          <path d="M15.925 23.969l11.956-7.024-11.956-5.4v12.424z" opacity="0.45"/>
          <path d="M15.925 25.867l-11.956-7.055 11.956 16.945 11.956-16.945z" opacity="0.8"/>
          <path d="M15.925 35.757v-9.89l11.956-7.055-11.956 16.945z" opacity="0.45"/>
        </svg>
        <span className="text-[26px] font-medium text-foreground/80 tracking-tight lowercase mt-1">ethereum</span>
      </div>
    )
  },
  {
    name: "Chainlink",
    node: (
      <div className="flex items-center gap-3 font-sans">
        <svg viewBox="0 0 32 32" className="w-9 h-9 text-[#2A5ADA]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle fill="currentColor" cx="16" cy="16" r="16"/>
          <path d="M16 6l-1.799 1.055L9.3 9.945 7.5 11v10l1.799 1.055 4.947 2.89L16.045 26l1.799-1.055 4.857-2.89L24.5 21V11l-1.799-1.055-4.902-2.89L16 6zm-4.902 12.89v-5.78L16 10.22l4.902 2.89v5.78L16 21.78l-4.902-2.89z" fill="#FFF"/>
        </svg>
        <span className="text-2xl font-bold text-foreground/90 tracking-tight lowercase mt-0.5">chainlink</span>
      </div>
    )
  }
]

const ASSETS = [
  { icon: Building2, title: "Real Estate", desc: "Modelado de participaciones, arquitectura funcional y gestión de roles y accesos para desarrollos inmobiliarios." },
  { icon: Landmark, title: "Fondos y Fideicomisos", desc: "Digitalización funcional de registros de beneficiarios y flujos administrativos en coordinación con fiduciarios." },
  { icon: Leaf, title: "Proyectos Agrícolas", desc: "Modelado conceptual de trazabilidad on-chain para etapas de producción de fincas, cosechas o ganado." },
  { icon: Sun, title: "Energía Renovable", desc: "Arquitectura funcional y evaluación de modelos de financiamiento y trazabilidad para infraestructura solar y eólica." },
  { icon: Gem, title: "Metales y Commodities", desc: "Modelado de representación digital y flujos de auditoría para inventario y respaldo físico." },
  { icon: Factory, title: "Infraestructura", desc: "Estructuración técnica de gobernanza, roles y control de activos para maquinaria o flotas operativas." },
  { icon: Briefcase, title: "Participaciones Corporativas", desc: "Diseño de lógica de contratos inteligentes para gobernanza y asignación de derechos corporativos." },
  { icon: FileText, title: "Instrumentos de Crédito", desc: "Modelado funcional de calendarios de pago y workflows de contratos inteligentes para emisión de deuda." }
]

const PROCESS = [
  {
    step: "01",
    title: "Diagnóstico y viabilidad preliminar",
    description: "Analizamos el activo, los objetivos comerciales, stakeholders, restricciones y riesgos iniciales de la iniciativa.",
    color: "from-teal-500/15 via-teal-500/5 to-transparent"
  },
  {
    step: "02",
    title: "Estrategia de producto y arquitectura funcional",
    description: "Definimos requisitos, roadmap, workflows, roles, integraciones y arquitectura técnica del proyecto.",
    color: "from-cyan-500/15 via-cyan-500/5 to-transparent"
  },
  {
    step: "03",
    title: "Smart contracts, aplicaciones y pruebas",
    description: "Desarrollamos componentes, contratos en Solidity, automatizaciones e integraciones, con pruebas y revisión documentada.",
    color: "from-emerald-500/15 via-emerald-500/5 to-transparent"
  },
  {
    step: "04",
    title: "Coordinación de revisiones externas y entrega",
    description: "Cuando el proyecto avanza, coordinamos profesionales legales, regulatorios, compliance y auditores externos según jurisdicción y alcance.",
    color: "from-teal-500/15 via-cyan-500/5 to-transparent"
  }
]

const WHY_TOKENIZE = [
  {
    icon: Globe,
    title: "Acceso Ampliado y Eficiente",
    description: "Digitalizá flujos y estructuras para alcanzar participantes calificados cumpliendo con los requerimientos aplicables."
  },
  {
    icon: Zap,
    title: "Optimización Operativa",
    description: "Reducí tiempos de procesamiento y fricción administrativa en la gestión de activos e información."
  },
  {
    icon: Lock,
    title: "Trazabilidad Blockchain",
    description: "Registrá eventos, permisos y estados contractuales en redes distribuidas con verificación pública."
  },
  {
    icon: BarChart3,
    title: "Flujos Automatizados",
    description: "Implementá lógica programable para la ejecución de reglas de negocio previamente validadas."
  }
]

const PROJECTS = [
  {
    id: "tafi",
    status: "Propuesta preliminar | Conversaciones comerciales",
    country: "Tucumán, Argentina 🇦🇷",
    category: "SaaS · Turismo Digital",
    title: "Hub Turístico Inteligente",
    subtitle: "Tafí del Valle · Hub Digital Regional",
    description: "Se diseñó una propuesta de producto y arquitectura funcional para un hub digital orientado al turismo y comercio regional. La iniciativa avanzó a conversaciones institucionales y comerciales; la formación de capital y la implementación integral no se completaron.",
    tech: ["Web Scraping Automatizado", "Arquitectura Micro-SaaS", "APIs Asincrónicas", "UI/UX Conversión"],
    accent: "from-emerald-500/20 via-emerald-400/5 to-transparent",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    tagColor: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5",
    image: "/projects/turismo.jpg",
    evidence: {
      assetType: "SaaS / Turismo Digital",
      country: "Argentina 🇦🇷",
      amount: "Presupuesto preliminar",
      status: "Conversaciones comerciales"
    }
  }
]

const NEWS = [
  {
    category: "Argentina 🇦🇷",
    date: "08 Mayo 2026",
    title: "\"Big Bang\" regulatorio: la CNV amplía la tokenización y consulta al mercado",
    description: "El Directorio de la CNV se reunió con actores del mercado de capitales y estudios jurídicos para avanzar en la ampliación del régimen de tokenización de valores negociables bajo el paquete de resoluciones RG 1132 a 1137.",
    image: "https://www.argentina.gob.ar/sites/default/files/2026/05/foto1_directorio_en_cnv_big_bnag_regulatorio.jpg",
    link: "https://www.argentina.gob.ar/noticias/big-bang-regulatorio-en-consulta-publica-reuniones-con-actores-del-mercado-de-capitales-y"
  },
  {
    category: "Argentina 🇦🇷",
    date: "12 Mayo 2026",
    title: "Taller sobre tokenización y activos digitales en la CNV con especialistas de El Salvador",
    description: "La CNV y la Comisión Nacional de Activos Digitales (CNAD) de El Salvador realizaron un taller técnico sobre supervisión de mercados de activos digitales y tokenización de activos del mundo real.",
    image: "https://www.argentina.gob.ar/sites/default/files/2026/05/seminario_salvadoreno_en_cnv_foto_02.jpeg",
    link: "https://www.argentina.gob.ar/noticias/taller-sobre-tokenizacion-y-activos-digitales-para-profesionales-de-cnv-dictado-por"
  },
  {
    category: "Argentina 🇦🇷",
    date: "26 Mayo 2026",
    title: "Ampliación del régimen de tokenización para emisiones bajo oferta pública automática de PYMES",
    description: "La CNV flexibiliza la digitalización de valores negociables para pequeñas y medianas empresas y fideicomisos financieros, dinamizando el financiamiento productivo on-chain.",
    image: "/regimen-tokenizacion.png",
    link: "https://www.argentina.gob.ar/noticias/ampliacion-del-regimen-de-tokenizacion-para-emisiones-bajo-oferta-publica-automatica-de"
  },
  {
    category: "Global 🌐",
    date: "04 Junio 2026",
    title: "La CNV expone en AmCham la modernización del mercado de capitales argentino",
    description: "El presidente de la CNV, Roberto E. Silva, disertó ante asociados de la Cámara de Comercio de Estados Unidos en Argentina sobre el proceso de modernización y desregulación del mercado de capitales.",
    image: "https://www.argentina.gob.ar/sites/default/files/2026/06/1._roberto_e._silva_diserto_en_la_amcham_sobre_la_modernizacion.jpeg",
    link: "https://www.argentina.gob.ar/noticias/roberto-e-silva-diserto-en-la-amcham-sobre-la-modernizacion-del-mercado-de-capitales"
  }
]


// ─── CANVAS DE CUBOS ANIMADOS ────────────────────────────────────────────────

function CtaCubesCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const ACCENT = "0,229,255" // Turquesa #00E5FF
    const SUCCESS = "74,222,128" // Verde #4ADE80

    interface Particle { x: number; y: number; vx: number; vy: number; radius: number; op: number; phase: number; c: string }
    let particles: Particle[] = []
    let raf: number

    const init = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      
      // 14 partículas luminosas lentas de fondo para máxima sutileza
      particles = Array.from({ length: 14 }, (_, i) => {
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          // Velocidad extremadamente baja
          vx: (Math.random() - 0.5) * 0.03,
          vy: (Math.random() - 0.5) * 0.03,
          radius: Math.random() * 3 + 1,
          op: Math.random() * 0.2 + 0.1,
          phase: Math.random() * Math.PI * 2,
          c: i % 2 === 0 ? ACCENT : SUCCESS,
        }
      })
    }

    const drawParticle = (p: Particle) => {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2)
      g.addColorStop(0, `rgba(${p.c},${p.op})`)
      g.addColorStop(1, `rgba(${p.c},0)`)
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2)
      ctx.fillStyle = g
      ctx.fill()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const now = Date.now()
      
      // Conexiones lineales extremadamente suaves
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = b.x - a.x, dy = b.y - a.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > 180) continue
          const t = (1 - dist / 180) * 0.12
          
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(${ACCENT},${t})`
          ctx.lineWidth = 0.5
          ctx.stroke()

          // Flujo sutil de datos entre partículas (ciclo lento de 4 segundos)
          const pct = ((now / 4000 + i * 0.17 + j * 0.23) % 1)
          const px = a.x + dx * pct, py = a.y + dy * pct
          ctx.beginPath()
          ctx.arc(px, py, 1.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${SUCCESS},${t * 2})`
          ctx.fill()
        }
      }

      // Dibujar partículas y moverlas lentamente
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.phase += 0.002
        
        // Rebote elástico sutil
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        
        drawParticle(p)
      }
      raf = requestAnimationFrame(draw)
    }

    const onResize = () => init()
    init(); draw()
    window.addEventListener("resize", onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize) }
  }, [])

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  )
}

// ─── COMPONENTE PRINCIPAL UNIFICADO ──────────────────────────────────────────

export default function Home() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-transparent overflow-x-hidden">
        <Header />

        {/* ═══════════════════════ HERO SECTION ═══════════════════════ */}
        <section className="relative pt-10 pb-4 lg:pt-14 lg:pb-8 overflow-hidden bg-[#06152d] border-b border-white/5 min-h-[85vh] flex flex-col justify-between">
          
          {/* Fondo gradiente de base con partículas/glows animados */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Círculo animado Cyan */}
            <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-[#00f5d4]/10 blur-[100px] rounded-full animate-float-slow" style={{ animationDelay: '0s', animationDuration: '14s' }} />
            
            {/* Círculo animado Azul/Violeta */}
            <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] bg-[#00b8ff]/8 blur-[130px] rounded-full animate-float-slow" style={{ animationDelay: '-4s', animationDuration: '18s' }} />
            
            {/* Círculo animado central secundario */}
            <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] bg-[#00ffdc]/5 blur-[90px] rounded-full animate-float-slow" style={{ animationDelay: '-8s', animationDuration: '16s' }} />

            <div 
              className="absolute inset-0" 
              style={{
                background: `
                  radial-gradient(
                    circle at 65% 35%,
                    rgba(0,200,200,.04),
                    transparent 50%
                  ),
                  radial-gradient(
                    circle at 25% 25%,
                    rgba(0,100,180,.03),
                    transparent 50%
                  ),
                  #06152d
                `
              }}
            />
          </div>

          {/* Ilustración de fondo del Hero (bien estirada ocupando todo el hero completo, mixBlendMode screen) */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
            <img
              src="/hero_custom_new.png"
              alt="Fondo de tokenización de activos RWA"
              className="w-full h-full object-cover object-center opacity-90"
              style={{
                mixBlendMode: 'screen',
                filter: 'drop-shadow(0 0 100px rgba(0, 245, 212, 0.18))',
              }}
            />
            {/* Glow central adicional */}
            <div className="absolute top-[50%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FFDC]/10 blur-[120px] rounded-full pointer-events-none" />
            
            {/* Capa de contraste degradada de izquierda a derecha en pantallas grandes */}
            <div 
              className="absolute inset-0 z-10 hidden lg:block" 
              style={{
                background: 'linear-gradient(to right, #06152d 0%, #06152d 25%, rgba(5, 8, 17, 0.45) 55%, transparent 90%)'
              }}
            />
            {/* Capa de contraste vertical en dispositivos móviles */}
            <div 
              className="absolute inset-0 z-10 lg:hidden" 
              style={{
                background: 'linear-gradient(to bottom, #06152d 0%, rgba(3, 7, 18, 0.7) 45%, rgba(3, 7, 18, 0.9) 95%)'
              }}
            />
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes pulse-core {
              0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
              50% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
            }
            .animate-pulse-core {
              animation: pulse-core 4s ease-in-out infinite;
            }
            @keyframes float-slow {
              0%, 100% { transform: translateY(0) translateX(0); }
              33% { transform: translateY(-20px) translateX(10px); }
              66% { transform: translateY(10px) translateX(-15px); }
            }
            .animate-float-slow {
              animation: float-slow 8s ease-in-out infinite;
            }
            @keyframes float {
              0% { transform: translateY(0); }
              50% { transform: translateY(-12px); }
              100% { transform: translateY(0); }
            }
            .animate-float-image {
              animation: float 8s ease-in-out infinite;
            }
            @keyframes pulse {
              0% {
                filter: drop-shadow(0 50px 120px rgba(0,255,220,.18)) drop-shadow(0 0 5px #00ffff);
              }
              50% {
                filter: drop-shadow(0 50px 120px rgba(0,255,220,.18)) drop-shadow(0 0 25px #00ffff);
              }
              100% {
                filter: drop-shadow(0 50px 120px rgba(0,255,220,.18)) drop-shadow(0 0 5px #00ffff);
              }
            }
            .animate-pulse-tokens {
              animation: pulse 4s ease-in-out infinite;
            }
          `}} />

          <div className="relative mx-auto z-10 w-full px-6 lg:px-20 flex-grow flex flex-col justify-between" style={{ maxWidth: '1600px' }}>
            
            {/* Contenido superpuesto sobre la imagen de fondo */}
            <div className="w-full flex flex-col justify-center text-left z-20 py-8 lg:py-16" style={{ maxWidth: '640px' }}>
              <div className="inline-flex items-center rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/10 px-4 py-1.5 text-xs text-[#00e5ff] mb-4 backdrop-blur-sm w-fit font-medium">
                <span className="flex h-2 w-2 rounded-full bg-[#00e5ff] mr-2 animate-pulse"></span>
                Product &amp; Technology for RWA Initiatives
              </div>

              <div className="relative z-10 hero-title">
                {/* Glow detrás del texto */}
                <div 
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: '450px',
                    height: '450px',
                    background: '#00ffff',
                    filter: 'blur(180px)',
                    opacity: 0.08,
                    zIndex: -1,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
                <h1 
                  className="font-bold tracking-tight text-white mb-4 text-balance"
                  style={{ 
                    fontSize: 'clamp(32px, 3.5vw, 52px)', 
                    lineHeight: '1.05', 
                    letterSpacing: '-1.5px', 
                    maxWidth: '640px' 
                  }}
                >
                  Convertí una iniciativa RWA <br />
                  en <span className="text-[#00f5d4]">un producto <br />
                  técnicamente viable</span>
                </h1>
              </div>

              <p className="text-sm lg:text-base text-[#B8C2D6] leading-relaxed max-w-xl mb-5 font-light">
                Diseñamos la estrategia de producto, la arquitectura funcional y los smart-contract workflows necesarios para evaluar y desarrollar iniciativas de tokenización por etapas. La estructuración legal, las autorizaciones regulatorias, las auditorías externas y la emisión se coordinan con profesionales y proveedores habilitados cuando corresponde.
              </p>

              {/* Capacidad sin números en fila horizontal minimalista */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 py-2 mb-6 w-full bg-transparent border-none">
                {/* Arquitectura RWA */}
                <div className="flex flex-col items-center text-center gap-1 shrink-0">
                  <div className="flex h-7 w-7 items-center justify-center text-[#00f5d4]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 11 2 2 4-4" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold text-white tracking-wide">Arquitectura RWA</span>
                  <span className="text-[9px] text-[#B8C2D6] leading-tight mt-0.5">Diseño Funcional</span>
                </div>

                {/* Smart Contracts */}
                <div className="flex flex-col items-center text-center gap-1 shrink-0">
                  <div className="flex h-7 w-7 items-center justify-center text-[#00f5d4]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold text-white tracking-wide">Solidity</span>
                  <span className="text-[9px] text-[#B8C2D6] leading-tight mt-0.5">Smart Contracts</span>
                </div>

                {/* Pruebas & Seguridad */}
                <div className="flex flex-col items-center text-center gap-1 shrink-0">
                  <div className="flex h-7 w-7 items-center justify-center text-[#00f5d4]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <circle cx="12" cy="10" r="3" />
                      <path d="M6 20c0-2.5 2-4.5 4.5-4.5h3c2.5 0 4.5 2 4.5 4.5" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold text-white tracking-wide">Pruebas &amp; QA</span>
                  <span className="text-[9px] text-[#B8C2D6] leading-tight mt-0.5">Revisión de lógica y riesgos comunes</span>
                </div>

                {/* Due Diligence */}
                <div className="flex flex-col items-center text-center gap-1 shrink-0">
                  <div className="flex h-7 w-7 items-center justify-center text-[#00f5d4]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 22h16" />
                      <path d="M20 18H4v-3h16v3z" />
                      <path d="M6 15v-4" />
                      <path d="M10 15v-4" />
                      <path d="M14 15v-4" />
                      <path d="M18 15v-4" />
                      <path d="M2 11h20L12 3 2 11z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold text-white tracking-wide">Due Diligence</span>
                  <span className="text-[9px] text-[#B8C2D6] leading-tight mt-0.5">Análisis Preliminar</span>
                </div>

                {/* IA & Automatización */}
                <div className="flex flex-col items-center text-center gap-1 shrink-0">
                  <div className="flex h-7 w-7 items-center justify-center text-[#00f5d4]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-1.19" />
                      <polyline points="9 11 11 13 15 9" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold text-white tracking-wide">IA &amp; Agentes</span>
                  <span className="text-[9px] text-[#B8C2D6] leading-tight mt-0.5">Automatización</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-[16px] mt-[24px] w-full sm:w-auto mb-6">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#00f5d4] hover:bg-[#00d1b2] px-8 py-3.5 text-sm font-bold text-[#030712] shadow-[0_0_24px_rgba(0,245,212,0.2)] hover:shadow-[0_0_36px_rgba(0,245,212,0.4)] hover:-translate-y-0.5 transition-all gap-2 w-full sm:w-auto"
                >
                  Evaluar viabilidad del proyecto
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/documentacion/"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all gap-2 w-full sm:w-auto"
                >
                  Ver arquitectura de referencia
                </a>
              </div>

              {/* Logotipos en estilo monocromático gris con mayor espaciado y visibilidad mejorada */}
              <div className="mt-1 w-full">
                <p className="text-[10px] uppercase font-semibold text-white/50 tracking-wider mb-2">Tecnologías evaluadas o utilizadas según el proyecto:</p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-white/80 filter grayscale contrast-125 brightness-200 opacity-65 hover:opacity-90 transition-opacity duration-300">
                  {/* Ethereum */}
                  <div className="flex items-center gap-1.5 font-sans">
                    <svg viewBox="0 0 32 48" className="w-4 h-6 text-white" fill="currentColor">
                      <path d="M15.925 23.969L15.918 24l-11.956-7.054L15.925 0l11.956 16.945-11.956 7.024z" opacity="0.6"/>
                      <path d="M15.925 23.969l11.956-7.024-11.956-5.4v12.424z" opacity="0.45"/>
                      <path d="M15.925 25.867l-11.956-7.055 11.956 16.945 11.956-16.945z" opacity="0.8"/>
                      <path d="M15.925 35.757v-9.89l11.956-7.055-11.956 16.945z" opacity="0.45"/>
                    </svg>
                    <span className="text-base font-bold tracking-tight lowercase">ethereum</span>
                  </div>
                  
                  {/* Polygon */}
                  <div className="flex items-center gap-1.5 font-sans">
                    <svg viewBox="0 0 40 40" className="w-5 h-5 text-white" fill="currentColor">
                      <path d="M28.064 10.978l-7.235-4.18c-1.285-.742-2.873-.742-4.158 0l-7.235 4.18c-1.285.742-2.079 2.117-2.079 3.602v8.36c0 1.485.794 2.86 2.079 3.602l7.235 4.18c1.285.742 2.873.742 4.158 0l7.235-4.18c1.285-.742 2.079-2.117 2.079-3.602zm-9.314 13.918l-3.324-1.921v-3.842l3.324-1.921 3.324 1.921v3.842l-3.324 1.921zm10.393-2.545l-3.324 1.921-3.324-1.921v-3.842l3.324-1.921 3.324 1.921v3.842z"/>
                    </svg>
                    <span className="text-base font-bold tracking-tight lowercase">polygon</span>
                  </div>

                  {/* Chainlink */}
                  <div className="flex items-center gap-1.5 font-sans">
                    <svg viewBox="0 0 32 32" className="w-5 h-5 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle fill="currentColor" cx="16" cy="16" r="16"/>
                      <path d="M16 6l-1.799 1.055L9.3 9.945 7.5 11v10l1.799 1.055 4.947 2.89L16.045 26l1.799-1.055 4.857-2.89L24.5 21V11l-1.799-1.055-4.902-2.89L16 6zm-4.902 12.89v-5.78L16 10.22l4.902 2.89v5.78L16 21.78l-4.902-2.89z" fill="#06152d"/>
                    </svg>
                    <span className="text-base font-bold tracking-tight lowercase">chainlink</span>
                  </div>
                </div>
                <p className="text-[9px] text-white/40 mt-1.5 italic">Las marcas mencionadas pertenecen a sus respectivos titulares y no implican afiliación o patrocinio.</p>
              </div>
            </div>

            {/* Barra de Estadísticas de la Base del Hero */}
            <div className="mt-8 lg:mt-12 p-6 rounded-2xl border border-white/10 bg-[#080c14]/65 backdrop-blur-md shadow-2xl shadow-black/40 relative z-20">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {STATS.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-4 group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#4ADE80]/10 border border-[#4ADE80]/20 group-hover:bg-[#4ADE80]/25 transition-colors text-[#4ADE80]">
                      <stat.icon className="h-6 w-6 text-[#4ADE80]" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xl font-bold text-white tracking-tight leading-none mb-1">{stat.value}</p>
                      <p className="text-xs text-[#B8C2D6] font-semibold leading-tight">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════════════ ¿QUÉ ES LA TOKENIZACIÓN? ═══════════════════════ */}
        <section className="py-20 lg:py-24 bg-background relative overflow-hidden border-b border-border/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-12 lg:gap-16 items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Concepto básico</p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  ¿Qué es la tokenización?
                </h2>
                <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                  Consiste en modelar la representación digital de activos reales o iniciativas productivas mediante contratos inteligentes, estructurando flujos y controles técnicos por etapas.
                </p>
              </div>
              
              {/* Gráfica simple */}
              <div className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-sm p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-black/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
                
                {[
                  { title: "Iniciativa / Activo", desc: "Proyecto o estructura física", icon: Building2 },
                  { title: "Arquitectura", desc: "Smart Contracts en Solidity", icon: Cpu },
                  { title: "Participantes", desc: "Gestión de roles y accesos", icon: Users },
                  { title: "Trazabilidad", desc: "Registro auditable on-chain", icon: Coins },
                ].map((step, idx) => (
                  <div key={step.title} className="flex flex-col items-center text-center relative z-10 flex-1">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-4 shadow-inner">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground mb-1">{step.title}</h3>
                    <p className="text-[10px] text-muted-foreground max-w-[100px] leading-snug">{step.desc}</p>
                    
                    {idx < 3 && (
                      <>
                        <div className="hidden sm:block absolute top-7 -right-3 text-primary/40 pointer-events-none">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                        <div className="block sm:hidden my-3 text-primary/40 pointer-events-none">
                          <ArrowRight className="h-5 w-5 rotate-90" />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ ¿PARA QUIÉN ES? ═══════════════════════ */}
        <section className="py-20 lg:py-24 bg-background relative overflow-hidden border-b border-border/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Sectores de aplicación</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                ¿Para quién es la tokenización?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Diseñamos arquitectura de producto y contratos inteligentes adaptados a diversos sectores productivos.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { title: "Desarrolladores inmobiliarios", icon: Building2, desc: "Modelado de participaciones, definición de roles y accesos y arquitectura funcional para flujos en Real Estate." },
                { title: "Energía renovable", icon: Sun, desc: "Arquitectura funcional, evaluación de modelos de financiamiento y trazabilidad digital de infraestructura solar y eólica." },
                { title: "Empresas productivas", icon: Factory, desc: "Trazabilidad y automatización de procesos vinculados a infraestructura y activos." },
                { title: "Fondos y Fideicomisos", icon: Landmark, desc: "Arquitectura funcional para administración de participaciones en coordinación con fiduciarios." },
                { title: "Iniciativas transfronterizas", icon: Globe, desc: "Estructuración técnica con reglas de compliance-by-design para interoperabilidad." },
              ].map((item) => (
                <div key={item.title} className="group relative rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm p-6 hover:border-primary/30 hover:bg-card/50 transition-all duration-300 shadow-lg shadow-black/5 hover:-translate-y-1">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/15 transition-colors">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ ACTIVOS TOKENIZABLES ═══════════════════════ */}
        <section className="py-20 lg:py-28 bg-secondary/5 border-b border-border/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Alcance técnico</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                ¿Qué tipo de activos evaluamos?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Diseñamos modelos de representación digital y workflows on-chain para evaluar la viabilidad de distintos tipos de activos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {ASSETS.map((asset) => (
                <div
                  key={asset.title}
                  className="group flex flex-col items-start p-5 rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm hover:border-primary/30 hover:bg-card/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary/80 mb-4 group-hover:bg-primary/15 group-hover:text-primary transition-colors">
                    <asset.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{asset.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{asset.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ PROCESO PASO A PASO ═══════════════════════ */}
        <section className="py-20 lg:py-28 relative overflow-hidden bg-secondary/5 border-b border-border/30">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] opacity-8 pointer-events-none translate-x-1/3 -translate-y-1/2">
            <div className="absolute inset-0 bg-primary rounded-full blur-[120px]" />
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Metodología de producto</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">¿Cómo lo hacemos?</h2>
              <p className="mt-4 text-lg text-muted-foreground">Estructuración tecnológica por etapas con análisis de viabilidad y pruebas documentadas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS.map((step) => (
                <div key={step.step} className="relative group">
                  <div className={`rounded-2xl border border-border/40 bg-gradient-to-b ${step.color} backdrop-blur-sm p-6 h-full hover:border-primary/30 transition-all duration-300 hover:-translate-y-1`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20">
                        {step.step}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ MARCO REGULATORIO Y TECNOLÓGICO ═══════════════════════ */}
        <section id="security" className="py-20 lg:py-28 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
          {/* Ambient glows futuristas */}
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] opacity-15 pointer-events-none -translate-x-1/2">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent blur-[120px] rounded-full" />
          </div>
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] opacity-15 pointer-events-none translate-x-1/2">
            <div className="absolute inset-0 bg-gradient-to-tl from-accent/30 to-transparent blur-[120px] rounded-full" />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Enfoque de Producto</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Enfoque de Compliance y Arquitectura Técnica
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Diseñamos lógica contractual y flujos de software con principios de compliance-by-design para facilitar la posterior revisión y validación legal especializada.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Marco Legal */}
              <div className="rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm p-8 lg:p-10 hover:border-primary/30 transition-all duration-300 shadow-xl shadow-black/5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Enfoque de Compliance</h3>
                </div>
                
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-foreground">Modelado de Requisitos KYC/AML</h4>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">Diseño de reglas funcionales para integrar verificaciones de identidad y controles de cumplimiento en los flujos de smart contracts.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-foreground">Alineación Normativa Preliminar</h4>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">Consideración de marcos regulatorios aplicables (como la RG CNV 1150/2026), coordinando el análisis y la estructuración final con abogados habilitados.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-foreground">Gestión de Roles y Permisos</h4>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">Mecanismos técnicos para administración de accesos, listas blancas y contingencias contractuales según las especificaciones del proyecto.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Arquitectura Técnica */}
              <div className="rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm p-8 lg:p-10 hover:border-amber-500/30 transition-all duration-300 shadow-xl shadow-black/5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Arquitectura Blockchain</h3>
                </div>
                
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-foreground">Estándar de Referencia ERC-3643</h4>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">Modelado de contratos inteligentes con validaciones condicionales de identidad on-chain para tokens regulados.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-foreground">Smart Contracts Modulares</h4>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">Desarrollo en Solidity basado en librerías estándar de la industria (OpenZeppelin) con suite de pruebas unitarias y revisión de código.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-foreground">Integración de APIs y Automatización</h4>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">Conexión con fuentes de datos externas y workflows automatizados para seguimiento de estados y eventos de la aplicación.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
 
        {/* ═══════════════════════ TECNOLOGÍAS INTEGRADAS (REUBICADO) ═══════════════════════ */}
        <section className="py-12 bg-secondary/5 border-b border-border/30 overflow-hidden relative z-10">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee-smooth {
              display: flex;
              width: max-content;
              animation: marquee 25s linear infinite;
            }
            .animate-marquee-smooth:hover {
              animation-play-state: paused;
            }
          `}} />
          
          <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-6 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-primary/80">
              Tecnologías e Integraciones
            </h2>
          </div>
 
          <div className="relative flex items-center overflow-hidden w-full before:absolute before:left-0 before:top-0 before:bottom-0 before:w-24 before:bg-gradient-to-r before:from-background before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-24 after:bg-gradient-to-l after:from-background after:to-transparent after:z-10">
            <div className="animate-marquee-smooth flex gap-16 lg:gap-24 items-center pl-16">
              {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, idx) => (
                <div key={idx} className="flex items-center justify-center opacity-65 hover:opacity-100 transition-opacity duration-300 transform hover:scale-105 select-none shrink-0 grayscale hover:grayscale-0">
                  {partner.node}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ PROYECTOS DESTACADOS ═══════════════════════ */}
        <section id="proyectos" className="py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-primary/4 blur-[120px] rounded-full" />
          </div>
          
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Iniciativas y casos de producto</p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Proyectos Destacados (RWA)
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Conocé propuestas y trabajos técnicos en distintas etapas, presentados con su estado real y sin implicar operaciones cerradas, financiadas o implementadas integralmente.
                </p>
              </div>
              <a href="#contact" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0">
                Iniciar mi proyecto <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="space-y-6">
              {PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="group relative rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-all duration-500"
                >
                  <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${project.accent}`} />
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0">
                    
                    {/* Left panel - Identity */}
                    <div className="relative p-7 lg:p-8 flex flex-col justify-between gap-6 border-b lg:border-b-0 lg:border-r border-border/30 overflow-hidden min-h-[240px]">
                      <div className="absolute inset-0 z-0 select-none pointer-events-none">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-[4000ms] group-hover:scale-105"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} mix-blend-multiply opacity-55`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-5">
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {project.status}
                          </span>
                          <span className="text-white/60">·</span>
                          <span className="text-[10px] text-white/95 font-medium">{project.country}</span>
                        </div>

                        <span className="inline-block rounded-full border border-white/30 bg-background/85 px-3 py-1 text-[10px] font-mono font-bold text-foreground/90 uppercase mb-4 backdrop-blur-sm">
                          {project.category}
                        </span>

                        <h3 className="text-2xl font-bold tracking-tight text-white mb-1">
                          {project.title}
                        </h3>
                        <p className="text-xs text-white/75 font-medium">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Right panel - Details */}
                    <div className="p-7 lg:p-8 flex flex-col justify-between gap-6 relative z-10">
                      <div>
                        {/* Evidencia del Proyecto */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-border/30 bg-secondary/5 mb-5 text-xs">
                          <div>
                            <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider mb-1">Tipo de Activo</p>
                            <p className="font-bold text-foreground">{project.evidence.assetType}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider mb-1">País</p>
                            <p className="font-bold text-foreground">{project.evidence.country}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider mb-1">Monto Estimado</p>
                            <p className="font-bold text-foreground">{project.evidence.amount}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider mb-1">Estado</p>
                            <p className="font-bold text-foreground">{project.evidence.status}</p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tag) => (
                            <span
                              key={tag}
                              className={`rounded-full border px-3 py-1 text-[11px] font-medium ${project.tagColor}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <a
                          href="#contact"
                          className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors shrink-0 group/cta"
                        >
                          Solicitar información
                          <ArrowRight className="h-3.5 w-3.5 group-hover/cta:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ EQUIPO DIRECTIVO ═══════════════════════ */}
        <section className="py-20 lg:py-28 relative border-t border-border/30 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden">
          {/* Ambient glows futuristas */}
          <div className="absolute top-1/3 left-0 w-[400px] h-[400px] opacity-10 pointer-events-none -translate-x-1/2">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent blur-[100px] rounded-full" />
          </div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-15 pointer-events-none translate-x-1/3 -translate-y-1/3">
            <div className="absolute inset-0 bg-primary rounded-full blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Liderazgo</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Dirección de Producto y Tecnología
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Liderazgo técnico y funcional en arquitectura Web3, smart contracts e integraciones de inteligencia artificial.
              </p>
            </div>

            <div className="flex justify-center max-w-xl mx-auto">
              {/* Julio A. Villalobo */}
              <div className="flex flex-col items-center group text-center">
                <div className="relative w-52 h-52 mb-6">
                  <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl scale-110 group-hover:bg-primary/20 transition-all duration-700" />
                  <div className="absolute inset-0 rounded-full border border-primary/30 scale-105 group-hover:scale-110 transition-transform duration-500" />

                  <div className="absolute inset-0 rounded-full overflow-hidden border border-primary/20 shadow-2xl z-10" style={{ background: "transparent" }}>
                    <Image
                      src="/ceo1.webp"
                      alt="Julio Antonio Villalobo"
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      style={{
                        filter: "grayscale(100%) contrast(1.15) brightness(0.9)",
                        mixBlendMode: "luminosity"
                      }}
                    />
                    <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(ellipse at center, transparent 50%, var(--background) 100%)" }} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground">Julio Antonio Villalobo</h3>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Managing Director | Technology, AI &amp; Product Lead</p>
                <p className="text-xs text-muted-foreground max-w-md leading-relaxed mb-4">
                  Especialista en dirección de producto, arquitectura funcional Web3/RWA, smart contracts en Solidity, pruebas de software e integración de agentes de IA y APIs.
                </p>
                <div className="flex gap-4 items-center justify-center mt-2">
                  <a
                    href="https://www.linkedin.com/in/julio-antonio-villalobo-770b22296/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0A66C2]/40 bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a
                    href="https://wa.me/5493815400016"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 hover:shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"
                    aria-label="WhatsApp"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872 .118 .571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ NOTICIAS Y NOVEDADES ═══════════════════════ */}
        <section className="py-20 lg:py-28 relative bg-secondary/5 border-t border-border/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Actualidad del Sector</p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Últimas novedades en Tokenización
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  El mercado de activos del mundo real (RWA) está evolucionando de manera sumamente rápida a nivel local y global.
                </p>
              </div>
              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {NEWS.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl border border-border/40 bg-card/20 overflow-hidden hover:border-primary/40 hover:bg-card/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                      <span className="inline-flex items-center rounded-full bg-background/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-foreground border border-border/50">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <p className="text-[11px] text-primary font-medium mb-2">{item.date}</p>
                    <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ CTA FINAL INVOLUCRANTE ═══════════════════════ */}
        <section className="py-24 lg:py-32 relative overflow-hidden border-t border-border/20 bg-background">
          <CtaCubesCanvas />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/6 blur-[130px] rounded-full" />
          </div>
          <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-sm text-primary mb-8 backdrop-blur-sm">
              <Users className="h-4 w-4" />
              <span>Evaluación de Viabilidad Técnica</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Evaluemos si tu activo o proyecto es técnicamente viable
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Hablemos sobre tu proyecto. Analizamos requisitos, arquitectura funcional y roadmap por etapas.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-9 py-4 text-sm font-bold text-primary-foreground shadow-[0_0_28px_rgba(201,162,39,0.45)] hover:shadow-[0_0_44px_rgba(201,162,39,0.65)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Evaluar viabilidad del proyecto
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ FORMULARIO DE CONTACTO ═══════════════════════ */}
        <ContactSection />

        <Footer />
      </main>
    </LanguageProvider>
  )
}
