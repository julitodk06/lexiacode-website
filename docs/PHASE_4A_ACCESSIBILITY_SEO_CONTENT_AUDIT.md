# Auditoría Estática de Accesibilidad, SEO y Contenido Público — FASE 4A

**Fecha:** 2026-08-30
**Repositorio:** `julitodk06/lexiacode-website`
**Rama:** `fix/public-repo-hardening`
**Estado:** `[✓ AUDITORÍA COMPLETADA — RESOLUCIONES EN FASE 4B]`

---

## 1. Resumen Ejecutivo

En la **FASE 4A** se completó una auditoría exhaustiva, reproducible y de solo lectura sobre el árbol de archivos alcanzable y los 28 artefactos estáticos exportados (`out/`).

El objetivo fue identificar oportunidades de mejora en **Accesibilidad (a11y)**, **SEO / Metadatos** y **Consistencia de Contenido Institucional**, estableciendo los requerimientos exactos a implementar en la **FASE 4B**.

---

## 2. Matriz de Hallazgos y Clasificación de Prioridad

### Hallazgos de Accesibilidad (a11y)

#### [P1] `A11Y-01`: Falta de Encabezado Principal `<h1>` en `/como-funciona`
* **Ruta:** `/como-funciona` (`app/como-funciona/page.tsx:1-26`)
* **Archivo Componente:** `components/landing/how-it-works.tsx:29-31`
* **Problema:** En `HowItWorks`, el título se renderiza como `<h2>` porque en la landing principal (`/`) el `<h1>` está en la sección `Hero`. Sin embargo, en la ruta independiente `/como-funciona`, no existe un `<h1>` a nivel de página.
* **Solución para Fase 4B:** Añadir prop `asPageHeading?: boolean` a `HowItWorks` para renderizar condicionalmente `<h1>` o `<h2>` según el contexto de la página.
* **Criterio de Aceptación:** Exactamente un `<h1>` en `/como-funciona`.

#### [P1] `A11Y-02`: Contraste y Adaptación Temática en `/sobre-nosotros`
* **Ruta:** `/sobre-nosotros` (`app/sobre-nosotros/page.tsx:1-247`)
* **Problema:** Múltiples secciones usan fondos claros fijos (`bg-white`, `bg-[#f9f9f9]`, `text-gray-900`) encapsulados dentro de un contenedor fijo, lo que rompe la coherencia temática con el modo oscuro y el resto del sitio.
* **Solución para Fase 4B:** Migrar a tokens semánticos de Tailwind (`bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`).
* **Criterio de Aceptación:** Vista 100% legible y adaptativa en modos claro y oscuro.

#### [P2] `A11Y-03`: Nombres Accesibles y Manejo de Foco en Chatbot y Formularios
* **Archivos:** `components/ui/chatbot-widget.tsx`, `components/landing/contact-section.tsx`
* **Problema:** Asegurar que los botones de cierre, toggles e inputs cuenten con etiquetas accesibles inequívocas (`aria-label`, `aria-expanded`, asociación `htmlFor`/`id`).
* **Criterio de Aceptación:** Cero controles interactivos sin nombre accesible comprobado por tests.

---

### Hallazgos de SEO y Metadatos

#### [P1] `SEO-01`: Metadatos Específicos en las 7 Páginas con `"use client"`
* **Rutas afectadas:**
  1. `/agentes-ia`
  2. `/blog`
  3. `/consultoria-legaltech`
  4. `/guia-tokenizacion`
  5. `/proyectos-rwa`
  6. `/smart-contracts`
  7. `/software-microsaas`
* **Problema:** Al ser componentes cliente, Next.js no permite exportar `metadata` directamente desde su `page.tsx`, heredando únicamente el metadata global del `RootLayout`.
* **Solución para Fase 4B:** Crear Server Layouts (`layout.tsx`) individuales para cada una de las 7 páginas, utilizando un helper centralizado `lib/site-metadata.ts` para inyectar `title`, `description`, `canonical` y Open Graph específicos.
* **Criterio de Aceptación:** 100% de las rutas públicas con título y descripción diferenciados en su HTML exportado.

