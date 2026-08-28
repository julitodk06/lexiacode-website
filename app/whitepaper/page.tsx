import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { LanguageProvider } from "@/lib/language-context"
import { FileText, ArrowRight, Download, BarChart2, ShieldCheck, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "RWA Product & Technology Reference Paper | LexiaCode",
  description: "Documento de referencia técnica y conceptual sobre arquitectura de producto para iniciativas RWA y smart contracts.",
}

const chapters = [
  {
    num: "01",
    title: "El Desafío Operativo de Activos Reales",
    desc: "Los activos tradicionales como Real Estate y Agronegocios requieren estructuras eficientes para reducir fricción administrativa y costos de procesamiento."
  },
  {
    num: "02",
    title: "Enfoque de Producto y Workflows",
    desc: "Mediante el diseño de arquitectura técnica y la integración conceptual del estándar ERC-3643, evaluamos modelos de representación digital adaptados a cada proyecto."
  },
  {
    num: "03",
    title: "Arquitectura Técnica y Validaciones",
    desc: "Modelamos la verificación condicional mediante registros de identidad on-chain para permitir que las transacciones respeten reglas de compliance previamente configuradas."
  },
  {
    num: "04",
    title: "Lógica Programable de Flujos",
    desc: "Definimos la lógica de contratos inteligentes para el seguimiento de eventos y estados del proyecto en redes distribuidas."
  }
]

export default function WhitepaperPage() {
  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-transparent overflow-x-hidden">
        <Header />

        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFC72C]/5 to-transparent pointer-events-none" />
          <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFC72C]/10 border border-[#FFC72C]/20">
                <FileText className="h-6 w-6 text-[#FFC72C]" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-widest text-[#FFC72C]">Reference Paper</span>
            </div>
            
            {/* Disclaimer conceptual obligatorio arriba */}
            <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200 leading-relaxed">
              <strong>Aviso Importante:</strong> Documento conceptual y educativo. No constituye prospecto, oferta de valores, asesoramiento legal, financiero o de inversión. Toda implementación requiere análisis específico, profesionales habilitados y las autorizaciones correspondientes.
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              RWA Product &amp; Technology Reference Paper
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Exploración conceptual y técnica de la arquitectura de producto desarrollada por LexiaCode para iniciativas de tokenización.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <span
                className="inline-flex items-center gap-2 rounded-full bg-secondary/80 px-6 py-3 text-sm font-medium text-muted-foreground border border-border/40 cursor-not-allowed"
              >
                <Download className="h-4 w-4" />
                Descarga de PDF (Documento en Revisión)
              </span>
            </div>
          </div>
        </section>

        {/* Chapters Grid */}
        <section className="pb-24 lg:pb-32">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {chapters.map((chapter, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm p-8 hover:border-primary/40 hover:bg-card/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-3xl font-mono font-bold text-primary/30 group-hover:text-primary transition-colors">
                      {chapter.num}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/50 border border-border/50">
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {chapter.desc}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Quick overview metrics box */}
            <div className="mt-12 rounded-2xl border border-border/40 bg-secondary/10 p-8 flex flex-col md:flex-row gap-6 justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-1">Arquitectura de Referencia Técnica</h4>
                <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
                  Nuestra arquitectura de producto sirve como modelo conceptual para diseñar workflows de contratos inteligentes y verificar la viabilidad técnica antes del análisis legal especializado.
                </p>
              </div>
              <div className="flex items-center gap-3 bg-[#FFC72C]/10 border border-[#FFC72C]/20 rounded-xl px-5 py-3">
                <ShieldCheck className="h-5 w-5 text-[#FFC72C]" />
                <span className="text-xs font-mono font-bold text-foreground">ERC-3643 REFERENCE</span>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </LanguageProvider>
  )
}
