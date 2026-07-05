# Changelog — cambios sobre la marcha

> Bitácora cronológica de cambios: en la máquina, en decisiones, en el repo. Grano más fino que [completado.md](completado.md) (que registra hitos). Formato: fecha + qué + por qué.

## 2026-07

### 2026-07-04
- **[repo/presupuesto]** 🔒 Creada la sección `presupuesto/` (interna, solo v3): Excel de 4 hojas (Resumen, Materiales con COP/USD/tasa de cambio, Horas por proceso y rol, Tarifas por rol) + espejo CSV en `datos/`. Nuevas reglas 10 y 11 en AGENTS.md (presupuesto confidencial; v1/v2 historia congelada).
- **[seguridad]** Anotado que el protector propio del K30 no reemplaza el domo: los reflejos difusos sobre el material son el riesgo que el domo mitiga.
- **[investigación/seguridad]** ⚠️ Resuelto el tema prioritario de protección ocular: el acrílico rojo genérico (domo v2) NO es protección certificada para 30W @ 450 nm — se requiere acrílico naranja con OD 3+ para 405–450 nm. Hallazgo con fuentes en `conocimiento/maquina/subsistemas/seguridad.md`. Decisión de material pendiente.
- **[repo]** Creado el repositorio completo: estructura de dos capas, AGENTS.md como contexto principal, CLAUDE.md como referencia.
- **[decisión]** D-0001 a D-0006 registradas (idioma, YAML, media externa, K30, dos rieles, plataforma GRBL).
- **[investigación]** Ficha Laser Tree K30 con fuentes: 30W ópticos, 450 nm, 24V/5A, air assist integrado. Detectado que la referencia recordada "tri-j30" era incorrecta.
- **[máquina]** Documentado el estado: mecánica ✅, electrónica/eléctrica 🔧 en curso.
