# PROJECT_STATE — LexiaCode Website

> Fuente operativa para continuar el desarrollo sin depender del historial del chat.
>
> Última revisión arquitectónica: 2026-08-30 (UTC)
> Repositorio: https://github.com/julitodk06/lexiacode-website
> Rama activa: **fix/public-repo-hardening**
> Baseline funcional verificado: **203ca79116e09fb8533cf1970b92db20005a76ae**
> Pull request: [Draft PR #1 — fix: harden public portfolio and static export](https://github.com/julitodk06/lexiacode-website/pull/1)
> Base de comparación: **main** en **9a3210d7881be3d604fe7d48cb94d48029ca7c07**

## Estado Actual

### Alcance del repositorio

Este repositorio contiene exclusivamente el sitio público y portfolio profesional de **LexiaCode**. No contiene ni debe confundirse con un CRM, un backend de LexiaCode OS, una plataforma transaccional de tokenización, un bot de arbitraje, una custodia de activos ni un portal operativo de inversores.

La rama activa está en proceso de endurecimiento previo a merge. El PR permanece en borrador y no existe autorización para fusionarlo ni desplegarlo.

### Stack y arquitectura base

| Área | Implementación actual |
|---|---|
| Framework | Next.js 16.3.3 con App Router |
| Lenguaje | TypeScript 5.7.3 |
| UI | React 19, Tailwind CSS 4, componentes Radix UI/shadcn, Lucide |
| Tema y feedback | next-themes y Sonner |
| Renderizado | Exportación estática mediante **output: export** |
| Imágenes | Optimización de Next deshabilitada (`unoptimized: true`) para permitir exportación estática pura |
| Persistencia | No existe base de datos |
| Backend | No existe API activa ni runtime de servidor |
| Integraciones | Contacto directo por mailto (`juliov@lexiacode.com`) y WhatsApp (`+54 381 540 0016`); chatbot local determinista |
| Testing | Vitest v4 con jsdom, @testing-library/react y user-event (3 suites, 16 tests automatizados) |
| CI | GitHub Actions con Node 20 LTS: lint, typecheck, tests, build SSG, test:static, reachability audit y npm audit |
| Distribución | Artefacto estático generado en **out/** (26 documentos HTML + sitemap.xml + robots.txt = 28 endpoints estáticos) |

### Arquitectura funcional

- **app/** contiene las 26 rutas públicas del App Router (25 páginas públicas indexables + 1 página técnica `/_not-found`), layouts de servidor para inyección de metadatos SEO y el metadata institucional global en `layout.tsx`.
- **components/landing/** contiene navegación, header adaptativo con selector de idiomas y scroll suave, how-it-works con heading configurable (`asPageHeading`), y formulario de contacto accesible (`ContactSection`).
- **components/ui/** contiene componentes base accesibles y el chatbot local (`ChatbotWidget`) con diálogo semántico montado condicionalmente (`role="dialog"`), soporte de tecla Escape, restauración de foco y despacho de evento local para prellenado de contacto.
- **lib/contact-links.ts** centraliza la construcción pura y codificada de enlaces `mailto:` y WhatsApp oficiales.
- **lib/site-metadata.ts** helper centralizado con normalización automática de rutas para construcción de metadatos SEO, canonicals exactos, Open Graph y Twitter Cards.
- **lib/language-context.tsx** administra el idioma activo (`es`, `en`, `pt`), persistencia local en `localStorage["lexiacode-lang"]` y sincronización con `document.documentElement.lang`.
- **lib/translations.ts** concentra textos estructurados en español, inglés y portugués.
- **public/** contiene imágenes corporativas, diagramas, logos y `robots.txt`.
- **app/sitemap.ts** genera `sitemap.xml` estático para las 25 páginas públicas indexables.
- **scripts/test-static-export.mjs** gate de verificación post-build que analiza 28 endpoints, integridad de links/anchors (resolución contra IDs en HTML), reconciliación de sitemap vs canonicals y metadatos SEO.
- **scripts/audit-reachability.mjs** auditor estático que valida alcanzabilidad de código fuente, assets y dependencias.
- **.github/workflows/ci.yml** valida cada push a main o fix/* y cada PR hacia main.

### Módulos 100 % funcionales en el baseline analizado

| Módulo | Estado verificable |
|---|---|
| Navegación pública | 26 rutas estáticas compiladas con enlaces internos normalizados a `/#contact` y `#careers` |
| Sitio trilingüe | Español, inglés y portugués con conmutación dinámica y sincronización de `html lang` |
| Preferencia de idioma | Se conserva en localStorage bajo la clave **lexiacode-lang** con fallback determinista a `en` |
| Tema claro/oscuro | Se migraron superficies y textos a tokens semánticos compatibles con temas claro y oscuro. No se realizó una certificación WCAG completa ni una medición automatizada exhaustiva de contraste. |
| Chatbot orientativo | Totalmente determinista, no renderizado en DOM cuando está cerrado, accesible por teclado (Escape), con deslinde legal explícito y cero llamadas fetch |
| Formulario de contacto | Formulario accesible con labels asociados vía `htmlFor`/`id`, prellenado React desde chatbot, aviso transparente de apertura de cliente de correo y cero fetch |
| Canales oficiales | WhatsApp oficial (`+54 381 540 0016`), LinkedIn oficial y GitHub oficial (Twitter/X eliminado por inexistencia de perfil institucional) |
| SEO & Open Graph | Metadata global disponible para todo el sitio y metadata diferenciada verificada para home y siete rutas estratégicas |
| Exportación estática | Build exitoso con 26 HTML (25 indexables + `/_not-found`) + sitemap.xml + robots.txt = 28 endpoints estáticos en `out/` |
| Testing automatizado | 16 tests unitarios e integrados (100% pasando sin dependencias de red) |
| Seguridad de dependencias | npm audit reporta 0 vulnerabilidades |

### Rutas compiladas (28 endpoints estáticos)

1. `/` (Home)
2. `/_not-found` (Página técnica de error)
3. `/agentes-ia`
4. `/blog`
5. `/como-funciona`
6. `/compliance`
7. `/consultoria-legaltech`
8. `/descargo-de-responsabilidad`
9. `/documentacion`
10. `/erc-3643`
11. `/faq`
12. `/guia-tokenizacion`
13. `/mercado-secundario`
14. `/politica-de-privacidad`
15. `/proyectos-rwa`
16. `/security-tokens`
17. `/seguridad`
18. `/servicios`
19. `/smart-contracts`
20. `/sobre-nosotros`
21. `/software-microsaas`
22. `/terminos-de-servicio`
23. `/tokenizacion-de-activos`
24. `/tokenizacion-inmobiliaria`
25. `/tokenizacion-rwa`
26. `/whitepaper`
27. `/sitemap.xml` (25 URLs indexables)
28. `/robots.txt`

## Contratos e Interfaces

### Contrato de ejecución

1. El proyecto debe continuar siendo un sitio **100 % exportable de forma estática**.
2. No se deben agregar Route Handlers, Server Actions, bases de datos ni dependencias de runtime servidor.
3. El comando de producción válido es **npm run build**, que genera el directorio **out/**.
4. El repositorio debe poder reconstruirse desde un clon limpio con **npm ci**.
5. **package-lock.json** debe permanecer sincronizado con **package.json**.
6. Queda terminantemente prohibida la reintroducción de **GEMINI_API_KEY**, **/api/chat**, **send-email.php** o falsos endpoints de backend.

### Contratos de navegación pública

- Los enlaces internos deben resolverse con **next/link** o **next/navigation**.
- El ancla canónica de contacto es estrictamente **/#contact** (correspondiente a `<section id="contact">`). Queda prohibido el uso de `/#contacto` o `#contacto`.
- El ancla institucional de talento es **#careers** en `/sobre-nosotros/`.
- No deben existir enlaces placeholder vacíos (`href="#"`, `href=""` o `javascript:`).
- Los enlaces externos a redes sociales y mensajería deben incluir `target="_blank"` y `rel="noopener noreferrer"`. Enlaces autorizados: LinkedIn oficial, GitHub oficial y WhatsApp oficial.

### Contrato de idiomas

- Tipo principal: **Language**, con valores soportados **es**, **en** y **pt**.
- Contexto: **LanguageContext**.
- Persistencia: **localStorage["lexiacode-lang"]**.
- Sincronización con DOM: `document.documentElement.lang` refleja el idioma activo.
- Las claves de traducción utilizadas por componentes alcanzables existen en los tres idiomas.

## Reconciliación de Inventario Reproducible

Ejecutado mediante `scripts/audit-reachability.mjs`:

```
Framework Entrypoints en app/ (35):
  - 26 app/**/page.tsx
  - 8 app/**/layout.tsx (incluyendo RootLayout y 7 layouts de metadatos SEO)
  - 1 app/sitemap.ts

Config Entrypoints en raíz (4):
  - next.config.mjs
  - postcss.config.mjs
  - eslint.config.mjs
  - components.json

--- Reconciliación de Módulos de Código Fuente ---
  sourceModulesTotal: 55
  reachableSourceModules: 55
  unreachableSourceModules: 0
  Ecuación: 55 = 55 + 0 -> VERIFICADA [✓]

--- Reconciliación de Archivos Estáticos (public/) ---
  totalPublicAssets: 25
  referencedPublicAssets: 25
  unreferencedPublicAssets: 0
  Ecuación: 25 = 25 + 0 -> VERIFICADA [✓]

--- Reconciliación de Dependencias de Producción ---
  declaredProductionDependencies: 12
  directlyImported: 10
  indirectlyRequired: 2 (react-dom, autoprefixer)
  unreferencedCandidates: 0
  Ecuación: 12 = 10 + 2 + 0 -> VERIFICADA [✓]
```

## Roadmap de Fases Atómicas

### FASE 1 — Cierre de calidad del PR #1 [✓ COMPLETADA]
- Corrección de ESLint, TypeScript, CI workflow y documentación base.

### FASE 2A / 2A.1 — Inventario reproducible de alcanzabilidad [✓ COMPLETADA]
- Construcción del script determinista `scripts/audit-reachability.mjs` e informe `docs/PHASE_2A_REACHABILITY_AUDIT.md`.

### FASE 2B.1 — Poda de secciones landing obsoletas [✓ COMPLETADA]
- Eliminación de 11 módulos huérfanos confirmados (10 secciones obsoletas + `styles/globals.css`).

### FASE 2B.2 — Poda de componentes UI no alcanzables [✓ COMPLETADA]
- Eliminación de 53 componentes UI no utilizados y 2 hooks huérfanos.

### FASE 2B.3 — Poda de assets estáticos huérfanos [✓ COMPLETADA]
- Eliminación de 28 assets huérfanos en `public/` preservando `robots.txt` y los 25 activos.

### FASE 2B.4 — Poda de dependencias no utilizadas [✓ COMPLETADA]
- Desinstalación de 37 dependencias no utilizadas en `package.json`.

### FASE 3 — Cobertura automatizada mínima [✓ COMPLETADA]
- Creación del entorno de test con Vitest, jsdom, testing-library y gate de exportación estática.

### FASE 3.1 — Corrección de gates y regresiones detectadas [✓ COMPLETADA]
- Normalización canónica de anclas a `/#contact`.
- Eliminación de Twitter/X y enlaces `href="#"` en footer; inclusión de LinkedIn oficial y GitHub.
- Creación de `lib/contact-links.ts` con funciones puras `buildMailtoUrl` y `buildWhatsAppUrl`.
- Endurecimiento de accesibilidad en `ContactSection` y `ChatbotWidget` (roles, Escape key, foco).
- Suite de pruebas ampliada a 15 tests automatizados (100% pasando).
- Endurecimiento de `scripts/test-static-export.mjs` con validación de links, anchors y assets locales en `out/`.
- Documentado en `docs/PHASE_3_TEST_REPORT.md`.

### FASE 4A — Auditoría estática de accesibilidad, SEO y contenido [✓ COMPLETADA]
- Auditoría de solo lectura documentada en `docs/PHASE_4A_ACCESSIBILITY_SEO_CONTENT_AUDIT.md`.

### FASE 4B — Corrección de accesibilidad, SEO y contenido [✓ COMPLETADA]
- Inclusión de `asPageHeading?: boolean` en `HowItWorks` y `app/como-funciona/page.tsx` para garantizar un único `<h1>`.
- Migración integral de `/sobre-nosotros` a tokens semánticos adaptativos.
- Inyección de metadatos SEO globales en `app/layout.tsx` (`metadataBase`, canonicals, OG, Twitter).
- Creación de `lib/site-metadata.ts` y 7 layouts de servidor (`layout.tsx`) para páginas cliente.
- Refuerzo de claims institucionales defendibles (iniciativa minera con valuación de referencia de ~USD 100M del activo subyacente analizado, estudio de producto/tecnología y perfil profesional).
- Validación de metadatos SEO en `scripts/test-static-export.mjs`.
- Documentado en `docs/PHASE_4B_CORRECTION_REPORT.md`.

### FASE 4B.1 — Cierre de residuos de accesibilidad, SEO y documentación [✓ COMPLETADA]
- Desmontaje total del diálogo del chatbot cuando `isOpen === false` (cero descendientes enfocables).
- Sincronización del prellenado React en `ContactSection` vía evento customizado y selectores semánticos (`#contact-company`, `#contact-message`).
- Normalización canónica en `lib/site-metadata.ts` con trailing slashes uniformes e imagen Open Graph verificada (`1672x941`).
- Reconciliación estricta de `sitemap.xml` con 25 URLs indexables y exclusión de `/_not-found`.
- Suite ampliada a 16 tests automatizados (100% pasando).
- Documentado en `docs/PHASE_4B_1_RESIDUAL_FIX_REPORT.md`.

### FASE 5A — Auditoría de gobierno y preparación del plan del PR [✓ COMPLETADA — SOLO LECTURA]
- Inspección de configuración del repositorio, estado del PR #1 y checks de CI.
- Detección de rama `main` sin reglas de protección configuradas.
- Elaboración de propuesta de protección adaptada a proyecto single-maintainer sin bloqueo operativo.
- Comparativa técnica de estrategias de merge (Squash Merge vs Merge Commit vs Rebase).
- Plan de release estático con tags semánticos y estrategia de rollback basada en redeploy de artefactos `out/`.
- Documentado en `docs/PHASE_5A_GOVERNANCE_READINESS.md`.

---

## Próxima Tarea Pendiente

La próxima unidad de trabajo es:

**FASE 5B — Decisión autorizada sobre protección, estado Ready y estrategia de merge**

*Nota: La ejecución de la FASE 5B permanece supeditada a autorización explícita de Julio. La FASE 6 (Despliegue y publicación en producción) permanece pendiente y sin desplegar.*

## Prompt exacto para iniciar la primera tarea

~~~text
Actúa como Lead Architect y ejecuta exclusivamente la tarea “FASE 5B — Decisión autorizada sobre protección, estado Ready y estrategia de merge” en el repositorio julitodk06/lexiacode-website previa autorización explícita.
~~~
