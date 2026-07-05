# Paso 02 — Electrónica y eléctrica

> **Estado**: 🔧 EN CURSO — este es el paso activo del proyecto
> **Responsable**: Nicolas Velasquez
> **Fecha de inicio**: 2026-07 (aprox.)

## Objetivo

Diseñar e implementar toda la electrónica y eléctrica de la v3: alimentación de dos rieles, cableado de calidad, controladora GRBL, drivers, integración del láser K30 y del eje Z.

## Plan del paso (borrador — refinar sobre la marcha)

- [ ] Diseñar el layout eléctrico ANTES de cablear (lección v1) — dos rieles: 12V/10A y 24V/5A del K30 ([D-0005](../../maquina/decisiones/D-0005-fuentes-separadas.md)).
- [ ] Seleccionar conectores y calibres de cable (investigar en internet, citar fuentes).
- [ ] Montar controladora Arduino + CNC Shield; confirmar drivers.
- [ ] Cablear motores X/Y/Z con gestión de cable para ejes móviles.
- [ ] Integrar señal PWM/TTL del K30 (verificar pinout con el manual).
- [ ] Paro de emergencia que corte ambos rieles + protecciones.
- [ ] Ventilación/refrigeración de drivers (lección v2).

## Bitácora

> Registrar aquí cada sesión de trabajo con fecha: qué se hizo, qué salió mal, qué se aprendió, fotos (URLs). Este material es el corazón del tutorial de electrónica.

*(Sin entradas todavía — agregar la primera cuando arranque el cableado.)*

## Salidas esperadas de este paso

- Esquemático eléctrico → [subsistemas/electrica.md](../../maquina/subsistemas/electrica.md)
- Primera config GRBL → [parametros/grbl/](../../maquina/parametros/grbl/) (snapshot + changelog)
- Fichas de componentes nuevos → [componentes/fichas/](../../maquina/componentes/fichas/)
- Decisiones que surjan → [decisiones/](../../maquina/decisiones/)
