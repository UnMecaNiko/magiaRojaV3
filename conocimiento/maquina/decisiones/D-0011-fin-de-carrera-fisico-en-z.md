# D-0011 — Instalar fin de carrera físico en Z (posición Z+), cableado a D12

- **Fecha**: 2026-07-22
- **Ámbito**: Máquina (mecánica + GRBL)
- **Estado**: ✅ Vigente
- **Decisor**: Nicolas Velasquez
- **Relacionada con**: [D-0009](D-0009-z-sin-fin-de-carrera-soft-limits.md), [D-0010](D-0010-soft-limits-apagados-hasta-fin-de-carrera-z.md)

## Contexto

D-0010 dejó pendiente instalar un fin de carrera físico en Z como solución definitiva, tras apagar los soft limits (`$20=0`) tomando el aviso "problema con la placa" de LaserGRBL como riesgo abierto. La investigación registrada en la prueba [2026-07-22-diagnostico-alarma-laser-k30](../pruebas/2026-07-22-diagnostico-alarma-laser-k30.md) encontró la causa raíz exacta de ese aviso:

- Con modo láser (`$32=1`), GRBL usa `VARIABLE_SPINDLE`, que reasigna el límite de Z de D11 a **D12** para liberar D11 como salida PWM de hardware (código fuente citado en la prueba).
- El terminal "Z-" de la CNC Shield está cableado a D11 (por eso el K30 recibe bien el PWM ahí), pero esto deja **D12 — el límite real de Z en este modo — flotando**, sin nada conectado.
- Con `$21=1` (hard limits), GRBL vigila D12; el ruido EMI del driver del K30 (proporcional a la potencia/corriente) lo hace leer como límite activado → alarma de hard limit → LaserGRBL reporta "problema con la placa". Confirmado con tres pruebas controladas (ver prueba enlazada).

## Decisión

Se instala un **fin de carrera físico en Z, en la posición Z+ (arriba / extremo retraído del recorrido)**, cableado al header **D12 ("SpnEn"/Spindle Enable) de la CNC Shield — no al terminal "Z-"** (ese ya está ocupado por el PWM del láser).

Esto resuelve la causa raíz de forma permanente (D12 deja de estar flotando) y además habilita, una vez instalado y probado:
- Incorporar Z al ciclo de homing (`$H`) — máquina-cero real y repetible en los tres ejes.
- Reactivar `$20=1` (soft limits) de forma correcta en los tres ejes (ya no aplica el problema de "lado fijo en 0 arbitrario" descrito en D-0010, porque el 0 de Z pasa a ser un punto físico real).
- Reactivar `$21=1` (hard limits) sin el riesgo de falsa alarma por el K30.

## Mientras el switch no esté instalado

- `$20=0` y `$21=0` — sin protección de soft ni hard limit en ningún eje. Costo temporal aceptado hasta cerrar este pendiente.

## Pendientes para cerrar esta decisión

1. **Mecánico**: definir y resolver cómo fijar/montar el switch en la posición Z+ del eje (⏳ en investigación por el usuario).
2. Elegir tipo de switch (mecánico/óptico/inductivo) y si es NO o NC (define `$5`, invert limit pins).
3. Cablear la señal a D12 (header "SpnEn" de la shield), confirmando continuidad con multímetro antes de dar por hecho el pin físico.
4. Definir `$23` (dirección de home de Z, según el extremo físico), `$24`/`$25` (feed/seek de homing), `$26` (debounce), `$27` (pull-off) — específicos para Z.
5. Decidir el orden del ciclo de homing en `config.h` (`HOMING_CYCLE_0`/`_1`) — candidato natural: volver al stock de GRBL (Z primero, retrae; luego X/Y), distinto del `config.h` heredado que excluía a Z por completo.
6. Medir el recorrido real de Z → `$132`.
7. Reactivar `$20=1` y `$21=1` una vez instalado y probado; actualizar `grbl-actual.yaml`.
8. Si en el ínterin se aplicó alguna mitigación de la prueba (capacitor en D12, o exclusión de Z en `LIMIT_MASK`) — revertirla / confirmar que sigue siendo compatible con el switch real.

Detalle y checklist ampliado en [eje-z.md](../subsistemas/eje-z.md) y [plan-de-trabajo.md](../../../harness/planeacion/plan-de-trabajo.md).

## Consecuencias

- Resuelve de raíz el aviso "problema con la placa" del K30, sin necesidad de parches (capacitor) ni de renunciar permanentemente a la protección de hard limit en Z.
- Es la única de las opciones evaluadas que además le da a Z una referencia de máquina real (las otras dos — capacitor o excluir a Z de `LIMIT_MASK` — solo tapaban el síntoma).
