# Auditoría Exhaustiva de Accesibilidad, SEO y Contenido — FASE 4A

**Fecha:** 2026-08-30  
**Repositorio:** `julitodk06/lexiacode-website`  
**Rama:** `fix/public-repo-hardening`  
**Estado:** `[✓ AUDITORÍA COMPLETADA — SIN MODIFICACIONES DE CÓDIGO (SOLO LECTURA)]`  
**Veredicto:** `GO PARA FASE 4B (CORRECCIONES RECOMENDADAS)`  

---

## 1. Resumen Ejecutivo

Esta auditoría técnica evalúa de forma integral las 28 rutas estáticas, componentes de interfaz, etiquetas de metadatos, estructuración semántica y consistencia discursiva del sitio web de **LexiaCode**.

El objetivo es asegurar que la presencia pública del estudio sea 100% defendible, cumpla los estándares WCAG 2.1 AA de accesibilidad, optimice la indexabilidad en motores de búsqueda y elimine cualquier afirmación sobrevalorada o jurídicamente riesgosa.

---

## 2. Matriz de Hallazgos por Prioridad

### Leyenda de Severidad
* **P0 — Crítico:** Bloqueo legal, regulatorio o de seguridad.
* **P1 — Alto:** Inconsistencias de accesibilidad severa, claims desalineados o ausencia de H1.
* **P2 — Medio:** SEO incompleto (falta de metadata específica en páginas), fallos de navegación inter-ruta.
* **P3 — Bajo:** Optimizaciones menores de contraste, espaciado o micro-datos.

---

### Hallazgos de Accesibilidad (a11y)

#### [P1] `A11Y-01`: Ausencia de encabezado `<h1>` en ruta independiente `/como-funciona`
* **Ruta:** `/como-funciona`
* **Archivo:** `app/como-funciona/page.tsx:19` y `components/landing/how-it-works.tsx:29`
* **Evidencia:** `HowItWorks` se renderiza como sección principal pero su título utiliza `<h2>` (`{t.howItWorks.title}`). La página carece de un `<h1>` a nivel de documento.
* **Riesgo:** Incumplimiento de WCAG 2.1 (Criterio 1.3.1 Info and Relationships y 2.4.6 Headings and Labels). Los lectores de pantalla no identifican el tema principal de la página.
* **Corrección recomendada para Fase 4B:** Agregar un `<h1>` semántico (o permitir que `HowItWorks` reciba una propiedad `asPageHeading={true}` cuando se renderice en `/como-funciona`).
* **Criterio de Aceptación:** `app/como-funciona/page.tsx` contiene exactamente un `<h1>` accesible.

#### [P1] `A11Y-02`: Estilos de color hardcodeados (`text-gray-900`, `bg-white`) en `/sobre-nosotros`
* **Ruta:** `/sobre-nosotros`
* **Archivo:** `app/sobre-nosotros/page.tsx:22, 29, 49`
* **Evidencia:** El contenedor central utiliza `bg-white text-gray-900` hardcodeado, omitiendo las variables de diseño semánticas `bg-card`, `bg-background`, `text-foreground` y `text-muted-foreground`.
* **Riesgo:** Conflicto visual y ruptura de accesibilidad cuando el usuario navega en tema oscuro (`dark mode`).
* **Corrección recomendada para Fase 4B:** Migrar los colores hardcodeados a clases temáticas de Tailwind (`bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`).
* **Criterio de Aceptación:** Legibilidad y contraste superior a 4.5:1 verificado en modo claro y oscuro.

#### [P2] `A11Y-03`: Navegación asistida del Chatbot hacia ancla `#contact` desde páginas secundarias
* **Ruta:** Global (todas las 28 rutas con `ChatbotWidget`)
* **Archivo:** `components/ui/chatbot-widget.tsx:86, 397, 428`
* **Evidencia:** Los botones de "Coordinar Evaluación Técnica" ejecutan `document.getElementById("contact")?.scrollIntoView()`.
* **Riesgo:** En rutas distintas a la home (ej. `/blog`, `/servicios`), `#contact` no existe en el DOM actual, por lo que el botón no realiza ninguna acción visual.
* **Corrección recomendada para Fase 4B:** Si `window.location.pathname !== '/'`, redirigir explícitamente a `/#contact` mediante `window.location.href = '/#contact'`.
* **Criterio de Aceptación:** La acción de contacto en el chatbot funciona fluidamente desde cualquier ruta.

---

### Hallazgos de SEO y Metadatos

#### [P2] `SEO-01`: Páginas especializadas sin objeto `metadata` individual
* **Rutas:** `/agentes-ia`, `/blog`, `/consultoria-legaltech`, `/guia-tokenizacion`, `/proyectos-rwa`, `/smart-contracts`, `/software-microsaas`, `/`
* **Archivos:**
  * `app/agentes-ia/page.tsx`
  * `app/blog/page.tsx`
  * `app/consultoria-legaltech/page.tsx`
  * `app/guia-tokenizacion/page.tsx`
  * `app/proyectos-rwa/page.tsx`
  * `app/smart-contracts/page.tsx`
  * `app/software-microsaas/page.tsx`
* **Evidencia:** No exportan la constante `metadata`, heredando el título y descripción genéricos del `RootLayout`.
* **Riesgo:** Pérdida de posicionamiento en búsquedas orgánicas sobre verticales clave (ej. Smart Contracts Solidity, Agentes IA, Micro-SaaS).
* **Corrección recomendada para Fase 4B:** Definir `metadata` exportada con `title`, `description`, `keywords` y `canonical` en cada una de estas 7 páginas.
* **Criterio de Aceptación:** Todas las 28 rutas estáticas exportan títulos y descripciones diferenciadas y descriptivas.

#### [P2] `SEO-02`: Falta de tags `canonical` y Open Graph completos en `RootLayout`
* **Ruta:** Global
* **Archivo:** `app/layout.tsx:18-40`
* **Evidencia:** `metadata` en `RootLayout` carece de `metadataBase`, `alternates.canonical`, `openGraph` y `twitter`.
* **Riesgo:** Fragmentación de indexación ante variaciones de dominio o subrutas, y vista previa sin imagen ni formato en redes sociales o WhatsApp.
* **Corrección recomendada para Fase 4B:** Configurar `metadataBase: new URL('https://lexiacode.com')`, `alternates: { canonical: '/' }`, y objeto `openGraph` apuntando a `https://lexiacode.com/icon.svg` o hero asset.
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
