import type { Metadata } from 'next'
import { createRouteMetadata } from '@/lib/site-metadata'

export const metadata: Metadata = createRouteMetadata({
  title: 'Blog sobre Web3, RWA e inteligencia artificial',
  description: 'Artículos técnicos, análisis de arquitectura, estándares ERC y guías sobre desarrollo de smart contracts e inteligencia artificial aplicada.',
  path: '/blog',
  keywords: ['blog web3', 'articulos solidity', 'estándares ERC-3643', 'arquitectura blockchain'],
})

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
