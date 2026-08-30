# Auditoría de Gobierno y Preparación de Release del PR #1 — FASE 5A

**Fecha:** 2026-08-30
**Repositorio:** `julitodk06/lexiacode-website`
**Rama:** `fix/public-repo-hardening`
**Base:** `main`
**Estado:** `[✓ AUDITORÍA DE GOBIERNO COMPLETADA — SOLO LECTURA]`

---

## 1. Estado Actual del Repositorio

- **Nombre:** `julitodk06/lexiacode-website`
- **Visibilidad:** Público (`isPrivate: false`)
- **Rama por defecto:** `main`
- **Configuración de Merge:**
  - `mergeCommitAllowed`: `true`
  - `squashMergeAllowed`: `true`
  - `rebaseMergeAllowed`: `true`
  - `deleteBranchOnMerge`: `false`

---

## 2. Estado Exacto del Pull Request #1

- **Título:** `fix: harden public portfolio and static export`
- **URL:** https://github.com/julitodk06/lexiacode-website/pull/1
- **Número:** #1
- **Estado:** `OPEN` (Modo **DRAFT**)
- **Mergeability:** `MERGEABLE` (Estado: `CLEAN`)
- **Base Ref:** `main` (SHA base: `9a3210d7881be3d604fe7d48cb94d48029ca7c07`)
- **Head Ref:** `fix/public-repo-hardening` (SHA actual: `9482fb45ae8074d2847d018feeaebdbb369f626c`)
- **Commits ahead / behind:** 18 commits adelante de `main`, 0 commits detrás (`0 / 18`).
- **Diff estadístico:** 164 archivos intervenidos (+11.223 / -12.559 líneas netas).
- **Revisiones actuales:** 0 aprobaciones requeridas, 0 conversaciones bloqueantes abiertas.

---

## 3. Estado de CI y Checks Automatizados

- **Workflow:** `.github/workflows/ci.yml` (`CI / build-and-test`)
- **Ejecución en Node.js:** 20 LTS
- **Gates automatizados en CI:**
  1. `npm ci` (Instalación limpia y reproducible)
  2. `npm run lint` (ESLint 9 Flat Config con typescript-eslint)
  3. `npm run typecheck` (Validación estricta de TypeScript)
  4. `npm run test:run` (16 tests unitarios/integración con Vitest)
  5. `npm run build` (Compilación estática pura `output: 'export'`)
  6. `npm run test:static` (Auditoría de 28 endpoints estáticos, enlaces, canonicals y SEO)
  7. `npm run audit:reachability` (Reconciliación matemática de archivos y dependencias)
  8. `npm audit --audit-level=high` (Auditoría de seguridad contra vulnerabilidades)
- **Estado último run:** `SUCCESS` (todos los gates aprobados en verde).

---

## 4. Estado de Protección de la Rama `main`

- **Branch Protection API:** Retorna HTTP 404 (`Branch not protected`).
- **Rulesets API:** Retorna `[]` (Sin rulesets configurados).
- **Diagnóstico:** La rama `main` no cuenta actualmente con reglas de protección configuradas en GitHub. Cualquier commit o push directo a `main` es técnicamente posible en la configuración actual.

---

## 5. Matriz de Riesgos Identificados

| Riesgo | Impacto | Mitigación Propuesta |
| :--- | :---: | :--- |
| **Push directo accidental a main** | Alto | Configurar regla de protección que requiera PR antes de merge. |
| **Bypass de CI en merge** | Alto | Exigir el status check obligatorio `build-and-test` en la rama `main`. |
| **Bloqueo por falta de segundo reviewer** | Medio | Dado que es un proyecto unipersonal (single maintainer), no exigir aprobación obligatoria de terceros si bloquea al propietario. |
| **Pérdida de trazabilidad histórica** | Medio | Evaluar detalladamente la estrategia de merge (Squash vs Merge Commit vs Rebase). |

---

## 6. Plan Recomendado de Protección de `main` (Para Administrador Único)

Se propone la siguiente configuración para la rama `main` en GitHub (pendiente de autorización para su aplicación):

