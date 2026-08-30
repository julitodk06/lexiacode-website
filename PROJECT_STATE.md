# PROJECT_STATE — LexiaCode Website

> Fuente operativa para continuar el desarrollo sin depender del historial del chat.
>
> Última revisión arquitectónica: 2026-08-30 (UTC)
> Repositorio: https://github.com/julitodk06/lexiacode-website
> Rama activa: **fix/public-repo-hardening**
> Baseline de código analizada: **b20522be91df6e6b01a250d8407cd1d5ff1d4875**
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
| Lenguaje | TypeScript |
| UI | React 19, Tailwind CSS 4, componentes Radix UI/shadcn, Lucide |
| Tema y feedback | next-themes y Sonner |
| Renderizado | Exportación estática mediante **output: export** |
| Imágenes | Optimización de Next deshabilitada para permitir exportación estática |
| Persistencia | No existe base de datos |
| Backend | No existe API activa ni runtime de servidor |
| Integraciones | Contacto por mailto y WhatsApp; chatbot local determinista |
| CI | GitHub Actions con Node 20: instalación, ESLint, TypeScript, build y auditoría |
| Distribución | Artefacto estático generado en **out/**; todavía no desplegado |

### Arquitectura funcional

- **app/** contiene las rutas del App Router y el metadata institucional.
- **components/landing/** contiene navegación y secciones de presentación.
- **components/ui/** contiene primitives de interfaz y el chatbot local.
- **lib/language-context.tsx** administra el idioma activo y su persistencia local.
- **lib/translations.ts** concentra textos en español, inglés y portugués.
- **public/** contiene imágenes, logos y robots.txt.
- **app/sitemap.ts** genera sitemap.xml de manera estática.
- **.github/workflows/ci.yml** valida cada push a main o fix/* y cada PR hacia main.

### Módulos 100 % funcionales en el baseline analizado

| Módulo | Estado verificable |
|---|---|
| Navegación pública | Las rutas del App Router compilan como páginas estáticas |
| Sitio trilingüe | Español, inglés y portugués mediante LanguageContext y traducciones locales |
| Preferencia de idioma | Se conserva en localStorage bajo la clave **lexiacode-lang** |
| Tema claro/oscuro | Operativo mediante next-themes |
| Chatbot orientativo | Funciona sin API ni secretos; usa un flujo local determinista |
| Diagnóstico preliminar | Flujo conversacional por activo, documentación, alcance técnico y etapa |
| Formulario de contacto | Genera contacto explícito mediante mailto; no simula envíos a servidor |
| WhatsApp | Enlace directo al número profesional configurado |
| SEO base | Metadata institucional, robots.txt y sitemap.xml |
| Exportación estática | Build exitoso con 28 rutas generadas |
| CI | Run de referencia exitoso: https://github.com/julitodk06/lexiacode-website/actions/runs/33213659521 |
| Seguridad de dependencias | npm audit reportó 0 vulnerabilidades en el run de referencia |

### Rutas compiladas

Las siguientes rutas constituyen el contrato público actual:

- /
- /agentes-ia
- /blog
- /como-funciona
- /compliance
- /consultoria-legaltech
- /descargo-de-responsabilidad
- /documentacion
- /erc-3643
- /faq
- /guia-tokenizacion
- /mercado-secundario
- /politica-de-privacidad
- /proyectos-rwa
- /security-tokens
- /seguridad
- /servicios
- /smart-contracts
- /sobre-nosotros
- /software-microsaas
- /terminos-de-servicio
- /tokenizacion-de-activos
- /tokenizacion-inmobiliaria
- /tokenizacion-rwa
- /whitepaper
- /sitemap.xml
- /_not-found

## Contratos e Interfaces

### Contrato de ejecución

1. El proyecto debe continuar siendo un sitio **100 % exportable de forma estática**.
2. No se deben agregar Route Handlers, Server Actions, secretos ni dependencias de runtime servidor sin una decisión arquitectónica explícita.
3. El comando de producción válido es **npm run build**, que debe crear **out/**.
4. El repositorio debe poder reconstruirse desde un clon limpio con **npm ci**.
5. **package-lock.json** debe permanecer sincronizado con **package.json**.
6. No debe reintroducirse **GEMINI_API_KEY**, **/api/chat**, **send-email.php** ni un falso envío de formulario.

### Contratos de navegación pública

- Los enlaces internos deben resolverse con **next/link** o **next/navigation**.
- Deben preservarse los anchors existentes, especialmente **/#contacto**.
- Los enlaces externos deben conservar navegación segura y semántica apropiada.
- No se deben renombrar ni eliminar rutas públicas sin actualizar navegación, sitemap y pruebas de enlaces.

