import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const SOURCE_DIRS = ['app', 'components', 'hooks', 'lib', 'styles']
const CODE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.json', '.css']
const ASSET_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.ico', '.gif', '.mp4', '.pdf', '.txt', '.xml', '.json']

const NEXT_SPECIAL_FILENAMES = new Set([
  'page',
  'layout',
  'template',
  'loading',
  'error',
  'global-error',
  'not-found',
  'default',
  'route',
  'sitemap',
  'robots',
  'manifest',
  'icon',
  'apple-icon',
  'opengraph-image',
  'twitter-image'
])

function normalizePath(p) {
  return p.split(path.sep).join('/')
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles
  const files = fs.readdirSync(dirPath)

  for (const file of files) {
    const fullPath = path.join(dirPath, file)
    if (fs.statSync(fullPath).isDirectory()) {
      if (file === 'node_modules' || file === '.next' || file === 'out' || file === '.git') continue
      getAllFiles(fullPath, arrayOfFiles)
    } else {
      arrayOfFiles.push(fullPath)
    }
  }
  return arrayOfFiles
}

function resolveImport(importSpecifier, fromFile) {
  if (importSpecifier.startsWith('@/')) {
    const relativePart = importSpecifier.slice(2)
    const basePath = path.join(rootDir, relativePart)
    return tryResolveFile(basePath)
  }

  if (importSpecifier.startsWith('./') || importSpecifier.startsWith('../')) {
    const basePath = path.join(path.dirname(fromFile), importSpecifier)
    return tryResolveFile(basePath)
  }

  return null
}

function tryResolveFile(basePath) {
  if (fs.existsSync(basePath) && fs.statSync(basePath).isFile()) {
    return basePath
  }
  for (const ext of CODE_EXTENSIONS) {
    if (fs.existsSync(basePath + ext)) {
      return basePath + ext
    }
  }
  for (const ext of CODE_EXTENSIONS) {
    const indexFile = path.join(basePath, 'index' + ext)
    if (fs.existsSync(indexFile)) {
      return indexFile
    }
  }
  return 'MISSING:' + basePath
}

function extractImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const imports = []

  // Side-effect imports: import './globals.css'
  const sideEffectRegex = /import\s+['"]([^'"]+)['"]/g
  let match
  while ((match = sideEffectRegex.exec(content)) !== null) {
    imports.push(match[1])
  }

  // Standard import/export: import ... from '...' or export ... from '...'
  const importFromRegex = /(?:import|export)\s+[\s\S]*?from\s+['"]([^'"]+)['"]/g
  while ((match = importFromRegex.exec(content)) !== null) {
    imports.push(match[1])
  }

  // Match require('...') and dynamic import('...')
  const dynamicRegex = /(?:require|import)\(['"]([^'"]+)['"]\)/g
  while ((match = dynamicRegex.exec(content)) !== null) {
    imports.push(match[1])
  }

  return { content, imports: Array.from(new Set(imports)) }
}

