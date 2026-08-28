import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

// Partículas animadas sutiles
function ParticleBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#00f0ff] opacity-20 animate-float-slow"
          style={{
            width: `${4 + Math.random() * 6}px`,
            height: `${4 + Math.random() * 6}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 4}s`,
            animationDelay: `${Math.random() * 4}s`,
            filter: "blur(30px)",
          }}
        />
      ))}
    </div>
  )
}

export function Hero() {
  const { t } = useLanguage()
  const stats = [
    { value: "Solidity", label: "Smart Contracts & Tests" },
    { value: "ERC-3643", label: "Estándar de Referencia" },
    { value: "Compliance", label: "Enfoque By-Design" },
    { value: "IA & SaaS", label: "Automatización y APIs" },
  ]

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 flex items-center justify-center bg-transparent">
      {/* Premium ambient glows and floating decorative graphics */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/4 blur-[130px] pointer-events-none z-0 animate-pulse-glow" />
      <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-accent/4 blur-[110px] pointer-events-none z-0 animate-float" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-12 text-center lg:px-8 z-10">

        {/* Tagline badge - Staggered fade in */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-md transition-all hover:border-primary/40 animate-fade-in-up duration-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          <span className="font-mono text-[10px] font-semibold tracking-widest text-primary uppercase">
            {t.hero.tagline}
          </span>
        </div>

        {/* Main headline with cascaded text-reveal animations */}
        <h1 className="max-w-4xl text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl leading-tight">
          <span className="block overflow-hidden pb-1">
            <span className="block animate-fade-in-up delay-100">
              {t.hero.title.line1}
            </span>
          </span>
          <br className="hidden sm:block" />
          <span className="block overflow-hidden pb-1">
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%] animate-[shimmer_3s_ease_infinite] font-black animate-fade-in-up delay-300">
              {t.hero.title.line2}
            </span>
          </span>
        </h1>

        {/* Subtitle - Fade in with delay */}
        <p className="mt-6 max-w-3xl text-pretty text-base text-muted-foreground sm:text-lg leading-relaxed font-light animate-fade-in-up delay-400">
          {t.hero.subtitle}
        </p>

        {/* CTA Buttons - Magnetic-scale animation on hover */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row z-20 animate-fade-in-up delay-500">
          <a href="#contact">
            <Button
              size="lg"
              className="group bg-primary text-primary-foreground hover:bg-primary/95 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/45 hover:scale-105 active:scale-95 cursor-pointer rounded-xl font-semibold text-sm px-8 py-6"
            >
              {t.hero.cta1}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </Button>
          </a>
          
          <a href="/guia-tokenizacion/">
            <Button
              size="lg"
              variant="outline"
              className="border-border/60 bg-transparent text-foreground hover:bg-secondary/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer rounded-xl font-semibold text-sm px-8 py-6"
            >
              <FileText className="mr-2 h-4 w-4" />
              {t.hero.cta2}
            </Button>
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 animate-fade-in-up delay-500">
          {["ERC-3643 Reference", "Solidity Tested", "Compliance-by-Design"].map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-accent/20 bg-accent/5 px-3.5 py-1 text-[10px] font-mono font-medium text-accent/80 backdrop-blur-sm transition-colors hover:bg-accent/10"
            >
              ✓ {badge}
            </span>
          ))}
        </div>

        {/* Stats Grid - Glassmorphism card grid */}
        <div className="mt-20 w-full max-w-4xl animate-fade-in-up delay-500">
          <div className="grid grid-cols-2 gap-px rounded-2xl border border-border/30 bg-border/20 overflow-hidden sm:grid-cols-4 shadow-xl shadow-black/10">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center bg-card/10 backdrop-blur-md px-6 py-8 gap-1.5 group/stat glowing-card"
              >
                <div className="font-mono text-2xl font-black text-primary sm:text-3xl transition-transform duration-500 group-hover/stat:scale-105 select-none">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground text-center leading-tight font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <a href="#problem" className="flex h-9 w-5 items-start justify-center rounded-full border border-border/40 p-1.5 cursor-pointer">
          <div className="h-2 w-1 rounded-full bg-primary/60 animate-pulse-glow" />
        </a>
      </div>
    </section>
  )
}
