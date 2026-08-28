"use client"

import { ExternalLink, Newspaper } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const PRESS_ARTICLES = [
  {
    source: "Argentina.gob.ar",
    sourceBadge: { en: "Official Gov.", es: "Gobierno Oficial", pt: "Governo Oficial" },
    badgeColor: "border-primary/30 bg-primary/5 text-primary",
    title: {
      en: "New Tokenization Regime in Argentina",
      es: "Nuevo Régimen de Tokenización",
      pt: "Novo Regime de Tokenização",
    },
    description: {
      en: "The Argentine government establishes an official regulatory framework for asset tokenization, marking a milestone in institutional adoption of blockchain technology.",
      es: "El gobierno argentino establece un marco regulatorio oficial para la tokenización de activos, marcando un hito en la adopción institucional de la tecnología blockchain.",
      pt: "O governo argentino estabelece um marco regulatório oficial para a tokenização de ativos, marcando um marco na adoção institucional da tecnologia blockchain.",
    },
    url: "https://www.argentina.gob.ar/noticias/nuevo-regimen-de-tokenizacion",
  },
  {
    source: "BBVA",
    sourceBadge: { en: "International Bank", es: "Banco Internacional", pt: "Banco Internacional" },
    badgeColor: "border-accent/30 bg-accent/5 text-accent",
    title: {
      en: "RWA Tokenization: The Crypto Machine Starts Running",
      es: "Tokenización de Activos: La Máquina Cripto Empieza a Funcionar",
      pt: "Tokenização de Ativos: A Máquina Cripto Começa a Funcionar",
    },
    description: {
      en: "BBVA analysis on real-world asset (RWA) tokenization, exploring architectural trends in digital representations of tangible assets.",
      es: "Análisis de BBVA sobre la tokenización de activos del mundo real (RWA) y las tendencias de representación digital de activos.",
      pt: "Análise do BBVA sobre a tokenização de ativos do mundo real (RWA) e as tendências de representação digital de ativos.",
    },
    url: "https://www.bbva.ch/blog/educacion-financiera/blockchain-to-go/leccion-6-tokenizacion-de-activos-la-maquina-cripto-empieza-a-funcionar.html",
  },
  {
    source: "Ámbito Financiero",
    sourceBadge: { en: "Finance", es: "Finanzas", pt: "Finanças" },
    badgeColor: "border-border/50 bg-secondary/50 text-muted-foreground",
    title: {
      en: "Tokenization in Argentina: Sector Market Overview",
      es: "Tokenización en Argentina: Panorama del Sector",
      pt: "Tokenização na Argentina: Panorama do Setor",
    },
    description: {
      en: "Analysis on the growth of digital asset representations and technology frameworks in the Argentine market.",
      es: "Análisis sobre el crecimiento de la representación digital de activos y marcos tecnológicos en el mercado argentino.",
      pt: "Análise sobre o crescimento da representação digital de ativos e tecnologias no mercado argentino.",
    },
    url: "https://www.ambito.com/finanzas/tokenizacion-activos-argentina-crece-el-interes-un-mercado-que-podria-alcanzar-los-us90000-millones-n6271344",
  },
  {
    source: "Cripto247",
    sourceBadge: { en: "Crypto", es: "Cripto", pt: "Cripto" },
    badgeColor: "border-primary/30 bg-primary/5 text-primary",
    title: {
      en: "Regional Tokenization Initiatives and Market Dynamics",
      es: "Iniciativas de Tokenización en la Región",
      pt: "Iniciativas de Tokenização na Região",
    },
    description: {
      en: "Industry coverage on real asset tokenization initiatives in Latin America and emerging technical developments.",
      es: "Cobertura periodística sobre iniciativas de tokenización de activos en Latinoamérica y desarrollos tecnológicos emergentes.",
      pt: "Cobertura da indústria sobre iniciativas de tokenização na América Latina e desenvolvimentos tecnológicos.",
    },
    url: "https://www.cripto247.com/regulaci%C3%B3n/argentina-en-el-mapa-cripto-un-proyecto-capta-usd-23-millones",
  },
]

const PRESS_I18N = {
  en: {
    label: "Industry News",
    title: "The RWA sector is evolving rapidly across markets",
    subtitle: "Media coverage and publications regarding asset digitalization technologies.",
    readArticle: "Read article",
  },
  es: {
    label: "Actualidad del Sector",
    title: "El sector RWA evoluciona en los mercados tecnológicos",
    subtitle: "Publicaciones y análisis de medios sobre tecnologías de digitalización de activos.",
    readArticle: "Leer artículo",
  },
  pt: {
    label: "Notícias do Setor",
    title: "O setor RWA evolui nos mercados tecnológicos",
    subtitle: "Publicações e análises da mídia sobre tecnologias de digitalização de ativos.",
    readArticle: "Ler artigo",
  },
}

export function PressSection() {
  const { language } = useLanguage()
  const ui = PRESS_I18N[language]

  return (
    <section id="press" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/8 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-border/40 bg-secondary/30 px-3 py-1.5">
            <Newspaper className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {ui.label}
            </span>
          </div>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {ui.title}
          </h2>
          <p className="max-w-xl text-muted-foreground text-sm">
            {ui.subtitle}
          </p>
        </div>

        {/* Articles grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRESS_ARTICLES.map((article) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-4 rounded-2xl border border-border/40 bg-card/30 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/60 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
            >
              {/* Source badge */}
              <div className="flex items-start justify-between gap-2">
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${article.badgeColor}`}>
                  {article.sourceBadge[language]}
                </span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-colors group-hover:text-primary" />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 flex-1">
                <p className="text-xs font-mono text-muted-foreground/60">{article.source}</p>
                <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-3">
                  {article.title[language]}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mt-auto">
                  {article.description[language]}
                </p>
              </div>

              {/* Read more */}
              <div className="flex items-center gap-1 text-xs font-medium text-primary/70 group-hover:text-primary transition-colors">
                {ui.readArticle}
                <ExternalLink className="h-3 w-3" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