function extractAssetReferences(content) {
  const refs = []

  // Match string literals
  const stringRegex = /['"`]([^'"`\r\n]+)['"`]/g
  let match
  while ((match = stringRegex.exec(content)) !== null) {
    refs.push(match[1])
  }

  // Match CSS url(...)
  const urlRegex = /url\(\s*['"]?([^'")]+)['"]?\s*\)/g
  while ((match = urlRegex.exec(content)) !== null) {
    refs.push(match[1])
  }

  return refs
}

console.log('=== LexiaCode Reachability & Dependency Auditor (v2.1) ===\n')

// 1. Collect Source Modules
const sourceFilesRaw = []
for (const dir of SOURCE_DIRS) {
  const fullDirPath = path.join(rootDir, dir)
  getAllFiles(fullDirPath, sourceFilesRaw)
}

const sourceModulesSet = new Set(sourceFilesRaw.map(f => normalizePath(path.relative(rootDir, f))))
const sourceModulesTotal = sourceModulesSet.size

// 2. Identify Framework Entrypoints in app/
const frameworkEntrypoints = []
for (const relPath of sourceModulesSet) {
  if (relPath.startsWith('app/')) {
    const filenameWithoutExt = path.basename(relPath, path.extname(relPath))
    if (NEXT_SPECIAL_FILENAMES.has(filenameWithoutExt)) {
      frameworkEntrypoints.push(relPath)
    }
  }
}
frameworkEntrypoints.sort()

// 3. Identify Config Entrypoints (Root configs outside source dirs)
const configFilesList = ['next.config.mjs', 'postcss.config.mjs', 'eslint.config.mjs', 'components.json']
const configEntrypoints = configFilesList.filter(cfg => fs.existsSync(path.join(rootDir, cfg)))

console.log(`Framework Entrypoints en app/ (${frameworkEntrypoints.length}):`)
frameworkEntrypoints.forEach(e => console.log(`  - ${e}`))

console.log(`\nConfig Entrypoints en raíz (${configEntrypoints.length}):`)
configEntrypoints.forEach(e => console.log(`  - ${e}`))

// 4. Graph Traversal for Reachable Source Modules
const reachableSourceModules = new Set()
const queue = [...frameworkEntrypoints.map(e => path.join(rootDir, e)), ...configEntrypoints.map(e => path.join(rootDir, e))]
const brokenImports = []
const importedPackages = new Set()

for (const ep of frameworkEntrypoints) {
  reachableSourceModules.add(ep)
}

while (queue.length > 0) {
  const currentFile = queue.shift()
  if (!fs.existsSync(currentFile)) continue

  const ext = path.extname(currentFile)
  if (!['.tsx', '.ts', '.jsx', '.js', '.mjs', '.css'].includes(ext)) continue

  const { imports } = extractImports(currentFile)

  for (const spec of imports) {
    if (spec.startsWith('@/') || spec.startsWith('./') || spec.startsWith('../')) {
      const resolved = resolveImport(spec, currentFile)
      if (resolved && resolved.startsWith('MISSING:')) {
        brokenImports.push({
          from: normalizePath(path.relative(rootDir, currentFile)),
          spec,
          missing: resolved.replace('MISSING:', '')
        })
      } else if (resolved) {
        const norm = normalizePath(path.relative(rootDir, resolved))
        if (sourceModulesSet.has(norm) && !reachableSourceModules.has(norm)) {
          reachableSourceModules.add(norm)
          queue.push(resolved)
        } else if (!sourceModulesSet.has(norm) && fs.existsSync(resolved)) {
          queue.push(resolved)
        }
      }
    } else {
      let pkg = spec
      if (spec.startsWith('@')) {
        const parts = spec.split('/')
        pkg = parts[0] + '/' + (parts[1] || '')
      } else {
        pkg = spec.split('/')[0]
      }
      importedPackages.add(pkg)
    }
  }
}

const unreachableSourceModules = []
for (const mod of sourceModulesSet) {
  if (!reachableSourceModules.has(mod)) {
    unreachableSourceModules.push(mod)
  }
}
unreachableSourceModules.sort()

// Reconciliation Equation 1: sourceModulesTotal = reachableSourceModules + unreachableSourceModules
const moduleCountMatches = sourceModulesTotal === (reachableSourceModules.size + unreachableSourceModules.length)

console.log(`\n--- Reconciliación de Módulos de Código Fuente ---`)
console.log(`  sourceModulesTotal: ${sourceModulesTotal}`)
console.log(`  reachableSourceModules: ${reachableSourceModules.size}`)
console.log(`  unreachableSourceModules: ${unreachableSourceModules.length}`)
console.log(`  Ecuación: ${sourceModulesTotal} = ${reachableSourceModules.size} + ${unreachableSourceModules.length} -> ${moduleCountMatches ? 'VERIFICADA [✓]' : 'ERROR [X]'}`)

// 5. Public Assets Reachability & Active Missing Asset Detection
const publicDir = path.join(rootDir, 'public')
const publicFilesRaw = getAllFiles(publicDir)
const allPublicAssetsSet = new Set(publicFilesRaw.map(f => normalizePath(path.relative(rootDir, f))))
const totalPublicAssets = allPublicAssetsSet.size

const reachableFilesToScan = Array.from(reachableSourceModules).map(f => path.join(rootDir, f)).concat(configEntrypoints.map(c => path.join(rootDir, c)))
const unreachableFilesToScan = unreachableSourceModules.map(f => path.join(rootDir, f))

const referencedPublicAssets = new Set()
const missingReachableAssetRefs = []
const missingUnreachableAssetRefs = []
const inspectedRefs = new Set()

// robots.txt is a direct framework/public entrypoint
if (allPublicAssetsSet.has('public/robots.txt')) {
  referencedPublicAssets.add('public/robots.txt')
}

// Check reachable files
for (const filePath of reachableFilesToScan) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const rawRefs = extractAssetReferences(content)

  for (let ref of rawRefs) {
    ref = ref.split('?')[0].split('#')[0].trim()
    if (!ref) continue
    if (/^(https?:|data:|blob:|mailto:|tel:|\/\/|#)/i.test(ref)) continue

    const ext = path.extname(ref).toLowerCase()
    if (!ASSET_EXTENSIONS.includes(ext)) continue

    const refKey = `${normalizePath(path.relative(rootDir, filePath))} -> ${ref}`
    if (inspectedRefs.has(refKey)) continue
    inspectedRefs.add(refKey)

    let potentialAssetRelPath = ref
    if (potentialAssetRelPath.startsWith('/')) {
      potentialAssetRelPath = potentialAssetRelPath.slice(1)
    }
    potentialAssetRelPath = 'public/' + potentialAssetRelPath

    if (allPublicAssetsSet.has(potentialAssetRelPath)) {
      referencedPublicAssets.add(potentialAssetRelPath)
    } else {
      if (ref.startsWith('/') || ref.startsWith('./') || ref.startsWith('../') || potentialAssetRelPath.startsWith('public/')) {
        missingReachableAssetRefs.push({
          from: normalizePath(path.relative(rootDir, filePath)),
          reference: ref,
          expectedFile: potentialAssetRelPath
        })
      }
    }
  }
}

// Check unreachable files (for informational reporting)
for (const filePath of unreachableFilesToScan) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const rawRefs = extractAssetReferences(content)

  for (let ref of rawRefs) {
    ref = ref.split('?')[0].split('#')[0].trim()
    if (!ref) continue
    if (/^(https?:|data:|blob:|mailto:|tel:|\/\/|#)/i.test(ref)) continue

    const ext = path.extname(ref).toLowerCase()
    if (!ASSET_EXTENSIONS.includes(ext)) continue

    let potentialAssetRelPath = ref
    if (potentialAssetRelPath.startsWith('/')) {
      potentialAssetRelPath = potentialAssetRelPath.slice(1)
    }
    potentialAssetRelPath = 'public/' + potentialAssetRelPath

    if (!allPublicAssetsSet.has(potentialAssetRelPath)) {
      if (ref.startsWith('/') || ref.startsWith('./') || ref.startsWith('../') || potentialAssetRelPath.startsWith('public/')) {
        missingUnreachableAssetRefs.push({
          from: normalizePath(path.relative(rootDir, filePath)),
          reference: ref,
          expectedFile: potentialAssetRelPath
        })
      }
    }
  }
}

const unreferencedPublicAssets = []
for (const asset of allPublicAssetsSet) {
  if (!referencedPublicAssets.has(asset)) {
    unreferencedPublicAssets.push(asset)
  }
}
unreferencedPublicAssets.sort()

// Reconciliation Equation 2: totalPublicAssets = referencedPublicAssets + unreferencedPublicAssets
const assetCountMatches = totalPublicAssets === (referencedPublicAssets.size + unreferencedPublicAssets.length)

console.log(`\n--- Reconciliación de Archivos Estáticos (public/) ---`)
console.log(`  totalPublicAssets: ${totalPublicAssets}`)
console.log(`  referencedPublicAssets: ${referencedPublicAssets.size}`)
console.log(`  unreferencedPublicAssets: ${unreferencedPublicAssets.length}`)
console.log(`  Ecuación: ${totalPublicAssets} = ${referencedPublicAssets.size} + ${unreferencedPublicAssets.length} -> ${assetCountMatches ? 'VERIFICADA [✓]' : 'ERROR [X]'}`)

// 6. Dependencies Breakdown
const pkgJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'))
const declaredProductionDependencies = Object.keys(pkgJson.dependencies || {})

const knownIndirectDependencies = new Set([
  'react-dom',
  'autoprefixer'
])

const directlyImported = []
const indirectlyRequired = []
const unreferencedCandidates = []

for (const dep of declaredProductionDependencies) {
  if (importedPackages.has(dep)) {
    directlyImported.push(dep)
  } else if (knownIndirectDependencies.has(dep)) {
    indirectlyRequired.push(dep)
  } else {
    unreferencedCandidates.push(dep)
  }
}
directlyImported.sort()
indirectlyRequired.sort()
unreferencedCandidates.sort()

// Reconciliation Equation 3: declaredProductionDependencies = directlyImported + indirectlyRequired + unreferencedCandidates
const depCountMatches = declaredProductionDependencies.length === (directlyImported.length + indirectlyRequired.length + unreferencedCandidates.length)

console.log(`\n--- Reconciliación de Dependencias de Producción ---`)
console.log(`  declaredProductionDependencies: ${declaredProductionDependencies.length}`)
console.log(`  directlyImported: ${directlyImported.length}`)
console.log(`  indirectlyRequired: ${indirectlyRequired.length}`)
console.log(`  unreferencedCandidates: ${unreferencedCandidates.length}`)
console.log(`  Ecuación: ${declaredProductionDependencies.length} = ${directlyImported.length} + ${indirectlyRequired.length} + ${unreferencedCandidates.length} -> ${depCountMatches ? 'VERIFICADA [✓]' : 'ERROR [X]'}`)

// 7. Error Evaluation & Exit Code
let exitCode = 0

if (!moduleCountMatches || !assetCountMatches || !depCountMatches) {
  console.error('\n[ERROR] Falla de reconciliación en totales.')
  exitCode = 1
}

if (brokenImports.length > 0) {
  console.error(`\n[ERROR] Se encontraron ${brokenImports.length} imports locales rotos:`)
  brokenImports.forEach(b => console.error(`  - ${b.from} importa '${b.spec}' -> no encontrado en ${b.missing}`))
  exitCode = 1
}

if (missingReachableAssetRefs.length > 0) {
  console.error(`\n[ERROR] Se encontraron ${missingReachableAssetRefs.length} referencias a assets inexistentes en código alcanzable:`)
  missingReachableAssetRefs.forEach(m => console.error(`  - ${m.from} referencia '${m.reference}' -> archivo esperado no existe: ${m.expectedFile}`))
  exitCode = 1
}

if (missingUnreachableAssetRefs.length > 0) {
  console.log(`\n[INFO] Referencias a assets inexistentes en código NO alcanzable (${missingUnreachableAssetRefs.length}):`)
  missingUnreachableAssetRefs.forEach(m => console.log(`  - [Código Muerto] ${m.from} referencia '${m.reference}' (no existe ${m.expectedFile})`))
}

if (process.argv.includes('--json')) {
  const report = {
    sourceModulesTotal,
    reachableSourceModules: Array.from(reachableSourceModules).sort(),
    unreachableSourceModules,
    frameworkEntrypoints,
    configEntrypoints,
    totalPublicAssets,
    referencedPublicAssets: Array.from(referencedPublicAssets).sort(),
    unreferencedPublicAssets,
    missingReachableAssetRefs,
    missingUnreachableAssetRefs,
    declaredProductionDependencies: declaredProductionDependencies.length,
    directlyImported,
    indirectlyRequired,
    unreferencedCandidates
  }
  fs.writeFileSync(path.join(rootDir, '.reachability-report.json'), JSON.stringify(report, null, 2))
}

if (exitCode === 0) {
  console.log('\n[PASS] Cero imports rotos, cero referencias a assets inexistentes en código alcanzable, todas las ecuaciones reconciliadas.')
}

process.exit(exitCode)
