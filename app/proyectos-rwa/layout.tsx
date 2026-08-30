import type { Metadata } from 'next'
import { createRouteMetadata } from '@/lib/site-metadata'

export const metadata: Metadata = createRouteMetadata({
  title: 'Casos de producto e iniciativas RWA',
  description: 'Registro y documentación transparente de evaluaciones técnicas, propuestas de producto y casos de estudio analizados por LexiaCode.',
  path: '/proyectos-rwa',
  keywords: ['casos de producto rwa', 'evaluaciones tecnicas rwa', 'estudios de factibilidad web3'],
})

export default function ProyectosRwaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
