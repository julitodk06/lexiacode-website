# PHASE 2A: Reachability & Dependency Audit Report (v2.1 Reconciled)

**Fecha de auditoría:** 2026-08-30
**Repositorio:** `julitodk06/lexiacode-website`
**Rama:** `fix/public-repo-hardening`
**SHA analizado:** `3faeaf7c37e11688f701fe38b46133de6e0101a6` (Fase 2B.1 ejecutada)
**Estado:** `INVENTARIO REPRODUCIBLE RECONCILIADO — LOTE 1 (FASE 2B.1) EJECUTADO`

---

## 1. Resumen Ejecutivo y Ecuaciones de Reconciliación

Este documento establece el inventario exacto y formalmente reconciliado de módulos de código fuente, archivos estáticos públicos y dependencias de `package.json` tras la ejecución controlada del **Lote 1 (FASE 2B.1 — Poda de 10 secciones landing obsoletas y CSS duplicado)**.

> ⚠️ **Estado de Poda:** Se ejecutó exclusivamente el Lote 1 (11 archivos eliminados). Los lotes 2 (componentes UI), 3 (assets estáticos) y 4 (dependencias) permanecen **PENDIENTES DE REVISIÓN Y AUTORIZACIÓN**.

### Ecuaciones de Reconciliación Obligatoria (Post Fase 2B.1)

1. **Módulos de Código Fuente:**
   $$\text{sourceModulesTotal (101)} = \text{reachableSourceModules (46)} + \text{unreachableSourceModules (55)}$$
   *Verificación:* $101 = 46 + 55$ `[✓ VERIFICADO]`

2. **Archivos Estáticos en `public/`:**
   $$\text{totalPublicAssets (53)} = \text{referencedPublicAssets (25)} + \text{unreferencedPublicAssets (28)}$$
   *Verificación:* $53 = 25 + 28$ `[✓ VERIFICADO]`

3. **Dependencias de Producción en `package.json`:**
   $$\text{declaredProductionDependencies (49)} = \text{directlyImported (10)} + \text{indirectlyRequired (2)} + \text{unreferencedCandidates (37)}$$
   *Verificación:* $49 = 10 + 2 + 37$ `[✓ VERIFICADO]`

---

## 2. Entrypoints del Sistema (32)

### A. Framework Entrypoints en `app/` (28)
Next.js ejecuta estos archivos por convención de nombres del App Router:
1. `app/agentes-ia/page.tsx`
2. `app/blog/page.tsx`
3. `app/como-funciona/page.tsx`
4. `app/compliance/page.tsx`
5. `app/consultoria-legaltech/page.tsx`
6. `app/descargo-de-responsabilidad/page.tsx`
7. `app/documentacion/page.tsx`
8. `app/erc-3643/page.tsx`
9. `app/faq/layout.tsx` *(Layout anidado administrado por Next.js)*
10. `app/faq/page.tsx`
11. `app/guia-tokenizacion/page.tsx`
12. `app/layout.tsx` *(Layout raíz)*
13. `app/mercado-secundario/page.tsx`
14. `app/page.tsx`
15. `app/politica-de-privacidad/page.tsx`
16. `app/proyectos-rwa/page.tsx`
17. `app/security-tokens/page.tsx`
18. `app/seguridad/page.tsx`
19. `app/servicios/page.tsx`
20. `app/sitemap.ts` *(Generador de sitemap)*
21. `app/smart-contracts/page.tsx`
22. `app/sobre-nosotros/page.tsx`
23. `app/software-microsaas/page.tsx`
24. `app/terminos-de-servicio/page.tsx`
25. `app/tokenizacion-de-activos/page.tsx`
26. `app/tokenizacion-inmobiliaria/page.tsx`
27. `app/tokenizacion-rwa/page.tsx`
28. `app/whitepaper/page.tsx`

### B. Config Entrypoints en Raíz (4)
Archivos de configuración requeridos por el toolchain (mantenidos separados de la contabilidad interna de código fuente):
- `next.config.mjs`
- `postcss.config.mjs`
- `eslint.config.mjs`
- `components.json`

