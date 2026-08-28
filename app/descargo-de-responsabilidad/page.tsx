import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { LanguageProvider } from '@/lib/language-context'
import { AlertTriangle, Mail, Phone } from 'lucide-react'

export const metadata = {
  title: 'Descargo de Responsabilidad | LexiaCode',
  description: 'Descargo de responsabilidad legal de LexiaCode',
}

export default function DisclaimerPage() {
  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-transparent">
        <Header />
        <section className="py-24 max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-6">Descargo de Responsabilidad</h1>
          <div className="flex items-start gap-4 bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0" />
            <div>
              <p className="text-lg text-red-700 font-medium mb-2">Importante</p>
              <p className="text-sm text-red-700 leading-relaxed">
                La información y los servicios ofrecidos en LexiaCode son exclusivamente con fines informativos y de desarrollo tecnológico. No constituyen asesoramiento legal, financiero o de inversión. Cada inversión conlleva riesgos y es responsabilidad del usuario realizar su propio análisis y consultar a profesionales antes de tomar decisiones.
              </p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            LexiaCode no garantiza la exactitud, integridad o actualidad de la información presentada en la plataforma. No asumimos responsabilidad por pérdidas, perjuicios o daños derivados del uso de la información o de la participación en proyectos tokenizados.
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            Los usuarios deben cumplir con la normativa aplicable en su jurisdicción y asumir la total responsabilidad de sus acciones.
          </p>
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
