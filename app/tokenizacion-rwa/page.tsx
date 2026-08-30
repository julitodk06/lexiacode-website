import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { LanguageProvider } from '@/lib/language-context'
import { BlockchainBackground } from '@/components/ui/blockchain-background'
import { ArrowRight, CheckCircle2, ShieldCheck, Coins, Database } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tokenización RWA: Activos del Mundo Real en Blockchain | LexiaCode',
  description: 'Descubra la revolución de los Real World Assets (RWA). Cómo tokenizar materias primas, oro, derechos de minería y carteras de deuda en mercados globales.',
}

export default function Page() {
  return (
    <LanguageProvider>
      <BlockchainBackground />
      <main className="relative min-h-screen bg-transparent overflow-x-hidden text-foreground">
        <Header />
        
        {/* Hero de la página */}
        <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background border-b border-border/30">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs text-primary mb-6">
              Real World Assets (RWA)
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance mb-6">
              Tokenización RWA y Finanzas On-Chain
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              La digitalización de activos reales tangibles e intangibles en la blockchain. Conecte sus flujos físicos con los mercados descentralizados globales de forma transparente e inmutable.
            </p>
          </div>
        </section>

        {/* Contenido principal estructurado */}
        <section className="py-20 bg-background relative z-10">
          <div className="mx-auto max-w-4xl px-6">
            <article className="space-y-12">
              
              {/* Sección 1 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Representación Digital de Activos del Mundo Real (RWA)</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  El concepto de **RWA (Real World Assets)** se refiere a la representación digital de derechos sobre activos tangibles o intangibles mediante tokens en una cadena de bloques. Esto incluye desde infraestructura física y materias primas hasta participaciones y flujos operativos.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  El objetivo técnico de la arquitectura RWA es proveer una capa de registro digital transparente e inmutable, permitiendo que los estados de un activo queden documentados on-chain con trazabilidad de punta a punta.
                </p>
              </div>

              {/* Sección 2 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Capas de la Arquitectura RWA</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  El diseño técnico se estructura en capas de desarrollo interconectadas:
                </p>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <li className="flex gap-3">
                    <Database className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Capa de Datos y Due Diligence:</strong> Ingesta y validación de documentación técnica, reportes periciales y especificaciones funcionales del activo.</span>
                  </li>
                  <li className="flex gap-3">
                    <Coins className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Capa de Contratos Inteligentes:</strong> Implementación de smart contracts en Solidity (bajo estándares como ERC-3643) para el control de permisos, roles y emisión controlada.</span>
                  </li>
                </ul>
              </div>

              {/* Sección 3 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Ventajas Técnicas y Operativas</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Aspectos destacados del modelado de activos digitales:
                </p>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Trazabilidad y Auditoría:</strong> Registro auditable de eventos on-chain que facilita la verificación de estados y titularidades.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Modelado de Permisos:</strong> Restricción de operaciones en contratos inteligentes según reglas de identidad y gobernanza especificadas.</span>
                  </li>
                </ul>
              </div>

              {/* Sección 4 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Due Diligence Técnico en Activos Complejos</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  En iniciativas que involucran activos de minería, agro o infraestructura, la evaluación preliminar técnica y comercial resulta indispensable para identificar contingencias de contraparte y riesgos operativos antes de avanzar hacia el desarrollo de smart contracts.
                </p>
              </div>

              {/* Sección 5 */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  Arquitectura y Desarrollo RWA con LexiaCode
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Desarrollamos contratos inteligentes en Solidity, diseñamos arquitectura funcional y realizamos evaluaciones técnicas preliminares para iniciativas de activos digitales.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
                >
                  Consultar sobre Servicios Técnicos <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

            </article>
          </div>
        </section>
        
        <Footer />
      </main>
    </LanguageProvider>
  )
}
