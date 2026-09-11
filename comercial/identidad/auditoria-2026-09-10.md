# Auditoría de diseño — salidas/web — 2026-09-10

Inventario completo del CSS de la web oficial antes de definir el sistema de
diseño. Es el documento que justifica cada valor de [tokens.yaml](tokens.yaml):
si algún día alguien pregunta por qué el rojo de texto no es el rojo de marca,
la respuesta está acá.

**Alcance medido:** `salidas/web/app/page.module.css` (959 líneas),
`app/globals.css`, `components/ui/`.

---

## Resumen

| Dimensión | Antes | Después | Cómo |
|---|---:|---:|---|
| Colores declarados | 36 hex + 17 rgba | 16 primitivas | agrupación por función |
| Variables CSS definidas | 3 | 16 primitivas + 24 semánticas | capa semántica nueva |
| Pesos tipográficos | 15 | 5 | colapso |
| Escalas de titular (`clamp`) | 5 | 4 | colapso de dos escalas gemelas |
| Tamaños de texto sueltos | 16 | 5 (rampa 12–20px) | rampa alineada a 4px |
| Valores de `letter-spacing` | 12 | 6 | colapso |
| Radios de borde | 6 | 5 | colapso de 22px y 26px |
| Fallos de contraste AA | 6 | 0 | corrección de valores |

El sistema no se quedó en colapsar duplicados: **seis pares texto/fondo
incumplían WCAG 2.2 AA** y esa parte exigió cambiar valores, no solo agruparlos.

---

## 1. Color

### 1.1 El problema de fondo

36 colores hexadecimales distintos para una landing de una sola página. El
patrón se repite en cada familia: seis grises de borde (`#d2cec6`, `#d7d4ce`,
`#d7d7d3`, `#d9d6cf`, `#deddd7`, `#deddd8`) que ningún ojo separa, siete
casi-negros, nueve grises de texto, cuatro rojos.

Ninguno estaba en una variable: cada sección escribía su propio hex. Eso no es
una paleta, es deriva — y es la razón por la que agregar una sección nueva
significaba inventar un gris más.

### 1.2 Contraste: lo que no era cuestión de gusto

Se midieron los pares texto/fondo reales contra el umbral AA de WCAG 2.2
(SC 1.4.3): **4.5:1** para texto normal, **3:1** para texto grande —definido
como ≥18pt, o ≥14pt en negrita, equivalentes a ~24px y ~18.5px—, y los
valores se comparan **sin redondear** (4.499:1 no cumple).

Resultados con la paleta original:

| Texto / fondo | Ratio | Requerido | Uso real |
|---|---:|---:|---|
| `#8a857e` / `#fbfaf7` | 3.51 | 4.5 | ❌ etiquetas de especificaciones @10.7px |
| `#8a857e` / `#f0eee9` | 3.16 | 4.5 | ❌ las mismas sobre sección clara |
| `#e32636` / `#fbfaf7` | 4.38 | 4.5 | ❌ *eyebrow* de sección @11.5px |
| `#e32636` / `#f0eee9` | 3.94 | 4.5 | ❌ *eyebrow* sobre sección clara |
| `#e32636` / `#171716` | 3.93 | 4.5 | ❌ rojo base sobre fondo oscuro |
| `#ffffff` / `#168c5b` | 4.25 | 4.5 | ❌ texto del botón de WhatsApp |
| `#171716` / `#fbfaf7` | 17.19 | 4.5 | ✅ texto principal |
| `#6e6a63` / `#fbfaf7` | 5.15 | 4.5 | ✅ texto secundario |
| `#bdbdb7` / `#171716` | 9.51 | 4.5 | ✅ secundario sobre oscuro |

El más grave no es el más bajo: es el ***eyebrow***. Es el elemento que abre
**cada** sección del sitio, en rojo de marca, a 11.5px — o sea, el texto más
repetido y más identitario del diseño estaba por debajo del mínimo.

### 1.3 Las tres correcciones

**a) Separar el rojo de marca del rojo de texto.** `#e32636` no se toca: como
relleno funciona (blanco encima da 4.57:1) y es el color de la marca. Pero como
texto sobre claro no llega. Se añade `rojo-600 #d12332` solo para texto acento
(5.03:1 sobre `crema-50`, 4.53:1 sobre `crema-200`). Tener un token de marca y
otro de texto accesible es lo que hacen los sistemas maduros, y evita la
alternativa mala: degradar la marca para satisfacer la norma.

**b) El texto terciario no sobrevive.** Al buscar el gris más claro que cumple
4.5:1 sobre `crema-200`, el resultado converge en `#6e6a65` — indistinguible de
`gris-500 #6e6a63`, que ya existía. Conclusión: **el nivel terciario no era un
nivel, era texto ilegible**. Se elimina del sistema y sus usos pasan a
`gris-500`. La jerarquía queda en tres niveles reales en vez de cuatro
nominales.

**c) Verde de canal.** `#168c5b` → `#158657` (4.25 → 4.59:1). Cambio
imperceptible a la vista, y cruza el umbral.

Tras las correcciones, **los 15 pares del sistema cumplen AA, con cero
excepciones**.

### 1.4 Un falso positivo que no se corrigió

El borde `gris-200` tiene 1.42:1 contra el fondo, y eso **está bien**.
SC 1.4.11 exige 3:1 solo a la información visual *necesaria para identificar un
control*; el propio texto del criterio aclara que si un control ya tiene
contenido visible —como el texto del botón secundario— el borde no es
requerido. Los divisores decorativos quedan fuera del alcance. Subirlo habría
sido cumplir una norma inexistente a costa del diseño.

---

