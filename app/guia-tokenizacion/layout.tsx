import type { Metadata } from 'next'
import { createRouteMetadata } from '@/lib/site-metadata'

export const metadata: Metadata = createRouteMetadata({
  title: 'Guía técnica de tokenización RWA',
  description: 'Guía integral sobre arquitectura funcional, estándares de smart contracts y requerimientos para evaluar iniciativas de tokenización de activos reales.',
  path: '/guia-tokenizacion',
  keywords: ['guía tokenización rwa', 'tokenización de activos reales', 'estándares de tokenización', 'arquitectura rwa'],
})

export default function GuiaTokenizacionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
