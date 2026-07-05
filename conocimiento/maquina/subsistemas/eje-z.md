# Subsistema: Eje Z motorizado

> **Estado: mecánica ✅ / electrónica 🔧**
> Última actualización: 2026-07-04

## Resumen

**Novedad de la v3.** Las versiones anteriores tenían la herramienta a altura fija (el foco se ajustaba manualmente). La v3 incorpora un eje Z motorizado que sube y baja el cabezal, lo que habilita:

1. **Enfoque automático/repetible del láser** — ajustar la distancia focal (40 mm en el K30) por comando en vez de a mano.
2. **Fresado real** — el fresado exige control de profundidad por pasadas; sin Z motorizado el cabezal de fresado no tendría sentido.
3. Adaptación a materiales de distinto espesor sin recalibrar a mano.

## Lo que se sabe

- Motor: **NEMA 17** (igual que X/Y — un solo tipo de motor en toda la máquina simplifica repuestos).
- La mecánica del eje ya está construida (fase mecánica terminada).

## Pendientes

⏳ PENDIENTE — completar cuando se integre la electrónica:

1. Tipo de transmisión del Z (husillo/tornillo) y paso → determina `$102` (pasos/mm).
2. Recorrido útil del eje.
3. ¿Final de carrera / homing en Z? Decidir e integrar.
4. Configuración GRBL: `$102`, `$112`, `$122` — registrar en [parametros/grbl/](../parametros/grbl/).
5. Peso máximo de cabezal que el Z soporta sin perder pasos (probar con K30 y con motor de fresado — el de fresado suele pesar más).
