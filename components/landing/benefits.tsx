"use client"

import { useLanguage } from "@/lib/language-context"
import { Zap, Globe, ShieldCheck, FileSpreadsheet, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function Benefits() {
  const { language } = useLanguage()

  const translations = {
    es: {
      label: "El Enfoque LexiaCode",
      title: "Arquitectura y Desarrollo Técnico para Activos Digitales",
      subtitle: "Convertimos requerimientos funcionales en código estructurado, trazable y defendible.",
      cta: "Solicitar Evaluación Técnica",
      benefitsList: [
        {
          icon: Zap,
          title: "Modelado de Participaciones",
          description: "Diseñamos la estructura técnica para representar digitalmente derechos operativos y participaciones mediante smart contracts en Solidity.",
          stat: "Arquitectura Funcional",
          accent: "from-cyan-500/20 to-cyan-600/5",
          textColor: "text-cyan-600 dark:text-cyan-400"
        },
        {
          icon: Globe,
          title: "Trazabilidad e Interoperabilidad",
          description: "Implementamos interfaces y APIs para consultar y registrar estados en blockchain con total transparencia operativa.",
          stat: "Trazabilidad On-Chain",
          accent: "from-amber-500/20 to-amber-600/5",
          textColor: "text-amber-600 dark:text-amber-400"
        },
        {
          icon: ShieldCheck,
          title: "Smart Contracts en Solidity",
          description: "Desarrollo y pruebas unitarias de contratos inteligentes bajo estándares de referencia como ERC-3643 para gestión condicional de permisos.",
          stat: "Pruebas de Software",
          accent: "from-purple-500/20 to-purple-600/5",
          textColor: "text-purple-600 dark:text-purple-400"
        },
        {
          icon: FileSpreadsheet,
          title: "Compliance-by-Design",
          description: "Modelamos reglas de negocio y permisos en el código para facilitar la posterior revisión y validación por parte de asesores legales independientes.",
          stat: "Diseño Estructurado",
          accent: "from-emerald-500/20 to-emerald-600/5",
          textColor: "text-emerald-600 dark:text-emerald-400"
        }
      ]
    },
    en: {
      label: "The LexiaCode Approach",
      title: "Technical Architecture & Engineering for Digital Assets",
      subtitle: "We translate functional requirements into structured, testable, and defensible code.",
      cta: "Request Technical Evaluation",
      benefitsList: [
        {
          icon: Zap,
          title: "Asset Share Modeling",
          description: "We design technical architecture to digitally represent operational rights and asset units via Solidity smart contracts.",
          stat: "Functional Architecture",
          accent: "from-cyan-500/20 to-cyan-600/5",
          textColor: "text-cyan-600 dark:text-cyan-400"
        },
        {
          icon: Globe,
          title: "Traceability & Interoperability",
          description: "We implement APIs and interfaces to query and record state updates on distributed networks with full operational clarity.",
          stat: "On-Chain Traceability",
          accent: "from-amber-500/20 to-amber-600/5",
          textColor: "text-amber-600 dark:text-amber-400"
        },
        {
          icon: ShieldCheck,
          title: "Solidity Smart Contracts",
          description: "Development and unit testing of smart contracts following reference standards like ERC-3643 for conditional permission logic.",
          stat: "Software Testing",
          accent: "from-purple-500/20 to-purple-600/5",
          textColor: "text-purple-600 dark:text-purple-400"
        },
        {
          icon: FileSpreadsheet,
          title: "Compliance-by-Design",
          description: "We encode business logic and access control rules into smart contracts to facilitate legal review by independent counsel.",
          stat: "Structured Design",
          accent: "from-emerald-500/20 to-emerald-600/5",
          textColor: "text-emerald-600 dark:text-emerald-400"
        }
      ]
    },
    pt: {
      label: "A Abordagem LexiaCode",
      title: "Arquitetura e Engenharia Técnica para Ativos Digitais",
      subtitle: "Convertemos requisitos funcionais em código estruturado, testável e defensável.",
      cta: "Solicitar Avaliação Técnica",
      benefitsList: [
        {
          icon: Zap,
          title: "Modelagem de Participações",
          description: "Projetamos a arquitetura técnica para representar digitalmente direitos operacionais mediante smart contracts em Solidity.",
          stat: "Arquitetura Funcional",
          accent: "from-cyan-500/20 to-cyan-600/5",
          textColor: "text-cyan-600 dark:text-cyan-400"
        },
        {
          icon: Globe,
          title: "Rastreabilidade e Interoperabilidade",
          description: "Implementamos APIs e interfaces para consultar e registrar estados na blockchain com transparência operacional.",
          stat: "Rastreabilidade On-Chain",
          accent: "from-amber-500/20 to-amber-600/5",
          textColor: "text-amber-600 dark:text-amber-400"
        },
        {
          icon: ShieldCheck,
          title: "Smart Contracts em Solidity",
          description: "Desenvolvimento e testes unitários de contratos inteligentes sob padrões como ERC-3643 para permissões condicionais.",
          stat: "Testes de Software",
          accent: "from-purple-500/20 to-purple-600/5",
          textColor: "text-purple-600 dark:text-purple-400"
        },
        {
          icon: FileSpreadsheet,
          title: "Compliance-by-Design",
          description: "Modelamos regras de governança e controle de acesso no código para facilitar validação jurídica independente.",
          stat: "Design Estruturado",
          accent: "from-emerald-500/20 to-emerald-600/5",
          textColor: "text-emerald-600 dark:text-emerald-400"
        }
      ]
    }
  }

  const currentT = translations[language as keyof typeof translations] || translations.es

  return (
    <section id="benefits" className="relative py-24 lg:py-32 overflow-hidden bg-background">
      {/* Background decoration elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
        
        {/* Section header */}
        <ScrollReveal className="mx-auto max-w-3xl text-center mb-20">
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

        {/* Content Layout: 2 Columns responsively split (Visual & Text) */}
        <div className="grid gap-12 lg:grid-cols-12 items-center max-w-6xl mx-auto">
          
          {/* Left: Immersive conceptual image */}
          <ScrollReveal delay={200} className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-border/30 bg-card/10 shadow-2xl aspect-[4/5] flex items-center justify-center">
            <img
              src="/rwa_dashboard_mockup.png"
              alt="LexiaCode RWA Dashboard Mockup"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f]/90 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-border/30 bg-background/50 p-4 backdrop-blur-sm shadow-lg text-left">
              <p className="text-[9px] font-mono font-semibold uppercase tracking-widest text-primary mb-0.5">
                Panel Funcional
              </p>
              <h4 className="text-xs font-bold text-foreground">
                Dashboard de Arquitectura RWA
              </h4>
              <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">
                Modelado conceptual de contratos inteligentes, control de roles y trazabilidad de eventos on-chain.
              </p>
            </div>
          </ScrollReveal>

          {/* Right: Benefits grid (7 cols) - Staggered scroll entry */}
          <ScrollReveal stagger staggerDelay={120} className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
            {currentT.benefitsList.map((benefit, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/30 bg-card/10 p-5 backdrop-blur-md transition-all duration-500 hover:border-primary/45 hover:bg-card/20 hover:shadow-[0_0_50px_rgba(var(--primary),0.05)] hover:-translate-y-1 glowing-card cursor-default"
              >
                {/* Dynamic Accent Color strip */}
                <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${benefit.accent} opacity-70 group-hover:opacity-100 transition-opacity`} />
                
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/80 border border-border/40 transition-transform group-hover:scale-110 shadow-md">
                    <benefit.icon className={`h-5 w-5 ${benefit.textColor}`} />
                  </div>

                  <div className="mt-4">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                      {benefit.stat}
                    </span>
                    <h3 className="mt-2.5 text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="mt-2.5 text-[11px] text-muted-foreground leading-relaxed font-light">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/10 flex items-center gap-2 text-[9px] text-muted-foreground font-mono">
                  <CheckCircle className={`h-3.5 w-3.5 ${benefit.textColor} shrink-0`} />
                  <span>Listo para integrar</span>
                </div>
              </div>
            ))}
          </ScrollReveal>

        </div>

        {/* Call to Action Bar */}
        <ScrollReveal delay={300} className="mt-16 flex flex-col items-center justify-center gap-4">
          <a href="#contact">
            <Button
              size="lg"
              className="group bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300 rounded-xl font-semibold text-sm px-8 py-6 cursor-pointer"
            >
              <span>{currentT.cta}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </Button>
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
