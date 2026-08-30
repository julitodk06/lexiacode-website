# Informe de Cierre de Residuos de Accesibilidad, SEO y Documentación — FASE 4B.1

**Fecha:** 2026-08-30
**Repositorio:** `julitodk06/lexiacode-website`
**Rama:** `fix/public-repo-hardening`
**Estado:** `[✓ RESIDUOS 100% SUBSANADOS Y VERIFICADOS]`

---

## 1. Matriz de Hallazgos, Riesgos y Correcciones

### 1.1 Accesibilidad del Chatbot en Estado Cerrado
- **Hallazgo:** Cuando `isOpen === false`, el contenedor `#chatbot-dialog` permanecía en el DOM con clases visuales (`scale-0 opacity-0 pointer-events-none`) y `aria-hidden={true}`.
- **Riesgo:** Dispositivos de asistencia y navegación por teclado podían alcanzar elementos interactivos descendientes (inputs, botones de consulta rápida, botón de cierre).
- **Corrección:** Se implementó renderizado condicional en `components/ui/chatbot-widget.tsx`: el nodo `role="dialog"` se monta exclusivamente cuando `isOpen === true`. Cuando está cerrado, el diálogo no existe en el DOM. Además, mientras el diálogo está abierto, el botón flotante recibe `tabIndex={-1}` y `aria-hidden={true}` para evitar duplicidad de foco. Al cerrar o pulsar `Escape`, el foco retorna a `openButtonRef`.
- **Test automatizado:** `tests/chatbot-widget.test.tsx` (`unmounts dialog and prevents focusable descendants when closed; mounts role="dialog" on open`).

### 1.2 Selectores y Prellenado de Contacto
- **Hallazgo:** `ChatbotWidget` buscaba selectores genéricos (`input[placeholder*="Acme Corp"]`, `input[id="company"]`, `textarea[id="message"]`), mientras que `ContactSection` utiliza IDs semánticos (`#contact-company`, `#contact-message`). La mutación directa del DOM no actualizaba el estado React controlado `formData`.
- **Riesgo:** Pérdida del texto resumido de evaluación técnica al hacer click en el CTA del chatbot desde la home.
- **Corrección:** `ChatbotWidget` emite un evento `lexia-contact-prefill` con `CustomEvent` tipado y actualiza selectores a `#contact-company` y `#contact-message`. `ContactSection` escucha el evento y actualiza `formData` mediante `setFormData`.
- **Test automatizado:** `tests/contact-section.test.tsx` (`updates form controlled state and pre-fills company and message when user triggers diagnostic CTA from chatbot on home`).

### 1.3 Política Canónica, Normalización y Open Graph
- **Hallazgo:** Canonical tags y URLs de Open Graph no contaban con normalización uniforme de barras finales (`trailing slash`). La imagen de Open Graph no utilizaba dimensiones verificadas ni URL absoluta. `sitemap.xml` para home utilizaba `''` produciendo `https://lexiacode.com` en lugar de `https://lexiacode.com/`.
- **Riesgo:** Inconsistencia SEO entre canonicals y sitemap; posibles penalizaciones por contenido duplicado.
- **Corrección:**
  - `lib/site-metadata.ts`: `normalizeRoutePath` garantiza que la home sea `/` (`https://lexiacode.com/`) y cada subruta comience y termine con `/` (ej. `https://lexiacode.com/agentes-ia/`).
  - Imagen Open Graph: `public/hero_custom_new.png` verificado determinísticamente con dimensiones reales `1672 x 941` y URL absoluta `https://lexiacode.com/hero_custom_new.png`.
  - `app/sitemap.ts`: Home configurada como `/` para generar `https://lexiacode.com/`.
- **Test automatizado:** `scripts/test-static-export.mjs` valida coincidencia exacta de canonical, `og:url` y las 25 rutas de `sitemap.xml`.

---

## 2. Endurecimiento del Gate de Exportación Estática (`scripts/test-static-export.mjs`)

1. **Mapa Canónico Exacto:** Validación estricta de 8 rutas estratégicas contra `CANONICAL_MAP` para canonical, `og:url`, `og:image` absoluta y `twitter:card`.
2. **Reconciliación de Sitemap:** Comprobación de que `sitemap.xml` contenga exactamente 25 URLs indexables, 0 duplicados y exclusión de `/_not-found`.
3. **Limpieza de Queries en Links:** Descarte de query strings (`?foo=bar`) antes de verificar la existencia de archivos físicos en `out/`, preservando fragmentos (`#id`) para comprobar los IDs HTML.
4. **Mensajería Condicional:** Los mensajes de éxito `PASS` se emiten únicamente tras la confirmación de `errors === 0`.

---

## 3. Resultados Exactos de Gates de Calidad

| Gate | Comando | Resultado |
| :--- | :--- | :---: |
| **Linting** | `npm run lint` | `0 warnings, 0 errors` [✓] |
| **Typecheck** | `npm run typecheck` | `TypeScript exit 0` [✓] |
| **Unit & Integration** | `npm run test:run` | `16 passed (3 suites)` [✓] |
| **Build SSG** | `npm run build` | `28 endpoints exportados` [✓] |
| **Static Export Gate** | `npm run test:static` | `PASS (28 endpoints, 668 enlaces, 299 assets)` [✓] |
| **Reachability Auditor** | `npm run audit:reachability` | `55=55+0 / 25=25+0 / 12=10+2+0` [✓] |
| **Security Audit** | `npm audit --audit-level=high` | `0 vulnerabilidades` [✓] |

---

## 4. Limitaciones Reales

- Se migraron superficies y textos a tokens semánticos compatibles con temas claro y oscuro. No se realizó una certificación WCAG completa ni una medición automatizada exhaustiva de contraste.
- El prellenado del formulario desde el chatbot está verificado en la misma página (`/`). En rutas secundarias, la acción redirige a `/#contact`.
