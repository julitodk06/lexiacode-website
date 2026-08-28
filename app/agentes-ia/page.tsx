"use client"

import { useEffect, useState } from "react"
import { Bot, Cpu, CheckCircle2, Zap, Shield, LineChart, MessageSquare, Server, ArrowRight, Maximize2, X, Sparkles, Lock, FileSpreadsheet, Eye } from "lucide-react"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { ContactSection } from "@/components/landing/contact-section"
import { LanguageProvider } from "@/lib/language-context"

export default function AgentesIAPage() {
  const [isZoomOpen, setIsZoomOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  // Casos de uso de economía real (Información no repetitiva y complementaria)
  const businessCases = [
    {
      icon: FileSpreadsheet,
      title: "Estructuración de Datos de Activos",
      desc: "Ingesta automatizada de documentación técnica, especificaciones operativas e informes de inventario. Extraemos, validamos y estructuramos datos complejos para alimentar interfaces y smart contracts.",
      benefit: "Agilización en preparación de datos para due diligence técnico"
    },
    {
      icon: Shield,
      title: "Modelado de Reglas y Verificaciones",
      desc: "Integración de pipelines para validación de formatos, reglas de negocio y control de consistencia de datos antes de su registro o consulta en blockchain.",
      benefit: "Consistencia y validación automatizada de información"
    },
    {
      icon: MessageSquare,
      title: "Asistente Técnico de Producto",
      desc: "Agentes conversacionales especializados entrenados con la documentación técnica y especificaciones de arquitectura para resolver dudas funcionales de forma inmediata.",
      benefit: "Soporte técnico escalable para usuarios y desarrolladores"
    }
  ]

  // Características de privacidad y grado corporativo
  const corporateSec = [
    {
      title: "Seguridad y Privacidad IP",
      desc: "Entrenamos y desplegamos modelos LLM en servidores locales o nubes privadas (VPC). Tu propiedad intelectual y base de datos corporativa nunca se comparten con terceros ni se utilizan para entrenamiento público."
    },
    {
      title: "Infraestructura Cloud Elástica",
      desc: "Orquestación robusta de pipelines de datos y flujos en la nube. Diseñado con arquitecturas preparadas para procesar tareas mediante colas y flujos asíncronos, ajustando la arquitectura según los requisitos del proyecto."
    }
  ]

  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-transparent overflow-x-hidden text-foreground">
        {/* Fondo decorativo dinámico */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/10 via-transparent to-transparent pointer-events-none z-0" />
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

        <Header />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 z-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Text Area */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  <Sparkles className="h-3.5 w-3.5" /> Ecosistema de Automatización Cognitiva
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-balance bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground/80">
                  Agentes IA & Automatización de Procesos
                </h1>
                <p className="text-lg leading-relaxed text-muted-foreground font-light max-w-2xl">
                  Integramos inteligencia artificial cognitiva de grado institucional para automatizar flujos complejos, prospección comercial e inteligencia de datos. Conecta tus sistemas físicos con la eficiencia de los modelos LLM más avanzados.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border/40 rounded-xl px-4 py-2 bg-card/25">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400" /> Modelos Propios & Privados
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border/40 rounded-xl px-4 py-2 bg-card/25">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400" /> Integración API Segura
                  </div>
                </div>
                <div className="pt-4 flex flex-wrap gap-4">
                  <a href="#contacto">
                    <button className="h-12 rounded-xl bg-cyan-500 text-black font-semibold px-8 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-xs">
                      Estructurar Proyecto de IA
                    </button>
                  </a>
                  <button 
                    onClick={() => setIsZoomOpen(true)}
                    className="h-12 rounded-xl border border-border/50 bg-background/50 hover:bg-secondary/40 text-foreground font-semibold px-6 transition-all duration-300 flex items-center gap-2 text-xs cursor-pointer"
                  >
                    <Eye className="h-4 w-4 text-cyan-400" /> Ver Mapa de Arquitectura
                  </button>
                </div>
              </div>

              {/* Image Area — Infografía Interactiva Premium */}
              <div className="lg:col-span-5 relative group/info">
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-500 opacity-25 blur-2xl z-0" />
                <div className="relative overflow-hidden rounded-2xl border border-cyan-500/25 bg-card/20 backdrop-blur-md z-10 shadow-2xl p-2">
                  <div className="relative overflow-hidden rounded-xl bg-black/40 border border-border/20 aspect-[4/3] group-hover/info:border-cyan-500/40 transition-colors">
                    <img
                      src="/services/infografia-ia.png"
                      alt="Mapa Completo de Arquitectura Agentes IA & Automatización"
                      className="w-full h-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover/info:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/10 to-transparent" />
                    
                    {/* Botón flotante para Zoom */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/info:opacity-100 transition-opacity duration-300 z-20">
                      <button 
                        onClick={() => setIsZoomOpen(true)}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-black shadow-2xl hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                      >
                        <Maximize2 className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Floating Tech Pill */}
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-background/90 px-3.5 py-1 text-[9px] font-semibold text-cyan-400 uppercase tracking-wider backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        Mapa Operativo de la Arquitectura
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Sección: Casos de Uso de Economía Real */}
        <section className="py-24 border-t border-border/40 bg-card/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">Implementaciones Corporativas</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground mt-3">
                IA Aplicada a Activos Reales (RWA)
              </h2>
              <p className="mt-4 text-muted-foreground font-light leading-relaxed">
                Nuestros desarrollos no son simples chatbots genéricos; diseñamos agentes inteligentes orientados a resolver los retos específicos de los mercados regulados y la economía real.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {businessCases.map((bCase, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/15 p-8 hover:border-cyan-500/40 hover:bg-card/25 transition-all duration-300 flex flex-col justify-between h-full">
                  <div className="space-y-6">
                    <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                      <bCase.icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-cyan-400 transition-colors">{bCase.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed font-light">{bCase.desc}</p>
                    </div>
                  </div>
                  <div className="border-t border-border/30 pt-4 mt-6">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">Impacto comercial</p>
                    <p className="text-xs font-semibold text-foreground">{bCase.benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de Video Demo — Tecnología en Acción */}
        <section className="py-24 border-t border-border/40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 items-center max-w-6xl mx-auto">
              
              {/* Left Column: Styled Video Player Mockup (7 cols) */}
              <div className="lg:col-span-7">
                <div className="relative group overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#07080a] p-2.5 shadow-2xl shadow-black/40 glowing-card">
                  {/* Top ambient status bar */}
                  <div className="flex items-center justify-between px-3 pb-2 text-[10px] text-muted-foreground font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span>SECURE TRANSACTION PROCESS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5 text-cyan-400" />
                      <span>REAL-TIME COGNITIVE PROCESS</span>
                    </div>
                  </div>

                  {/* Video Player */}
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-inner">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/services/agentes-ia-core.png"
                      className="h-full w-full object-cover opacity-90 transition-opacity duration-1000 group-hover:scale-102"
                    >
                      <source
                        src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-abstract-digital-technology-background-41846-large.mp4"
                        type="video/mp4"
                      />
                      Tu navegador no soporta el tag de video.
                    </video>

                    {/* Dark overlay grid */}
                    <div className="absolute inset-0 bg-[#000]/10 mix-blend-overlay pointer-events-none" />

                    {/* Live Indicator Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/85 px-2.5 py-0.5 text-[9px] font-mono font-bold text-black uppercase tracking-wider shadow-md">
                        <Sparkles className="h-2.5 w-2.5 animate-spin" />
                        AI COGNITIVE PROCESSING
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Features list (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
                  Tecnología en Acción
                </p>
                <h3 className="text-3xl font-extrabold tracking-tight text-foreground">
                  Procesamiento de Agentes en Tiempo Real
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  Nuestros agentes cognitivos están listos para integrarse con tus canales operativos, actuando de forma autónoma sobre pipelines de datos altamente seguros y con total trazabilidad.
                </p>
                <ul className="space-y-4">
                  {[
                    "Latencia de inferencia menor a 2 segundos",
                    "Alineación a flujos de datos privados y encriptados",
                    "Acceso directo a APIs, bases de datos y CRMs corporativos",
                    "Auditoría continua de precisión y logs en tiempo real"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Sección: Privacidad y Grado Corporativo */}
        <section className="py-24 border-t border-border/40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
              
              {/* Columna 1: Título e Introducción (4 cols en lg) */}
              <div className="lg:col-span-4 space-y-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">Seguridad & Escalabilidad</p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Inteligencia Artificial de Grado Corporativo
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  Entendemos que los datos de tu empresa son tu activo más valioso. Por ello, diseñamos una infraestructura de IA robusta que prioriza la seguridad jurídica, la privacidad criptográfica y la fiabilidad operativa.
                </p>
              </div>

              {/* Columna 2: Visual Premium del Núcleo IA (4 cols en lg) */}
              <div className="lg:col-span-4 relative group/core select-none pointer-events-none">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 opacity-40 blur-xl z-0" />
                <div className="relative overflow-hidden rounded-xl border border-cyan-500/25 bg-card/45 backdrop-blur-sm p-1.5 z-10 shadow-xl">
                  <img
                    src="/services/agentes-ia-core.png"
                    alt="Núcleo del Procesador de Inteligencia Artificial Cognitiva LexiaCode"
                    className="w-full h-[220px] object-cover rounded-lg opacity-90 transition-transform duration-700 ease-out group-hover/core:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent rounded-lg" />
                </div>
              </div>

              {/* Columna 3: Características Detalladas (4 cols en lg) */}
              <div className="lg:col-span-4 space-y-8">
                {corporateSec.map((sec, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      {idx === 0 ? <Lock className="h-5 w-5 text-cyan-400" /> : <Server className="h-5 w-5 text-cyan-400" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{sec.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed font-light mt-2">{sec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="py-12 border-y border-border/40 bg-cyan-950/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl font-extrabold text-cyan-400">LLM</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Modelos Especializados</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-cyan-400">APIs</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Integración de Sistemas</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-cyan-400">RAG</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Indexación de Documentos</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-cyan-400">Pipelines</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Procesamiento Automatizado</p>
              </div>
            </div>
          </div>
        </section>

        {/* Formulario de Contacto */}
        <div id="contact">
          <ContactSection />
        </div>

        <Footer />

        {/* ZOOM MODAL (Ampliar Infografía Técnica) */}
        {isZoomOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4 animate-fade-in">
            <div className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-2xl border border-cyan-500/30 bg-card p-2 shadow-2xl">
              <button 
                onClick={() => setIsZoomOpen(false)}
                className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-background/85 border border-border/50 text-foreground hover:scale-105 active:scale-95 transition-transform shadow-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="w-full h-full overflow-auto rounded-xl bg-black/40">
                <img
                  src="/services/infografia-ia.png"
                  alt="Infografía Agentes IA & Automatización Completa"
                  className="w-full h-auto object-contain mx-auto max-h-[85vh]"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </LanguageProvider>
  )
}
