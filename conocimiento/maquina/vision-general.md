# CNC Magia Roja v3 — Visión general

## Qué es

La tercera iteración de la CNC Magia Roja: una máquina CNC de escritorio para **corte y grabado láser** y, por primera vez en la línea, **fresado/grabado rotativo con cabezal intercambiable**. Construida por el equipo padre-hijo:

- **Saul Velasquez Velasquez** — diseño y construcción mecánica.
- **Nicolas Velasquez Lopez** (@unmecaniko) — electrónica, eléctrica y sistemas de control.

## Qué la diferencia de la v2

| Aspecto | v2 | v3 |
|---|---|---|
| Área de trabajo | 400 × 400 mm | Mayor — ⏳ PENDIENTE: medidas finales |
| Ejes | X/Y | X/Y + **eje Z motorizado** (NEMA 17) |
| Herramienta | Láser fijo | **Cabezal intercambiable**: láser ↔ motor de fresado |
| Láser | 80W eléctricos / 10W ópticos (FAC) | **Laser Tree K30 — 30W ópticos reales** |
| Alimentación | Fuente única | **Dos rieles**: 24V/5A propia del láser + 12V/10A para control |
| Conexión eléctrica | Básica | Mejorada (conectores y cableado de calidad — en desarrollo) |

El salto de láser es de categoría, no incremental: de ~10W ópticos a **30W ópticos** (~3× la potencia de corte real).

## Estado actual (julio 2026)

- ✅ **Mecánica**: desarrollada y terminada.
- 🔧 **Electrónica y eléctrica**: en desarrollo — fase actual del proyecto.
- ⏳ Pendientes de definición: medidas del área de trabajo, detalles del husillo del eje Z, modelo del motor de fresado.

## Filosofía de la línea Magia Roja

1. **Precisión mecánica primero**: estructura rígida de aluminio y acero, tornillos helicoidales en vez de correas (desde v2).
2. **Electrónica confiable**: refrigeración activa de drivers, cableado organizado, protecciones (paro de emergencia, sobrecarga).
3. **Seguridad**: domo acrílico rojo para protección ocular, extracción de humos.
4. **Producto comercial**, no solo hobby: cada versión ha operado en producción real (v1 >8 h/día) y la v2 se vendió a un cliente.

## Contexto de negocio

Emprendimiento familiar de fabricación digital: producción de letreros, arte, publicidad y piezas personalizadas, más la venta de las máquinas mismas. Ver [comercial/](../../comercial/) para propuesta de valor y casos de uso.

## Historia

El linaje completo (v1 2021–2024, v2 2024–2026, evolución) está en [conocimiento/historia/](../historia/).
