import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const outDir = path.join(rootDir, 'out')

console.log('=== LexiaCode Static Export Verification Gate (v4B.1) ===\n')

let errors = 0

// 1. Verify existence of out/
if (!fs.existsSync(outDir)) {
  console.error('[FAIL] El directorio out/ no existe. Ejecuta `npm run build` primero.')
  process.exit(1)
}
console.log('[PASS] Directorio out/ presente.')

// 2. The 26 expected HTML documents
const EXPECTED_HTML_DOCUMENTS = [
  'index.html',
  '_not-found/index.html',
  'agentes-ia/index.html',
  'blog/index.html',
  'como-funciona/index.html',
  'compliance/index.html',
  'consultoria-legaltech/index.html',
  'descargo-de-responsabilidad/index.html',
  'documentacion/index.html',
  'erc-3643/index.html',
  'faq/index.html',
  'guia-tokenizacion/index.html',
  'mercado-secundario/index.html',
  'politica-de-privacidad/index.html',
  'proyectos-rwa/index.html',
  'security-tokens/index.html',
  'seguridad/index.html',
  'servicios/index.html',
  'smart-contracts/index.html',
  'sobre-nosotros/index.html',
  'software-microsaas/index.html',
  'terminos-de-servicio/index.html',
  'tokenizacion-de-activos/index.html',
  'tokenizacion-inmobiliaria/index.html',
  'tokenizacion-rwa/index.html',
  'whitepaper/index.html'
]

console.log('\n--- Comprobando 26 Documentos HTML Exportados ---')
for (const doc of EXPECTED_HTML_DOCUMENTS) {
  const fullPath = path.join(outDir, doc)
  if (fs.existsSync(fullPath)) {
    const routeName = doc === 'index.html' ? '/' : `/${doc.replace('/index.html', '')}`
    console.log(`  [✓] ${routeName} -> out/${doc}`)
  } else {
    console.error(`  [X] Documento HTML faltante: ${doc} (${fullPath})`)
    errors++
  }
}

// 3. Comprobando sitemap.xml y robots.txt (Total 28 endpoints)
console.log('\n--- Comprobando Endpoints de Indexación (2) ---')
const sitemapPath = path.join(outDir, 'sitemap.xml')
if (fs.existsSync(sitemapPath)) {
  console.log('  [✓] /sitemap.xml -> out/sitemap.xml')
} else {
  console.error('  [X] sitemap.xml no encontrado en out/')
  errors++
}

const robotsPath = path.join(outDir, 'robots.txt')
if (fs.existsSync(robotsPath)) {
  console.log('  [✓] /robots.txt -> out/robots.txt')
} else {
  console.error('  [X] robots.txt no encontrado en out/')
  errors++
}

// 4. Verificación y Reconciliación Exhaustiva de sitemap.xml
console.log('\n--- Reconciliación de sitemap.xml vs 25 Páginas Públicas Indexables ---')
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8')
  const locRegex = /<loc>(.*?)<\/loc>/gi
  const sitemapUrls = []
  let locMatch
  while ((locMatch = locRegex.exec(sitemapContent)) !== null) {
    sitemapUrls.push(locMatch[1].trim())
  }

  // Verificar duplicados en sitemap
  const urlCounts = new Map()
  for (const url of sitemapUrls) {
    urlCounts.set(url, (urlCounts.get(url) || 0) + 1)
  }
  for (const [url, count] of urlCounts.entries()) {
    if (count > 1) {
      console.error(`  [X] URL duplicada en sitemap.xml (${count} veces): ${url}`)
      errors++
    }
  }

  // 25 rutas indexables esperadas en sitemap
  const EXPECTED_SITEMAP_URLS = EXPECTED_HTML_DOCUMENTS
    .filter(doc => doc !== '_not-found/index.html')
    .map(doc => {
      if (doc === 'index.html') return 'https://lexiacode.com/'
      return `https://lexiacode.com/${doc.replace('/index.html', '')}/`
    })

  // Comprobar que _not-found NO esté en sitemap
  if (sitemapUrls.some(u => u.includes('_not-found'))) {
    console.error('  [X] La ruta técnica /_not-found está incorrectamente incluida en sitemap.xml')
    errors++
  }

  // Comprobar que todas las 25 rutas esperadas estén en el sitemap
  for (const expectedUrl of EXPECTED_SITEMAP_URLS) {
    if (!sitemapUrls.includes(expectedUrl)) {
      console.error(`  [X] URL faltante en sitemap.xml: ${expectedUrl}`)
      errors++
    }
  }

  // Comprobar que el total sea exactamente 25
  if (sitemapUrls.length !== 25) {
    console.error(`  [X] Conteo inesperado de URLs en sitemap.xml: ${sitemapUrls.length} (esperadas: 25)`)
    errors++
  } else {
    console.log(`  [✓] sitemap.xml contiene exactamente 25 URLs públicas reconciliadas (0 duplicadas, 0 no-indexables).`)
  }
}

