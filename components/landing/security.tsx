"use client"

import { ShieldCheck, FileSearch, Database, Lock, CheckCircle2, Eye } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const TECHNOLOGY_REFERENCES = [
  { name: "Solidity Best Practices", color: "border-primary/30 bg-primary/5 text-primary" },
  { name: "ERC-3643 (Estándar de Referencia)", color: "border-accent/30 bg-accent/5 text-accent" },
  { name: "Modelado de requisitos KYC/AML", color: "border-primary/30 bg-primary/5 text-primary" },
  { name: "OpenZeppelin Contracts", color: "border-border/50 bg-secondary/50 text-muted-foreground" },
]

export function Security() {
  const { t } = useLanguage()

  const securityFeatures = [
    { icon: FileSearch, title: t.security.features.audits.title, description: t.security.features.audits.description },
    { icon: Database, title: t.security.features.reserve.title, description: t.security.features.reserve.description },
    { icon: Lock, title: t.security.features.custody.title, description: t.security.features.custody.description },
    { icon: Eye, title: t.security.features.onchain.title, description: t.security.features.onchain.description },
  ]

  return (
    <section id="security" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-transparent pointer-events-none" />
      {/* Glow center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/4 blur-[120px] pointer-events-none z-0 animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
        
        {/* Section header */}
        <ScrollReveal className="mx-auto max-w-2xl text-center mb-16">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 shadow-lg shadow-primary/10 transition-transform hover:scale-105 duration-300">
            <ShieldCheck className="h-8 w-8 text-primary animate-pulse-glow" />
          </div>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            {t.security.tagline}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.security.title}
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground font-light">
            {t.security.subtitle}
          </p>
        </ScrollReveal>

        {/* Content Layout: 2 Columns responsively split (Visual & Text) */}
        <div className="grid gap-12 lg:grid-cols-12 items-center max-w-6xl mx-auto">
          
          {/* Left: Features grid (7 cols) - Staggered scroll entrance */}
          <ScrollReveal stagger staggerDelay={100} className="lg:col-span-7 grid gap-5 sm:grid-cols-2">
            {securityFeatures.map((feature, i) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-border/40 bg-card/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/45 hover:bg-card/60 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1.5 glowing-card cursor-default"
              >
                {/* Number label */}
                <span className="absolute top-4 right-4 font-mono text-xs text-border/50 group-hover:text-border/70 select-none">
                  0{i + 1}
                </span>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-border/40 bg-secondary/60 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground leading-snug">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </ScrollReveal>

          {/* Right: Immersive conceptual image */}
          <ScrollReveal delay={200} className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-border/30 bg-[#07080a] p-2 glowing-card shadow-2xl">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-inner">
              <img
                src="/security_architecture.png"
                alt="Arquitectura de Seguridad de Blockchain y Contratos Inteligentes"
                loading="lazy"
                className="h-full w-full object-cover opacity-90 transition-transform duration-[4000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10" />
              
              {/* Overlay Glassmorphic badge */}
              <div className="absolute bottom-4 left-4 right-4 z-20 rounded-xl border border-border/30 bg-background/80 p-4 backdrop-blur-md shadow-md">
                <p className="text-[9px] font-mono font-semibold uppercase tracking-widest text-primary mb-1">
                  Enfoque de Seguridad
                </p>
                <h4 className="text-xs font-bold text-foreground">
                  Pruebas y Revisión de Código
                </h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">
                  Pruebas unitarias, análisis estático y revisión de lógica contractual previa al despliegue.
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Technology References */}
        <ScrollReveal delay={300} className="mt-12 rounded-2xl border border-border/40 bg-card/25 p-8 backdrop-blur-md">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                Referencias y Estándares
              </p>
              <h3 className="text-lg font-semibold text-foreground">Tecnologías de Referencia</h3>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {TECHNOLOGY_REFERENCES.map((cert) => (
                <div
                  key={cert.name}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 cursor-default ${cert.color}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {cert.name}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
