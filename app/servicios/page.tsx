import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { LanguageProvider } from '@/lib/language-context'
import { Settings, ShieldCheck, Briefcase, Server } from 'lucide-react'

export const metadata = {
  title: 'Servicios de Producto & Tecnología | LexiaCode',
  description: 'Dirección de producto, desarrollo de smart contracts en Solidity, arquitectura funcional y soluciones habilitadas por IA en LexiaCode.',
}

const services = [
  {
    icon: Settings,
    title: 'Desarrollo de Software & Micro-SaaS',
    description: 'Desarrollo de interfaces de usuario modernas, dashboards de administración técnica y arquitecturas de software modulares.',
  },
  {
    icon: ShieldCheck,
    title: 'Smart Contracts en Solidity (ERC‑3643)',
    description: 'Desarrollo, optimización de gas y suites de pruebas unitarias para contratos inteligentes con lógica de permisos y compliance-by-design.',
  },
  {
    icon: Briefcase,
    title: 'Arquitectura Funcional & Due Diligence',
    description: 'Modelado de requisitos técnicos, evaluación preliminar de iniciativas y coordinación con asesores legales y de auditoría externos.',
  },
  {
    icon: Server,
    title: 'Agentes de IA & Automatización',
    description: 'Ingesta de datos, procesamiento estructurado y automatización de pipelines operativos mediante modelos de lenguaje y APIs.',
  },
]

export default function ServiciosPage() {
  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-transparent">
        <Header />
        <section className="py-24 max-w-5xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">Nuestros Servicios</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <div key={i} className="rounded-2xl border border-border/40 bg-card/20 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <s.icon className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">{s.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>
        </section>
        <Footer />
      </main>
    </LanguageProvider>
  )
}
