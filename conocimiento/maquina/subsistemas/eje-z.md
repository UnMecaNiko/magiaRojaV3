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
3. ✅ **Decidido (2026-07-22)**: sí lleva final de carrera / homing en Z — [D-0011](../decisiones/D-0011-fin-de-carrera-fisico-en-z.md). Motivado por un hallazgo real: sin switch, el K30 a alta potencia disparaba falsas alarmas de hard limit (detalle en la [prueba](../pruebas/2026-07-22-diagnostico-alarma-laser-k30.md)). Falta resolver, en orden:
   - **Mecánico**: cómo fijar/montar el switch en la posición Z+ (arriba/retraído) — ⏳ en investigación.
   - Tipo de switch (mecánico/óptico/inductivo) y si es NO o NC → define `$5`.
   - Cablear la señal al header **D12 ("SpnEn")** de la CNC Shield — **no** al terminal "Z-" (ocupado por el PWM del láser K30).
   - `$23` (dirección de home de Z), `$24`/`$25` (feed/seek homing), `$26` (debounce), `$27` (pull-off) específicos de Z.
   - Orden del ciclo de homing en `config.h` (`HOMING_CYCLE_0`/`_1`) — candidato: Z primero (retrae), luego X/Y, como el stock de GRBL.
   - Reactivar `$20`/`$21` una vez instalado y probado.
4. Configuración GRBL: `$102`, `$112`, `$122`, `$132` (recorrido real de Z, pendiente de medir) — registrar en [parametros/grbl/](../parametros/grbl/).
5. Peso máximo de cabezal que el Z soporta sin perder pasos (probar con K30 y con motor de fresado — el de fresado suele pesar más).
