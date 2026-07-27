# Infraestructura del VPS

Todo lo necesario para levantar y mantener los servicios de VELO inc en un único
servidor. Esto **no es una salida generada** desde `conocimiento/`: es
infraestructura operativa. Por eso vive fuera de `salidas/`. Ver
[D-0014](../conocimiento/maquina/decisiones/D-0014-infraestructura-vps-compartida.md).

## Cómo está organizado

Un solo contenedor puede escuchar en los puertos 80 y 443. Ese es el proxy, y
reparte el tráfico según el dominio que pida el visitante. Todo lo demás queda
detrás, sin puertos publicados.

```
Internet ──▶ :80 / :443 ──▶ Caddy ──┬──▶ web-velo:3000   (landing Next.js)
                                    ├──▶ n8n:5678        (automatizaciones)
                                    └──▶ /srv/sitio-dos  (estático temporal)
```

| Stack | Ruta en el VPS | Publica puertos |
|---|---|---|
| Proxy (Caddy) | `/opt/proxy` | 80, 443 |
| Landing VELO | `/opt/web-velo` | no |
| n8n + PostgreSQL | `/opt/n8n` | no |

Los stacks se comunican por una red Docker externa llamada `edge`. PostgreSQL
está solo en la red `interna` de n8n: no es alcanzable desde el proxy ni desde
fuera. Cada stack se despliega, reinicia y actualiza por separado.

## Antes de empezar

1. Cada dominio necesita un registro **A** apuntando a la IP del VPS **antes**
   de levantar el proxy. Si el DNS no resuelve, Let's Encrypt no puede validar
   y la emisión del certificado falla.
2. Comprobar la propagación:

```bash
dig +short maquina.ejemplo.com
```

## Puesta en marcha

### 1. Red compartida

```bash
docker network create edge
```

### 2. Proxy

```bash
cd /opt/proxy
cp .env.example .env    # completar ACME_EMAIL y los tres dominios
docker compose up -d
```

### 3. Landing

```bash
cd /opt/web-velo
cp .env.example .env    # completar dominio y número de WhatsApp
docker compose up -d --build
```

Las variables `NEXT_PUBLIC_*` se incrustan **en tiempo de compilación**. Si se
cambia alguna, no basta con reiniciar: hay que reconstruir con `--build`.

### 4. n8n

```bash
cd /opt/n8n
cp .env.example .env
openssl rand -base64 24   # → POSTGRES_PASSWORD
openssl rand -hex 32      # → N8N_ENCRYPTION_KEY
docker compose up -d
```

En el primer acceso por navegador, n8n pide crear la cuenta de propietario.
Hacerlo de inmediato: hasta entonces la instancia queda abierta a quien
descubra el dominio.

### 5. Comprobación

```bash
curl -I https://maquina.ejemplo.com
docker compose -f /opt/proxy/compose.yaml logs --tail 50 caddy
```

## Operación

| Tarea | Comando |
|---|---|
| Ver estado de todo | `docker ps` |
| Logs de un servicio | `docker compose logs -f --tail 100 <servicio>` |
| Añadir o cambiar un dominio | Editar `Caddyfile` y `.env`, luego `docker compose restart caddy` |
| Actualizar la landing tras un cambio | `cd /opt/web-velo && docker compose up -d --build` |
| Actualizar n8n | `cd /opt/n8n && docker compose pull && docker compose up -d` |
| Liberar espacio | `docker image prune -f` |

### Reemplazar el sitio temporal por una app real

En el `Caddyfile`, cambiar el bloque de `{$DOMINIO_DOS}`:

```diff
-	root * /srv/sitio-dos
-	file_server
+	reverse_proxy web-dos:3000
```

Levantar el nuevo stack conectado a `edge` con `container_name: web-dos` y
reiniciar Caddy.

## Certificados

Caddy los pide en el primer arranque y los renueva solo, sin cron ni certbot.

> **Si el sitio no carga tras apuntar el DNS**, comprobar primero que el DNS es
> correcto (`nslookup dominio hermes.dns-parking.com` consulta al autoritativo,
> sin caché). Si el DNS está bien pero no hay certificado, lo más probable es
> que Caddy esté en espera larga por intentos fallidos anteriores: reintenta con
> retroceso exponencial y puede tardar horas. Se fuerza con
> `docker compose restart caddy`. Lo ideal es no levantar el proxy hasta que el
> DNS resuelva.
Viven en el volumen `caddy_data`. **Ese volumen no se borra**: perderlo obliga a
reemitir todos los certificados y Let's Encrypt limita a 5 emisiones por dominio
por semana.

## Respaldos

Lo que duele perder son tres cosas:

| Qué | Dónde | Cómo |
|---|---|---|
| Flujos y credenciales de n8n | volumen `n8n_n8n_db` | `docker exec n8n-postgres pg_dump -U n8n n8n > n8n.sql` |
| Clave de cifrado de n8n | `/opt/n8n/.env` | copia manual fuera del servidor |
| Certificados | volumen `caddy_data` | se reemiten solos; no es crítico |

El respaldo de PostgreSQL **sin** la `N8N_ENCRYPTION_KEY` es inútil: los flujos
se restauran pero las credenciales quedan ilegibles. Guardar ambas cosas juntas.

> ⏳ PENDIENTE: automatizar el respaldo de n8n a almacenamiento externo. Hoy es
> manual. Una vez n8n esté corriendo, el propio n8n puede hacerlo.

## Notas

- El código de la landing vive en [`salidas/web/`](../salidas/web/), que sí es
  una salida generada. Aquí solo está el proxy y los servicios de apoyo.
- Los archivos `.env` nunca se commitean: contienen contraseñas y claves.
- La imagen de n8n está fijada a `latest`. Tras el primer despliegue conviene
  fijar la versión concreta (`docker inspect n8n --format '{{.Config.Image}}'`)
  para que un `pull` no introduzca cambios de golpe.
