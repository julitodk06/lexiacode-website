"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { HelpCircle, ChevronDown } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function FAQSection() {
  const { language, t } = useLanguage()
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const translations = {
    es: {
      label: t.faqSection.label,
      title: t.faqSection.title,
      subtitle: t.faqSection.subtitle,
      faqs: [
        {
          question: "¿Cómo se aborda la relación entre la tecnología y el marco legal?",
          answer: "En LexiaCode nos enfocamos en la arquitectura funcional y el desarrollo de contratos inteligentes con principios de compliance-by-design. La estructuración jurídica, vehicular e impositiva debe ser definida y validada por abogados y asesores especializados independientes para cada jurisdicción."
        },
        {
          question: "¿Qué estándares técnicos utilizan para modelar permisos y accesos?",
          answer: "Utilizamos estándares abiertos de la industria como ERC-3643 como referencia para modelar lógica de validación condicional de identidades y permisos en Solidity, facilitando que el código responda a reglas de gobernanza previamente especificadas."
        },
        {
          question: "¿Cuál es el esquema de trabajo y tiempos de desarrollo?",
          answer: "Trabajamos en sprints iterativos de desarrollo por etapas: diagnóstico preliminar de viabilidad técnica, diseño de arquitectura funcional, programación y pruebas unitarias de smart contracts e integraciones de software a medida."
        },
        {
          question: "¿Los contratos inteligentes e interfaces se integran con sistemas existentes?",
          answer: "Sí. Desarrollamos APIs y microservicios para conectar la infraestructura blockchain con bases de datos relacionales, sistemas ERP o paneles internos de gestión administrativa."
        }
      ]
    },
    en: {
      label: t.faqSection.label,
      title: t.faqSection.title,
      subtitle: t.faqSection.subtitle,
      faqs: [
        {
          question: "How is the relationship between technology and legal frameworks addressed?",
          answer: "At LexiaCode we focus on functional architecture and smart contract development with compliance-by-design principles. Legal structuring, corporate vehicles, and regulatory filings must be defined and validated by independent specialized legal counsel for each jurisdiction."
        },
        {
          question: "What technical standards are used to model permissions and identity logic?",
          answer: "We reference open industry standards such as ERC-3643 to model conditional identity validation and permission logic in Solidity, ensuring code executes according to pre-defined governance rules."
        },
        {
          question: "What is the development methodology and typical timeframe?",
          answer: "We work in milestone-driven development sprints: preliminary technical discovery, functional architecture design, Solidity development with automated unit test suites, and custom API integrations."
        },
        {
          question: "Do smart contracts and interfaces integrate with existing enterprise systems?",
          answer: "Yes. We develop APIs and microservices to interface blockchain state updates with internal databases, ERPs, or custom management dashboards."
        }
      ]
    },
    pt: {
      label: t.faqSection.label,
      title: t.faqSection.title,
      subtitle: t.faqSection.subtitle,
      faqs: [
        {
          question: "Como é tratada a relação entre tecnologia e estrutura jurídica?",
          answer: "Na LexiaCode focamos na arquitetura funcional e desenvolvimento de contratos inteligentes com princípios de compliance-by-design. A estruturação jurídica e regulatória deve ser validada por consultores jurídicos independentes para cada jurisdição."
        },
        {
          question: "Quais padrões técnicos são utilizados para modelar permissões e acessos?",
          answer: "Utilizamos padrões abertos como ERC-3643 como referência para modelar lógica condicional de permissões em Solidity, assegurando que o código responda às regras de governança especificadas."
        },
        {
          question: "Qual é a metodologia de trabalho e prazos de desenvolvimento?",
          answer: "Trabalhamos em sprints de desenvolvimento por etapas: diagnóstico preliminar de viabilidade técnica, design de arquitetura funcional, desenvolvimento com testes unitários e integrações de API sob medida."
        },
        {
          question: "Os smart contracts e interfaces se integram aos sistemas existentes?",
          answer: "Sim. Desenvolvemos APIs e microsserviços para conectar atualizações da blockchain a bancos de dados internos, ERPs ou painéis administrativos de gestão."
        }
      ]
    }
  }

  const currentT = translations[language as keyof typeof translations] || translations.es

  const toggleIdx = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section id="faq-section" className="relative py-24 lg:py-32 overflow-hidden bg-transparent">
      {/* Background decoration glows */}
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-primary/3 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[350px] h-[350px] bg-accent/3 blur-[110px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <ScrollReveal className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-sm mb-4">
            <HelpCircle className="h-4.5 w-4.5 text-primary animate-pulse-glow" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              {currentT.label}
            </span>
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl leading-tight">
            {currentT.title}
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground leading-relaxed">
            {currentT.subtitle}
          </p>
        </ScrollReveal>

        {/* Accordion list - Staggered scroll entry */}
        <ScrollReveal stagger staggerDelay={100} className="space-y-4 max-w-3xl mx-auto">
          {currentT.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              // DECISIÓN CRO: Acordeón animado y moderno en la landing para resolver objeciones en caliente inmediatamente antes de contactar
              <div
                key={idx}
                className="group rounded-2xl border border-border/30 bg-card/10 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-primary/30 glowing-card"
              >
                <button
                  onClick={() => toggleIdx(idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-card/20 transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="text-base font-bold text-foreground pr-4 transition-colors group-hover:text-primary duration-300">
                    {faq.question}
                  </span>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-secondary/30 transition-all duration-300 ${
                    isOpen ? "border-primary/40 bg-primary/10 text-primary rotate-180" : "text-muted-foreground group-hover:text-foreground"
                  }`}>
                    <ChevronDown className="h-4 w-4 transition-transform duration-300" />
                  </div>
                </button>
                
                {/* Content with animated transition */}
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-[300px] border-t border-border/20 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                }`}>
                  <div className="p-6 bg-background/30">
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </ScrollReveal>
      </div>
    </section>
  )
}
