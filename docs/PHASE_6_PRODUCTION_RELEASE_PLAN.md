# Plan de Release y Despliegue a Producción — FASE 6

**Fecha:** 2026-08-30
**Repositorio:** `julitodk06/lexiacode-website`
**Dominio de Producción:** `https://lexiacode.com`
**Hosting Destino:** Servidor Web Estático / Hostinger
**Estado:** `[⏳ PENDIENTE DE AUTORIZACIÓN EXPRESA PARA EJECUCIÓN]`

---

## 1. Identificación del Release Candidate

- **Rama Estable de Release:** `main`
- **SHA de Release:** `4559efde8eb5d6262c88863a9fe2df88936b7685`
- **PR:** [#1 — fix: harden LexiaCode public website and static release pipeline](https://github.com/julitodk06/lexiacode-website/pull/1) (**MERGED**)
- **Tag Semántico & Release:** [`v1.0.0-hardened`](https://github.com/julitodk06/lexiacode-website/releases/tag/v1.0.0-hardened)
- **Estrategia Aplicada:** **Squash Merge**

---

## 2. Procedimiento de Build Limpio y Artefacto

1. **Clon / Checkout Limpio:**
   ```bash
   git switch main
   git pull origin main
   npm ci
   ```
2. **Generación del Artefacto Estático:**
   ```bash
   npm run build
   npm run test:static
   ```
3. **Contenido del Directorio `out/` a Desplegar (28 endpoints):**
   - 26 documentos HTML (incluyendo `index.html`, `_not-found/index.html` y las 24 subpáginas).
   - `sitemap.xml` (con 25 URLs indexables).
   - `robots.txt`.
   - Directorio `_next/` (bundles estáticos, CSS y JS compilados).
   - Assets públicos (imágenes corporativas, logos, diagramas en `public/`).

---

## 3. Método de Backup de la Versión Actualmente Servida

Antes de transferir o reemplazar archivos en el servidor de hosting (ej. `public_html` en Hostinger):

1. Crear un archivo comprimido de respaldo del directorio raíz actual del servidor web:
   `tar -czvf backup-lexiacode-pre-v1.0.0-$(date +%Y%m%d%H%M%S).tar.gz /path/to/public_html` (o descarga vía SSH/FTP).
2. Conservar el archivo de backup en un directorio seguro fuera del root público.

---

## 4. Procedimiento de Despliegue

1. Cargar el contenido íntegro del directorio generado `out/` en el directorio web público de producción (`public_html` o document root equivalente).
2. Configurar el servidor web para servir archivos estáticos con manejo de rutas limpias:
   - Rutas como `/agentes-ia/` deben resolver `agentes-ia/index.html`.
   - Error 404 debe redirigir a `_not-found/index.html`.
3. Purgar la caché del CDN (Cloudflare / Hostinger Cache) si se encuentra habilitada.

---

## 5. Protocolo de Smoke Tests Post-Deploy

Una vez completada la publicación, ejecutar las siguientes validaciones automatizadas y manuales sobre `https://lexiacode.com`:

1. **Verificación HTTPS y Certificado SSL:**
   - Confirmar protocolo HTTPS activo y certificado TLS válido sin advertencias mixtas.
2. **Verificación de Rutas Públicas (25 Páginas):**
   - Comprobar respuesta HTTP 200 en `https://lexiacode.com/` y subrutas clave (`/sobre-nosotros/`, `/servicios/`, `/proyectos-rwa/`, `/smart-contracts/`, `/agentes-ia/`, `/como-funciona/`, etc.).
   - Comprobar que una ruta inexistente (ej. `/ruta-invalida-test`) responde correctamente con la página 404 personalizada (`_not-found`).
3. **Verificación de Indexación:**
   - Comprobar HTTP 200 en `https://lexiacode.com/sitemap.xml`.
   - Comprobar HTTP 200 en `https://lexiacode.com/robots.txt`.
4. **Verificación de Metadatos SEO y Open Graph:**
   - Verificar etiquetas `<title>`, `<meta name="description">`, `<link rel="canonical">` y `og:image` en el código fuente renderizado.
5. **Verificación de Enlaces e Interacciones:**
   - Comprobar que el ancla de contacto `/#contact` desplaza suavemente hacia el formulario.
   - Comprobar que el formulario abre el cliente de correo oficial (`mailto:juliov@lexiacode.com`).
   - Comprobar que el botón de WhatsApp enlaza a `https://wa.me/5493815400016`.
   - Comprobar que el chatbot abre, responde de forma estática local sin errores de red y permite navegar hacia `/#contact`.

---

## 6. Estrategia y Condiciones de Rollback Automático

### Condiciones de Disparo de Rollback:
- Respuesta HTTP 5xx o 404 en la página principal (`/`) tras el deploy.
- Assets JS/CSS rotos impidiendo la hidratación de componentes.
- Inconsistencia de certificados SSL o bloqueo en el servidor web.

### Procedimiento de Rollback Inmediato:
1. Restaurar el backup comprimido previo (`backup-lexiacode-pre-v1.0.0-*.tar.gz`) en `public_html`.
2. Purgar la caché del CDN.
3. En GitHub, si el merge ya se realizó en `main`, crear un PR de reversión mediante `git revert <merge_commit_sha>` para mantener la integridad del historial.