---

## 3. Módulos de Código Fuente (`sourceModulesTotal`: 101)

### A. Módulos Alcanzables (46) — `CONSERVAR / REVISAR`

| Módulo | Tipo | Clasificación |
|---|---|---|
| `app/**/page.tsx` (25 páginas) | Página App Router | `CONSERVAR` |
| `app/layout.tsx` | Layout Raíz App Router | `CONSERVAR` |
| `app/faq/layout.tsx` | Layout Anidado App Router | `REVISAR POR POSIBLE REDUNDANCIA VISUAL` |
| `app/sitemap.ts` | Endpoint SEO App Router | `CONSERVAR` |
| `app/globals.css` | Estilos Globales (importado en `layout.tsx`) | `CONSERVAR` |
| `components/landing/contact-section.tsx` | Formulario de Contacto | `CONSERVAR` |
| `components/landing/footer.tsx` | Footer Global | `CONSERVAR` |
| `components/landing/header.tsx` | Header / Navegación Global | `CONSERVAR` |
| `components/landing/how-it-works.tsx` | Sección Explicativa | `CONSERVAR` |
| `components/landing/tech-background.tsx` | Gráfico de Fondo SVG/Canvas | `CONSERVAR` |
| `components/theme-provider.tsx` | Contexto de Tema (next-themes) | `CONSERVAR` |
| `components/ui/blockchain-background.tsx` | Fondo Visual Web3 | `CONSERVAR` |
| `components/ui/button.tsx` | Primitiva UI Botón | `CONSERVAR` |
| `components/ui/card.tsx` | Primitiva UI Tarjeta | `CONSERVAR` |
| `components/ui/chatbot-widget.tsx` | Chatbot Técnico Determinista | `CONSERVAR` |
| `components/ui/dropdown-menu.tsx` | Menú Desplegable Idiomas/Temas | `CONSERVAR` |
| `components/ui/input.tsx` | Campo de Formulario | `CONSERVAR` |
| `components/ui/sonner.tsx` | Notificaciones Toast | `CONSERVAR` |
| `components/ui/textarea.tsx` | Área de Texto Formulario | `CONSERVAR` |
| `lib/language-context.tsx` | Contexto Trilingüe | `CONSERVAR` |
| `lib/translations.ts` | Diccionario ES/EN/PT | `CONSERVAR` |
| `lib/utils.ts` | Utilidades Tailwind (`cn`) | `CONSERVAR` |

### B. Módulos Eliminados en Lote 1 (11) — `[✓ ELIMINADOS EN FASE 2B.1]`
- `components/landing/benefits.tsx`
- `components/landing/faq-section.tsx`
- `components/landing/featured-project.tsx`
- `components/landing/hero.tsx`
- `components/landing/lead-magnet-section.tsx`
- `components/landing/pain-points.tsx`
- `components/landing/platform-demo.tsx`
- `components/landing/press-section.tsx`
- `components/landing/security.tsx`
- `components/landing/services.tsx`
- `styles/globals.css`

### C. Módulos Candidatos No Alcanzables Restantes (55) — `CANDIDATOS A PODA EN FASE 2B.2`

