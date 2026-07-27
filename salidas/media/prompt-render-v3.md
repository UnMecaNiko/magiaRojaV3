# Prompt de render de producto — CNC Magia Roja v3

Insumo para generar la imagen promocional de la v3 en un generador de imágenes
(Nano Banana / Gemini, GPT Image, Midjourney, Flux, etc.).

Derivado del análisis de las fotos reales `media/20260720_184412.jpg` y
`media/20260720_184418.jpg` (taller, 2026-07-20).

> ⏳ PENDIENTE: subir las fotos fuente a almacenamiento externo (S3/Supabase) y dejar
> aquí solo la URL, según la regla 7 de [AGENTS.md](../../AGENTS.md).

---

## Recomendación de uso

**Usar image-to-image, no texto puro.** Cargar la foto `20260720_184418.jpg` (vista 3/4,
la más completa) como imagen de referencia y pedir la transformación. Así se conserva la
geometría real de la máquina en lugar de inventar una CNC genérica. Fuerza de
transformación sugerida: 0.4–0.55 (suficiente para limpiar el fondo y añadir la tapa,
no tanto como para perder el chasis).

---

## Qué muestra la máquina real (base fáctica)

| Elemento | Detalle observado |
|---|---|
| Chasis | Lámina de acero doblada, negro mate; cámara abierta por arriba con cuatro paredes altas |
| Zócalo frontal | Franja inclinada que aloja el panel de control |
| Paro de emergencia | Pulsador hongo rojo, a la derecha del panel frontal |
| Controles | Interruptor iluminado rojo + escala circular grabada (dial), y un pulsador negro |
| Cama | Panal de abeja (honeycomb) negro |
| Reglas | Cintas métricas metálicas graduadas en dos bordes de la cama |
| Pórtico | Perfiles de aluminio, varillas guía cromadas y husillo trapezoidal |
| Cabezal | **Laser Tree K30**, cuerpo gris con disipador aleteado, display rojo de 3 dígitos, protector naranja abajo, boquilla de air assist |
| Neumática | Manguera blanca de air assist siguiendo al cabezal |
| Extracción | Manguera corrugada negra saliendo por la parte trasera derecha |
| Motorización | NEMA 17 en los extremos de los ejes; finales de carrera rojos visibles |

## Qué se añade (pedido del cliente)

1. **Tapa de acrílico rojo translúcido**, abatida hacia atrás con bisagra trasera —
   movimiento tipo tapa de lavadora, abierta unos 60–70°.
2. **Marco de aluminio negro** en el perímetro de la tapa, manija en el borde frontal y
   **dos amortiguadores de gas** laterales que la sostienen abierta.
3. **Tira LED blanca** empotrada en el canto superior perimetral del gabinete, encendida,
   bañando de luz la cama de panal.
4. **Fondo blanco de estudio**, sombra de contacto suave, sin taller ni herramientas.

---

## Prompt (español)

```
Fotografía de producto profesional de una máquina CNC láser de escritorio sobre fondo
blanco puro de estudio, vista tres cuartos ligeramente elevada.

La máquina: gabinete de lámina de acero negro mate, cámara rectangular abierta con
paredes altas. Cama de panal de abeja negro en el fondo, con reglas metálicas graduadas
en los bordes. Pórtico de perfiles de aluminio con varillas guía cromadas y husillo
trapezoidal; motores paso a paso NEMA 17 en los extremos. Cabezal láser gris tipo Laser
Tree K30 con disipador aleteado, pequeño display rojo de tres dígitos, protector naranja
translúcido en la parte inferior y boquilla de air assist con manguera blanca. Manguera
corrugada negra de extracción de humos saliendo por la parte trasera derecha.

Zócalo frontal inclinado con panel de control: pulsador de paro de emergencia rojo tipo
hongo, interruptor iluminado rojo, dial con escala circular grabada y un pulsador negro.

Tapa de acrílico rojo translúcido con marco de aluminio negro, abisagrada en el borde
trasero y abierta hacia arriba unos 65 grados como la tapa de una lavadora, sostenida por
dos amortiguadores de gas cromados, con manija en el borde frontal. El acrílico deja ver
a través suyo con un tinte rojo intenso y refleja luces de estudio.

Tira LED blanca continua empotrada en el canto superior perimetral del gabinete,
encendida, iluminando el interior de la cámara y proyectando un resplandor cálido sobre
la cama de panal.

Iluminación de estudio de tres puntos, sombra de contacto suave bajo la máquina, sin
texto, sin marca de agua, sin personas. Estilo catálogo industrial, alta nitidez,
render fotorrealista, 8k.
```

## Prompt (inglés — mayor fidelidad en la mayoría de modelos)

```
Professional product photograph of a desktop CNC laser machine on a pure white studio
background, three-quarter view from slightly above.

The machine: matte black folded sheet-steel enclosure, open rectangular chamber with tall
walls. Black honeycomb bed inside, graduated metal rulers along the bed edges. Aluminium
extrusion gantry with chrome linear guide rods and a trapezoidal lead screw; NEMA 17
stepper motors at the axis ends. Grey Laser Tree K30 style laser head with finned
heatsink, small red three-digit display, translucent orange guard at the bottom, and an
air-assist nozzle fed by a white hose. Black corrugated fume extraction hose exiting at
the rear right.

Angled front plinth with the control panel: red mushroom emergency-stop button, an
illuminated red rocker switch, a dial with an engraved circular scale, and a black push
button.

Translucent red acrylic lid with a black aluminium frame, hinged at the rear edge and
tilted open about 65 degrees like a washing machine lid, held up by two chrome gas
struts, with a handle on the front edge. The acrylic is see-through with a deep red tint
and catches studio reflections.

Continuous white LED strip recessed into the top perimeter edge of the enclosure, switched
on, lighting the inside of the chamber and casting a warm glow across the honeycomb bed.

Three-point studio lighting, soft contact shadow under the machine, no text, no watermark,
no people. Industrial catalogue style, tack sharp, photorealistic render, 8k.
```

## Ajustes rápidos

- **Tapa cerrada** (otra toma del set): reemplazar el párrafo de la tapa por
  `translucent red acrylic lid closed flat over the chamber, the machine glowing red from
  within through the acrylic`.
- **Más dramático**: cambiar `pure white studio background` por
  `light grey seamless studio background with a subtle gradient`.
- **Encuadre frontal**: `straight-on front view at eye level` en vez de la vista 3/4.
