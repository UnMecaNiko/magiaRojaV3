# Ficha de componente: Laser Tree K30

> Ficha investigada en internet el **2026-07-04** siguiendo [la guía de investigación](../../../../harness/guias/como-investigar.md). Fuentes al final.

## Identificación

| Campo | Valor |
|---|---|
| Fabricante | LASER TREE |
| Modelo | K30 (LT-K30) |
| Tipo | Módulo láser de diodo para corte y grabado |
| Rol en la máquina | Herramienta principal (cabezal intercambiable) |

## Especificaciones técnicas

| Parámetro | Valor |
|---|---|
| Potencia óptica de salida | **30W** (nominal; medida ~34.2W según fabricante) |
| Tecnología | 6 diodos de 5.5W + compresión de haz (beam compression) |
| Longitud de onda | 450 nm ± 10 nm (azul) |
| Distancia focal | 40 mm, foco fijo |
| Alimentación | **24 V / 5 A** (fuente propia incluida) |
| Air assist | Integrado en el módulo |
| Refrigeración | Doble ventilador |
| Temperatura de operación | Módulo < 55 °C; ambiente < 35 °C recomendado |

## Capacidad de corte declarada (una pasada)

| Material | Espesor |
|---|---|
| Madera de pino | 20 mm |
| Acrílico | 30 mm |
| Contrachapado (plywood) | 15 mm |

> ⚠️ Datos del fabricante. Validar con pruebas propias — resultados a [parametros/materiales/](../../parametros/materiales/) con enlace a la prueba.

## Notas de integración en la Magia Roja v3

- **No alimentar del riel de 12V**: requiere 24V/5A — usa su fuente dedicada ([D-0005](../../decisiones/D-0005-fuentes-separadas.md)).
- Reemplaza al láser de la v2 (80W eléctricos / 10W ópticos): **~3× la potencia óptica**.
- Air assist integrado (la v2 usaba bomba externa) — evaluar si basta para cortes gruesos.
- ⏳ PENDIENTE: pinout de señal de control (PWM/TTL) — extraer del manual del fabricante al integrarlo.
- ⚠️ Seguridad: validar que la protección ocular (domo acrílico) atenúe adecuadamente 450 nm a 30W.

## Fuentes (consultadas 2026-07-04)

- Página oficial del producto: https://lasertree.com/products/k30-30w-optical-power-laser-module
- Manual de usuario: https://manuals.plus/m/8b1cf7161b284c80498011c14d8b785595fc48db1633f05458b7990f50e4f41a
- Prueba de rendimiento de corte (blog del fabricante): https://lasertree.com/blogs/blog-center/laser-tree-k30-cutting-performance
- Listado en Amazon (specs de contraste): https://www.amazon.com/LASER-TREE-Engraver-Overheat-Engraving/dp/B0C36TXLHF