## 2. Tipografía

### 2.1 Quince pesos

`400 500 550 560 580 600 620 650 680 700 750 760 790 800 820`.

Manrope es una fuente variable, así que técnicamente todos renderizan. Pero 560
contra 580 no lo distingue nadie: cada uno fue una decisión tomada sin criterio
y nunca revisada. **Se colapsan a cinco** con un rol cada uno: `regular 400`,
`display 560`, `medio 680`, `fuerte 760`, `marca 820`.

### 2.2 El piso de 12px

El original bajaba a **0.67rem (10.7px)** en las etiquetas de especificaciones y
0.65rem en la insignia del héroe. El texto diminuto es a la vez el fallo de
accesibilidad más frecuente y la señal más inmediata de trabajo amateur — y acá
se combinaba con contraste insuficiente, que es el peor par posible.

**Regla nueva: nada por debajo de 12px.** La rampa de interfaz queda en
**12 / 14 / 16 / 18 / 20px**, alineada a la rejilla de 4px.

### 2.3 Por qué la rampa de interfaz no es una escala modular

Una escala modular aplica una razón fija entre pasos —la *tercera mayor* (1.25)
es la opción habitual para páginas de producto, la que usa Material Design, y
su valor real es eliminar la fatiga de decisión: fijada la base y la razón,
cada paso queda definido y deja de discutirse.

Funciona muy bien hacia arriba. Hacia abajo no: desde 16px, la razón 1.25 da
12.8px y después 10.24px — salta justo el rango donde la interfaz necesita
precisión y cae por debajo del piso legible. Por eso el tramo de interfaz se
afina a mano sobre la rejilla de 4px y **la escala modular se reserva para los
titulares**. Es la práctica de los sistemas de producto serios, no un atajo.

### 2.4 Los titulares son una decisión editorial

Las cinco `clamp()` se reducen a cuatro: `clamp(2.7rem,5.6vw,5.9rem)` y
`clamp(2.5rem,4.5vw,5rem)` eran dos escalas gemelas para el mismo nivel
jerárquico, una para secciones claras y otra para oscuras, sin razón.

Los saltos grandes entre el titular del héroe (hasta 123px) y los de sección
**se conservan a propósito**. Es lo que ya funciona de esta marca y lo que le da
presencia; forzarlos a una razón aritmética los aplanaría. La escala se aplica
donde falta rigor, no donde ya hay criterio.

---

## 3. Espaciado y forma

**Espaciado:** más de 30 valores sueltos (`0.15`, `0.42`, `0.58`, `1.05`,
`1.35`, `8.4rem`…). Se reemplazan por una escala en base 4px. La rejilla de
4/8px es el estándar de facto porque toda altura de línea y de control cae en
múltiplos enteros, sin medios píxeles que el navegador redondee de forma
distinta según el zoom.

**`letter-spacing`:** 12 valores → 6 con propósito.

**Radios:** 22px y 26px colapsan en 24px. El resto (10, 14, 999, 50%) responde a
usos distintos y se conserva.

---

## 4. Duplicación estructural

Fuera del ámbito de los tokens, pero es el hallazgo que más código toca:
`.materials`, `.machine`, `.company` y `.maintenance` **son el mismo
componente** — rejilla de dos columnas, imagen a un lado y texto al otro,
variante clara u oscura — implementado cuatro veces, con selectores agrupados a
mano para compartir reglas:

```css
.materialsCopy h2, .machineCopy h2, .companyCopy h2,
.maintenanceCopy h2, .finalContent h2 { ... }
```

Ese patrón se repite en cinco bloques del archivo. Son ~200 líneas que colapsan
en un componente con props. Es el trabajo de la fase 3.

---

## 5. Pendientes

> ⏳ PENDIENTE: `marca.md` — la narrativa de identidad (qué comunica el rojo,
> tono de voz visual, uso del logo). No se redacta desde la auditoría porque no
> es un dato medible: sale de una conversación con Saul y Nicolas.

> ⏳ PENDIENTE: verificación de contraste sobre imágenes. Las tarjetas de
> aplicación y el CTA final ponen texto blanco sobre foto con un degradado de
> protección. WCAG lo cubre en la técnica de fallo F83 y no se puede medir con
> un par de colores fijos: hay que muestrear las imágenes reales.

---

## Fuentes

- [Understanding SC 1.4.3: Contrast (Minimum) — W3C WAI, WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) — umbrales 4.5:1 / 3:1, definición de texto grande (18pt / 14pt negrita ≈ 24px / 18.5px), comparación sin redondeo. Consultado 2026-09-10.
- [Understanding SC 1.4.11: Non-text Contrast — W3C WAI](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) — alcance del 3:1 en bordes de controles y exención cuando el control tiene contenido visible. Consultado 2026-09-10.
- [F83: Failure due to background images that do not provide sufficient contrast — W3C WAI](https://www.w3.org/WAI/WCAG22/Techniques/failures/F83) — texto sobre imagen. Consultado 2026-09-10.
- [Type Scale Systems — Typography Master](https://www.typographymaster.com/guide/type-scale-systems) — razones de escala modular, tercera mayor 1.25. Consultado 2026-09-10.
- [Recommendations to create the typography system for your design system — Design Systems Collective](https://www.designsystemscollective.com/recommendations-to-create-the-typography-system-for-your-design-system-cb2aa25978ca) — escala modular frente a rampa afinada a mano. Consultado 2026-09-10.

Los ratios de contraste se calcularon con la fórmula de luminancia relativa de
WCAG 2.2 (coeficientes 0.2126 / 0.7152 / 0.0722, linealización sRGB con umbral
0.03928).
