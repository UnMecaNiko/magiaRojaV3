# Guía: estilo de redacción

Cómo se escribe en este repositorio y en sus salidas.

## En la fuente (`conocimiento/`, `harness/`, `comercial/`)

1. **Español** siempre (D-0001). Términos técnicos sin traducción forzada: *air assist*, *driver*, *homing* están bien — y se definen en el [glosario](../../conocimiento/glosario.md).
2. **Preciso y honesto**: los datos del fabricante se marcan como tales; lo validado por el equipo se distingue de lo tentativo.
3. **Datos pendientes explícitos**: `⏳ PENDIENTE: <qué falta>`. Nunca rellenar con suposiciones.
4. **Fechas absolutas** (2026-07-04), nunca "hace unos meses".
5. **Enlaces internos relativos** entre documentos — el repo es navegable.
6. Cada documento técnico lleva línea de **última actualización**.

## En las salidas (`salidas/`)

### Artículos y tutoriales
- Tono: primera persona, cercano y honesto — el estilo de los docs v1/v2: contar los retos y errores, no solo los éxitos ("uno de los mayores desafíos fue calibrar los drivers…").
- La historia padre-hijo es parte de la identidad del proyecto — usarla.
- Los tutoriales se generan desde `proceso-construccion/` e incluyen los errores y lecciones (es el mayor valor para el lector).

### Contenido para clientes (web, chatbot)
- Claro para no técnicos; lo técnico va al glosario o a capas de detalle.
- **Nunca precios** en contenido generado desde este repo.
- Claims trazables: si la web dice "corta 20 mm de pino", debe existir la prueba o marcarse como dato del fabricante.
- El chatbot responde sobre la **v3**; usa la historia v1/v2 como contexto de trayectoria.

### Ambos
- Toda salida se puede **regenerar** desde la fuente: si un dato cambia en `conocimiento/`, la salida se actualiza desde allí, nunca al revés.
