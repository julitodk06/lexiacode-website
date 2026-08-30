import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.json', '.css']
const SOURCE_DIRS = ['app', 'components', 'hooks', 'lib', 'styles']

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

function normalizePath(p) {
  return p.split(path.sep).join('/')
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

  return null // External package or unhandled
}

function tryResolveFile(basePath) {
  if (fs.existsSync(basePath) && fs.statSync(basePath).isFile()) {
    return basePath
  }
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(basePath + ext)) {
      return basePath + ext
    }
  }
  for (const ext of EXTENSIONS) {
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
  
  // Side-effect imports: import './globals.css' or import "styles.css"
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

console.log('=== LexiaCode Reachability & Dependency Auditor ===\n')

// 1. Gather all source files
const sourceFiles = []
for (const dir of SOURCE_DIRS) {
  const fullDirPath = path.join(rootDir, dir)
  getAllFiles(fullDirPath, sourceFiles)
}

const allModulesNormalized = new Set(sourceFiles.map(f => normalizePath(path.relative(rootDir, f))))

// 2. Identify entrypoints
const entrypoints = []
for (const relPath of allModulesNormalized) {
  if (relPath.startsWith('app/') && (relPath.endsWith('/page.tsx') || relPath.endsWith('/page.ts') || relPath.endsWith('/page.jsx') || relPath.endsWith('/page.js'))) {
    entrypoints.push(relPath)
  } else if (relPath === 'app/layout.tsx' || relPath === 'app/layout.js' || relPath === 'app/sitemap.ts' || relPath === 'app/robots.ts' || relPath === 'app/not-found.tsx') {
    entrypoints.push(relPath)
  }
}

// Config files as entrypoints
const configFiles = ['next.config.mjs', 'postcss.config.mjs', 'eslint.config.mjs', 'components.json']
for (const cfg of configFiles) {
  if (fs.existsSync(path.join(rootDir, cfg))) {
    entrypoints.push(cfg)
  }
}

console.log(`Identified ${entrypoints.length} entrypoints:`)
entrypoints.forEach(e => console.log(`  - ${e}`))

// 3. Traverse reachable graph
const reachable = new Set()
const queue = [...entrypoints.map(e => path.join(rootDir, e))]
const brokenImports = []
const importedPackages = new Set()

for (const ep of queue) {
  if (fs.existsSync(ep)) {
    reachable.add(normalizePath(path.relative(rootDir, ep)))
  }
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
        brokenImports.push({ from: normalizePath(path.relative(rootDir, currentFile)), spec, missing: resolved.replace('MISSING:', '') })
      } else if (resolved) {
        const norm = normalizePath(path.relative(rootDir, resolved))
        if (!reachable.has(norm)) {
          reachable.add(norm)
          queue.push(resolved)
        }
      }
    } else {
      let pkg = spec
      if (spec.startsWith('@')) {
        const parts = spec.split('/')
        pkg = parts[0] + '/' + parts[1]
      } else {
        pkg = spec.split('/')[0]
      }
      importedPackages.add(pkg)
    }
  }
}

const unreachableModules = []
for (const mod of allModulesNormalized) {
  if (!reachable.has(mod)) {
    unreachableModules.push(mod)
  }
}

console.log(`\nModules Summary:`)
console.log(`  Total Modules: ${allModulesNormalized.size}`)
console.log(`  Reachable Modules: ${reachable.size}`)
console.log(`  Unreachable Candidates: ${unreachableModules.length}`)

// 4. Asset Analysis in public/
const publicDir = path.join(rootDir, 'public')
const allPublicAssets = getAllFiles(publicDir).map(f => normalizePath(path.relative(rootDir, f)))
const allSourceCode = sourceFiles.concat(configFiles.map(c => path.join(rootDir, c))).filter(f => fs.existsSync(f))

const referencedAssets = new Set()
const missingAssetRefs = []

// Extract all string literals from source files to check for asset references
for (const file of allSourceCode) {
  const content = fs.readFileSync(file, 'utf-8')
  for (const asset of allPublicAssets) {
    const assetRelToPublic = asset.replace(/^public\//, '')
    const exactRef = '/' + assetRelToPublic

    if (content.includes(exactRef) || content.includes(assetRelToPublic)) {
      referencedAssets.add(asset)
    }
  }
}

const unreferencedAssets = []
for (const asset of allPublicAssets) {
  if (!referencedAssets.has(asset)) {
    unreferencedAssets.push(asset)
  }
}

console.log(`\nAssets Summary:`)
console.log(`  Total Public Assets: ${allPublicAssets.length}`)
console.log(`  Referenced Assets: ${referencedAssets.size}`)
console.log(`  Unreferenced Candidates: ${unreferencedAssets.length}`)

// 5. Dependency Analysis
const pkgJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'))
const declaredDependencies = Object.keys(pkgJson.dependencies || {})
const declaredDevDependencies = Object.keys(pkgJson.devDependencies || {})

// Known indirect / framework / config dependencies
const knownIndirectDependencies = new Set([
  'react-dom', // required peer for react/next
  'next',
  'react',
  'autoprefixer',
  'postcss',
  'tailwindcss',
  '@tailwindcss/postcss',
  'tw-animate-css',
  'typescript',
  '@types/node',
  '@types/react',
  '@types/react-dom',
  'eslint',
  'eslint-config-next',
  '@eslint/eslintrc'
])

const directlyImported = []
const indirectlyRequired = []
const unreferencedPackages = []

for (const dep of declaredDependencies) {
  if (importedPackages.has(dep)) {
    directlyImported.push(dep)
  } else if (knownIndirectDependencies.has(dep)) {
    indirectlyRequired.push(dep)
  } else {
    unreferencedPackages.push(dep)
  }
}

console.log(`\nDependencies Summary:`)
console.log(`  Declared Production Dependencies: ${declaredDependencies.length}`)
console.log(`  Directly Imported: ${directlyImported.length}`)
console.log(`  Indirectly Required: ${indirectlyRequired.length}`)
console.log(`  Unreferenced Candidates: ${unreferencedPackages.length}`)

// 6. Detailed output if --verbose or --json
if (process.argv.includes('--json')) {
  const result = {
    totalModules: allModulesNormalized.size,
    reachableModules: reachable.size,
    unreachableModules,
    entrypoints,
    totalPublicAssets: allPublicAssets.length,
    referencedAssets: Array.from(referencedAssets),
    unreferencedAssets,
    declaredDependenciesCount: declaredDependencies.length,
    directlyImported,
    indirectlyRequired,
    unreferencedPackages
  }
  fs.writeFileSync(path.join(rootDir, '.reachability-report.json'), JSON.stringify(result, null, 2))
  console.log('Saved .reachability-report.json')
}

// 7. Validation Errors Check
let exitCode = 0
if (brokenImports.length > 0) {
  console.error(`\n[ERROR] Found ${brokenImports.length} broken local imports:`)
  brokenImports.forEach(b => console.error(`  - ${b.from} imports '${b.spec}' -> ${b.missing}`))
  exitCode = 1
}

if (missingAssetRefs.length > 0) {
  console.error(`\n[ERROR] Found ${missingAssetRefs.length} missing asset references:`)
  missingAssetRefs.forEach(m => console.error(`  - ${m}`))
  exitCode = 1
}

if (exitCode === 0) {
  console.log('\n[PASS] 0 broken imports, 0 missing referenced assets.')
}

process.exit(exitCode)
