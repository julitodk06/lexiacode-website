import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { LanguageProvider } from '@/lib/language-context'
import { BlockchainBackground } from '@/components/ui/blockchain-background'
import { ArrowRight, CheckCircle2, ShieldCheck, Lock, Landmark } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Security Tokens: Qué son los Tokens de Valor y Regulaciones | LexiaCode',
  description: 'Guía técnica sobre Security Tokens (STO). Diferencias con utility tokens, regulaciones CNV (Argentina) y SEC (EEUU) y estándares de seguridad Web3.',
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
              Conceptos de Arquitectura Web3
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance mb-6">
              Tokens con Permisos y Representación de Derechos
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Análisis técnico sobre modelos de tokens que representan derechos o participaciones mediante contratos inteligentes con control de acceso y verificación condicional.
            </p>
          </div>
        </section>

        {/* Contenido principal estructurado */}
        <section className="py-20 bg-background relative z-10">
          <div className="mx-auto max-w-4xl px-6">
            <article className="space-y-12">
              
              {/* Sección 1 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Clasificación Conceptual de Tokens</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  En el diseño de software para Web3, los tokens pueden modelar distintos tipos de interacciones según su lógica funcional y los requerimientos del caso de uso.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Diferencias técnicas clave en la especificación de smart contracts:
                </p>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <li className="flex gap-3">
                    <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Tokens Funcionales (Utility):</strong> Diseñados para dar acceso a funcionalidades, créditos de uso o interacciones de software dentro de una aplicación.</span>
                  </li>
                  <li className="flex gap-3">
                    <Landmark className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Tokens con Restricciones de Permiso:</strong> Diseñados para modelar participaciones o derechos bajo estándares como ERC-3643, incorporando validaciones condicionales y control de acceso on-chain.</span>
                  </li>
                </ul>
              </div>

              {/* Sección 2 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Consideraciones Regulatorias y Marcos Internacionales</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  El encuadre legal de los tokens de valor depende de la jurisdicción aplicable y de la estructuración definida por asesores jurídicos independientes:
                </p>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Marcos Locales:</strong> Análisis normativo de las resoluciones de los entes reguladores de valores para la representación digital de derechos y participaciones.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Marcos Internacionales:</strong> Regímenes de colocación privada y requisitos de información aplicables a inversores calificados según cada mercado.</span>
                  </li>
                </ul>
              </div>

              {/* Sección 3 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Tecnología y Smart Contracts para Tokens con Permisos</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  El desarrollo de tokens que representan participaciones requiere contratos inteligentes con lógica de transferencia condicionada, utilizando estándares abiertos como **ERC-3643**.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  A través de registros de identidad y atributos on-chain, el contrato valida que las partes cumplan con los permisos definidos antes de ejecutar una transferencia.
                </p>
              </div>

              {/* Sección 4 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Fases Técnicas de Implementación</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  1. **Evaluación de Requerimientos:** Diagnóstico técnico y especificación de flujos de permisos.
                  2. **Diseño de Arquitectura:** Modelado funcional y coordinación con asesores legales independientes.
                  3. **Desarrollo y Testing:** Programación en Solidity, suites de pruebas automatizadas y optimización de gas.
                  4. **Integración:** Conexión con interfaces de usuario y paneles de administración técnica.
                </p>
              </div>

              {/* Sección 5 */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  Arquitectura y Smart Contracts con LexiaCode
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Diseñamos y testeamos smart contracts en Solidity con enfoque en buenas prácticas de desarrollo, modularidad y compliance-by-design.
                </p>
                <Link
                  href="/#contacto"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
                >
                  Consultar sobre Servicios de Desarrollo <ArrowRight className="h-4 w-4" />
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
