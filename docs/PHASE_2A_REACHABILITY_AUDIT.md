# PHASE 2A: Reachability & Dependency Audit Report

**Fecha de auditoría:** 2026-08-30  
**Repositorio:** `julitodk06/lexiacode-website`  
**Rama:** `fix/public-repo-hardening`  
**SHA analizado:** `b20522be91df6e6b01a250d8407cd1d5ff1d4875`  
**Estado:** `INVENTARIO REPRODUCIBLE COMPLETADO — CERO ELIMINACIONES REALIZADAS`  

---

## 1. Resumen Ejecutivo

Este documento establece el inventario reproducible de código fuente, archivos estáticos públicos y dependencias de `package.json` para la preparación de la futura **FASE 2B (Poda segura)**.

> ⚠️ **Declaración de Seguridad:** En esta Fase 2A **NO** se eliminó, renombró ni modificó ningún componente funcional, asset ni dependencia del proyecto. Todos los elementos identificados son candidatos bajo revisión.

| Categoría | Total Detectado | Alcanzable / En Uso | Candidatos No Referenciados |
|---|---|---|---|
| **Módulos de Código Fuente** (`app`, `components`, `hooks`, `lib`, `styles`) | 112 | 49 | 67 |
| **Archivos Estáticos Públicos** (`public/`) | 53 | 28 | 25 |
| **Dependencias de Producción** (`dependencies`) | 49 | 12 (10 directas + 2 indirectas) | 37 |

---

## 2. Entrypoints del Sistema Analizados (31)

- `app/agentes-ia/page.tsx`
- `app/blog/page.tsx`
- `app/como-funciona/page.tsx`
- `app/compliance/page.tsx`
- `app/consultoria-legaltech/page.tsx`
- `app/descargo-de-responsabilidad/page.tsx`
- `app/documentacion/page.tsx`
- `app/erc-3643/page.tsx`
- `app/faq/page.tsx`
- `app/guia-tokenizacion/page.tsx`
- `app/layout.tsx`
- `app/mercado-secundario/page.tsx`
- `app/page.tsx`
- `app/politica-de-privacidad/page.tsx`
- `app/proyectos-rwa/page.tsx`
- `app/security-tokens/page.tsx`
- `app/seguridad/page.tsx`
- `app/servicios/page.tsx`
- `app/sitemap.ts`
- `app/smart-contracts/page.tsx`
- `app/sobre-nosotros/page.tsx`
- `app/software-microsaas/page.tsx`
- `app/terminos-de-servicio/page.tsx`
- `app/tokenizacion-de-activos/page.tsx`
- `app/tokenizacion-inmobiliaria/page.tsx`
- `app/tokenizacion-rwa/page.tsx`
- `app/whitepaper/page.tsx`
- `next.config.mjs`
- `postcss.config.mjs`
- `eslint.config.mjs`
- `components.json`

---

## 3. Módulos de Código Fuente: Clasificación y Recomendación

### A. Módulos Alcanzables (49) — `CONSERVAR`
- Todas las 25 rutas canónicas bajo `app/**/page.tsx` y `app/layout.tsx`.
- `app/globals.css` (estilos globales importados en `layout.tsx`).
- `components/landing/header.tsx`, `components/landing/footer.tsx`, `components/landing/contact-section.tsx`, `components/landing/faq-accordion.tsx`, `components/landing/case-studies-section.tsx`, `components/landing/services-grid.tsx`, `components/landing/roadmap-section.tsx`, `components/landing/trust-badges.tsx`.
- `components/ui/chatbot-widget.tsx`, `components/ui/button.tsx`, `components/ui/input.tsx`, `components/ui/textarea.tsx`, `components/ui/dropdown-menu.tsx`, `components/ui/sonner.tsx`, `components/ui/blockchain-background.tsx`.
- `components/theme-provider.tsx`, `components/theme-toggle.tsx`.
- `lib/language-context.tsx`, `lib/translations.ts`, `lib/utils.ts`.

### B. Módulos Candidatos No Alcanzables (67)

