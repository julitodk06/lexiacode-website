import type { Metadata } from 'next'

export interface RouteMetadataOptions {
  title: string
  description: string
  path: string
  keywords?: string[]
}

export function normalizeRoutePath(rawPath: string): string {
  const trimmed = rawPath.trim()
  if (!trimmed || trimmed === '/') {
    return '/'
  }
  const clean = trimmed.replace(/^\/+|\/+$/g, '')
  return `/${clean}/`
}

export function createRouteMetadata({
  title,
  description,
  path,
  keywords = [],
}: RouteMetadataOptions): Metadata {
  const normalizedPath = normalizeRoutePath(path)
  const url = `https://lexiacode.com${normalizedPath}`

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
      canonical: normalizedPath,
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
          url: 'https://lexiacode.com/hero_custom_new.png',
          width: 1672,
          height: 941,
          alt: `${title} — LexiaCode`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://lexiacode.com/hero_custom_new.png'],
    },
  }
}
