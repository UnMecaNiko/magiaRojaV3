# D-0014 — Un solo VPS con proxy compartido Caddy para landing, n8n y un segundo sitio

- **Fecha**: 2026-07-27
- **Ámbito**: Repositorio / Infraestructura
- **Estado**: ✅ Vigente
- **Decisor**: Nicolas Velasquez

## Contexto

La landing de VELO inc ([`salidas/web/`](../../../salidas/web/)) se diseñó
inicialmente para desplegarse sola en un VPS: su `compose.yaml` incluía un nginx
propio que tomaba los puertos 80 y 443, y un certbot para pedir el certificado a
mano.

Al contratar el VPS se decidió alojar allí tres cosas: la landing, una instancia
de **n8n** para automatizaciones, y un **segundo sitio web** cuyo contenido
todavía no existe. Eso rompe el planteamiento original, porque solo un proceso
puede escuchar en cada puerto del host.

Alternativas evaluadas para el proxy:

- **Nginx + certbot** (lo que ya estaba escrito): explícito y conocido, pero con
  tres dominios obliga a repetir el ciclo de pedir certificado, intercambiar la
  configuración y recargar, además de montar la renovación a mano.
- **Traefik**: configuración por etiquetas en los contenedores; potente, pero
  más difícil de depurar cuando algo no enruta.
- **Caddy**: HTTPS automático, unas pocas líneas por dominio.

## Decisión

Separar el proxy inverso de las aplicaciones, en un directorio nuevo `infra/`
fuera de `salidas/`, y usar **Caddy** como único servicio con los puertos 80 y
443 publicados. Las aplicaciones no publican puertos y se comunican con el proxy
por una red Docker externa llamada `edge`.

Se elimina el nginx del `compose.yaml` de la landing y se descartan los archivos
de `salidas/web/deploy/` (quedan en la historia, en el commit `2cb99b9`).

n8n se despliega con **PostgreSQL**, no con la base SQLite que trae por defecto.

## Motivos

- **El proxy es infraestructura, no una salida.** `salidas/` contiene lo que se
  genera desde `conocimiento/`; n8n y el proxy no derivan de la fuente de la
  verdad. Mezclarlos habría roto la arquitectura de dos capas de AGENTS.md.
- **Caddy renueva los certificados solo.** Con tres dominios, el punto de fallo
  típico de estos despliegues es un certificado que no renueva en silencio
  meses después. Caddy elimina esa clase de error, junto con el cron y certbot.
- **Aislamiento.** Que cada app viva en su stack permite reiniciar o actualizar
  una sin tocar las demás. PostgreSQL queda en una red interna, inalcanzable
  desde el proxy.
- **PostgreSQL para n8n** porque SQLite se degrada y puede corromperse con uso
  real y ejecuciones concurrentes.
- **Ubuntu 24.04 LTS** como sistema anfitrión: soporte estándar hasta abril de
  2029 y plantilla con Docker preinstalado en Hostinger. Se descartó 26.04 LTS
  (publicada el 23 de abril de 2026) por ser demasiado reciente y no aportar
  nada, dado que todo corre en contenedores.

Fuentes (consultadas el 2026-07-27):
[VPS OS y plantillas — Hostinger](https://www.hostinger.com/es/support/vps/vps-os-y-plantillas/),
[Ubuntu release cycle](https://ubuntu.com/about/release-cycle),
[Ubuntu 26.04 LTS release notes](https://documentation.ubuntu.com/release-notes/26.04/).

## Consecuencias

- ✅ Añadir un cuarto sitio es un bloque de tres líneas en el `Caddyfile`.
- ✅ Sin certbot, sin cron de renovación, sin certificados vencidos por olvido.
- ✅ La landing ya no depende de configuración de servidor: solo expone el
  puerto 3000 dentro de la red.
- ⚠️ El orden de arranque importa: la red `edge` y el proxy deben existir antes
  que las apps.
- ⚠️ El DNS debe resolver **antes** de levantar el proxy, o falla la emisión del
  certificado. Let's Encrypt limita a 5 emisiones por dominio y semana.
- ⚠️ Perder la `N8N_ENCRYPTION_KEY` deja ilegibles las credenciales de todos los
  flujos. Un respaldo de la base sin esa clave no sirve.
- ⚠️ El VPS necesita 4 GB de RAM para operar con holgura; con 2 GB va justo.
- ⏳ PENDIENTE: definir el dominio y el contenido del segundo sitio. Por ahora
  sirve una página estática temporal.
- ⏳ PENDIENTE: automatizar los respaldos de n8n fuera del servidor.
- ⏳ PENDIENTE: fijar la versión de la imagen de n8n tras el primer despliegue.
