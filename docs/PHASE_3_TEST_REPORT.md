# Informe de Cobertura y Pruebas Automatizadas — FASE 3

**Fecha:** 2026-08-30  
**Repositorio:** `julitodk06/lexiacode-website`  
**Rama:** `fix/public-repo-hardening`  
**Estado:** `[✓ COMPLETADA Y APROBADA]`  

---

## 1. Resumen Ejecutivo

En la **FASE 3** se implementó una suite de pruebas automatizadas, deterministas y 100% offline para prevenir regresiones funcionales, roturas de enlaces, dependencias de backend residuales o fugas de secretos en el sitio estático.

### Stack de Testing Seleccionado
* **Runner:** Vitest v4
* **Entorno:** jsdom v29
* **Utilidades:** `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
* **Compatibilidad:** Node 20 LTS, Next.js 16.3.3, React 19, TypeScript 5.7.3

---

## 2. Cobertura de Pruebas Unitarias y de Integración (`tests/`)

### A. LanguageContext (`tests/language-context.test.tsx`)
* **Estado inicial:** Verifica inicialización válida de idioma (`en`, `es` o `pt`).
* **Conmutación:** Verifica cambio dinámico entre `es`, `en` y `pt` actualizando las traducciones del diccionario.
* **Persistencia:** Verifica que la preferencia se guarde correctamente en `localStorage` con la clave `lexiacode-lang`.
* **Recuperación y Fallback:** Verifica recuperación de preferencias existentes y fallback seguro ante valores inválidos.
* **Aislamiento de Provider:** Comprueba el error explícito si se consume `useLanguage` fuera de un `LanguageProvider`.

### B. ChatbotWidget (`tests/chatbot-widget.test.tsx`)
* **Render inicial y apertura:** Verifica el estado colapsado inicial y apertura interactiva mediante el toggle.
* **Sesión interactiva orientativa:** Verifica navegación y respuestas a consultas predefinidas (RWA, viabilidad, CNV, costos, seguridad).
* **Deslinde y orientación preliminar:** Verifica que el asistente establezca claramente su alcance técnico orientativo y deslinde legal/financiero.
* **Determinismo y Seguridad:** Comprueba la **ausencia total** de `fetch()`, llamadas a backend, endpoints `/api/chat` y la variable `GEMINI_API_KEY`.

### C. ContactSection (`tests/contact-section.test.tsx`)
* **Campos del formulario:** Comprueba la presencia y accesibilidad de inputs de nombre, email, empresa, mensaje y selector de tipo de activo.
* **Canales oficiales institucionales:** Verifica la presencia exacta del correo `juliov@lexiacode.com` y del enlace WhatsApp `https://wa.me/5493815400016`.
* **Manejo transparente:** Verifica que el envío active el cliente de correo mediante `mailto:` con asunto y cuerpo estructurados, sin simular envíos a servidores intermedios.

---

## 3. Verificación Automatizada del Export Estático (`scripts/test-static-export.mjs`)

El script de verificación post-compilación ejecuta validaciones rigurosas sobre el directorio `out/`:
1. **Existencia del directorio `out/`:** Verificado.
2. **Generación de las 28 rutas estáticas requeridas:**
   * `/` (Home)
   * `/_not-found`
   * `/agentes-ia`
   * `/blog`
   * `/como-funciona`
   * `/compliance`
   * `/consultoria-legaltech`
   * `/descargo-de-responsabilidad`
   * `/documentacion`
   * `/erc-3643`
   * `/faq`
   * `/guia-tokenizacion`
   * `/mercado-secundario`
   * `/politica-de-privacidad`
   * `/proyectos-rwa`
   * `/security-tokens`
   * `/seguridad`
   * `/servicios`
   * `/smart-contracts`
   * `/sobre-nosotros`
   * `/software-microsaas`
   * `/terminos-de-servicio`
   * `/tokenizacion-de-activos`
   * `/tokenizacion-inmobiliaria`
   * `/tokenizacion-rwa`
   * `/whitepaper`
3. **Endpoints de indexación:** `sitemap.xml` y `robots.txt` presentes y accesibles en la raíz de salida.
4. **Escaneo de integridad y seguridad:**
   * Ausencia de cadenas prohibidas: `/api/chat`, `send-email.php`, `GEMINI_API_KEY`.
   * Presencia del ancla de navegación rápida `/#contact` o `/#contacto` en el HTML de la landing.

---

## 4. Pipeline de Integración Continua (CI)

Se actualizó `.github/workflows/ci.yml` incorporando todos los gates de calidad en orden estricto:
1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run test:run`
5. `npm run build`
6. `npm run test:static`
7. `npm run audit:reachability`
8. `npm audit --audit-level=high`

---

## 5. Resultados de Ejecución Local

| Suite / Gate | Comando | Tests / Rutas | Resultado |
| :--- | :--- | :--- | :---: |
| **Unit & Integration** | `npm run test:run` | 3 archivos / 10 tests | `10 passed, 0 failed` [✓] |
| **Static Export Gate** | `npm run test:static` | 28 rutas, sitemap, robots, 0 prohibidas | `PASS (0 errores)` [✓] |
| **Reachability Gate** | `npm run audit:reachability` | 46 módulos, 25 assets, 12 dependencias | `PASS (0 rotos)` [✓] |
| **Lint & Types** | `npm run lint && npm run typecheck` | Reglas estrictas y TS sin errores | `PASS (0 warnings)` [✓] |
| **Security Audit** | `npm audit --audit-level=high` | 506 paquetes auditados | `0 vulnerabilidades` [✓] |
