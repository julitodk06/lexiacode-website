"use client"

import { useLanguage } from "@/lib/language-context"
import { AlertCircle, Clock, Lock, ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function PainPoints() {
  const { t } = useLanguage()

  const painPoints = [
    {
      id: "01",
      icon: Clock,
      title: t.problem.card1.title,
      description: t.problem.card1.description,
      pill: "Fricción Operativa",
      color: "from-rose-500/20 to-rose-600/5",
      borderColor: "group-hover:border-rose-500/40",
      textColor: "text-rose-600 dark:text-rose-400",
      bgGlow: "bg-rose-500/5",
      impact: "Múltiples horas dedicadas a tareas manuales y procesos fragmentados"
    },
    {
      id: "02",
      icon: Lock,
      title: t.problem.card2.title,
      description: t.problem.card2.description,
      pill: "Gestión Analógica",
      color: "from-amber-500/20 to-amber-600/5",
      borderColor: "group-hover:border-amber-500/40",
      textColor: "text-amber-600 dark:text-amber-400",
      bgGlow: "bg-amber-500/5",
      impact: "Procesos tradicionales sin trazabilidad digital ni workflows automatizados"
    }
  ]

  return (
    <section id="problem" className="relative py-24 lg:py-32 overflow-hidden bg-transparent">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-rose-500/3 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-amber-500/3 blur-[120px] rounded-full pointer-events-none animate-float" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
        
        {/* Header - Revealed on scroll */}
        <ScrollReveal className="mx-auto max-w-3xl text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/5 px-4 py-1.5 backdrop-blur-sm mb-4">
            <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 animate-pulse-glow" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
              {t.problem.title}
            </span>
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl leading-tight">
            {t.problem.subtitle}
          </h2>
        </ScrollReveal>

        {/* Content Layout: 2 Columns side-by-side (Pain points cards) */}
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {painPoints.map((point) => (
            <ScrollReveal
              key={point.id}
              delay={point.id === "01" ? 100 : 250}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/30 bg-card/10 p-8 backdrop-blur-md transition-all duration-500 hover:border-rose-500/30 hover:bg-card/20 hover:shadow-[0_0_50px_rgba(255,255,255,0.01)] hover:-translate-y-0.5 glowing-card cursor-default min-h-[220px]"
            >
              {/* Top ambient color bar */}
              <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${point.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
              
              <div className="flex gap-5 items-start">
                {/* Icon with active theme contrast */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background/80 border border-border/40 transition-transform group-hover:scale-105 shadow-sm">
                  <point.icon className={`h-5 w-5 ${point.textColor}`} />
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {point.title}
                    </h3>
                    <span className="font-mono text-[9px] font-semibold tracking-wider uppercase text-muted-foreground bg-secondary/40 px-2.5 py-0.5 rounded-full">
                      {point.pill}
                    </span>
                  </div>
                  <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed font-light">
                    {point.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-muted-foreground/80 font-mono">
                <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-medium">
                  <span className="h-1 w-1 rounded-full bg-rose-500 animate-pulse" />
                  <span>Impacto Operativo</span>
                </div>
                <span>{point.impact}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Interstitial Action Block */}
        <ScrollReveal delay={300} className="mt-16 text-center">
          <a
            href="#services"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
          >
            <span>Descubre cómo transformamos estos cuellos de botella en ventajas competitivas</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1.5" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
