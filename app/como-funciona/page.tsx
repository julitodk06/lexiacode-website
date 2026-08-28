import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { LanguageProvider } from '@/lib/language-context'
import { HowItWorks } from '@/components/landing/how-it-works'
import { TechBackground } from '@/components/landing/tech-background'

export const metadata = {
  title: 'Cómo Funciona | LexiaCode',
  description: 'Proceso paso a paso para tokenizar activos reales con LexiaCode',
}

export default function ComoFuncionaPage() {
  return (
    <LanguageProvider>
      <TechBackground />
      <main className="relative min-h-screen bg-transparent">
        <Header />
        <div className="pt-24 lg:pt-32">
          <HowItWorks />
        </div>
        <Footer />
      </main>
    </LanguageProvider>
  )
}