// 5. Escaneo de seguridad (cadenas prohibidas y backend residual)
console.log('\n--- Escaneo de Seguridad e Integridad en out/ ---')

function getAllOutFiles(dir, files = []) {
  const entries = fs.readdirSync(dir)
  for (const entry of entries) {
    const full = path.join(dir, entry)
    if (fs.statSync(full).isDirectory()) {
      getAllOutFiles(full, files)
    } else {
      files.push(full)
    }
  }
  return files
}

const allOutFiles = getAllOutFiles(outDir)
const FORBIDDEN_STRINGS = ['/api/chat', 'send-email.php', 'GEMINI_API_KEY']

for (const file of allOutFiles) {
  const ext = path.extname(file)
  if (['.html', '.js', '.json', '.xml', '.txt'].includes(ext)) {
    const content = fs.readFileSync(file, 'utf-8')
    for (const forbidden of FORBIDDEN_STRINGS) {
      if (content.includes(forbidden)) {
        console.error(`  [X] Cadena prohibida '${forbidden}' encontrada en: ${path.relative(outDir, file)}`)
        errors++
      }
    }
  }
}

// 6. Análisis exhaustivo de enlaces internos, anchors y assets en los 26 HTML
console.log('\n--- Validación de Enlaces Internos, Anchors y Assets Locales ---')

function extractAttributes(html, attrName) {
  const regex = new RegExp(`${attrName}=["']([^"']+)["']`, 'gi')
  const results = []
  let match
  while ((match = regex.exec(html)) !== null) {
    results.push(match[1])
  }
  return results
}

const htmlIdCache = new Map()

function getHtmlIds(filePath) {
  if (htmlIdCache.has(filePath)) {
    return htmlIdCache.get(filePath)
  }
  const content = fs.readFileSync(filePath, 'utf-8')
  const idRegex = /(?:id|name)=["']([^"']+)["']/gi
  const ids = new Set()
  let match
  while ((match = idRegex.exec(content)) !== null) {
    ids.add(match[1])
  }
  htmlIdCache.set(filePath, ids)
  return ids
}

let checkedLinksCount = 0
let checkedAssetsCount = 0

