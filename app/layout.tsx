import type { Metadata } from 'next'
import { Inter, Roboto_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'
import { ChatbotWidget } from '@/components/ui/chatbot-widget'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: '--font-roboto-mono'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lexiacode.com'),
  title: {
    default: 'LexiaCode | Estudio de Producto, Web3 & Inteligencia Artificial',
    template: '%s | LexiaCode',
  },
  description: 'Estudio de producto y tecnología especializado en arquitectura funcional, desarrollo de smart contracts en Solidity, microservicios y soluciones con IA.',
  generator: 'LexiaCode',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://lexiacode.com/',
    siteName: 'LexiaCode',
    title: 'LexiaCode | Estudio de Producto, Web3 & Inteligencia Artificial',
    description: 'Estudio de producto y tecnología especializado en arquitectura funcional, desarrollo de smart contracts en Solidity, microservicios y soluciones con IA.',
    images: [
      {
        url: 'https://lexiacode.com/hero_custom_new.png',
        width: 1672,
        height: 941,
        alt: 'LexiaCode - Estudio de Producto, Web3 e Inteligencia Artificial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LexiaCode | Estudio de Producto, Web3 & Inteligencia Artificial',
    description: 'Estudio de producto y tecnología especializado en arquitectura funcional, desarrollo de smart contracts en Solidity, microservicios y soluciones con IA.',
    images: ['https://lexiacode.com/hero_custom_new.png'],
  },
  keywords: ['tokenizacion en argentina', 'tokenizacion de activos argentina', 'tokenizar real estate argentina', 'RWA argentina', 'activos reales blockchain', 'smart contracts argentina', 'blockchain argentina'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${robotoMono.variable} bg-background`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "LexiaCode",
              "image": "https://lexiacode.com/icon.svg",
              "@id": "https://lexiacode.com/#organization",
              "url": "https://lexiacode.com",
              "email": "juliov@lexiacode.com",
              "telephone": "+54 381 540 0016",
              "founder": {
                "@type": "Person",
                "name": "Julio Antonio Villalobo",
                "jobTitle": "Managing Director | Technology, AI & Product Lead",
                "sameAs": "https://www.linkedin.com/in/julio-antonio-villalobo-770b22296"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Yerba Buena",
                "addressRegion": "Tucumán",
                "addressCountry": "AR"
              },
              "sameAs": [
                "https://www.linkedin.com/in/julio-antonio-villalobo-770b22296",
                "https://github.com/julitodk06"
              ],
              "areaServed": {
                "@type": "Country",
                "name": "Argentina"
              },
              "description": "Estudio de producto y tecnología especializado en dirección de productos Web3 y RWA, arquitectura funcional, smart contracts en Solidity y aplicaciones habilitadas por inteligencia artificial."
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <ChatbotWidget />
          <Toaster closeButton position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
