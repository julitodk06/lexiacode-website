"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Landmark, Target, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function FeaturedProject() {
  const { t } = useLanguage()

  const metrics = [
    { icon: Landmark, label: t.featured.metrics.asset, value: t.featured.metrics.assetValue },
    { icon: Target, label: "Estructuración RWA Preliminar", value: "Iniciativa Prospectiva Evaluada" },
    { icon: Target, label: "Decisión", value: "No avanzar" },
  ]

  return (
    <section id="projects" className="relative py-24 lg:py-32 overflow-hidden bg-transparent">
      {/* Ambient background blur */}
      <div className="absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-primary/3 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <ScrollReveal className="mx-auto max-w-3xl text-center mb-16">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {t.featured.sectionLabel}
          </p>
          <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {t.featured.sectionTitle}
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            {t.featured.sectionDescription}
          </p>
        </ScrollReveal>

        {/* Main project card */}
        <ScrollReveal delay={150} className="mt-16 max-w-5xl mx-auto">
          <Card className="overflow-hidden border-border/30 bg-card/10 backdrop-blur-md shadow-2xl shadow-black/20 rounded-2xl glowing-card">
            <div className="grid lg:grid-cols-2">

              {/* Left — Visual */}
              <div className="relative min-h-[420px] overflow-hidden bg-[#07080a] group/visual">
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-80" />
                  <img
                    src="/torre_lexia.png"
                    alt="Representación conceptual de iniciativa RWA minera"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[4000ms] ease-out group-hover/visual:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10 pointer-events-none" />
                </div>

                {/* Floating pill: Active Opportunity */}
                <div className="absolute top-6 left-6 z-20 animate-pulse-glow">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-background/85 px-3.5 py-1 text-[10px] font-semibold text-primary uppercase tracking-wider backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    Estudio de Caso RWA
                  </span>
                </div>

                {/* Visual Glassmorphic overlay card on bottom */}
                <div className="absolute bottom-6 left-6 right-6 z-20 rounded-xl border border-border/30 bg-background/80 p-5 backdrop-blur-md transition-all group-hover/visual:border-primary/30 shadow-lg shadow-black/30">
                  <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-accent mb-1">
                    Ingeniería de Activos RWA
                  </p>
                  <h4 className="text-xs font-bold text-foreground truncate">
                    {t.featured.title}
                  </h4>
                  <p className="text-[10px] text-muted-foreground truncate leading-relaxed">
                    {t.featured.projectSubtitle}
                  </p>
                </div>
              </div>

              {/* Right — Details */}
              <div className="p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-accent/10 text-accent border border-accent/20 font-mono text-[10px]">
                      ● Evaluación preliminar
                    </Badge>
                    <Badge variant="outline" className="border-primary/40 text-primary font-mono text-[10px]">
                      Iniciativa Minera
                    </Badge>
                  </div>

                  <CardHeader className="px-0 pt-5 pb-0">
                    <CardTitle className="text-2xl text-foreground font-bold">{t.featured.title}</CardTitle>
                    <p className="mt-3 text-muted-foreground leading-relaxed text-sm font-light">
                      {t.featured.description}
                    </p>
                  </CardHeader>

                  <CardContent className="px-0 pt-6">
                    {/* Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="rounded-xl border border-border/30 bg-secondary/20 p-4 transition-colors hover:bg-secondary/40"
                        >
                          <div className="flex items-center gap-1.5 mb-2">
                            <metric.icon className="h-3.5 w-3.5 text-accent" />
                            <span className="text-[10px] text-muted-foreground uppercase font-mono">{metric.label}</span>
                          </div>
                          <div className="font-mono text-xs font-bold text-foreground leading-snug">
                            {metric.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Hitos de evaluación técnica de la iniciativa */}
                    <div className="mt-6 space-y-3.5">
                      <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-muted-foreground">
                        Alcance de la Evaluación Técnica
                      </p>
                      <div className="space-y-2.5">
                        {[
                          { name: "Análisis Preliminar de Arquitectura", status: "Realizado", color: "text-[#25D366]" },
                          { name: "Modelado conceptual de workflows de smart contracts", status: "Realizado", color: "text-[#25D366]" },
                          { name: "Due Diligence Técnico y de Contraparte", status: "Realizado", color: "text-[#25D366]" },
                          { name: "Recomendación de Decisión", status: "No avanzar", color: "text-amber-400" }
                        ].map((hito) => (
                          <div key={hito.name} className="flex items-center justify-between text-xs rounded-lg border border-border/30 bg-secondary/10 p-2.5">
                            <span className="text-foreground/90 font-light text-xs">{hito.name}</span>
                            <span className={`font-mono font-bold text-[9px] uppercase tracking-wider shrink-0 ${hito.color}`}>{hito.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Security badges */}
                    <div className="mt-6">
                      <p className="mb-3 text-[10px] font-mono font-semibold uppercase tracking-widest text-muted-foreground">
                        {t.featured.security.title}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { icon: Shield, text: t.featured.security.audited, color: "text-accent" },
                          { icon: Lock, text: t.featured.security.verified, color: "text-primary" },
                          { icon: Shield, text: t.featured.security.insured, color: "text-accent" },
                        ].map(({ icon: Icon, text, color }) => (
                          <div
                            key={text}
                            className="flex items-center gap-1.5 rounded-full border border-border/40 bg-secondary/20 px-3 py-1.5 text-[10px] text-muted-foreground font-mono"
                          >
                            <Icon className={`h-3 w-3 ${color}`} />
                            {text}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>

                {/* CTAs */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#contacto"
                    className="inline-flex items-center justify-center group bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300 rounded-xl cursor-pointer py-3.5 px-6 font-semibold text-xs"
                  >
                    {t.featured.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                  </a>
                </div>
              </div>

            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}
