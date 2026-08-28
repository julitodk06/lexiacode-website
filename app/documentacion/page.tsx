import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { LanguageProvider } from "@/lib/language-context"
import { BookOpen, Terminal, Code2, Cpu, Settings, ShieldCheck } from "lucide-react"

export const metadata = {
  title: "Arquitectura Técnica de Referencia | LexiaCode",
  description: "Exploración de la arquitectura de referencia, especificaciones conceptuales del estándar ERC-3643 y diagramas de flujos.",
}

const docsSections = [
  {
    icon: Terminal,
    title: "1. Introducción a la Arquitectura de Referencia",
    content: "Esta especificación describe la arquitectura conceptual para integrar la emisión y administración de tokens en plataformas web mediante llamadas a endpoints de referencia y eventos de Webhooks.",
  },
  {
    icon: Code2,
    title: "2. Estándar ERC-3643 (Conceptual)",
    content: "Analizamos la implementación del estándar ERC-3643 (antiguamente T-Rex) con registros de identidad on-chain (ONCHAINID) para verificar condicionalmente transferencias bajo reglas de compliance.",
  },
  {
    icon: ShieldCheck,
    title: "3. Cumplimiento e Identidad",
    content: "Modelado conceptual donde las billeteras requieren validación mediante Identity Registry antes de aprobar transacciones, considerando controles de privacidad y minimización de datos que deberán validarse para cada implementación.",
  },
  {
    icon: Cpu,
    title: "4. Flujos de Smart Contracts",
    content: "Diagramas de flujos para emisión y distribución de estados en contratos inteligentes compatibles con EVM (Polygon, Ethereum), para evaluación previa a producción.",
  }
]

export default function DocumentacionPage() {
  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-transparent overflow-x-hidden">
        <Header />

        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
          <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                <BookOpen className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">Developers</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              Arquitectura Técnica de Referencia
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Especificaciones y diagramas de arquitectura para evaluar flujos Web3 y Smart Contracts en Solidity.
            </p>

            {/* Aviso obligatorio de arquitectura conceptual */}
            <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200 leading-relaxed">
              <strong>Aviso Importante:</strong> Esta documentación describe una arquitectura conceptual y de referencia. No representa un SDK comercial, una plataforma regulada en producción ni una emisión activa de valores negociables.
            </div>
          </div>
        </section>

        {/* Content Docs */}
        <section className="pb-24 lg:pb-32">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {docsSections.map((section, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm p-8 hover:border-primary/40 hover:bg-card/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Pseudocódigo ilustrativo */}
            <div className="mt-12 rounded-2xl border border-border/40 bg-black/40 p-6 font-mono text-xs overflow-x-auto">
              <span className="text-muted-foreground">// Pseudocódigo ilustrativo de arquitectura conceptual (No ejecutable en producción)</span>
              <pre className="mt-3 text-primary-foreground">
                <code className="text-blue-400">const</code>{" "}
                <code className="text-foreground">referenceConfig = {"{"} contractStandard: &apos;ERC-3643&apos;, environment: &apos;TESTNET_SIMULATION&apos; {"}"};</code>
                {"\n"}
                <code className="text-blue-400">function</code>{" "}
                <code className="text-foreground">simulateWorkflow(assetData) {"{"}</code>
                {"\n  "}return <code className="text-green-400">&apos;ARCHITECTURE_VIABLE_FOR_REVIEW&apos;</code>;
                {"\n"}{"}"}
              </pre>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </LanguageProvider>
  )
}
