import type { Metadata } from 'next'

export interface RouteMetadataOptions {
  title: string
  description: string
  path: string
  keywords?: string[]
}

export function createRouteMetadata({
  title,
  description,
  path,
  keywords = [],
}: RouteMetadataOptions): Metadata {
  const url = `https://lexiacode.com${path.startsWith('/') ? path : `/${path}`}`

  return {
    title,
    description,
    keywords: [
      ...keywords,
      'LexiaCode',
      'smart contracts',
      'Web3',
      'RWA',
      'inteligencia artificial',
      'Solidity',
    ],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'LexiaCode',
      locale: 'es_AR',
      type: 'website',
      images: [
        {
          url: '/hero_custom_new.png',
          width: 1200,
          height: 630,
          alt: `${title} — LexiaCode`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/hero_custom_new.png'],
    },
  }
}
