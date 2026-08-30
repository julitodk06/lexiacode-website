import type { Metadata } from 'next'
import { createRouteMetadata } from '@/lib/site-metadata'

export const metadata: Metadata = createRouteMetadata({
  title: 'Desarrollo y pruebas de smart contracts',
  description: 'Desarrollo de contratos inteligentes en Solidity, diseño de suites de pruebas automatizadas y revisión de lógica contractual para redes EVM.',
  path: '/smart-contracts',
  keywords: ['desarrollo smart contracts', 'solidity unit testing', 'pruebas automatizadas solidity', 'smart contracts evm'],
})

export default function SmartContractsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