### Contrato de idiomas

- Tipo principal: **Language**, con valores soportados **es**, **en** y **pt**.
- Contexto: **LanguageContext**.
- Persistencia: **localStorage["lexiacode-lang"]**.
- Las claves de traducción utilizadas por componentes alcanzables deben existir en los tres idiomas.
- No deben quedar mensajes que prometan tiempos de respuesta no garantizados.

### Contrato del chatbot local

Tipo conceptual del mensaje:

~~~ts
type Message = {
  id: string
  text: string
  sender: "bot" | "user"
  timestamp: Date
}
~~~

Estados del diagnóstico:

~~~ts
type DiagnosticStep =
  | "none"
  | "asking-asset"
  | "asking-docs"
  | "asking-scope"
  | "asking-stage"
  | "result"

type DiagnosticData = {
  assetType?: string
  docsState?: string
  techScope?: string
  devStage?: string
}
~~~

Este flujo es informativo y preliminar. No debe convertirse en asesoramiento legal, financiero o de inversión, ni afirmar aprobación regulatoria.

### Contrato de contacto

Estado conceptual del formulario:

~~~ts
type ContactFormState = {
  name: string
  email: string
  company: string
  message: string
}
~~~

Canales públicos actuales:

- Email: **juliov@lexiacode.com**
- Teléfono visible: **+54 381 540 0016**
- WhatsApp: **https://wa.me/5493815400016**
- LinkedIn: **https://www.linkedin.com/in/julio-antonio-villalobo-770b22296**
- GitHub: **https://github.com/julitodk06**
- Web: **https://lexiacode.com**

El formulario no tiene backend. La interfaz debe comunicar de manera transparente que abre el cliente de correo o WhatsApp.

### Datos y APIs

- **Base de datos:** ninguna.
- **Esquemas de BD:** no aplican.
- **APIs propias:** ninguna.
- **DTOs de red:** no aplican.
- **Autenticación:** ninguna.
- **Pagos, custodia o emisión:** ninguno.

Agregar cualquiera de estos elementos cambia materialmente la arquitectura y requiere una fase separada, threat model, manejo de secretos, observabilidad y autorización expresa.

### Contrato institucional y de exactitud

Estas reglas son invariantes de contenido:

- LexiaCode se presenta como estudio de producto y tecnología liderado por Julio Antonio Villalobo.
- No se deben inventar socios, empleados, clientes, autorizaciones, certificaciones, auditorías externas, métricas, retornos, capital captado ni operaciones cerradas.
- No se debe presentar a LexiaCode como estudio jurídico, entidad regulada, intermediario financiero, fiduciario, custodio o plataforma de inversión.
- Smart contracts: es defendible afirmar diseño, escritura, modificación, pruebas y revisión de lógica y riesgos comunes; no una auditoría senior independiente ni seguridad absoluta.
- LexiaCode OS: dirección de producto, arquitectura funcional, coordinación, QA, seguridad y entrega por etapas; no afirmar que cada componente fue programado personalmente.
- Minería: solo una iniciativa propuesta sobre un activo valuado aproximadamente en USD 100 millones; trabajo preliminar de estructuración RWA/tokenización y due diligence; se recomendó no avanzar por riesgos legales y de contraparte.
- Turismo y real estate: propuestas preliminares que llegaron a conversaciones comerciales; la formación de capital no se completó.
- Inglés: **Business English**, con estudio y práctica diaria; no fluidez nativa.
- Formación en programación de 2020 en la Universidad Nacional de Tucumán: estudios, no título universitario completo.
- Diferenciar siempre trabajo personal, coordinación, trabajo del equipo y uso de herramientas de IA.

## Deuda Técnica y Errores

### Prioridad P0 — bloquea el cierre del PR

| Hallazgo | Evidencia | Impacto |
|---|---|---|
| ESLint termina con 11 warnings | Siete páginas usan anchors internos; header.tsx tiene tres redirecciones internas por window.location.href y un anchor interno | CI verde pero calidad incompleta; navegación no idiomática |
| CI permite warnings | Script actual: **eslint .** | Nuevos warnings pueden entrar sin bloquear |
| README con Markdown roto | Bloques de comandos usan cercas incorrectas y aparece **pm >= 10.x** | Onboarding defectuoso |
| Script de start incompatible | **next start** no corresponde a un proyecto con **output: export** | Contrato operativo engañoso |
| Traducciones obsoletas | Mensajes ES/PT prometen respuesta en 24 horas aunque el envío remoto fue eliminado | Promesa no defendible y texto muerto |
| Actions con runtime deprecado | checkout@v4 y setup-node@v4 generan advertencias | Deuda inmediata de CI |
| ESLint no soportado por el entorno | npm reporta advertencia para eslint@9.39.5 | Toolchain ruidosa y potencialmente frágil |