#### [P2] `SEO-02`: Metadata Global y Canonical Tag en `RootLayout`
* **Archivo:** `app/layout.tsx:18-40`
* **Problema:** Falta configurar `metadataBase` y la URL canónica raíz (`alternates.canonical: '/'`), así como etiquetas `openGraph` y `twitter` completas.
* **Solución para Fase 4B:** Completar objeto `metadata` en `RootLayout`.
* **Criterio de Aceptación:** Etiquetas canonical y Open Graph presentes en todo el export estático.

---

### Hallazgos de Contenido y Afirmaciones Públicas

#### [P1] `CONT-01`: Alineación de Casos RWA (Iniciativa Minera, Turismo y Real Estate)
* **Rutas:** `/proyectos-rwa`, `/`, `lib/translations.ts`
* **Archivos:** `app/proyectos-rwa/page.tsx:23-47`, `lib/translations.ts:313-332`
* **Estado Actual:** Los textos ya reflejan que se trató de evaluaciones técnicas preliminares y recomendaciones de no avanzar por riesgos.
* **Refuerzo recomendado para Fase 4B:**
  * En la iniciativa minera: ratificar explícitamente que la valuación de referencia fue de ~USD 100M sobre el activo subyacente analizado, y que el alcance fue estrictamente de arquitectura funcional y due diligence previo (sin captación de fondos).
  * En Turismo y Real Estate: ratificar que las iniciativas correspondieron a propuestas preliminares y conversaciones comerciales sin formación de capital completada.
* **Criterio de Aceptación:** Cero alegaciones de fondos captados, cero retornos prometidos y 100% de enfoque en ingeniería de software.

#### [P1] `CONT-02`: Deslinde Regulatorio e Institucional
* **Rutas:** `/sobre-nosotros`, `/compliance`, `/descargo-de-responsabilidad`, `/servicios`
* **Evidencia y Regla:** LexiaCode debe consolidarse inequívocamente como un **estudio de producto y tecnología**. No es entidad financiera, fiduciaria, custodio ni estudio jurídico.
* **Refuerzo recomendado para Fase 4B:** Asegurar que en todas las menciones a asesoramiento legal o auditorías se aclare que LexiaCode diseña smart contracts y coordina la revisión con abogados y auditores independientes según la jurisdicción.
* **Criterio de Aceptación:** Deslinde explícito presente en footer, chatbot, página de sobre nosotros y servicios.

#### [P2] `CONT-03`: Perfil Profesional y Credenciales
* **Ruta:** `/sobre-nosotros`, `app/layout.tsx`
* **Archivo:** `app/sobre-nosotros/page.tsx:204-209`
* **Evidencia:** El perfil de Julio Antonio Villalobo está correctamente formulado como *Managing Director | Technology, AI & Product Lead*, con experiencia en Solidity, arquitectura funcional y coordinación de producto.
* **Aclaración mantenida:** Formación en programación registrada como *Programming Studies (2020)* y nivel de inglés como *Business English con práctica diaria*.
* **Criterio de Aceptación:** Cero títulos no defendibles en el perfil institucional.

---

## 3. Veredicto Final

* **Evaluación General:** El sitio cuenta con una arquitectura estática sólida, validada y libre de servidores o secretos.
* **Veredicto:** **`GO PARA FASE 4B`** para ejecutar las correcciones de accesibilidad (H1 en `/como-funciona`, adaptación de temas en `/sobre-nosotros`), metadatos SEO por página y refuerzos de contenido.

---

## 4. Estado Post-Auditoría: FASE 4B Ejecutada y Verificada

Todas las observaciones señaladas en este informe fueron resueltas integralmente durante la **FASE 4B** y documentadas en `docs/PHASE_4B_CORRECTION_REPORT.md`.
