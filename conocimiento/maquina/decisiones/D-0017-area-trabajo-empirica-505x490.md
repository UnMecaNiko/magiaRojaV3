# D-0017 — Área de trabajo real medida: 505 × 490 mm (soft limits finales)

- **Fecha**: 2026-08-17
- **Ámbito**: Máquina (GRBL / mecánica)
- **Estado**: ✅ Vigente
- **Decisor**: Nicolas Velasquez Lopez
- **Relacionada con**: [D-0015](D-0015-area-de-trabajo-500x500.md) (área nominal 500×500), [D-0011](D-0011-fin-de-carrera-fisico-en-z.md) (homing)

## Contexto

Con homing (`$H`) funcionando y soft limits reactivados (`$20=1`), el responsable midió **empíricamente** el recorrido máximo alcanzable de cada eje en la máquina física y fijó los soft limits a esos valores.

## Decisión

Los recorridos máximos reales (soft limits) son **valores finales medidos**, no tentativos:

| Eje | `$` | Valor final | 
|---|---|---|
| X | `$130` | **505 mm** |
| Y | `$131` | **490 mm** |
| Z | `$132` | **85 mm** (medido 2026-08-17) |

Estos definen el **área de trabajo máxima real** de la Magia Roja v3 en el plano XY: **505 × 490 mm**.

## Consecuencias

- El área nominal de marketing sigue siendo **500 × 500 mm** ([D-0015](D-0015-area-de-trabajo-500x500.md)); la envolvente real medida es 505 × 490. X supera el nominal; **Y queda ~10 mm por debajo (490 vs 500)**.
- ⚠️ Revisar si el material comercial/web (que publica 500×500 por D-0015) debe matizarse: el eje Y real llega a 490 mm. Decisión de cómo comunicarlo queda para el responsable — este ADR solo registra la medida física.
- Los soft limits (`$20=1`) protegen contra exceder estos valores en los tres ejes: X (505), Y (490) y **Z (85 mm, medido)**.
- Estos valores quedaron horneados en `defaults.h` del firmware para que un `$RST=$` restaure la máquina — ver [firmware-config-h.md](../parametros/grbl/firmware-config-h.md).
