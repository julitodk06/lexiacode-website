import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { LanguageProvider } from "@/lib/language-context"
import { ShieldAlert, ShieldCheck, KeyRound, Database, RefreshCw, Cpu, Server } from "lucide-react"

export const metadata = {
  title: "Enfoque de Seguridad y Buenas Prácticas | LexiaCode",
  description: "Conocé nuestras prácticas de seguridad en desarrollo de software, pruebas de smart contracts y protección de datos.",
}

const layers = [
  {
    icon: ShieldCheck,
    title: "Pruebas y Revisión de Código",
    description: "Desarrollo de smart contracts con suites exhaustivas de pruebas unitarias y de integración utilizando frameworks como Hardhat y Foundry.",
  },
  {
    icon: KeyRound,
    title: "Control de Acceso y Multi-Firma",
    description: "Modelado de roles con permisos restringidos y soporte para esquemas multi-firma en operaciones administrativas sensibles.",
  },
  {
    icon: Server,
    title: "Infraestructura Cloud Segura",
    description: "Despliegue de aplicaciones y APIs en entornos cloud con certificados SSL/TLS y aislamiento de variables de configuración.",
  },
  {
    icon: Database,
    title: "Protección de Datos & Privacidad",
    description: "Cifrado de datos en reposo y en tránsito con protocolos estándar del sector, aplicando principios de minimización de datos.",
  },
  {
    icon: Cpu,
    title: "Estándar ERC-3643 de Referencia",
    description: "Modelado de lógica condicional para restringir operaciones de contratos inteligentes a cuentas debidamente autorizadas.",
  },
  {
    icon: RefreshCw,
    title: "Monitoreo y Registro de Eventos",
    description: "Implementación de eventos e indexadores on-chain para auditoría operativa y trazabilidad de cambios de estado.",
  }
]

export default function SeguridadPage() {
  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-transparent overflow-x-hidden">
        <Header />

        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#25D366]/5 to-transparent pointer-events-none" />
          <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <ShieldAlert className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">Enfoque de Seguridad</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              Seguridad y Calidad de Código
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Aplicamos metodologías rigurosas de desarrollo de software, testing automatizado y principios de compliance-by-design para proteger la integridad de cada solución.
            </p>
          </div>
        </section>

        {/* Security Layers Grid */}
        <section className="pb-24 lg:pb-32">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {layers.map((layer, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm p-6 flex flex-col justify-between hover:border-primary/40 hover:bg-card/30 transition-all duration-300"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-5 group-hover:scale-110 transition-transform">
                      <layer.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {layer.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {layer.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </LanguageProvider>
  )
}