Warnings de ESLint identificados:

- app/blog/page.tsx:360
- app/erc-3643/page.tsx:119
- app/mercado-secundario/page.tsx:97
- app/security-tokens/page.tsx:110
- app/tokenizacion-de-activos/page.tsx:115
- app/tokenizacion-inmobiliaria/page.tsx:108
- app/tokenizacion-rwa/page.tsx:104
- components/landing/header.tsx:82
- components/landing/header.tsx:96
- components/landing/header.tsx:169
- components/landing/header.tsx:287

Traducciones obsoletas identificadas:

- lib/translations.ts:367 — promesa ES de respuesta en menos de 24 horas.
- lib/translations.ts:574 — promesa PT de respuesta en hasta 24 horas.

### Prioridad P1 — mantenimiento y cobertura

| Hallazgo | Estado |
|---|---|
| Código no alcanzable | Análisis estático preliminar: 65 de 113 módulos no aparecen alcanzables desde las rutas actuales |
| Secciones landing antiguas | benefits, faq-section, featured-project, hero, lead-magnet-section, pain-points, platform-demo, press-section, security y services requieren clasificación y posible eliminación |
| Assets sin referencia | Se identificaron 24 archivos públicos posiblemente huérfanos; deben validarse antes de borrar |
| Dependencias sobredimensionadas | package.json declara 49 dependencias y el lock instala 513 paquetes; varias parecen no importadas |
| Sin tests automatizados | CI solo cubre lint, tipos, build y audit; no existen pruebas unitarias, de componentes ni E2E |
| Sin verificación de enlaces | No hay prueba que detecte rutas internas rotas, anchors faltantes o enlaces externos inválidos |

Las dependencias y assets solo deben eliminarse después de una verificación de alcance, build y búsqueda de referencias. No se autoriza una limpieza masiva a ciegas.

### Prioridad P2 — gobierno y operación

| Hallazgo | Riesgo o condición |
|---|---|
| main sin protección | Un push directo podría omitir revisión y checks |
| Historial conserva archivos eliminados | La rama quitó assets y código problemático del árbol actual, pero permanecen en commits anteriores; reescribir historial requiere autorización explícita y force push |
| Sin despliegue validado | Todavía no existe evidencia de preview o producción para esta versión |
| Sin smoke test de hosting estático | Debe comprobarse navegación real, 404, sitemap y assets en el proveedor elegido |

## Roadmap de Fases Atómicas

Cada fase debe ejecutarse sobre una rama específica, producir un commit revisable y terminar con criterios objetivos. No avanzar a la siguiente fase si la anterior falla.

### FASE 1 — Cierre de calidad del PR #1 [✓ COMPLETADA]

**Objetivo:** dejar el PR actual sin warnings, con documentación operativa correcta y CI determinista.
**Estado:** COMPLETADA en SHA `b20522be91df6e6b01a250d8407cd1d5ff1d4875`.
**Resultados verificados:**
- `npm ci`: Código 0 (505 paquetes auditados).
- `npm run lint`: Código 0 (0 errores, 0 warnings con `--max-warnings=0`).
- `npm run typecheck`: Código 0.
- `npm run build`: Código 0 (28 rutas estáticas exportadas).
- `npm audit --audit-level=high`: Código 0 (0 vulnerabilidades).
- CI Run 33289008319 en GitHub Actions: Exitoso (verde).

### FASE 2A — Inventario reproducible de código, assets y dependencias [✓ COMPLETADA]

**Objetivo:** construir un inventario auditable y determinista sin modificar el código ni eliminar archivos.
**Estado:** COMPLETADA en `docs/PHASE_2A_REACHABILITY_AUDIT.md` y `scripts/audit-reachability.mjs`.
**Resultados verificados:**
- 112 módulos totales (49 alcanzables, 67 candidatos no alcanzables).
- 53 assets estáticos (28 referenciados, 25 candidatos no referenciados).
- 49 dependencias declaradas (10 directamente importadas, 2 indirectas, 37 candidatas a poda).
- 0 imports locales rotos, 0 assets referenciados inexistentes.

### FASE 2B — Poda segura de código, assets y dependencias [⏳ Pendiente de Autorización]