for (const htmlDoc of EXPECTED_HTML_DOCUMENTS) {
  const filePath = path.join(outDir, htmlDoc)
  if (!fs.existsSync(filePath)) continue
  const content = fs.readFileSync(filePath, 'utf-8')
  const relSource = `out/${htmlDoc}`

  // A. Extraer y validar href
  const hrefs = extractAttributes(content, 'href')
  for (const href of hrefs) {
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('//') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('data:')
    ) {
      continue
    }

    checkedLinksCount++

    if (href === '#' || href === '' || href.startsWith('javascript:')) {
      console.error(`  [X] Enlace inválido/placeholder encontrado en ${relSource}: href="${href}"`)
      errors++
      continue
    }

    if (href.includes('#contacto') || href === '/#contacto' || href === '#contacto') {
      console.error(`  [X] Enlace a ancla obsoleta #contacto en ${relSource}: href="${href}" (debe ser /#contact)`)
      errors++
      continue
    }

    // Separar fragmento y query string
    const [rawPathWithQuery, rawAnchor] = href.split('#')
    const [rawPath] = rawPathWithQuery.split('?')

    let targetFilePath = null

    if (!rawPath || rawPath === '') {
      targetFilePath = filePath
    } else {
      const cleanPath = rawPath.startsWith('/') ? rawPath.slice(1) : rawPath

      const candidates = [
        path.join(outDir, cleanPath, 'index.html'),
        path.join(outDir, `${cleanPath}.html`),
        path.join(outDir, cleanPath),
      ]

      for (const cand of candidates) {
        if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
          targetFilePath = cand
          break
        }
      }

      if (!targetFilePath) {
        console.error(`  [X] Enlace interno roto en ${relSource}: href="${href}" -> destino no encontrado (esperado en out/${cleanPath})`)
        errors++
        continue
      }
    }

    if (rawAnchor) {
      const ids = getHtmlIds(targetFilePath)
      if (!ids.has(rawAnchor)) {
        console.error(`  [X] Anchor interno roto en ${relSource}: href="${href}" -> ID "#${rawAnchor}" no existe en ${path.relative(rootDir, targetFilePath)}`)
        errors++
      }
    }
  }

  // B. Extraer y validar src y srcset
  const srcs = extractAttributes(content, 'src')
  const srcsets = extractAttributes(content, 'srcset')

  const allAssets = [...srcs]
  for (const ss of srcsets) {
    const parts = ss.split(',').map(p => p.trim().split(/\s+/)[0]).filter(Boolean)
    allAssets.push(...parts)
  }

  for (const src of allAssets) {
    if (
      src.startsWith('http://') ||
      src.startsWith('https://') ||
      src.startsWith('//') ||
      src.startsWith('data:')
    ) {
      continue
    }

    checkedAssetsCount++
    const cleanSrc = src.startsWith('/') ? src.slice(1) : src
    const assetPath = path.join(outDir, cleanSrc.split('?')[0])

    if (!fs.existsSync(assetPath)) {
      console.error(`  [X] Asset local no encontrado referenciado en ${relSource}: src="${src}" -> no existe ${path.relative(rootDir, assetPath)}`)
      errors++
    }
  }
}

// 7. Verificación de Anchors Canónicos Requeridos
console.log('\n--- Comprobación de Anchors Canónicos Requeridos ---')
const homeIds = getHtmlIds(path.join(outDir, 'index.html'))
if (homeIds.has('contact')) {
  console.log('  [✓] Anchor canónico id="contact" presente en out/index.html')
} else {
  console.error('  [X] Anchor canónico id="contact" no encontrado en out/index.html')
  errors++
}

const sobreNosotrosIds = getHtmlIds(path.join(outDir, 'sobre-nosotros/index.html'))
if (sobreNosotrosIds.has('careers')) {
  console.log('  [✓] Anchor id="careers" presente en out/sobre-nosotros/index.html')
} else {
  console.error('  [X] Anchor id="careers" no encontrado en out/sobre-nosotros/index.html')
  errors++
}

// 8. Verificación Exacta de Metadatos SEO, Canonicals y Open Graph
console.log('\n--- Verificación Exacta de Metadatos SEO y Open Graph (Fase 4B.1) ---')
const CANONICAL_MAP = {
  'index.html': 'https://lexiacode.com/',
  'agentes-ia/index.html': 'https://lexiacode.com/agentes-ia/',
  'blog/index.html': 'https://lexiacode.com/blog/',
  'consultoria-legaltech/index.html': 'https://lexiacode.com/consultoria-legaltech/',
  'guia-tokenizacion/index.html': 'https://lexiacode.com/guia-tokenizacion/',
  'proyectos-rwa/index.html': 'https://lexiacode.com/proyectos-rwa/',
  'smart-contracts/index.html': 'https://lexiacode.com/smart-contracts/',
  'software-microsaas/index.html': 'https://lexiacode.com/software-microsaas/'
}

const seenTitles = new Set()

