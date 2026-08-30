import type { Metadata } from 'next'
import { createRouteMetadata } from '@/lib/site-metadata'

export const metadata: Metadata = createRouteMetadata({
  title: 'Agentes de IA y automatización',
  description: 'Diseño e integración de agentes de IA, procesamiento automatizado de datos y flujos inteligentes aplicados a plataformas Web3 y sistemas de gestión.',
  path: '/agentes-ia',
  keywords: ['agentes de IA', 'automatización de datos', 'inteligencia artificial aplicada', 'pipelines IA'],
})

export default function AgentesIALayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
