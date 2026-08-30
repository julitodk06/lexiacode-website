# Informe de Cobertura y Pruebas Automatizadas — FASE 3 & FASE 3.1

**Fecha:** 2026-08-30
**Repositorio:** `julitodk06/lexiacode-website`
**Rama:** `fix/public-repo-hardening`
**Estado:** `[✓ COMPLETADA Y ENDURECIDA EN FASE 3.1]`

---

## 1. Resumen Ejecutivo

En la **FASE 3** y su posterior endurecimiento en **FASE 3.1**, se implementó y blindó una suite de pruebas automatizadas, deterministas y 100% offline para prevenir regresiones funcionales, roturas de enlaces, dependencias de backend residuales o fugas de secretos en el sitio estático.

### Stack de Testing
* **Runner:** Vitest v4
* **Entorno:** jsdom v29
* **Utilidades:** `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
* **Compatibilidad:** Node 20 LTS, Next.js 16.3.3, React 19, TypeScript 5.7.3

---

## 2. Cobertura de Pruebas Unitarias y de Integración (`tests/`)

### A. LanguageContext (`tests/language-context.test.tsx` — 6 tests)
1. **Conmutación y Sincronización:** Permite cambiar dinámicamente entre `es`, `pt` y `en`, sincronizando simultáneamente `localStorage["lexiacode-lang"]` y `document.documentElement.lang`.
2. **Prevalencia de Preferencia:** Recupera la preferencia válida guardada en `localStorage` independientemente del idioma del navegador.
3. **Fallback Determinista:** Si la preferencia guardada es inválida y el navegador tiene un idioma no soportado (ej. `fr-FR`), retrocede de forma estricta a `en`.
4. **Detección de Español:** Si no hay preferencia guardada y el navegador es `es-AR`, inicializa en `es`.
5. **Detección de Portugués:** Si no hay preferencia guardada y el navegador es `pt-BR`, inicializa en `pt`.
6. **Aislamiento de Provider:** Comprueba el error explícito si se consume `useLanguage` fuera de un `LanguageProvider`.

### B. ChatbotWidget (`tests/chatbot-widget.test.tsx` — 5 tests)
1. **Accesibilidad y Roles:** Verifica atributos `aria-expanded`, `aria-controls`, `role="dialog"`, `aria-labelledby` y `aria-hidden` al abrir/cerrar.
2. **Teclado (Escape):** Presionar `Escape` cierra el diálogo y devuelve el foco al botón de apertura.
3. **Nombres Accesibles y Respuestas Deterministas:** Comprueba labels accesibles en input y botones, y valida que la respuesta legal contenga explícitamente el carácter técnico y orientativo (sin sustituir asesoramiento legal/financiero), con cero llamadas `fetch()`.
4. **Navegación Inter-Ruta (CTA Secundario):** Al interactuar con el CTA desde una ruta secundaria (ej. `/blog/`), invoca `router.push("/#contact")`.
5. **Scroll Suave (CTA en Home):** Al interactuar con el CTA desde la home (`/`), ejecuta `scrollIntoView` suave hacia el elemento `id="contact"`.

### C. ContactSection (`tests/contact-section.test.tsx` — 4 tests)
1. **Accesibilidad por Label:** Verifica que los 4 campos (nombre, email, empresa, mensaje) sean accesibles vía `getByLabelText` y cuenten con atributos `id` y `htmlFor` sincronizados.
2. **Formulario sin Backend:** Verifica que al enviar el formulario se genere el enlace `mailto:` sin emitir ninguna llamada `fetch()` ni interactuar con servidores, desplegando un aviso transparente al usuario.
3. **Generación Pura de URLs (`lib/contact-links.ts`):** Valida la codificación URI exacta de los parámetros `mailto:` y `https://wa.me/5493815400016`.
4. **Enlace Directo de WhatsApp:** Verifica apertura de WhatsApp con texto codificado y destinatario oficial (`+54 381 540 0016`).

**Total Suite Unit/Integration:** 3 archivos / 15 tests aprobados.

---

## 3. Verificación Automatizada del Export Estático (`scripts/test-static-export.mjs`)

El script de verificación post-compilación fue endurecido con APIs nativas de Node.js:
1. **Estructura Estática (28 endpoints):**
   * 26 documentos HTML independientes en `out/` (`index.html`, `agentes-ia/index.html`, `blog/index.html`, `como-funciona/index.html`, `compliance/index.html`, `consultoria-legaltech/index.html`, `descargo-de-responsabilidad/index.html`, `documentacion/index.html`, `erc-3643/index.html`, `faq/index.html`, `guia-tokenizacion/index.html`, `mercado-secundario/index.html`, `politica-de-privacidad/index.html`, `proyectos-rwa/index.html`, `security-tokens/index.html`, `seguridad/index.html`, `servicios/index.html`, `smart-contracts/index.html`, `sobre-nosotros/index.html`, `software-microsaas/index.html`, `terminos-de-servicio/index.html`, `tokenizacion-de-activos/index.html`, `tokenizacion-inmobiliaria/index.html`, `tokenizacion-rwa/index.html`, `whitepaper/index.html`, `_not-found/index.html`).
   * 2 endpoints de indexación: `out/sitemap.xml` y `out/robots.txt`.
2. **Verificación Exhaustiva de Enlaces Internos:**
   * Extracción de todos los `href` en los 26 HTML.
   * Rechazo estricto de `href="#"`, `href=""`, `javascript:` y referencias obsoletas `#contacto`.
   * Comprobación de que todo enlace relativo resuelva a un archivo HTML existente.
   * Comprobación de que los fragmentos de ancla (ej. `/#contact`, `/sobre-nosotros/#careers`) apunten a elementos con `id` existente en el documento de destino.
3. **Verificación de Assets Locales:**
   * Extracción de atributos `src` y `srcset` locales.
   * Comprobación de que cada recurso exista físicamente en `out/`.
4. **Escaneo de Integridad y Seguridad:**
   * Ausencia de cadenas prohibidas: `/api/chat`, `send-email.php`, `GEMINI_API_KEY`.
5. **Verificación de Metadatos SEO:**
   * Comprobación de etiquetas `<title>`, `<meta name="description">` y `<link rel="canonical">` en las páginas.

---

## 4. Pipeline de Integración Continua (CI)

Se mantiene `.github/workflows/ci.yml` con ejecución en Node.js 20 LTS:
1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run test:run`
5. `npm run build`
6. `npm run test:static`
7. `npm run audit:reachability`
8. `npm audit --audit-level=high`
