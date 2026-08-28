"use client"

import { useEffect } from "react"
import { ShieldCheck, Code2, CheckCircle2, Lock, Eye, Zap, Flame, Terminal, FileText, ArrowRight, Activity, Sparkles } from "lucide-react"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { ContactSection } from "@/components/landing/contact-section"
import { LanguageProvider } from "@/lib/language-context"
import Image from "next/image"

export default function SmartContractsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const capabilities = [
    {
      icon: Code2,
      title: "Desarrollo en Solidity & ERC-3643",
      desc: "Implementamos smart contracts para gestión de permisos y representación de activos siguiendo el estándar de referencia ERC-3643.",
      highlight: "Estándares Abiertos"
    },
    {
      icon: ShieldCheck,
      title: "Revisión de Seguridad & Testing",
      desc: "Análisis de código Solidity mediante suites de pruebas unitarias, análisis estático y revisión de patrones comunes de riesgo.",
      highlight: "Pruebas Automatizadas"
    },
    {
      icon: Zap,
      title: "Optimización de Gas",
      desc: "Refactorización de funciones y estructuras de datos para un consumo eficiente de gas en redes compatibles con EVM.",
      highlight: "Eficiencia de Código"
    },
    {
      icon: Activity,
      title: "Integraciones de Interfaces & APIs",
      desc: "Conectamos smart contracts con backends y aplicaciones web mediante bibliotecas como ethers.js y viem.",
      highlight: "Integración Full-Stack"
    }
  ]

  const processSteps = [
    {
      step: "01",
      title: "Especificación de Requisitos",
      desc: "Definimos la lógica de negocio, roles de usuario y permisos que gobernarán los contratos inteligentes.",
      color: "from-purple-500/20 to-purple-600/5"
    },
    {
      step: "02",
      title: "Desarrollo en Solidity",
      desc: "Escribimos código limpio, modular y documentado siguiendo las mejores prácticas de la comunidad de desarrolladores de Ethereum.",
      color: "from-blue-500/20 to-blue-600/5"
    },
    {
      step: "03",
      title: "Suites de Pruebas Automatizadas",
      desc: "Ejecutamos tests unitarios y de integración con frameworks como Hardhat y Foundry para verificar exhaustivamente cada método.",
      color: "from-pink-500/20 to-pink-600/5"
    },
    {
      step: "04",
      title: "Despliegue en Redes de Prueba y Mainnet",
      desc: "Despliegue controlado, verificación de código fuente en exploradores de bloques y entrega de documentación técnica.",
      color: "from-emerald-500/20 to-emerald-600/5"
    }
  ]

  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-transparent overflow-x-hidden text-foreground">
        {/* Fondo decorativo dinámico */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-transparent to-transparent pointer-events-none z-0" />
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

        <Header />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 z-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Text Area */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-400">
                  <Sparkles className="h-3.5 w-3.5" /> Ingeniería de Software & Smart Contracts
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-balance bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground/80">
                  Smart Contracts en Solidity & Pruebas
                </h1>
                <p className="text-lg leading-relaxed text-muted-foreground font-light max-w-2xl">
                  Desarrollamos, optimizamos y probamos contratos inteligentes en Solidity. Aplicamos pruebas unitarias automatizadas y principios de compliance-by-design bajo estándares abiertos como ERC-3643.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border/40 rounded-xl px-4 py-2 bg-card/25">
                    <CheckCircle2 className="h-4 w-4 text-purple-400" /> Tests con Hardhat & Foundry
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border/40 rounded-xl px-4 py-2 bg-card/25">
                    <CheckCircle2 className="h-4 w-4 text-purple-400" /> Referencia ERC-3643
                  </div>
                </div>
                <div className="pt-4">
                  <a href="#contact">
                    <button className="h-12 rounded-xl bg-purple-500 text-white font-semibold px-8 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-purple-400 hover:shadow-[0_0_40px_rgba(168,85,247,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 animate-pulse-glow">
                      Auditar / Desarrollar Contratos
                    </button>
                  </a>
                </div>
              </div>

              {/* Image Area - 100% abstract, no humans */}
              <div className="lg:col-span-5 relative">
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-purple-500 to-pink-500 opacity-30 blur-2xl z-0" />
                <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-card/30 backdrop-blur-md z-10 shadow-2xl">
                  <img
                    src="/services/smart-contracts.jpg"
                    alt="Nodos de Conexión Abstracta y Smart Contracts Blockchain"
                    className="w-full h-[450px] object-cover opacity-90 transition-transform duration-[2000ms] hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent" />
                  
                  {/* Floating Tech Card */}
                  <div className="absolute bottom-6 left-6 right-6 border border-purple-500/30 rounded-xl p-4 bg-background/90 backdrop-blur-md z-20 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                      <Lock className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-purple-400 font-bold">Ciberseguridad</p>
                      <h4 className="text-xs font-semibold text-foreground">Trazabilidad y Control de Acceso On-Chain</h4>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-24 border-t border-border/40 bg-card/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                Servicios Especializados de Auditoría e Ingeniería
              </h2>
              <p className="mt-4 text-muted-foreground font-light leading-relaxed">
                Protegemos la integridad de tu ecosistema Web3 mediante análisis formal y desarrollo robusto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {capabilities.map((cap, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/15 p-8 hover:border-purple-500/40 hover:bg-card/25 transition-all duration-300 flex items-start gap-5">
                  <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                    <cap.icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block">{cap.highlight}</span>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-purple-400 transition-colors">{cap.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de Video Demo — Tecnología en Acción */}
        <section className="py-24 border-t border-border/40 bg-card/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 items-center max-w-6xl mx-auto">
              
              {/* Left Column: Styled Video Player Mockup (7 cols) */}
              <div className="lg:col-span-7">
                <div className="relative group overflow-hidden rounded-2xl border border-purple-500/20 bg-[#07080a] p-2.5 shadow-2xl shadow-black/40 glowing-card">
                  {/* Top ambient status bar */}
                  <div className="flex items-center justify-between px-3 pb-2 text-[10px] text-muted-foreground font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                      <span>CRYPTOGRAPHIC COMPLIANCE PROCESS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-purple-400" />
                      <span>ON-CHAIN AUDITED RULES</span>
                    </div>
                  </div>

                  {/* Video Player */}
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-inner">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/services/smart-contracts.jpg"
                      className="h-full w-full object-cover opacity-90 transition-opacity duration-1000 group-hover:scale-102"
                    >
                      <source
                        src="https://assets.mixkit.co/videos/preview/mixkit-abstract-network-connection-background-41847-large.mp4"
                        type="video/mp4"
                      />
                      Tu navegador no soporta el tag de video.
                    </video>

                    {/* Dark overlay grid */}
                    <div className="absolute inset-0 bg-[#000]/10 mix-blend-overlay pointer-events-none" />

                    {/* Live Indicator Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/85 px-2.5 py-0.5 text-[9px] font-mono font-bold text-white uppercase tracking-wider shadow-md">
                        <Sparkles className="h-2.5 w-2.5 animate-spin" />
                        CONTRACT AUDIT RUNNING
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Features list (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-purple-400">
                  Tecnología en Acción
                </p>
                <h3 className="text-3xl font-extrabold tracking-tight text-foreground">
                  Monitoreo de Smart Contracts en Tiempo Real
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  Nuestros contratos inteligentes están optimizados a nivel de bytecode. Cada transacción ejecuta reglas lógicas de cumplimiento e inmutabilidad con total transparencia.
                </p>
                <ul className="space-y-4">
                  {[
                    "Validación de permisos bajo estándar ERC-3643",
                    "Firmas multifirma institucionales (Multi-Sig)",
                    "Revisión de lógica contractual y riesgos comunes",
                    "Revisión y optimización del consumo de gas mediante pruebas y análisis de ejecución, sin prometer porcentajes fijos."
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                Ciclo de Vida de Desarrollo y Testing
              </h2>
              <p className="mt-4 text-muted-foreground font-light leading-relaxed">
                Diseñamos, codificamos, probamos y revisamos la lógica contractual para identificar riesgos comunes. Esta revisión técnica no sustituye una auditoría independiente especializada cuando el proyecto lo requiere.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-2xl border border-border/30 bg-card/10 p-6 hover:border-purple-500/35 transition-all duration-300 flex flex-col justify-between h-[250px]">
                  <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${step.color} opacity-70`} />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-black text-foreground/10 group-hover:text-purple-500/20 transition-colors select-none">{step.step}</span>
                    <div className="h-8 w-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-md font-bold text-foreground group-hover:text-purple-400 transition-colors">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="py-12 border-y border-border/40 bg-purple-950/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl font-extrabold text-purple-400">Hardhat</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Entorno de Pruebas</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-purple-400">Solidity</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Lenguaje Nativo</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-purple-400">Testing</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Suites Automatizadas</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-purple-400">ERC-3643</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Estándar Empleado</p>
              </div>
            </div>
          </div>
        </section>

        <div id="contact">
          <ContactSection />
        </div>

        <Footer />
      </main>
    </LanguageProvider>
  )
}
