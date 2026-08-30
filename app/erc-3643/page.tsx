import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { LanguageProvider } from '@/lib/language-context'
import { BlockchainBackground } from '@/components/ui/blockchain-background'
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu, Code } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Estándar ERC-3643: Arquitectura de Tokens con Permisos | LexiaCode',
  description: 'Guía técnica sobre el estándar ERC-3643 (T-REX). Gestión de identidad on-chain y validación programática de reglas de acceso condicionales.',
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
              Estándar Técnico de Permisos
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance mb-6">
              ERC-3643: Validación de Permisos On-Chain
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              El estándar ERC-3643 (anteriormente protocolo T-REX) provee un marco de referencia de contratos inteligentes para gestionar tokens con control de acceso y validación descentralizada de identidades.
            </p>
          </div>
        </section>

        {/* Contenido principal estructurado */}
        <section className="py-20 bg-background relative z-10">
          <div className="mx-auto max-w-4xl px-6">
            <article className="space-y-12">
              
              {/* Sección 1 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. ¿Qué es el Estándar ERC-3643?</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  El estándar **ERC-3643** es un conjunto de interfaces de contratos inteligentes diseñados para la gestión de tokens que requieren control de permisos y validaciones condicionales de acceso.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  A diferencia de los tokens estándar **ERC-20** ordinarios, el protocolo ERC-3643 implementa una capa programática de control que consulta registros de identidad y reglas de elegibilidad antes de procesar transferencias entre billeteras.
                </p>
              </div>

              {/* Sección 2 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Gestión de Identidad On-Chain y Validación de Reglas</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  La arquitectura del estándar ERC-3643 se estructura en torno a contratos de **Identity Registry** (Registro de Identidad) y **Claim Issuers** (Emisores de Certificados):
                </p>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <li className="flex gap-3">
                    <Cpu className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Identity Registry:</strong> Almacena de forma descentralizada el mapeo de direcciones de billeteras autorizadas y el estado de sus verificaciones.</span>
                  </li>
                  <li className="flex gap-3">
                    <Code className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Claim Validator (Validador de Reglas):</strong> Antes de procesar una transferencia de tokens, el smart contract consulta el registro para verificar si ambas partes cumplen con los requisitos definidos en la especificación técnica.</span>
                  </li>
                </ul>
              </div>

              {/* Sección 3 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Comparación: ERC-20 frente a ERC-3643</h2>
                <div className="overflow-x-auto mt-6">
                  <table className="min-w-full divide-y divide-border/40 text-sm text-left">
                    <thead>
                      <tr className="border-b border-border/40 font-bold text-foreground">
                        <th className="py-3 px-4">Característica</th>
                        <th className="py-3 px-4">ERC-20</th>
                        <th className="py-3 px-4">ERC-3643</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30 text-muted-foreground leading-relaxed">
                      <tr>
                        <td className="py-3 px-4 font-semibold text-foreground">Reglas de Elegibilidad Programables</td>
                        <td className="py-3 px-4">No soportado (transferencias libres)</td>
                        <td className="py-3 px-4">Validación condicional on-chain</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-foreground">Control de Permisos</td>
                        <td className="py-3 px-4">Limitado tras el despliegue</td>
                        <td className="py-3 px-4">Administración granular y funciones de contingencia técnica</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-foreground">Foco de Arquitectura</td>
                        <td className="py-3 px-4">Tokens libres / DeFi</td>
                        <td className="py-3 px-4">Tokens con permisos / Activos del Mundo Real (RWA)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sección 4 */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Ventajas de Arquitectura del Estándar ERC-3643</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  El protocolo permite que las reglas de negocio y restricciones definidas por los asesores legales de un proyecto se traduzcan en condiciones lógicas ejecutables en la blockchain. Esto facilita implementar reglas especificadas de control de acceso, aunque el código por sí mismo no sustituye la debida diligencia ni garantiza el cumplimiento normativo integral, el cual requiere supervisión jurídica independiente.
                </p>
              </div>

              {/* Sección 5 */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  Desarrollo Técnico con LexiaCode
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Desarrollamos contratos inteligentes en Solidity tomando como referencia el estándar ERC-3643, adaptando la lógica de permisos y registros de identidad a los requerimientos de cada iniciativa.
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
