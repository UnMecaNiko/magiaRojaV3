# Subsistema: Cabezal de fresado (intercambiable)

> **Estado: concepto definido, integración ⏳ pendiente**
> Última actualización: 2026-07-04

## Resumen

**Novedad de la v3**: el cabezal es intercambiable. Se puede quitar el láser y montar un **motor de fresado/grabado rotativo** (motor tool), devolviendo a la línea la capacidad de grabado mecánico que tuvo la v1 (que usaba un motor rotativo antes del láser).

Junto con el [eje Z motorizado](eje-z.md), esto convierte a la v3 en una máquina híbrida: **cortadora/grabadora láser + fresadora ligera**.

## Lo que se sabe

- El diseño mecánico contempla el intercambio láser ↔ motor de fresado.
- El modelo exacto del motor de fresado **no es prioritario por ahora** (decisión del autor, 2026-07).

## Aplicaciones objetivo

- Grabado sobre materiales donde el láser no es ideal (p. ej. algunos metales, efectos de relieve).
- Fresado ligero de madera, acrílico y similares.

## Pendientes

⏳ PENDIENTE:

1. Modelo, potencia y RPM del motor de fresado.
2. Mecanismo de montaje/desmontaje (documentar con fotos como paso de tutorial).
3. Alimentación del motor de fresado (¿riel de 12V? ¿fuente propia? — definir con su consumo).
4. Perfil GRBL para fresado (aceleraciones/velocidades distintas del modo láser) → [parametros/perfiles/](../parametros/perfiles/).
5. Workholding: ¿se reutiliza el concepto de mesa perforada + prensas de la v1 para fresado?
