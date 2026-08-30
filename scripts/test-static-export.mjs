import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const outDir = path.join(rootDir, 'out')

console.log('=== LexiaCode Static Export Verification Gate ===\n')

let errors = 0

// 1. Verify existence of out/
if (!fs.existsSync(outDir)) {
  console.error('[FAIL] El directorio out/ no existe. Ejecuta `npm run build` primero.')
  process.exit(1)
}
console.log('[PASS] Directorio out/ presente.')

// 2. The 28 expected static routes
const EXPECTED_ROUTES = [
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

console.log('\n--- Comprobando Rutas Estáticas ---')
for (const route of EXPECTED_ROUTES) {
  const fullPath = path.join(outDir, route)
  if (fs.existsSync(fullPath)) {
    console.log(`  [✓] /${route.replace('/index.html', '').replace('index.html', '')}`)
  } else {
    console.error(`  [X] Ruta faltante: ${route} (${fullPath})`)
    errors++
  }
}

// 3. Comprobando sitemap.xml y robots.txt
console.log('\n--- Comprobando Endpoints de Indexación ---')
if (fs.existsSync(path.join(outDir, 'sitemap.xml'))) {
  console.log('  [✓] sitemap.xml generado correctamente')
} else {
  console.error('  [X] sitemap.xml no encontrado en out/')
  errors++
}

if (fs.existsSync(path.join(outDir, 'robots.txt'))) {
  console.log('  [✓] robots.txt exportado correctamente')
} else {
  console.error('  [X] robots.txt no encontrado en out/')
  errors++
}

// 4. Buscar cadenas prohibidas o backend residuales en todos los archivos de out/
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

// 5. Verificar ancla de contacto en home
const homeHtml = fs.readFileSync(path.join(outDir, 'index.html'), 'utf-8')
if (homeHtml.includes('id="contact"') || homeHtml.includes('id="contacto"')) {
  console.log('  [✓] Ancla de contacto /#contact presente en HTML exportado')
} else {
  console.error('  [X] Ancla de contacto no encontrada en index.html')
  errors++
}

console.log(`\n========================================`)
if (errors === 0) {
  console.log(' [PASS] Exportación estática 100% válida y libre de dependencias de servidor.')
  process.exit(0)
} else {
  console.error(` [FAIL] Se detectaron ${errors} problemas en la exportación estática.`)
  process.exit(1)
}
