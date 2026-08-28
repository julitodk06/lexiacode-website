import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lexiacode.com'
  const currentDate = new Date()

  const routes = [
    '',
    '/agentes-ia/',
    '/blog/',
    '/como-funciona/',
    '/compliance/',
    '/consultoria-legaltech/',
    '/descargo-de-responsabilidad/',
    '/documentacion/',
    '/erc-3643/',
    '/faq/',
    '/guia-tokenizacion/',
    '/mercado-secundario/',
    '/politica-de-privacidad/',
    '/proyectos-rwa/',
    '/security-tokens/',
    '/seguridad/',
    '/servicios/',
    '/smart-contracts/',
    '/sobre-nosotros/',
    '/software-microsaas/',
    '/terminos-de-servicio/',
    '/tokenizacion-de-activos/',
    '/tokenizacion-inmobiliaria/',
    '/tokenizacion-rwa/',
    '/whitepaper/',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/servicios/' || route === '/sobre-nosotros/' ? 0.8 : 0.6,
  }))
}
