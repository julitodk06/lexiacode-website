import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { LanguageProvider } from '@/lib/language-context'
import { BlockchainBackground } from '@/components/ui/blockchain-background'
import { ArrowRight, CheckCircle2, ShieldCheck, BarChart3, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Arquitectura Funcional y Modelado de Activos Reales (RWA) | LexiaCode',
  description: 'Guía técnica y educativa sobre arquitectura funcional, modelado de permisos y contratos inteligentes en Solidity para iniciativas RWA.',
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
              Infraestructura RWA Institucional
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance mb-6">
              Tokenización de Activos Reales (RWA)
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              La tokenización de activos del mundo real (Real World Assets) representa la convergencia definitiva entre las finanzas tradicionales y la tecnología blockchain. Consiste en registrar los derechos de propiedad y económicos de un activo físico o financiero en un token digital seguro e inmutable.
            </p>
          </div>
        </section>

        {/* Contenido principal estructurado */}
        <section className="py-20 bg-background relative z-10">
          <div className="mx-auto max-w-4xl px-6">
            <article className="space-y-12">
              
              {/* Sección 1 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. ¿Qué es la Representación Digital de Activos (RWA)?</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Consiste en registrar derechos operativos, participaciones o inventarios en una base de datos distribuida (blockchain) mediante contratos inteligentes que modelan la lógica de permisos, estados y transferencias.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  El proceso requiere definir la arquitectura funcional que traduce los requerimientos de gobernanza y legales al código de smart contracts en Solidity. Esto incluye el modelado de roles, eventos auditables y validación de reglas de acceso condicionales.
                </p>
              </div>

              {/* Sección 2 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Aspectos Técnicos y Funcionales</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  La digitalización de participaciones aporta ventajas en términos de estructura de software y trazabilidad:
                </p>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Trazabilidad On-Chain:</strong> Registro transparente e inmutable de eventos, emisiones de unidades y cambios de titularidad.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Automatización de Lógica de Negocio:</strong> Ejecución determinista de validaciones de reglas de transferencia mediante smart contracts.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Modelado de Permisos y Roles:</strong> Control granular de accesos para administración, auditoría y operaciones de usuarios autorizados.</span>
                  </li>
                </ul>
              </div>

              {/* Sección 3 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. El Estándar de Referencia ERC-3643</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Para iniciativas donde la transferencia de unidades debe respetar restricciones de identidad y cumplimiento, el estándar abierto **ERC-3643** provee un marco de referencia técnico.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Este estándar separa la capa del token de la capa de verificación de identidad, permitiendo que el contrato consulte si una cuenta cumple con las condiciones exigidas antes de procesar una transferencia.
                </p>
              </div>

              {/* Sección 4 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Casos de Aplicación y Modelado</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Áreas donde se investiga e implementa la representación digital de activos:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="p-5 rounded-2xl border border-border/30 bg-card/30">
                    <h3 className="text-base font-bold text-foreground mb-2">Real Estate & Construcción</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Modelado de unidades digitales y derechos de participación en proyectos inmobiliarios, con interfaces de seguimiento del estado de avance de obra.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl border border-border/30 bg-card/30">
                    <h3 className="text-base font-bold text-foreground mb-2">Energía & Trazabilidad</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Registro auditable de generación energética y emisión de certificados de atributos ambientales en redes compatibles con EVM.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sección 5 */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  Dirección de Producto & Arquitectura Funcional
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Diseñamos especificaciones técnicas, desarrollamos smart contracts en Solidity con suites de testing automatizadas y coordinamos los requerimientos funcionales con especialistas legales y de auditoría independientes.
                </p>
                <Link
                  href="/#contacto"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
                >
                  Consultar sobre Servicios Técnicos
                  <ArrowRight className="h-4 w-4" />
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