| Módulo | Tipo | Recomendación | Justificación |
|---|---|---|---|
| `app/faq/layout.tsx` | Layout anidado redundante | `REVISAR` | `app/faq/page.tsx` ya incluye `<Header />` y `<Footer />` |
| `styles/globals.css` | Archivo CSS duplicado | `ELIMINAR` (en 2B) | `app/globals.css` es el import canónico en `layout.tsx` |
| `components/landing/benefits.tsx` | Sección landing obsoleta | `ELIMINAR` (en 2B) | No importado en `app/page.tsx` ni en subpáginas |
| `components/landing/faq-section.tsx` | Sección landing obsoleta | `ELIMINAR` (en 2B) | Reemplazado por `faq-accordion.tsx` |
| `components/landing/featured-project.tsx` | Sección landing obsoleta | `ELIMINAR` (en 2B) | No importado en `app/page.tsx` |
| `components/landing/hero.tsx` | Hero antiguo descartado | `ELIMINAR` (en 2B) | La landing usa el hero integrado de `app/page.tsx` |
| `components/landing/lead-magnet-section.tsx` | Lead magnet antiguo | `ELIMINAR` (en 2B) | No utilizado |
| `components/landing/pain-points.tsx` | Sección landing obsoleta | `ELIMINAR` (en 2B) | No utilizado |
| `components/landing/platform-demo.tsx` | Demo de plataforma interactiva antigua | `ELIMINAR` (en 2B) | Código huérfano sin endpoint |
| `components/landing/press-section.tsx` | Sección de prensa antigua | `ELIMINAR` (en 2B) | No importado |
| `components/landing/security.tsx` | Componente de seguridad antiguo | `ELIMINAR` (en 2B) | La página `/seguridad` tiene su propio template |
| `components/landing/services.tsx` | Lista de servicios antigua | `ELIMINAR` (en 2B) | Reemplazado por `services-grid.tsx` |
| `components/ui/accordion.tsx` | Primitiva Radix UI | `REVISAR` | Evaluar si `faq-accordion.tsx` lo necesita o si usa su propia implementación |
| `components/ui/alert-dialog.tsx` .. `components/ui/tooltip.tsx` (48 componentes UI) | Componentes shadcn/Radix sin uso | `ELIMINAR` (en 2B) | UI primitives no importadas en ninguna página |
| `hooks/use-mobile.ts`, `hooks/use-toast.ts` | Hooks auxiliares shadcn | `REVISAR` | Evaluar si algún componente restante los requiere |

---

## 4. Archivos Estáticos (`public/`): Clasificación

### A. Assets Referenciados (28) — `CONSERVAR`
1. `public/apple-icon.png`
2. `public/icon.svg`
3. `public/icon-light-32x32.png`
4. `public/icon-dark-32x32.png`
5. `public/tech-bg.png`
6. `public/torre_lexia.png`
7. `public/ceo1.webp`
8. `public/hero_custom_new.png`
9. `public/regimen-tokenizacion.png`
10. `public/security_architecture.png`
11. `public/blog/agrotech.jpg`
12. `public/blog/compliance-tokens.jpg`
13. `public/blog/erc-comparison.png`
14. `public/blog/real-estate-latam.jpg`
15. `public/blog/regulation-cnv.jpg`
16. `public/blog/video-guia-rwa.png`
17. `public/how-it-works/howitworks_step1.png`
18. `public/how-it-works/howitworks_step2.png`
19. `public/how-it-works/howitworks_step3.png`
20. `public/how-it-works/howitworks_step4.png`
21. `public/projects/turismo.jpg`
22. `public/services/agentes-ia.png`
23. `public/services/agentes-ia-core.png`
24. `public/services/infografia-ia.png`
25. `public/services/consultoria-legaltech.jpg`
26. `public/services/smart-contracts.jpg`
27. `public/services/software-microsaas.jpg`
28. `public/services/tokenizacion.jpg`

### B. Assets Candidatos No Referenciados (25)