**Objetivo:** reducir superficie y peso eliminando código muerto, assets huérfanos y dependencias no utilizadas en lotes pequeños, sin alterar rutas ni apariencia pública.

1. Lote 1: Eliminar secciones obsoletas de `components/landing/` y CSS duplicado.
2. Lote 2: Eliminar componentes UI no utilizados en `components/ui/`.
3. Lote 3: Eliminar assets huérfanos en `public/` (preservando `robots.txt` y assets activos).
4. Lote 4: Podar dependencias en `package.json` y regenerar lockfile.
5. Verificar build y comparar visualmente las rutas críticas.

**Aceptación:** cero imports rotos, cero assets 404, 28 rutas estáticas conservadas, CI verde y reducción documentada de módulos/paquetes.

### FASE 3 — Cobertura automatizada mínima

**Objetivo:** detectar regresiones funcionales antes del merge.

1. Agregar pruebas unitarias del LanguageContext y del estado del chatbot.
2. Agregar pruebas de componente para contacto y navegación.
3. Agregar smoke tests de rutas, anchors y sitemap sobre el export estático.
4. Integrar tests al workflow como check obligatorio.

**Aceptación:** tests deterministas, CI verde y fallos demostrables ante enlaces o claves de traducción rotas.

### FASE 4 — Auditoría de accesibilidad, SEO y contenido

**Objetivo:** asegurar consistencia pública y profesional.

1. Validar jerarquía de headings, nombres accesibles, contraste y teclado.
2. Verificar canonical, Open Graph, sitemap, robots y datos estructurados.
3. Revisar las tres traducciones y eliminar claves muertas.
4. Verificar que toda afirmación respete el contrato institucional.

**Aceptación:** informe por ruta crítica, cero errores críticos de accesibilidad y cero claims no defendibles.

### FASE 5 — Gobierno del repositorio

**Objetivo:** proteger la fuente de verdad después de aprobar el PR.

1. Decidir si es necesario sanear historial; no hacerlo sin autorización.
2. Definir protección de main, revisión requerida y checks obligatorios.
3. Documentar estrategia de ramas, releases y rollback.
4. Convertir el PR a Ready solo con autorización del propietario.

**Aceptación:** reglas de rama verificadas, proceso de release documentado y ninguna reescritura destructiva no autorizada.

### FASE 6 — Preview y despliegue controlado

**Objetivo:** publicar el export estático con validación previa.

1. Crear preview aislado.
2. Ejecutar smoke tests reales de navegación, assets, 404, sitemap y formularios.
3. Obtener autorización explícita de producción.
4. Desplegar y verificar dominio, TLS, analytics consentidos y rollback.

**Aceptación:** preview aprobado, producción autorizada, verificación post-deploy y plan de reversión probado.

## Primera tarea pendiente

La próxima unidad de trabajo es exactamente:

**FASE 2B — Poda segura de código, assets y dependencias**

## Prompt exacto para iniciar la primera tarea

~~~text
Actúa como Lead Architect y ejecuta exclusivamente la tarea “FASE 2B — Poda segura de código, assets y dependencias” definida en PROJECT_STATE.md del repositorio público julitodk06/lexiacode-website, siguiendo el inventario de docs/PHASE_2A_REACHABILITY_AUDIT.md.

Antes de modificar:
1. Lee PROJECT_STATE.md y docs/PHASE_2A_REACHABILITY_AUDIT.md completos.
2. Confirma que estás en la rama fix/public-repo-hardening y que el PR #1 sigue Draft.
3. Registra el SHA inicial y ejecuta git status.
4. No trabajes sobre main y no crees otra rama.
5. No hagas merge, deploy, force push, cambios de DNS, variables de entorno ni secretos.

Implementa en lotes pequeños:
- Lote 1: Eliminar secciones landing obsoletas y styles/globals.css.
- Lote 2: Eliminar componentes UI no utilizados.
- Lote 3: Eliminar 24 assets estáticos huérfanos (conservando robots.txt).
- Lote 4: Podar dependencias no utilizadas en package.json y regenerar package-lock.json.

Validación obligatoria tras cada lote:
- git diff --check
- npm ci
- npm run audit:reachability
- npm run lint
- npm run typecheck
- npm run build (28 rutas estáticas)
- npm audit --audit-level=high

Al terminar:
1. Muestra el diff resumido y los resultados exactos de validación.
2. Haz un único commit con mensaje: chore: prune dead code, unused assets and dependencies (phase 2b)
3. Push únicamente a fix/public-repo-hardening.
4. Espera y verifica el GitHub Actions run asociado.
5. Mantén el PR #1 en Draft. No lo fusiones ni despliegues.
~~~
