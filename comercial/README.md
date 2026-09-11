# Comercial — CNC Magia Roja v3

Material comercial de la máquina: propuesta de valor, mercado objetivo, casos de uso y material de venta.

## Reglas de esta carpeta

1. **Nunca precios.** Regla fija del repositorio ([AGENTS.md](../AGENTS.md)).
2. Alcance: **solo la v3** de cara al cliente. La historia (v1/v2) se usa como respaldo de trayectoria, referenciando [conocimiento/historia/](../conocimiento/historia/).
3. Todo claim técnico debe ser trazable a [conocimiento/](../conocimiento/) — el material de venta no exagera specs.
4. El chatbot orientado a clientes se alimenta de esta carpeta + `conocimiento/`.

## Contenido

| Archivo | Qué contiene |
|---|---|
| [propuesta-valor.md](propuesta-valor.md) | Por qué esta máquina y no otra |
| [mercado-objetivo.md](mercado-objetivo.md) | A quién le sirve |
| [aplicaciones-casos-uso.md](aplicaciones-casos-uso.md) | Qué se puede hacer con ella |
| [material-venta.md](material-venta.md) | Mensajes, textos y recursos para vender |
| [identidad/](identidad/) | Sistema de diseño: tokens, paleta y tipografía ([D-0019](../conocimiento/maquina/decisiones/D-0019-sistema-de-diseno-con-tokens.md)) |

## Identidad visual

[identidad/tokens.yaml](identidad/tokens.yaml) es la **fuente de la verdad** del
sistema de diseño: color, tipografía, espaciado y forma. Lo que usa la web en
`salidas/web/` se genera desde ahí y **no se edita a mano**.

Aplica igual que el resto de la carpeta: sirve a la web, al material de venta,
a los prompts de imágenes IA y al chatbot. Toda la paleta cumple WCAG 2.2 nivel
AA; antes de cambiar un color hay que volver a verificar el contraste
([auditoría](identidad/auditoria-2026-09-10.md)).