| Asset | Estado | Recomendación |
|---|---|---|
| `public/robots.txt` | Falso positivo (servido automáticamente por Next.js en `/robots.txt`) | `CONSERVAR` |
| `public/ai_automation_mockup.png` | Sin referencias en código | `ELIMINAR` (en 2B) |
| `public/clinica_yerba_buena.png` | Mockup antiguo no utilizado | `ELIMINAR` (en 2B) |
| `public/hero-capture.png` | Captura reemplazada por `hero_custom_new.png` | `ELIMINAR` (en 2B) |
| `public/hero_custom.png` | Versión previa de hero | `ELIMINAR` (en 2B) |
| `public/how-it-works/paso1.jpg` .. `paso4.jpg` | Versión antigua (reemplazada por `howitworks_step1..4.png`) | `ELIMINAR` (en 2B) |
| `public/legal_compliance_rwa.png` | Sin referencias en código | `ELIMINAR` (en 2B) |
| `public/placeholder-logo.png`, `placeholder-logo.svg` | Placeholders shadcn | `ELIMINAR` (en 2B) |
| `public/placeholder-user.jpg`, `placeholder.jpg`, `placeholder.svg` | Placeholders shadcn | `ELIMINAR` (en 2B) |
| `public/projects/agriculture.jpg`, `complejo.jpg`, `complejo.png`, `real-estate.jpg` | Assets de proyectos previos | `ELIMINAR` (en 2B) |
| `public/services/agentes-ia.jpg` | Reemplazado por `.png` | `ELIMINAR` (en 2B) |
| `public/tafi_valle.png` | Mockup sin referencia | `ELIMINAR` (en 2B) |
| `public/tokenizacion-hero-dashboard.jpg`, `tokenizacion-hero.png` | Assets de hero antiguos | `ELIMINAR` (en 2B) |
| `public/why-tokenize-2026.webp`, `why-tokenize-real.jpg` | Sin referencias en páginas activas | `ELIMINAR` (en 2B) |

---

## 5. Matriz de Dependencias (`package.json`)

### A. Dependencias de Producción en Uso Directo (10) — `CONSERVAR`
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-slot`
- `class-variance-authority`
- `clsx`
- `lucide-react`
- `next`
- `next-themes`
- `react`
- `sonner`
- `tailwind-merge`

### B. Dependencias de Producción en Uso Indirecto (2) — `CONSERVAR`
- `react-dom` (peer dependency obligatoria de React y Next.js)
- `autoprefixer` (utilizado por PostCSS/Tailwind)

### C. Dependencias Candidatas a Poda (37) — `A EVALUAR EN FASE 2B`

1. **Paquetes Radix UI no importados (22):**
   `@radix-ui/react-accordion`, `@radix-ui/react-alert-dialog`, `@radix-ui/react-aspect-ratio`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-context-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-hover-card`, `@radix-ui/react-label`, `@radix-ui/react-menubar`, `@radix-ui/react-navigation-menu`, `@radix-ui/react-popover`, `@radix-ui/react-progress`, `@radix-ui/react-radio-group`, `@radix-ui/react-scroll-area`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-slider`, `@radix-ui/react-switch`, `@radix-ui/react-tabs`, `@radix-ui/react-toast`, `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group`, `@radix-ui/react-tooltip`.
2. **Librerías de UI complejas sin uso (8):**
   `cmdk`, `date-fns`, `embla-carousel-react`, `input-otp`, `react-day-picker`, `react-resizable-panels`, `recharts`, `vaul`.
3. **Validación y Formularios no utilizados (3):**
   `@hookform/resolvers`, `react-hook-form`, `zod` (los formularios actuales usan estado React nativo y `mailto:`).
4. **Telemetría no configurada (1):**
   `@vercel/analytics` (el sitio estático actual no requiere telemetría no consentida).

---

## 6. Plan de Ejecución por Lotes para la Futura FASE 2B

Para evitar regresiones y permitir revisión atómica, la poda en FASE 2B se propone estructurar en 4 lotes:

* **Lote 1:** Eliminación de secciones antiguas huérfanas en `components/landing/` (`hero.tsx`, `benefits.tsx`, `platform-demo.tsx`, etc.) y `styles/globals.css`.
* **Lote 2:** Eliminación de componentes UI huérfanos en `components/ui/` no requeridos por ninguna página.
* **Lote 3:** Eliminación de 24 assets huérfanos en `public/` (preservando `robots.txt` y los 28 assets activos).
* **Lote 4:** Remoción de dependencias no utilizadas en `package.json` y regeneración limpia de `package-lock.json`.
