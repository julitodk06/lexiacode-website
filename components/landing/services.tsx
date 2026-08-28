"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins, Bot, Server, ShieldCheck, Cpu, ArrowRight, CheckCircle2, BookOpen } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function Services() {
  const { language, t } = useLanguage()

  // 6 Premium Services of LexiaCode with local multi-language support (EN, ES, PT)
  const servicesData = {
    es: [
      {
        number: "01",
        title: "Tokenización RWA",
        description: "Estructuración técnica de producto y arquitectura funcional para digitalizar iniciativas sobre activos reales.",
        features: ["Fraccionamiento de Activos", "Modelado de Tokenomics", "Compliance-by-Design", "Arquitectura Web3"],
        icon: Coins,
        accent: "from-amber-500/30 to-amber-600/5",
        iconColor: "text-amber-400",
        image: "/services/tokenizacion.jpg",
        link: "#contacto"
      },
      {
        number: "02",
        title: "Smart Contracts ERC-3643",
        description: "Desarrollo, modificación y pruebas de contratos inteligentes en Solidity. Revisión de lógica contractual y riesgos de seguridad.",
        features: ["Smart Contracts en Solidity", "Pruebas de Seguridad", "Estándar ERC-3643", "Integraciones Web3"],
        icon: ShieldCheck,
        accent: "from-purple-500/30 to-purple-600/5",
        iconColor: "text-purple-400",
        image: "/services/smart-contracts.jpg",
        link: "/smart-contracts/"
      },
      {
        number: "03",
        title: "Consultoría Legal-Tech",
        description: "Análisis técnico-funcional preliminar y coordinación de especialistas legales y de compliance según jurisdicción.",
        features: ["Due Diligence Técnico", "Análisis Normativo Preliminar", "Integración KYC/AML", "Coordinación Externa"],
        icon: Cpu,
        accent: "from-rose-500/30 to-rose-600/5",
        iconColor: "text-rose-400",
        image: "/services/consultoria-legaltech.jpg",
        link: "/consultoria-legaltech/"
      },
      {
        number: "04",
        title: "Capacitaciones & EduTech",
        description: "Programas de formación tecnológica corporativa, Inteligencia Artificial y Web3 en colaboración con Fundación Fundatur.",
        features: ["Programas de formación", "Capacitaciones In-Company", "Inserción Digital Corporativa", "Talleres de Innovación"],
        icon: BookOpen,
        accent: "from-indigo-500/30 to-indigo-600/5",
        iconColor: "text-indigo-400",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=70&w=400&auto=format&fit=crop",
        link: "https://fundacionfundatur.org"
      }
    ],
    en: [
      {
        number: "01",
        title: "RWA Tokenization",
        description: "Technical product structuring and functional architecture to digitize physical asset initiatives.",
        features: ["Asset Fractionalization", "Tokenomics Modeling", "Compliance-by-Design", "Web3 Architecture"],
        icon: Coins,
        accent: "from-amber-500/30 to-amber-600/5",
        iconColor: "text-amber-400",
        image: "/services/tokenizacion.jpg",
        link: "#contacto"
      },
      {
        number: "02",
        title: "AI Agents & Automation",
        description: "Custom cognitive agents and automated pipelines for prospecting, data intelligence, and workflow execution. Infinite scalability.",
        features: ["Advanced LLM Integration", "Scraping & Data Pipelines", "AI Sales Machines", "Risk Portfolio Analysis"],
        icon: Bot,
        accent: "from-cyan-500/30 to-cyan-600/5",
        iconColor: "text-cyan-400",
        image: "/services/agentes-ia.png",
        link: "/agentes-ia/"
      },
      {
        number: "03",
        title: "ERC-3643 Smart Contracts",
        description: "Development, modification, and testing of smart contracts in Solidity. Code logic and security risk review.",
        features: ["Solidity Smart Contracts", "Security & QA Testing", "ERC-3643 Standard", "Web3 Integrations"],
        icon: ShieldCheck,
        accent: "from-purple-500/30 to-purple-600/5",
        iconColor: "text-purple-400",
        image: "/services/smart-contracts.jpg",
        link: "/smart-contracts/"
      },
      {
        number: "04",
        title: "Software & Micro-SaaS",
        description: "Custom engineering of investor portals, analytical dashboards, and high-performance transactional engines.",
        features: ["Investor Dashboards", "Billing Systems", "Enterprise CRM Software", "High-Speed Async APIs"],
        icon: Server,
        accent: "from-emerald-500/30 to-emerald-600/5",
        iconColor: "text-emerald-400",
        image: "/services/software-microsaas.jpg",
        link: "/software-microsaas/"
      },
      {
        number: "05",
        title: "Legal-Tech Consulting",
        description: "Preliminary technical-functional analysis and coordination of external legal and compliance specialists by jurisdiction.",
        features: ["Technical Due Diligence", "Preliminary Regulatory Analysis", "KYC/AML Integration", "External Coordination"],
        icon: Cpu,
        accent: "from-rose-500/30 to-rose-600/5",
        iconColor: "text-rose-400",
        image: "/services/consultoria-legaltech.jpg",
        link: "/consultoria-legaltech/"
      },
      {
        number: "06",
        title: "Tech Training & EduTech",
        description: "Cutting-edge corporate technology training, Artificial Intelligence, and Web3 programs in strategic alliance with Fundación Fundatur.",
        features: ["Training Programs", "In-Company Workshops", "Digital Work Readiness", "Innovation Programs"],
        icon: BookOpen,
        accent: "from-indigo-500/30 to-indigo-600/5",
        iconColor: "text-indigo-400",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=70&w=400&auto=format&fit=crop",
        link: "https://fundacionfundatur.org"
      }
    ],
    pt: [
      {
        number: "01",
        title: "Tokenização RWA",
        description: "Estruturação técnica de produto e arquitetura funcional para digitalizar iniciativas sobre ativos físicos.",
        features: ["Fracionamento de Ativos", "Modelagem de Tokenomics", "Compliance-by-Design", "Arquitetura Web3"],
        icon: Coins,
        accent: "from-amber-500/30 to-amber-600/5",
        iconColor: "text-amber-400",
        image: "/services/tokenizacion.jpg",
        link: "#contacto"
      },
      {
        number: "02",
        title: "Agentes de IA & Automação",
        description: "Agentes cognitivos customizados e pipelines automáticos para prospecção, análise de datos e flujos de trabalho.",
        features: ["Integração LLM Avançada", "Scraping & Pipelines de Dados", "Máquinas de Vendas IA", "Análise de Portfólio"],
        icon: Bot,
        accent: "from-cyan-500/30 to-cyan-600/5",
        iconColor: "text-cyan-400",
        image: "/services/agentes-ia.png",
        link: "/agentes-ia/"
      },
      {
        number: "03",
        title: "Smart Contracts ERC-3643",
        description: "Desenvolvimento, modificação e testes de contratos inteligentes em Solidity. Revisão de lógica e segurança.",
        features: ["Smart Contracts em Solidity", "Testes de Segurança", "Padrão ERC-3643", "Integrações Web3"],
        icon: ShieldCheck,
        accent: "from-purple-500/30 to-purple-600/5",
        iconColor: "text-purple-400",
        image: "/services/smart-contracts.jpg",
        link: "/smart-contracts/"
      },
      {
        number: "04",
        title: "Software & Micro-SaaS",
        description: "Engenharia customizada de portais de investimento, painéis analíticos e motores transacionais robustos.",
        features: ["Dashboards de Investidores", "Sistemas de Cobrança", "CRMs Corporativos", "APIs Assíncronas de Alta Velocidade"],
        icon: Server,
        accent: "from-emerald-500/30 to-emerald-600/5",
        iconColor: "text-emerald-400",
        image: "/services/software-microsaas.jpg",
        link: "/software-microsaas/"
      },
      {
        number: "05",
        title: "Consultoría Legal-Tech",
        description: "Análise técnico-funcional preliminar e coordenação de especialistas legais e de compliance por jurisdição.",
        features: ["Due Diligence Técnico", "Análise Regulatória Preliminar", "Integração KYC/AML", "Coordenação Externa"],
        icon: Cpu,
        accent: "from-rose-500/30 to-rose-600/5",
        iconColor: "text-rose-400",
        image: "/services/consultoria-legaltech.jpg",
        link: "/consultoria-legaltech/"
      },
      {
        number: "06",
        title: "Treinamentos & EduTech",
        description: "Programas de capacitação tecnológica corporativa, Inteligência Artificial e Web3 em aliança estratégica com a Fundação Fundatur.",
        features: ["Programas de Formação", "Treinamentos In-Company", "Integração Digital Corporativa", "Programas de Inovação"],
        icon: BookOpen,
        accent: "from-indigo-500/30 to-indigo-600/5",
        iconColor: "text-indigo-400",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=70&w=400&auto=format&fit=crop",
        link: "https://fundacionfundatur.org"
      }
    ]
  }

  // Active language services array
  const services = servicesData[language as keyof typeof servicesData] || servicesData.es

  const labels = {
    es: { cta: "Más Información", partner: "En Alianza con Fundación Fundatur" },
    en: { cta: "Learn More", partner: "In Alliance with Fundación Fundatur" },
    pt: { cta: "Saiba Mais", partner: "Em Aliança com a Fundação Fundatur" }
  }

  const currentLabels = labels[language as keyof typeof labels] || labels.es

  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden bg-transparent">
      {/* Background radial glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/4 blur-[130px] rounded-full pointer-events-none z-0 animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
        
        {/* Section header */}
        <ScrollReveal className="mx-auto max-w-3xl text-center mb-20">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {t.services.label}
          </p>
          <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {t.services.title}
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            {t.services.subtitle}
          </p>
        </ScrollReveal>

        {/* Services grid - Staggered scroll reveal */}
        <ScrollReveal stagger staggerDelay={100} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            // DECISIÓN CRO: Tarjetas glowing-card altamente estilizadas en cuadrícula responsiva para incentivar la exploración de servicios
            <Card
              key={service.title}
              className="group relative overflow-hidden border-border/30 bg-card/10 backdrop-blur-md transition-all duration-500 hover:border-primary/45 hover:bg-card/20 hover:shadow-[0_0_50px_rgba(var(--primary),0.08)] hover:-translate-y-2 rounded-2xl flex flex-col justify-between glowing-card cursor-default"
            >
              {/* Animated top gradient glow */}
              <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${service.accent} opacity-70 group-hover:opacity-100 transition-opacity`} />
              
              {/* Dynamic Image Header with zoom on hover */}
              <div className="relative h-48 w-full overflow-hidden bg-muted border-b border-border/10">
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/10 to-transparent z-10" />
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                
                {/* Floating pill: Number */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="font-mono text-3xl font-black text-white/20 group-hover:text-white/40 transition-colors select-none">
                    {service.number}
                  </span>
                </div>

                {/* Floating pill: Icon */}
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/80 backdrop-blur-md border border-border/40 transition-transform group-hover:scale-110 shadow-lg">
                    <service.icon className={`h-6 w-6 ${service.iconColor}`} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col flex-1 justify-between p-6">
                <CardHeader className="p-0 mb-6">
                  <div className="flex flex-col gap-1">
                    <CardTitle className={`text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 ${service.title.includes('Tokenización') ? 'font-serif' : service.title.includes('Agentes IA') ? 'font-sans' : ''}`}>
                      {service.title}
                    </CardTitle>
                    {service.number === "04" && (
                      <span className="text-[10px] font-semibold text-primary uppercase tracking-wider block">
                        {currentLabels.partner}
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-muted-foreground leading-relaxed mt-3 text-sm font-light">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0 space-y-6">
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                        <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${service.iconColor} opacity-70`} />
                        <span className="group-hover:text-foreground/95 transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={service.link}
                    target={service.link.startsWith("http") ? "_blank" : undefined}
                    rel={service.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block mt-2"
                  >
                    {/* DECISIÓN CRO: Botón ghost magnético que escala y desliza la flecha al hacer hover */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-between border border-border/30 bg-transparent text-foreground/80 ${service.iconColor} hover:bg-secondary/40 hover:text-foreground hover:scale-105 active:scale-95 group/btn rounded-xl transition-all duration-300 cursor-pointer`}
                    >
                      <span>{currentLabels.cta}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1.5" />
                    </Button>
                  </a>
                </CardContent>
              </div>
            </Card>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
