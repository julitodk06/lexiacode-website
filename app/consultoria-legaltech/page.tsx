"use client"

import { useEffect } from "react"
import { Cpu, Landmark, CheckCircle2, ShieldAlert, Award, FileText, Scale, UserCheck, ShieldCheck, ArrowRight, BookOpen, Sparkles } from "lucide-react"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { ContactSection } from "@/components/landing/contact-section"
import { LanguageProvider } from "@/lib/language-context"
import Image from "next/image"

export default function ConsultoriaLegalTechPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const capabilities = [
    {
      icon: Scale,
      title: "Modelado Funcional de Estructuras RWA",
      desc: "Diseñamos la arquitectura técnica para conectar requerimientos contractuales con la lógica de smart contracts en redes compatibles con EVM.",
      highlight: "Arquitectura Técnica"
    },
    {
      icon: ShieldAlert,
      title: "Compliance-by-Design",
      desc: "Implementamos reglas de negocio, límites de tenencia y control de accesos en el código para facilitar la posterior auditoría por asesores legales externos.",
      highlight: "Enfoque Estructurado"
    },
    {
      icon: UserCheck,
      title: "Modelado de Identidad On-Chain",
      desc: "Configuramos los flujos de validación basados en el estándar de referencia ERC-3643 para restringir transferencias según permisos verificados.",
      highlight: "Control de Acceso"
    },
    {
      icon: FileText,
      title: "Due Diligence Técnico y Preliminar",
      desc: "Evaluación preliminar de viabilidad técnica, arquitectura de datos y riesgos de integración antes de iniciar el desarrollo de smart contracts.",
      highlight: "Evaluación Rigurosa"
    }
  ]

  const processSteps = [
    {
      step: "01",
      title: "Diagnóstico & Requerimientos",
      desc: "Analizamos la viabilidad técnica y los requerimientos funcionales del proyecto junto a los stakeholders técnicos y asesores del cliente.",
      color: "from-rose-500/20 to-rose-600/5"
    },
    {
      step: "02",
      title: "Diseño de Arquitectura Funcional",
      desc: "Estructuramos los diagramas de flujo, roles de usuario, permisos y eventos que gobernarán los contratos inteligentes.",
      color: "from-blue-500/20 to-blue-600/5"
    },
    {
      step: "03",
      title: "Mapeo de Reglas a Smart Contracts",
      desc: "Traducimos las especificaciones normativas a código Solidity con validaciones condicionales y pruebas automatizadas.",
      color: "from-amber-500/20 to-amber-600/5"
    },
    {
      step: "04",
      title: "Coordinación con Especialistas",
      desc: "Entregamos la documentación técnica y código estructurado para la revisión y validación final por parte de los asesores legales independientes.",
      color: "from-emerald-500/20 to-emerald-600/5"
    }
  ]

  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-transparent overflow-x-hidden text-foreground">
        {/* Fondo decorativo dinámico */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/10 via-transparent to-transparent pointer-events-none z-0" />
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

        <Header />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 z-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Text Area */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-400">
                  <Sparkles className="h-3.5 w-3.5" /> Arquitectura Funcional & Legal-Tech
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-balance bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground/80">
                  Consultoría Legal-Tech & Arquitectura Funcional
                </h1>
                <p className="text-lg leading-relaxed text-muted-foreground font-light max-w-2xl">
                  Conectamos especificaciones de negocio con la precisión del código en Solidity. Diseñamos la arquitectura técnica de contratos inteligentes bajo principios de compliance-by-design y coordinamos con tus asesores legales independientes.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border/40 rounded-xl px-4 py-2 bg-card/25">
                    <CheckCircle2 className="h-4 w-4 text-rose-400" /> Compliance-by-Design
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border/40 rounded-xl px-4 py-2 bg-card/25">
                    <CheckCircle2 className="h-4 w-4 text-rose-400" /> Due Diligence Técnico
                  </div>
                </div>
                <div className="pt-4">
                  <a href="#contact">
                    <button className="h-12 rounded-xl bg-rose-500 text-white font-semibold px-8 shadow-[0_0_30px_rgba(244,63,94,0.3)] hover:bg-rose-400 hover:shadow-[0_0_40px_rgba(244,63,94,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 animate-pulse-glow">
                      Estructurar Marco Legal RWA
                    </button>
                  </a>
                </div>
              </div>

              {/* Image Area - 100% abstract, no humans */}
              <div className="lg:col-span-5 relative">
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-rose-500 to-amber-500 opacity-30 blur-2xl z-0" />
                <div className="relative overflow-hidden rounded-2xl border border-rose-500/20 bg-card/30 backdrop-blur-md z-10 shadow-2xl">
                  <img
                    src="/services/consultoria-legaltech.jpg"
                    alt="Columnas de Justicia y Abstracción de Arquitectura Legal"
                    className="w-full h-[450px] object-cover opacity-90 transition-transform duration-[2000ms] hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent" />
                  
                  {/* Floating Tech Card */}
                  <div className="absolute bottom-6 left-6 right-6 border border-rose-500/30 rounded-xl p-4 bg-background/90 backdrop-blur-md z-20 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
                      <Landmark className="h-5 w-5 text-rose-400" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-rose-400 font-bold">Diseño Orientado a Compliance</p>
                      <h4 className="text-xs font-semibold text-foreground">Modelado de Reglas de Negocio</h4>
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
                Arquitectura Funcional & Especificación Legal-Tech
              </h2>
              <p className="mt-4 text-muted-foreground font-light leading-relaxed">
                Diseñamos especificaciones técnicas de smart contracts para reflejar con precisión los requerimientos de tus asesores jurídicos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {capabilities.map((cap, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/15 p-8 hover:border-rose-500/40 hover:bg-card/25 transition-all duration-300 flex items-start gap-5">
                  <div className="h-12 w-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                    <cap.icon className="h-6 w-6 text-rose-400" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest block">{cap.highlight}</span>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-rose-400 transition-colors">{cap.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                Metodología de Arquitectura Funcional
              </h2>
              <p className="mt-4 text-muted-foreground font-light leading-relaxed">
                Proceso estructurado para modelar requerimientos normativos en código Solidity testeable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-2xl border border-border/30 bg-card/10 p-6 hover:border-rose-500/35 transition-all duration-300 flex flex-col justify-between h-[250px]">
                  <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${step.color} opacity-70`} />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-black text-foreground/10 group-hover:text-rose-500/20 transition-colors select-none">{step.step}</span>
                    <div className="h-8 w-8 rounded-lg bg-rose-500/15 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-rose-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-md font-bold text-foreground group-hover:text-rose-400 transition-colors">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="py-12 border-y border-border/40 bg-rose-950/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl font-extrabold text-rose-400">ERC-3643</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Estándar de Referencia</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-rose-400">Solidity</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Desarrollo & Testing</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-rose-400">EVM</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Compatibilidad Multired</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-rose-400">Design</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Compliance-by-Design</p>
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
