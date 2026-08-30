import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { LanguageProvider } from '@/lib/language-context'
import { BlockchainBackground } from '@/components/ui/blockchain-background'
import { ArrowRight, CheckCircle2, ShieldCheck, Building2, Landmark } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Arquitectura y Modelado Digital Inmobiliario | LexiaCode',
  description: 'Modelado técnico de registros, reglas de permisos y flujos de contratos inteligentes para el sector inmobiliario.',
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
              Modelado de Registros & Permisos
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance mb-6">
              Modelado Digital para el Sector Inmobiliario
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Diseño de arquitectura funcional, contratos inteligentes en Solidity y workflows de validación de permisos para la representación digital de participaciones y trazabilidad técnica en proyectos inmobiliarios.
            </p>
          </div>
        </section>

        {/* Contenido principal estructurado */}
        <section className="py-20 bg-background relative z-10">
          <div className="mx-auto max-w-4xl px-6">
            <article className="space-y-12">
              
              {/* Sección 1 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Modelado Digital en el Sector Inmobiliario</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  El sector inmobiliario involucra múltiples procesos de registro, administración y coordinación entre desarrolladores, compradores y partes interesadas. La **digitalización de participaciones inmobiliarias** propone utilizar contratos inteligentes para registrar derechos operativos y unidades sobre una infraestructura distribuida.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Mediante contratos inteligentes en Solidity se pueden modelar reglas para la representación de participaciones de un desarrollo, facilitando la trazabilidad de eventos y la consulta transparente de estados a través de interfaces web conectadas a la blockchain.
                </p>
              </div>

              {/* Sección 2 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Enfoque Técnico y Coordinación Legal</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Los contratos inteligentes no reemplazan los registros notariales ni las inscripciones de dominio oficiales. En cualquier desarrollo, la arquitectura técnica debe responder a los vehículos legales formalmente constituidos por los asesores jurídicos del proyecto:
                </p>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <li className="flex gap-3">
                    <Building2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Estructuración Contractual:</strong> Los acuerdos de participación se definen en el marco legal correspondiente y se reflejan en el código como reglas lógicas de asignación y transferencia.</span>
                  </li>
                  <li className="flex gap-3">
                    <Landmark className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Estándares de Permisos:</strong> Se implementan contratos basados en el estándar ERC-3643 para modelar listas de cuentas autorizadas y condiciones de transferencia predefinidas.</span>
                  </li>
                </ul>
              </div>

              {/* Sección 3 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Ventajas de Arquitectura y Software</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Para las empresas desarrolladoras y equipos técnicos, implementar esta arquitectura aporta:
                </p>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Trazabilidad y Transparencia:</strong> Registro inmutable de transacciones y estados de las participaciones digitales.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Automatización de Procesos:</strong> Ejecución programática de transferencias autorizadas y validaciones de permisos.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Dashboards de Seguimiento:</strong> Interfaces web funcionales para monitorear métricas técnicas del proyecto y estado de contratos.</span>
                  </li>
                </ul>
              </div>

              {/* Sección 4 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Consideraciones de Cumplimiento</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  El diseño técnico debe respetar las especificaciones de compliance fijadas por los especialistas legales de cada proyecto, asegurando que las transferencias en smart contracts requieran validación previa de identidad y permisos correspondientes.
                </p>
              </div>

              {/* Sección 5 */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  Desarrollo de Arquitectura Inmobiliaria con LexiaCode
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Diseñamos contratos inteligentes en Solidity y aplicaciones web para proyectos de Real Estate con enfoque en trazabilidad y calidad de código.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
                >
                  Consultar sobre Desarrollo Técnico <ArrowRight className="h-4 w-4" />
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
