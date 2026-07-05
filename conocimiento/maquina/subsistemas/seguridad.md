# Subsistema: Seguridad

> **Estado: 🔧 en definición** — ⚠️ incluye hallazgo crítico sobre protección ocular
> Última actualización: 2026-07-04

## Protecciones heredadas de la v2 (mantener)

- Paro de emergencia — en v3 debe cortar **ambos rieles** (12V y 24V, ver [D-0005](../decisiones/D-0005-fuentes-separadas.md)).
- Protección de sobrecarga.
- Extracción de humos.
- Domo de protección ocular — **ver hallazgo abajo: el material debe cambiar**.

## ⚠️ Hallazgo: el acrílico rojo genérico NO es protección certificada para 450 nm

Investigado el 2026-07-04 (regla [como-investigar](../../../harness/guias/como-investigar.md)). La v2 usaba domo de acrílico rojo translúcido de 5 mm con un láser de 10W ópticos. La v3 triplica la potencia (30W ópticos @ 450 nm) y la investigación muestra:

1. **El color no certifica**: la protección láser se mide en **densidad óptica (OD)** a la longitud de onda específica, no por el color del material. El acrílico rojo genérico no tiene OD especificada.
2. En la comunidad LightBurn, expertos describen el rojo como **opción de emergencia**, menos protector que el naranja sintonizado; el material recomendado es **acrílico naranja específico para 405–450 nm**.
3. Existe material accesible y probado: p. ej. J Tech Photonics "Laser Safety Shielding 250–520 nm", **OD 3+ probado a 405 y 445 nm**, >55% de transmisión visible, ~USD 17 (30×30 cm) / ~USD 90 (60×60 cm).
4. **OD 3+ significa ≤0.1% de transmisión**: de 30W pasarían ≤30 mW en el peor caso de haz directo — suficiente para **reflejos difusos** (su uso previsto en carcasas de grabadores de diodo), pero **no para mirar el haz directo**. Ventanas certificadas de mayor exigencia llegan a OD 5+/6+ en 190–550 nm.

### Nota sobre el protector propio del K30

El módulo K30 incluye su propio protector/escudo. Sin embargo, **esto no elimina la necesidad del domo**: al impactar el material, el haz se **refleja** (reflexión difusa) en todas direcciones, y esa luz dispersa a 30W sigue siendo peligrosa para los ojos de quien observa. El protector del módulo cubre el haz cerca de la boquilla; el domo protege contra los reflejos del área de trabajo completa. Por eso el material del domo sigue siendo crítico.

### Implicaciones de diseño para la v3

- ❌ **No reutilizar acrílico rojo genérico como única protección ocular.**
- ✅ Domo/ventana de **acrílico naranja certificado para 405–450 nm (OD 3+ mínimo)**, diseñado para que el haz directo nunca incida sobre la ventana.
- ✅ **Gafas certificadas** para 450 nm (OD 5+ típico en gafas para esta banda) siempre que se opere con el domo abierto (alineación, enfoque).
- ⏳ PENDIENTE: decisión formal del material del domo (ADR) — tiene implicación de costo e importación.
- ⏳ PENDIENTE: verificar disponibilidad local (Colombia) de acrílico naranja con OD especificada, o importar.

## Fuentes (consultadas 2026-07-04)

- Hilo de expertos en LightBurn Forum sobre color de acrílico para 445–450 nm: https://forum.lightburnsoftware.com/t/eye-protection-acrylic-color/50976
- J Tech Photonics — Laser Safety Shielding 250–520 nm (OD 3+ @ 405/445 nm): https://jtechphotonics.com/?product=12x12_laser_safety_sheilding
- Laser Safety Industries — ventanas acrílicas clase 3B/4, OD por banda: https://lasersafetyindustries.com/laser-safety-windows/
- Gafas 450 nm (referencia de OD en gafas): https://optlasers.com/accessories/450nm-blue-laser-safety-glasses
- Phillips Safety — lámina acrílica protectora Near-VIS naranja: https://phillips-safety.com/shop/laser/laser-safety-windows/acrylic-laser-window/near-vis-laser-protective-acrylic-sheet-orange/
