"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { LanguageProvider } from "@/lib/language-context"
import { BlockchainBackground } from "@/components/ui/blockchain-background"
import { 
  Building, 
  Coins, 
  LandPlot, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Scale, 
  FileText, 
  ArrowRight,
  Sparkles
} from "lucide-react"

// Lista de casos de producto e iniciativas preliminares de LexiaCode
const productCases = [
  {
    id: "turismo-tafi",
    icon: Building,
    category: "SaaS · Turismo Digital",
    title: "Hub Turístico Inteligente",
    location: "Tafí del Valle, Tucumán, Argentina",
    problemOpportunity: "Centralización de información, reservas e integración comercial para prestadores turísticos regionales con alta dispersión operativa.",
    scopeCompleted: "Diseño de arquitectura técnica, modelado funcional de plataforma, interfaces de usuario y definición de APIs asincrónicas.",
    realStatus: "Propuesta preliminar | Conversaciones comerciales",
    technologies: ["Arquitectura Micro-SaaS", "APIs Asincrónicas", "Web Scraping", "UI/UX"],
    resultDecision: "La iniciativa avanzó a conversaciones institucionales y comerciales; la formación de capital y la implementación integral no se completaron."
  },
  {
    id: "evaluacion-minera",
    icon: LandPlot,
    category: "RWA · Evaluación de Estructuración",
    title: "Evaluación de Iniciativa Minera",
    problemOpportunity: "Análisis preliminar de factibilidad para estructurar y digitalizar derechos operativos sobre un activo minero.",
    scopeCompleted: "Análisis preliminar de arquitectura funcional, modelado de workflows de smart contracts y participación en due diligence y revisión preliminar de riesgos técnicos, legales y de contraparte.",
    realStatus: "Evaluación preliminar finalizada",
    technologies: ["Solidity", "Workflows ERC-3643", "Due Diligence Técnico"],
    resultDecision: "Se recomendó no avanzar con el proyecto tras identificar riesgos legales, regulatorios y de contraparte. No se tokenizó el activo ni se levantó capital."
  }
]

export default function ProyectosRwaPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <LanguageProvider>
      {/* Fondo de Blockchain dinámico e interactivo */}
      {mounted && <BlockchainBackground />}

      <main className="relative min-h-screen bg-transparent overflow-x-hidden text-foreground">
        <Header />

        {/* Hero Section */}
        <section className="relative pt-36 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="mx-auto max-w-6xl px-6 lg:px-8 relative z-10">
            
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"></span>
              <span className="font-mono text-[10px] font-bold tracking-widest text-primary uppercase">INICIATIVAS Y CASOS DE PRODUCTO</span>
            </div>

            <div className="max-w-4xl">
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl leading-tight mb-6">
                Casos de producto e <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%] animate-[shimmer_3s_ease_infinite] font-black">
                  iniciativas preliminares
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl font-medium">
                Documentación y registro transparente de evaluaciones técnicas, propuestas de producto y arquitecturas funcionales diseñadas por LexiaCode.
              </p>
            </div>
          </div>
        </section>

        {/* Product Cases Grid Section */}
        <section className="pb-16 lg:pb-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8 flex items-center gap-2.5 font-mono uppercase text-xs">
              <span className="h-2 w-2 rounded-full bg-primary" /> Casos Evaluados
            </h2>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {productCases.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-3xl border border-border/40 bg-card/25 backdrop-blur-md flex flex-col justify-between hover:border-primary/50 hover:bg-card/45 transition-all duration-300 shadow-xl shadow-black/20 p-6 lg:p-8"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-flex items-center rounded-lg bg-secondary/80 border border-border/40 px-2.5 py-1 text-[10px] font-bold text-muted-foreground font-mono uppercase tracking-wider">
                        {project.category}
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                        <project.icon className="h-4.5 w-4.5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors leading-snug">
                      {project.title}
                    </h3>
                    {project.location && (
                      <p className="text-xs text-muted-foreground font-medium mb-4">{project.location}</p>
                    )}
                    
                    <div className="space-y-3 text-xs leading-relaxed mt-3">
                      <div>
                        <span className="font-semibold text-foreground/90 block mb-0.5">Problema u Oportunidad:</span>
                        <p className="text-muted-foreground font-light">{project.problemOpportunity}</p>
                      </div>

                      <div>
                        <span className="font-semibold text-foreground/90 block mb-0.5">Alcance Realizado:</span>
                        <p className="text-muted-foreground font-light">{project.scopeCompleted}</p>
                      </div>

                      <div>
                        <span className="font-semibold text-foreground/90 block mb-0.5">Estado Real:</span>
                        <p className="text-amber-400 font-mono font-medium text-[11px]">{project.realStatus}</p>
                      </div>

                      <div>
                        <span className="font-semibold text-foreground/90 block mb-0.5">Resultado / Decisión:</span>
                        <p className="text-muted-foreground font-light bg-secondary/30 p-3 rounded-xl border border-border/30">{project.resultDecision}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border/30 pt-4 mt-6">
                    <span className="text-[10px] font-mono uppercase font-semibold text-muted-foreground block mb-2">Tecnologías Evaluadas:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="rounded-full border border-border/50 bg-secondary/40 px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enfoque Metodológico */}
        <section className="pb-24 lg:pb-32 relative">
          <div className="mx-auto max-w-6xl px-6 lg:px-8 z-10 relative">
            <div className="rounded-3xl border border-border/40 bg-card/25 backdrop-blur-md p-8 lg:p-12 shadow-2xl relative overflow-hidden">
              <div className="max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5">
                  <ShieldCheck className="h-4.5 w-4.5 text-primary" />
                  <span className="font-mono text-[10px] font-bold tracking-widest text-primary uppercase">CRITERIOS DE DUE DILIGENCE Y PRODUCTO</span>
                </div>
                
                <h2 className="text-3xl font-black text-foreground sm:text-4xl leading-tight">
                  Evaluación Rigurosa y Entrega por Etapas
                </h2>
                
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  En LexiaCode priorizamos la viabilidad técnica, la seguridad de contratos inteligentes y el análisis riguroso de riesgos. Cuando una iniciativa no reúne las condiciones jurídicas o técnicas adecuadas, recomendamos no avanzar antes de comprometer recursos.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs font-mono">
                  <div className="p-4 rounded-2xl border border-border/30 bg-[#07080a]/40 space-y-2">
                    <Scale className="h-5 w-5 text-primary" />
                    <h4 className="font-bold text-foreground uppercase text-[11px]">Due Diligence</h4>
                    <p className="text-[10px] text-muted-foreground font-light leading-normal">Evaluación preliminar de viabilidad técnica y análisis de riesgos de contraparte.</p>
                  </div>
                  <div className="p-4 rounded-2xl border border-border/30 bg-[#07080a]/40 space-y-2">
                    <Cpu className="h-5 w-5 text-accent" />
                    <h4 className="font-bold text-foreground uppercase text-[11px]">Smart Contracts</h4>
                    <p className="text-[10px] text-muted-foreground font-light leading-normal">Desarrollo modular en Solidity con suite de pruebas unitarias y revisión de código.</p>
                  </div>
                  <div className="p-4 rounded-2xl border border-border/30 bg-[#07080a]/40 space-y-2">
                    <Layers className="h-5 w-5 text-emerald-400" />
                    <h4 className="font-bold text-foreground uppercase text-[11px]">Coordinación</h4>
                    <p className="text-[10px] text-muted-foreground font-light leading-normal">Articulación con especialistas legales y auditores externos según la jurisdicción.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </LanguageProvider>
  )
}