1. **Componentes UI de shadcn / Radix no importados (53):**
   - `components/ui/accordion.tsx`
   - `components/ui/alert-dialog.tsx`
   - `components/ui/alert.tsx`
   - `components/ui/aspect-ratio.tsx`
   - `components/ui/avatar.tsx`
   - `components/ui/badge.tsx`
   - `components/ui/breadcrumb.tsx`
   - `components/ui/button-group.tsx`
   - `components/ui/calendar.tsx`
   - `components/ui/carousel.tsx`
   - `components/ui/chart.tsx`
   - `components/ui/checkbox.tsx`
   - `components/ui/collapsible.tsx`
   - `components/ui/command.tsx`
   - `components/ui/context-menu.tsx`
   - `components/ui/dialog.tsx`
   - `components/ui/drawer.tsx`
   - `components/ui/empty.tsx`
   - `components/ui/field.tsx`
   - `components/ui/form.tsx`
   - `components/ui/hover-card.tsx`
   - `components/ui/input-group.tsx`
   - `components/ui/input-otp.tsx`
   - `components/ui/item.tsx`
   - `components/ui/kbd.tsx`
   - `components/ui/label.tsx`
   - `components/ui/lead-capture-modal.tsx`
   - `components/ui/menubar.tsx`
   - `components/ui/navigation-menu.tsx`
   - `components/ui/pagination.tsx`
   - `components/ui/popover.tsx`
   - `components/ui/progress.tsx`
   - `components/ui/radio-group.tsx`
   - `components/ui/resizable.tsx`
   - `components/ui/scroll-area.tsx`
   - `components/ui/scroll-reveal.tsx`
   - `components/ui/select.tsx`
   - `components/ui/separator.tsx`
   - `components/ui/sheet.tsx`
   - `components/ui/sidebar.tsx`
   - `components/ui/skeleton.tsx`
   - `components/ui/slider.tsx`
   - `components/ui/spinner.tsx`
   - `components/ui/switch.tsx`
   - `components/ui/table.tsx`
   - `components/ui/tabs.tsx`
   - `components/ui/toast.tsx`
   - `components/ui/toaster.tsx`
   - `components/ui/toggle-group.tsx`
   - `components/ui/toggle.tsx`
   - `components/ui/tooltip.tsx`
   - `components/ui/use-mobile.tsx`
   - `components/ui/use-toast.ts`

2. **Hooks Auxiliares shadcn (2):**
   - `hooks/use-mobile.ts`
   - `hooks/use-toast.ts`

---

## 4. Archivos Estáticos (`public/` — `totalPublicAssets`: 53)

### A. Assets Referenciados por Código Alcanzable (25) — `CONSERVAR`
1. `public/apple-icon.png`
2. `public/blog/agrotech.jpg`
3. `public/blog/compliance-tokens.jpg`
4. `public/blog/erc-comparison.png`
5. `public/blog/real-estate-latam.jpg`
6. `public/blog/regulation-cnv.jpg`
7. `public/blog/video-guia-rwa.png`
8. `public/ceo1.webp`
9. `public/hero_custom_new.png`
10. `public/how-it-works/howitworks_step1.png`
11. `public/how-it-works/howitworks_step2.png`
12. `public/how-it-works/howitworks_step3.png`
13. `public/how-it-works/howitworks_step4.png`
14. `public/icon-dark-32x32.png`
15. `public/icon-light-32x32.png`
16. `public/icon.svg`
17. `public/projects/turismo.jpg`
18. `public/regimen-tokenizacion.png`
19. `public/robots.txt` *(Framework / Public Entrypoint)*
20. `public/services/agentes-ia-core.png`
21. `public/services/consultoria-legaltech.jpg`
22. `public/services/infografia-ia.png`
23. `public/services/smart-contracts.jpg`
24. `public/services/software-microsaas.jpg`
25. `public/tech-bg.png`

### B. Assets Candidatos No Referenciados (28) — `CANDIDATOS A PODA EN FASE 2B.3`
1. `public/ai_automation_mockup.png`
2. `public/clinica_yerba_buena.png`
3. `public/hero-capture.png`
4. `public/hero_custom.png`
5. `public/how-it-works/paso1.jpg`
6. `public/how-it-works/paso2.png`
7. `public/how-it-works/paso3.jpg`
8. `public/how-it-works/paso4.jpg`
9. `public/legal_compliance_rwa.png`
10. `public/placeholder-logo.png`
11. `public/placeholder-logo.svg`
12. `public/placeholder-user.jpg`
13. `public/placeholder.jpg`
14. `public/placeholder.svg`
15. `public/projects/agriculture.jpg`
16. `public/projects/complejo.jpg`
17. `public/projects/complejo.png`
18. `public/projects/real-estate.jpg`
19. `public/security_architecture.png`
20. `public/services/agentes-ia.jpg`
21. `public/services/agentes-ia.png`
22. `public/services/tokenizacion.jpg`
23. `public/tafi_valle.png`
24. `public/tokenizacion-hero-dashboard.jpg`
25. `public/tokenizacion-hero.png`
26. `public/torre_lexia.png`
27. `public/why-tokenize-2026.webp`
28. `public/why-tokenize-real.jpg`

