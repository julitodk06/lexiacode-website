import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { LanguageProvider } from '@/lib/language-context'
import { FileText, Mail, Phone } from 'lucide-react'

export const metadata = {
  title: 'Términos de Servicio | LexiaCode',
  description: 'Términos y condiciones de uso del sitio web informativo de LexiaCode',
}

const sections = [
  {
    title: '1. Aceptación de los Términos',
    content: [
      'Al acceder y utilizar el sitio web de LexiaCode, usted acepta cumplir con estos Términos de Servicio y con las leyes aplicables.',
    ],
  },
  {
    title: '2. Alcance de los Servicios y Naturaleza del Sitio',
    content: [
      'LexiaCode es un estudio de desarrollo de software, arquitectura funcional Web3, smart contracts e inteligencia artificial.',
      'El contenido de este sitio web tiene carácter estrictamente informativo y técnico. No constituye oferta pública, intermediación financiera, captación de fondos ni asesoramiento legal o de inversión.',
      'Queda prohibido utilizar el sitio o sus canales de contacto para fines ilícitos o contrarios a la legislación vigente.',
    ],
  },
  {
    title: '3. Propiedad Intelectual',
    content: [
      'Todo el código, marcas, diseño y contenido técnico expuesto en este sitio son propiedad de LexiaCode o de sus respectivos titulares.',
      'No se autoriza su reproducción, modificación o distribución no autorizada sin consentimiento previo y expreso.',
    ],
  },
  {
    title: '4. Deslinde de Responsabilidad',
    content: [
      'LexiaCode no garantiza resultados económicos, comerciales ni regulatorios de proyectos de terceros.',
      'Cualquier desarrollo, prototipo o servicio se contrata bajo acuerdos técnicos específicos y debe contar con la validación legal independiente por parte del cliente.',
    ],
  },
]

export default function TerminosServicioPage() {
  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-transparent">
        <Header />
        <section className="py-24 max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-6">Términos de Servicio</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Los siguientes términos regulan el acceso y uso de la plataforma LexiaCode.
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
