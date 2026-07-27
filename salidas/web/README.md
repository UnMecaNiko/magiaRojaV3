# Landing promocional — CNC Magia Roja v3

Landing de VELO inc construida con Next.js, App Router y TypeScript. El contenido se deriva de `comercial/` y `conocimiento/`; nunca consume `presupuesto/`.

## Requisitos

- Node.js 24 LTS
- npm

## Desarrollo local

```bash
cp .env.example .env.local
npm install
npm run dev
```

Abrir `http://localhost:3000`.

Variables:

- `NEXT_PUBLIC_SITE_URL`: URL canónica.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número internacional sin `+`, espacios ni guiones.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: identificador opcional de GA4.
- `NEXT_PUBLIC_META_PIXEL_ID`: identificador opcional de Meta Pixel.

Si no se configura un número, el CTA abre WhatsApp con el mensaje precargado y permite elegir el contacto.

## Verificación

```bash
npm run lint
npm run build
```

La analítica solo se carga después del consentimiento. El evento `whatsapp_click` registra la ubicación del CTA, el interés y las UTM conservadas durante la sesión.

## Imágenes

- Maestros IA: `../../media/ia/web-v3/`
- Copias publicadas: `public/images/`
- Inventario y prompts: `../media/imagenes-web-v3.md`
- Referencias: `../media/referencias-web-v3.md`

Cuando se sustituya un render por una fotografía real, actualizar primero el maestro y el inventario.

## Despliegue en VPS

Este stack contiene **solo la aplicación**. El TLS y el enrutamiento por dominio
los resuelve el proxy compartido del servidor, porque en el mismo VPS conviven
otros servicios. La guía completa está en [`infra/`](../../infra/README.md); ver
también [D-0014](../../conocimiento/maquina/decisiones/D-0014-infraestructura-vps-compartida.md).

Con el proxy ya levantado y la red `edge` creada:

1. Copiar `.env.example` a `.env` y completar los valores.
2. Construir y arrancar:

```bash
docker compose up -d --build
```

El contenedor no publica puertos: el proxy lo alcanza como `web-velo:3000`.

Las variables `NEXT_PUBLIC_*` se incrustan **en tiempo de compilación**. Al
cambiar cualquiera de ellas hay que reconstruir con `--build`; reiniciar no basta.

No guardar `.env`, certificados ni credenciales en Git.
