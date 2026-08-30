import type { Metadata } from 'next'
import { createRouteMetadata } from '@/lib/site-metadata'

export const metadata: Metadata = createRouteMetadata({
  title: 'Desarrollo de aplicaciones y Micro-SaaS',
  description: 'Ingeniería de software, dashboards interactivos, microservicios e integraciones API para plataformas digitales y proyectos Web3.',
  path: '/software-microsaas',
  keywords: ['desarrollo microsaas', 'desarrollo dashboards web3', 'integraciones api', 'ingenieria de software'],
})

export default function SoftwareMicrosaasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