### C. Auditoría Activa de Assets Inexistentes (`missingAssetRefs`)
- **En grafo de código alcanzable:** `0 referencias rotas` `[✓ PASS]`
- **En código no alcanzable:** `0 referencias rotas` *(las 2 referencias huérfanas en `benefits.tsx` y `platform-demo.tsx` fueron eliminadas con el Lote 1)* `[✓ PASS]`

---

## 5. Matriz de Dependencias (`package.json` — Total: 49)

### A. Dependencias en Uso Directo (10) — `CONSERVAR`
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

### B. Dependencias en Uso Indirecto (2) — `CONSERVAR`
- `react-dom` *(Peer dependency esencial para React 19 y Next.js)*
- `autoprefixer` *(Plugin de PostCSS requerido por el build pipeline)*

### C. Dependencias Candidatas a Poda (37) — `A EVALUAR EN FASE 2B.4`

* **Paquetes Radix UI no importados (25):**
  `@radix-ui/react-accordion`, `@radix-ui/react-alert-dialog`, `@radix-ui/react-aspect-ratio`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-context-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-hover-card`, `@radix-ui/react-label`, `@radix-ui/react-menubar`, `@radix-ui/react-navigation-menu`, `@radix-ui/react-popover`, `@radix-ui/react-progress`, `@radix-ui/react-radio-group`, `@radix-ui/react-scroll-area`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-slider`, `@radix-ui/react-switch`, `@radix-ui/react-tabs`, `@radix-ui/react-toast`, `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group`, `@radix-ui/react-tooltip`.
* **Librerías de UI complejas sin uso (8):**
  `cmdk`, `date-fns`, `embla-carousel-react`, `input-otp`, `react-day-picker`, `react-resizable-panels`, `recharts`, `vaul`.
* **Validación y Formularios no utilizados (3):**
  `@hookform/resolvers`, `react-hook-form`, `zod`.
* **Telemetría no configurada (1):**
  `@vercel/analytics`.

---

## 6. Limitaciones del Análisis Estático

1. **Expresiones Regulares vs AST Completo:** La extracción de imports y asset references utiliza expresiones regulares deterministas que cubren imports de ES Modules (`import/export`), side-effects (`import './...'`), dynamic imports (`import('...')`) y strings en JSX/TSX/CSS. Patrones dinámicos altamente computados (`const img = '/img/' + id`) no están presentes en este proyecto pero requerirían análisis dinámico si existieran.
2. **Convenciones de Next.js:** Los entrypoints del App Router se resuelven por nombres de archivo reservados (`page`, `layout`, `sitemap`, etc.). Archivos como `app/faq/layout.tsx` se consideran alcanzables por diseño del framework aunque no tengan imports explícitos.

---

## 7. Plan de Lotes Restantes de la FASE 2B

* **Lote 1 (FASE 2B.1):** `[✓ COMPLETADO]` Eliminación de 10 secciones landing obsoletas y `styles/globals.css` (11 módulos fuente eliminados).
* **Lote 2 (FASE 2B.2):** `[⏳ Pendiente]` Eliminación de 53 componentes UI no alcanzables y 2 hooks huérfanos.
* **Lote 3 (FASE 2B.3):** `[⏳ Pendiente]` Eliminación de 28 assets estáticos huérfanos en `public/` (preservando `robots.txt` y los 25 assets activos).
* **Lote 4 (FASE 2B.4):** `[⏳ Pendiente]` Poda de 37 dependencias en `package.json` y regeneración limpia de `package-lock.json`.
