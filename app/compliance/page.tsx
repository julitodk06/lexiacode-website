import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { LanguageProvider } from '@/lib/language-context'
import { ShieldCheck, Mail, Phone } from 'lucide-react'

export const metadata = {
  title: 'Enfoque de Compliance | LexiaCode',
  description: 'Principios de compliance-by-design en arquitectura de producto para iniciativas RWA y Web3.',
}

const sections = [
  {
    title: 'Compliance-by-Design en Arquitectura',
    content: [
      'LexiaCode aplica principios de compliance-by-design en la arquitectura de producto para permitir la integración de reglas de validación en contratos inteligentes.',
      'La aplicabilidad de normativas de la CNV (como la RG CNV 1150/2026), UIF, SEC, KYC/AML, PSAV u otros marcos regulatorios debe analizarse individualmente para cada iniciativa.',
      'LexiaCode no afirma contar con autorización formal de la CNV, SEC ni UIF, ni contar con certificaciones regulatorias propias.',
    ],
  },
  {
    title: 'Asesoramiento y Verificación Externa',
    content: [
      'Los servicios legales, tributarios o regulatorios deben ser prestados por profesionales y estudios jurídicos habilitados según cada jurisdicción.',
      'La auditoría externa de smart contracts o de seguridad debe ser contratada de manera específica cuando el alcance del proyecto lo requiera.',
    ],
  },
]

export default function CompliancePage() {
  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-transparent">
        <Header />
        <section className="py-24 max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-6">Enfoque de Compliance</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Diseñamos arquitecturas técnicas estructuradas para facilitar el cumplimiento regulatorio en coordinación con especialistas externos.
          </p>
          {sections.map((s, i) => (
            <div key={i} className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-3">{s.title}</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                {s.content.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="border-t pt-6 mt-6">
            <h2 className="text-2xl font-semibold text-foreground mb-3">Contacto</h2>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
              <Mail className="h-4 w-4 text-primary" />
              <span>juliov@lexiacode.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" />
              <span>+54 381 540 0016</span>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </LanguageProvider>
  )
}
