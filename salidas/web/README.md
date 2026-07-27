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

1. Copiar `.env.example` a `.env` y completar los valores.
2. Construir y arrancar:

```bash
docker compose up -d --build
```

3. Apuntar el dominio a la IP del VPS.
4. Cambiar `server_name _;` en `deploy/nginx.conf` por el dominio.
5. Solicitar el certificado:

```bash
docker compose --profile tools run --rm certbot certonly \
  --webroot --webroot-path /var/www/certbot \
  --email correo@ejemplo.com --agree-tos --no-eff-email \
  -d maquina.ejemplo.com
```

6. Sustituir el dominio de ejemplo en `deploy/nginx-https.conf.example`, copiarlo como `deploy/nginx.conf` y reiniciar:

```bash
docker compose restart nginx
```

No guardar `.env`, certificados ni credenciales en Git.
