"use client"

import { useLanguage } from "@/lib/language-context"
import { Search, Layers, Code2, Users } from "lucide-react"

const STEP_ICONS = [Search, Layers, Code2, Users]
const STEP_IMAGES = [
  "/how-it-works/howitworks_step1.png",
  "/how-it-works/howitworks_step2.png",
  "/how-it-works/howitworks_step3.png",
  "/how-it-works/howitworks_step4.png"
]

export function HowItWorks() {
  const { t } = useLanguage()

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent pointer-events-none" />
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
            {t.howItWorks.label}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.howItWorks.title}
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.howItWorks.steps.map((step, index) => {
            const Icon = STEP_ICONS[index]
            const isLast = index === t.howItWorks.steps.length - 1

            return (
              <div key={step.number} className="relative">
                {/* Connector line (desktop) */}
                {!isLast && (
                  <div className="absolute left-[85%] top-1/4 hidden h-px w-[30%] bg-gradient-to-r from-border/60 to-transparent lg:block z-20" />
                )}

                <div className="group flex flex-col gap-4 border border-border/30 bg-card/10 backdrop-blur-md rounded-2xl p-5 hover:border-primary/45 hover:bg-card/15 hover:shadow-[0_0_40px_rgba(var(--primary),0.03)] hover:-translate-y-1.5 transition-all duration-300">
                  {/* Image container with elegant zoom */}
                  <div className="relative h-32 w-full overflow-hidden rounded-xl bg-muted border border-border/10">
                    <img
                      src={STEP_IMAGES[index]}
                      alt={step.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                    
                    {/* Floating Pill: Icon */}
                    <div className="absolute bottom-3 left-3 z-20">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/90 backdrop-blur-md border border-border/40 transition-transform group-hover:scale-105 shadow-md">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    
                    <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground font-mono shadow-md">
                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-2">
                    <span className="font-mono text-[10px] font-semibold tracking-widest text-primary uppercase">
                      {step.number}
                    </span>
                    <h3 className="mt-1 text-md font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 px-8 py-6 text-center backdrop-blur-sm">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{t.howItWorks.timeToMarket}</span>{" "}
            {t.howItWorks.timeDetail} ·{" "}
            <span className="ml-1 font-semibold text-primary">{t.howItWorks.timeSupport}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
