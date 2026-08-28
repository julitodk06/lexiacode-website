import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { LanguageProvider } from '@/lib/language-context'
import { Shield, Mail, Phone } from 'lucide-react'

export const metadata = {
  title: 'Política de Privacidad | LexiaCode',
  description: 'Política de privacidad de LexiaCode',
}

const sections = [
  {
    title: '1. Información que Recopilamos',
    content: [
      'Recopilamos datos que nos proporcionás directamente (nombre, email, teléfono, empresa) y datos de uso (IP, navegador, interacción).',
      'Para cumplimiento KYC/AML solicitamos documentos de identidad y comprobantes de domicilio cuando corresponde.',
    ],
  },
  {
    title: '2. Uso de la Información',
    content: [
      'Operar y mejorar la plataforma de tokenización.',
      'Comunicar actualizaciones y, con tu consentimiento, envíos de marketing.',
      'Cumplir obligaciones regulatorias ante CNV, UIF y demás autoridades.',
    ],
  },
  {
    title: '3. Seguridad',
    content: [
      'Cifrado AES‑256 en reposo y TLS 1.3 en tránsito, MFA y auditorías regulares.',
      'Notificación de brechas de seguridad dentro de 72 h según normativa.',
    ],
  },
]

export default function PoliticaDePrivacidadPage() {
  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-transparent">
        <Header />
        <section className="py-24 max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-6">Política de Privacidad</h1>
          <p className="text-lg text-muted-foreground mb-8">
            En LexiaCode protegemos tus datos. Esta política describe cómo los recopilamos, usamos y protegemos.
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
