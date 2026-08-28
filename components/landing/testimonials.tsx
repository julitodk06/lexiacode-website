"use client"

import { useLanguage } from "@/lib/language-context"
import { Star, MessageSquareQuote, Check, Building2, Landmark, ShieldAlert } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function Testimonials() {
  const { language, t } = useLanguage()

  const translations = {
    es: {
      label: t.testimonials.label,
      title: t.testimonials.title,
      subtitle: t.testimonials.subtitle,
      testimonialsList: [
        {
          quote: "Los programas de formación y la colaboración con Fundación Fundatur permitieron capacitar a participantes en conceptos fundamentales de tecnología Web3, contratos inteligentes y activos digitales de manera estructurada y accesible.",
          name: "Programa Formativo",
          role: "Capacitación Comunitaria",
          company: "Fundación Fundatur",
          icon: Landmark,
          iconColor: "text-amber-400",
          results: ["Formación Web3", "Fundamentos de Smart Contracts", "Educación Tecnológica"],
          avatar: "/avatar-maria.jpg"
        },
        {
          quote: "La colaboración técnica en arquitectura de software y diseño funcional permitió estructurar plataformas digitales y automatizaciones de forma iterativa y con código de calidad.",
          name: "Desarrollo de Software",
          role: "Arquitectura y Producto",
          company: "Iniciativa Digital",
          icon: Building2,
          iconColor: "text-emerald-400",
          results: ["Arquitectura a Medida", "Desarrollo Iterativo", "Buenas Prácticas"],
          avatar: "/avatar-ana.jpg"
        }
      ]
    },
    en: {
      label: t.testimonials.label,
      title: t.testimonials.title,
      subtitle: t.testimonials.subtitle,
      testimonialsList: [
        {
          quote: "The training programs and collaboration with Fundación Fundatur provided structured and accessible education on core Web3 concepts, smart contracts, and digital asset technologies.",
          name: "Educational Program",
          role: "Community Training",
          company: "Fundación Fundatur",
          icon: Landmark,
          iconColor: "text-amber-400",
          results: ["Web3 Education", "Smart Contract Fundamentals", "Tech Training"],
          avatar: "/avatar-maria.jpg"
        },
        {
          quote: "The technical collaboration on software architecture and functional design enabled the iterative structuring of digital platforms and workflow automations with clean code.",
          name: "Software Engineering",
          role: "Product Architecture",
          company: "Digital Initiative",
          icon: Building2,
          iconColor: "text-emerald-400",
          results: ["Custom Architecture", "Iterative Delivery", "Engineering Best Practices"],
          avatar: "/avatar-ana.jpg"
        }
      ]
    },
    pt: {
      label: t.testimonials.label,
      title: t.testimonials.title,
      subtitle: t.testimonials.subtitle,
      testimonialsList: [
        {
          quote: "Os programas de capacitação e a parceria com a Fundação Fundatur permitiram formar participantes em fundamentos de Web3, smart contracts e tecnologias digitais de forma estruturada.",
          name: "Programa Formativo",
          role: "Capacitação Comunitária",
          company: "Fundação Fundatur",
          icon: Landmark,
          iconColor: "text-amber-400",
          results: ["Formação Web3", "Fundamentos de Smart Contracts", "Educação Tecnológica"],
          avatar: "/avatar-maria.jpg"
        },
        {
          quote: "A colaboração técnica em arquitetura de software e design funcional permitiu estruturar plataformas digitais e automações de fluxo de trabalho de forma iterativa.",
          name: "Engenharia de Software",
          role: "Arquitetura de Produto",
          company: "Iniciativa Digital",
          icon: Building2,
          iconColor: "text-emerald-400",
          results: ["Arquitetura Customizada", "Entrega Iterativa", "Boas Práticas de Código"],
          avatar: "/avatar-ana.jpg"
        }
      ]
    }
  }

  const currentT = translations[language as keyof typeof translations] || translations.es

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden bg-transparent">
      {/* Glow effects */}
      <div className="absolute right-1/3 top-1/4 w-[500px] h-[500px] bg-primary/4 blur-[120px] rounded-full pointer-events-none animate-float" />
      <div className="absolute left-1/3 bottom-1/4 w-[400px] h-[400px] bg-accent/4 blur-[100px] rounded-full pointer-events-none animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
        
        {/* Section Header */}
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

        {/* Testimonials Grid */}
        <ScrollReveal stagger staggerDelay={150} className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto items-stretch">
          {currentT.testimonialsList.map((t, idx) => (
            // DECISIÓN CRO: Imágenes reales y expresivas para maximizar conversión B2B y empatía emocional en audiencias de alto valor
            <div
              key={idx}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/30 bg-card/10 p-8 backdrop-blur-md transition-all duration-500 hover:border-primary/45 hover:bg-card/20 hover:shadow-[0_0_50px_rgba(var(--primary),0.06)] hover:-translate-y-1.5 glowing-card cursor-default"
            >
              {/* Decorative Quote Icon on Background */}
              <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <MessageSquareQuote className="h-16 w-16 text-primary" />
              </div>

              <div>
                {/* Star rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-amber-500 text-amber-500 shrink-0" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-sm font-light leading-relaxed text-foreground/90 italic">
                  "{t.quote}"
                </blockquote>
              </div>

              {/* Author & Metrics */}
              <div className="mt-8">
                {/* Results achieved */}
                <div className="mb-6 space-y-2 pt-4 border-t border-border/10">
                  {t.results.map((res, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
                      <div className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="font-semibold text-foreground/80">{res}</span>
                    </div>
                  ))}
                </div>

                {/* Profile card */}
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-border/40 shrink-0 bg-background/80 transition-transform group-hover:scale-105 shadow-md">
                    <img src={t.avatar} alt={t.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold tracking-tight text-foreground truncate">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-muted-foreground leading-tight mt-0.5 truncate">
                      {t.role} · <span className="font-semibold text-primary">{t.company}</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
