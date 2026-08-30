import type { Metadata } from 'next'
import { createRouteMetadata } from '@/lib/site-metadata'

export const metadata: Metadata = createRouteMetadata({
  title: 'Arquitectura LegalTech y compliance-by-design',
  description: 'Modelado funcional de reglas de negocio, trazabilidad y diseño de smart contracts alineados con principios de compliance-by-design.',
  path: '/consultoria-legaltech',
  keywords: ['arquitectura legaltech', 'compliance by design', 'reglas de negocio smart contracts', 'trazabilidad on-chain'],
})

export default function ConsultoriaLegaltechLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