for (const [routeHtml, expectedCanonical] of Object.entries(CANONICAL_MAP)) {
  const full = path.join(outDir, routeHtml)
  if (!fs.existsSync(full)) {
    console.error(`  [X] Archivo HTML no encontrado: ${routeHtml}`)
    errors++
    continue
  }
  const html = fs.readFileSync(full, 'utf-8')
  const rel = `out/${routeHtml}`

  // Title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  if (!titleMatch || !titleMatch[1].trim()) {
    console.error(`  [X] Falta <title> o está vacío en ${rel}`)
    errors++
  } else {
    const title = titleMatch[1].trim()
    if (seenTitles.has(title)) {
      console.error(`  [X] Título duplicado detectado en ${rel}: "${title}"`)
      errors++
    }
    seenTitles.add(title)
  }

  // Meta description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) || html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i)
  if (!descMatch || !descMatch[1].trim()) {
    console.error(`  [X] Falta meta description en ${rel}`)
    errors++
  }

  // Canonical exacto
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i) || html.match(/<link\s+href=["']([^"']+)["']\s+rel=["']canonical["']/i)
  if (!canonicalMatch) {
    console.error(`  [X] Falta link rel="canonical" en ${rel}`)
    errors++
  } else if (canonicalMatch[1] !== expectedCanonical) {
    console.error(`  [X] Canonical incorrecto en ${rel}: obtenido "${canonicalMatch[1]}", esperado "${expectedCanonical}"`)
    errors++
  }

  // og:url exacto
  const ogUrlMatch = html.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i) || html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:url["']/i)
  if (!ogUrlMatch) {
    console.error(`  [X] Falta meta og:url en ${rel}`)
    errors++
  } else if (ogUrlMatch[1] !== expectedCanonical) {
    console.error(`  [X] og:url incorrecto en ${rel}: obtenido "${ogUrlMatch[1]}", esperado "${expectedCanonical}"`)
    errors++
  }

  // og:title
  const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) || html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:title["']/i)
  if (!ogTitleMatch || !ogTitleMatch[1].trim()) {
    console.error(`  [X] Falta meta og:title en ${rel}`)
    errors++
  }

  // og:description
  const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i) || html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:description["']/i)
  if (!ogDescMatch || !ogDescMatch[1].trim()) {
    console.error(`  [X] Falta meta og:description en ${rel}`)
    errors++
  }

  // og:image absoluta
  const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) || html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i)
  if (!ogImageMatch) {
    console.error(`  [X] Falta meta og:image en ${rel}`)
    errors++
  } else if (!ogImageMatch[1].startsWith('https://lexiacode.com/')) {
    console.error(`  [X] og:image debe ser URL absoluta bajo https://lexiacode.com/ en ${rel}: obtenido "${ogImageMatch[1]}"`)
    errors++
  }

  // twitter:card
  const twitterCardMatch = html.match(/<meta\s+name=["']twitter:card["']\s+content=["']([^"']+)["']/i) || html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']twitter:card["']/i)
  if (!twitterCardMatch || !twitterCardMatch[1].trim()) {
    console.error(`  [X] Falta meta twitter:card en ${rel}`)
    errors++
  }
}

console.log(`\n========================================`)
if (errors === 0) {
  console.log(` [PASS] Exportación estática 100% verificada:`)
  console.log(`        - 26 documentos HTML + 1 sitemap.xml + 1 robots.txt = 28 endpoints estáticos.`)
  console.log(`        - ${checkedLinksCount} enlaces internos verificados (0 rotos, 0 href="#", 0 #contacto).`)
  console.log(`        - ${checkedAssetsCount} referencias a assets locales validadas contra out/.`)
  console.log(`        - sitemap.xml reconciliado con 25 URLs indexables y canonicals exactos.`)
  console.log(`        - Metadatos SEO, Open Graph y Twitter Cards validados en las 8 rutas estratégicas.`)
  process.exit(0)
} else {
  console.error(` [FAIL] Se detectaron ${errors} problemas en la exportación estática.`)
  process.exit(1)
}
