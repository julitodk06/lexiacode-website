import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { LanguageProvider } from '@/lib/language-context'
import { BlockchainBackground } from '@/components/ui/blockchain-background'
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, RefreshCw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mecanismos de Intercambio y Transferencia On-Chain: Conceptos Técnicos | LexiaCode',
  description: 'Análisis conceptual sobre mecanismos técnicos de transferencia on-chain, compatibilidad con estándares de permisos y trazabilidad de participaciones.',
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
              Arquitectura de Transferencias On-Chain
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance mb-6">
              Mecanismos de Transferencia y Permisos On-Chain
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Exploración de la arquitectura de smart contracts para la ejecución condicional de transferencias, modelado de permisos de acceso y trazabilidad en redes distribuidas.
            </p>
          </div>
        </section>

        {/* Contenido principal estructurado */}
        <section className="py-20 bg-background relative z-10">
          <div className="mx-auto max-w-4xl px-6">
            <article className="space-y-12">
              
              {/* Sección 1 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Representación Digital y Trazabilidad de Participaciones</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  En los esquemas tradicionales, el registro y la transferencia de participaciones en activos no cotizados suelen gestionarse mediante libros manuales o registros centralizados, lo que genera fricción operativa y demoras en la actualización de estados.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  La **representación digital mediante smart contracts** permite registrar transferencias de manera programática en una base de datos distribuida, asegurando que cada movimiento quede registrado con una marca temporal inmutable y trazable.
                </p>
              </div>

              {/* Sección 2 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Mecanismos Técnicos: Swaps Atómicos y Contratos Condicionales</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Existen diferentes patrones arquitectónicos para estructurar la transferencia de unidades digitales:
                </p>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <li className="flex gap-3">
                    <RefreshCw className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Swaps Atómicos (Atomic Swaps):</strong> Ejecución simultánea de la transferencia de un token y su contrapartida a través de un contrato inteligente, asegurando que ambas operaciones se completen o se reviertan de forma atómica.</span>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Contratos de Custodia Programada (Escrow):</strong> Mecanismos lógicos donde las unidades quedan bloqueadas hasta que se cumplen las condiciones predefinidas por las partes o validadas por un rol de gobernanza.</span>
                  </li>
                </ul>
              </div>

              {/* Sección 3 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Validación de Reglas en Contratos Inteligentes</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Bajo estándares de referencia como **ERC-3643**, las transferencias entre cuentas se condicionan a validaciones on-chain.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  El contrato inteligente ejecuta una verificación antes de permitir la transferencia, asegurando que la cuenta receptora cuente con los permisos o atributos requeridos según las especificaciones del emisor y los requisitos fijados por sus asesores legales.
                </p>
              </div>

              {/* Sección 4 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Consideraciones de Liquidez y Mercados</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  La tecnología de smart contracts provee la infraestructura técnica para la transferencia de unidades digitales, pero no crea liquidez por sí misma ni garantiza la existencia de compradores. La liquidez de cualquier activo depende de factores comerciales, demanda de mercado y encuadre normativo.
                </p>
              </div>

              {/* Sección 5 */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  Desarrollo de Arquitectura con LexiaCode
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Diseñamos y testeamos contratos inteligentes en Solidity para modelar reglas condicionales de transferencia e interfaces web integradas con sistemas de gestión.
                </p>
                <Link
                  href="/#contacto"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
                >
                  Consultar sobre Desarrollo de Smart Contracts <ArrowRight className="h-4 w-4" />
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
