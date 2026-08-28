"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Shield, Eye, Play, Pause, RefreshCw, Layers } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function PlatformDemo() {
  const { language } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(true)

  const translations = {
    es: {
      label: "Arquitectura en Acción",
      title: "Explora la Interfaz Conceptual RWA",
      subtitle: "Un diseño funcional concebido para estructurar trazabilidad, control de accesos y visualización de estados on-chain.",
      badge: "Demo Conceptual",
      play: "Reproducir Demo",
      pause: "Pausar",
      features: [
        { title: "Panel Funcional", desc: "Monitoreo conceptual del estado de la iniciativa, eventos de contratos y trazabilidad de participaciones." },
        { title: "Referencia ERC-3643", desc: "Modelado de reglas de validación y permisos integrados a nivel de Smart Contract." },
        { title: "Integraciones API", desc: "Conexión estructurada de workflows blockchain con sistemas de gestión y bases de datos." }
      ]
    },
    en: {
      label: "Architecture In Action",
      title: "Explore the Conceptual RWA Interface",
      subtitle: "A functional design conceived to structure traceability, access control, and on-chain state monitoring.",
      badge: "Conceptual Demo",
      play: "Play Demo",
      pause: "Pause",
      features: [
        { title: "Functional Dashboard", desc: "Conceptual tracking of project state, smart contract events, and unit balances." },
        { title: "ERC-3643 Reference", desc: "Permission modeling and validation rules defined at the smart contract level." },
        { title: "API Integrations", desc: "Structured connection between blockchain workflows and external management systems." }
      ]
    },
    pt: {
      label: "Arquitetura em Ação",
      title: "Explore a Interface Conceitual RWA",
      subtitle: "Um design funcional concebido para estruturar rastreabilidade, controle de acessos e monitoramento on-chain.",
      badge: "Demo Conceitual",
      play: "Reproduzir",
      pause: "Pausar",
      features: [
        { title: "Painel Funcional", desc: "Acompanhamento conceitual do status da iniciativa, eventos contratuais e participações." },
        { title: "Referência ERC-3643", desc: "Modelagem de regras de validação e controle de perfis diretamente no Smart Contract." },
        { title: "Integrações API", desc: "Conexão estruturada entre fluxos blockchain e sistemas de gestão corporativa." }
      ]
    }
  }

  const currentT = translations[language as keyof typeof translations] || translations.es

  const toggleVideo = () => {
    const video = document.getElementById("demo-video-player") as HTMLVideoElement
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section id="demo" className="relative py-24 lg:py-32 overflow-hidden bg-background">
      {/* Background decoration elements */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/3 blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <ScrollReveal className="mx-auto max-w-3xl text-center mb-16">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {currentT.label}
          </p>
          <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {currentT.title}
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {currentT.subtitle}
          </p>
        </ScrollReveal>

        {/* Content Layout: 2 Columns (Interactive Player & Features) */}
        <div className="grid gap-12 lg:grid-cols-12 items-center max-w-6xl mx-auto">
          
          {/* Columna Izquierda: Video Player con Controles Personalizados (7 cols) */}
          <ScrollReveal delay={150} className="lg:col-span-7">
            <div className="relative group overflow-hidden rounded-2xl border border-border/30 bg-card/10 shadow-2xl backdrop-blur-md">
              
              {/* Aspect Ratio Container 16:9 */}
              <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                
                {/* Visual Video Real con Autoplay y Loop silencioso */}
                <video
                  id="demo-video-player"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/rwa_dashboard_mockup.png"
                  className="h-full w-full object-cover opacity-80 transition-all duration-[2000ms] group-hover:scale-105 group-hover:opacity-90"
                >
                  <source
                    src="https://assets.mixkit.co/videos/preview/mixkit-financial-charts-and-data-on-a-computer-screen-41850-large.mp4"
                    type="video/mp4"
                  />
                  Tu navegador no soporta el tag de video.
                </video>
 
                {/* --- CAPAS HUD DE INFORMACIÓN FLOTANTE --- */}
                
                {/* 1. Indicador superior izquierdo: Live Modeling */}
                <div className="absolute top-4 left-4 z-20 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/85 px-3 py-1 text-[9px] font-mono font-bold text-primary-foreground uppercase tracking-widest shadow-lg backdrop-blur-sm border border-primary/25">
                    <RefreshCw className="h-3 w-3 animate-spin text-primary-foreground" />
                    INTERFACE PROTOTYPE
                  </span>
                </div>

                {/* 2. Caja flotante superior derecha: Métricas On-Chain */}
                <div className="absolute top-4 right-4 z-20 pointer-events-none hidden md:block">
                  <div className="rounded-lg border border-primary/20 bg-background/85 px-3 py-2 backdrop-blur-md shadow-lg text-[8px] font-mono text-muted-foreground space-y-1">
                    <div className="flex justify-between gap-6 text-foreground font-bold border-b border-border/30 pb-0.5">
                      <span>STANDARD:</span>
                      <span className="text-primary">ERC-3643</span>
                    </div>
                    <div>ROLE LOGIC: <span className="text-emerald-400">DEFINED</span></div>
                    <div>TEST SUITE: <span className="text-accent">PASSING</span></div>
                  </div>
                </div>

                {/* 3. Caja flotante inferior izquierda: Estado del Prototipo */}
                <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden md:block">
                  <div className="rounded-lg border border-accent/25 bg-background/85 px-3 py-2 backdrop-blur-md shadow-lg text-[8px] font-mono space-y-1">
                    <div className="text-accent font-bold uppercase tracking-wider">Architecture State</div>
                    <div className="text-[10px] text-foreground font-semibold font-sans">Functional Prototype</div>
                    <div className="text-muted-foreground/80">SOLIDITY & NEXT.JS</div>
                  </div>
                </div>
                
                {/* Controlador flotante de reproducción (esquina inferior derecha) */}
                <div className="absolute bottom-4 right-4 z-20">
                  <button
                    onClick={toggleVideo}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/85 border border-border/40 text-foreground backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg hover:border-accent/40 hover:text-accent"
                    aria-label={isPlaying ? currentT.pause : currentT.play}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                </div>

              </div>
            </div>
          </ScrollReveal>
 
          {/* Columna Derecha: Tarjetas de Características Premium Glassmorphic (5 cols) */}
          <ScrollReveal stagger staggerDelay={120} className="lg:col-span-5 space-y-6">
            {currentT.features.map((feat, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-border/30 bg-gradient-to-br from-card/30 to-background/5 p-6 backdrop-blur-md transition-all duration-500 hover:border-primary/45 hover:bg-card/35 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,199,44,0.02)] cursor-default overflow-hidden"
              >
                {/* Haz de luz de barrido rápido al hacer hover (Diagonal shimmer) */}
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-primary/3 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                <div className="flex gap-5 items-start">
                  
                  {/* Icono Rediseñado como gema tecnológica */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 text-primary shadow-[0_0_15px_rgba(255,199,44,0.06)] group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(255,199,44,0.18)] group-hover:from-primary/20 group-hover:to-accent/5 transition-all duration-500">
                    {idx === 0 && <Eye className="h-5.5 w-5.5 transition-transform group-hover:rotate-6" />}
                    {idx === 1 && <Shield className="h-5.5 w-5.5 transition-transform group-hover:scale-105" />}
                    {idx === 2 && <Layers className="h-5.5 w-5.5 transition-transform group-hover:-rotate-6" />}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {feat.title}
                      </h3>
                      {/* Pequeña flecha que se desplaza y brilla al hacer hover */}
                      <span className="text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 transform font-mono text-xs">
                        &rarr;
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed font-light">
                      {feat.desc}
                    </p>
                  </div>
                </div>

                {/* Micro-indicador de barra de progreso técnica de carga en la parte inferior */}
                <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-border/20 overflow-hidden">
                  <div className="h-full w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-700 ease-out" />
                </div>

              </div>
            ))}
          </ScrollReveal>
 
        </div>
      </div>
    </section>
  )
}