1. **Requerir Pull Request antes de Merge:** Habilitado.
2. **Requerir aprobaciones de terceros:** Deshabilitado o con bypass para el administrador (`julitodk06`), evitando el bloqueo operativo de un solo mantenedor.
3. **Requerir Status Checks de CI:** Habilitar como obligatorio el check exacto:
   - `build-and-test` (de la acción `CI`).
4. **Requerir que la rama esté actualizada antes de merge:** Habilitado.
5. **Bloquear Force Push (`Allow force pushes: false`):** Habilitado.
6. **Bloquear Eliminación de la Rama (`Allow deletions: false`):** Habilitado.
7. **Requerir resolución de conversaciones:** Habilitado.

---

## 7. Comparativa de Estrategias de Merge

| Estrategia | Efecto sobre los 18 commits | Ventajas | Desventajas |
| :--- | :--- | :--- | :--- |
| **Squash Merge** | Condensa los 18 commits de hardening en **1 único commit atómico** en `main`. | Historial de `main` 100% limpio y lineal; mensaje de commit consolidado con referencia al PR #1; fácil rollback con `git revert <single_commit>`. | Se aplana el desglose granular commit por commit de las subfases (aunque se preserva intacto en el historial del PR #1 en GitHub). |
| **Merge Commit** (`--no-ff`) | Crea un commit de merge preservando los 18 commits individuales en la historia de `main`. | Preserva el árbol de commits completo con sus SHAs y mensajes de subfases. | Genera un historial más verboso en `main`; rollback requiere revertir el commit de merge o commits individuales. |
| **Rebase Merge** | Reescribe y reproduce los 18 commits directamente sobre la punta de `main`. | Historial lineal sin commit de merge. | Modifica los hashes de los commits; no genera commit de merge representativo del hito. |

> **Recomendación técnica del Lead Architect:** Se recomienda **Squash Merge** o **Merge Commit** según la preferencia de Julio:
> - **Squash Merge** es la práctica estándar en repositorios de producto modernos para mantener `main` como un registro limpio de entregas estables.
> - La decisión final queda supeditada a la autorización expresa del propietario.

---

## 8. Estrategia de Release y Rollback

### Release (Despliegue Estático)
1. Una vez ejecutado el merge a `main`, generar un Git Tag semántico (ej: `v1.0.0-hardened`).
2. La compilación de producción en GitHub Actions o entorno local genera el directorio `out/`.
3. Despliegue estático copiando exclusivamente el contenido de `out/` hacia el servicio de hosting (Hostinger / servidor web estático).

### Rollback
1. El rollback ante incidencias en producción se realiza **redesplegando el artefacto `out/` previo verificado**.
2. No se requiere ni autoriza reescribir el historial con `git reset --hard`.
3. En caso de reversión a nivel de código fuente en `main`, se utiliza un commit inverso mediante `git revert <merge_commit_sha>`.

---

## 9. Checklist Previo a Convertir el PR #1 a "Ready for Review"

- [x] Worktree limpio y sincronizado con `origin/fix/public-repo-hardening`.
- [x] 100% de tests pasando (16 tests automatizados).
- [x] Cero errores de TypeScript y cero warnings de ESLint.
- [x] Exportación estática de 28 endpoints estáticos validada.
- [x] Cero secretos, cero endpoints de backend residuales, cero `fetch` de red.
- [x] Trazabilidad documental completa (Fases 1, 2A, 2B, 3, 3.1, 4A, 4B, 4B.1).
- [ ] Decisión explícita de Julio sobre estrategia de merge (Squash vs Merge Commit).
- [ ] Autorización expresa para retirar el estado Draft del PR #1.

---

## 10. Acciones que Continúan Pendientes de Autorización Expresa

1. Aplicar reglas de protección de rama en GitHub.
2. Modificar el estado del PR #1 de Draft a Ready for Review.
3. Fusionar el PR #1 hacia `main`.
4. Crear tags de Git o releases en GitHub.
5. Realizar despliegues o publicar artefactos en servidores remotos o servicios de hosting (FASE 6).
