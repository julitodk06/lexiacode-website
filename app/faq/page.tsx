"use client"

import { useState } from "react"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { LanguageProvider } from "@/lib/language-context"
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "¿Qué es la representación digital de activos (RWA)?",
    answer: "Consiste en modelar derechos de participación o eventos operativos de un activo en una blockchain mediante smart contracts en Solidity. Esto permite registrar transferencias y estados con total trazabilidad.",
  },
  {
    question: "¿Cómo se implementan las reglas de permisos y compliance-by-design?",
    answer: "Tomamos como referencia estándares abiertos como ERC-3643 para modelar validaciones de identidad y roles de acceso condicionales a nivel de smart contract, asegurando que el software ejecute la lógica definida por los especialistas legales del proyecto.",
  },
  {
    question: "¿Qué es el estándar ERC-3643?",
    answer: "Es un estándar técnico para contratos inteligentes que incorpora un registro de identidades on-chain (Identity Registry), permitiendo condicionar las transferencias a la posesión de autorizaciones específicas.",
  },
  {
    question: "¿Cómo se integra la tecnología blockchain con los sistemas existentes?",
    answer: "Desarrollamos APIs, indexadores y dashboards web que permiten conectar contratos inteligentes con bases de datos y herramientas de administración corporativa.",
  },
  {
    question: "¿Cuál es el rol de LexiaCode en el marco legal del proyecto?",
    answer: "LexiaCode es un estudio de producto y tecnología. Diseñamos la arquitectura funcional, desarrollamos el código en Solidity y coordinamos con los asesores legales independientes que validan el encuadre normativo de cada iniciativa.",
  }
]

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const toggleIdx = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-transparent overflow-x-hidden">
        <Header />

        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">Soporte</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              Preguntas Frecuentes
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Respuestas a las preguntas más comunes sobre la tokenización de activos en la blockchain y la regulación vigente.
            </p>
          </div>
        </section>

        {/* Accordion list */}
        <section className="pb-24 lg:pb-32">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openIdx === idx
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleIdx(idx)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-card/30 transition-colors focus:outline-none"
                    >
                      <span className="text-base font-bold text-foreground pr-4">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 border-t border-border/20">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </LanguageProvider>
  )
}
