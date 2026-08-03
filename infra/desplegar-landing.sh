#!/usr/bin/env bash
#
# Publica la landing de VELO inc (salidas/web) en el VPS, de una sola pasada.
#
#   ./infra/desplegar-landing.sh
#
# Qué hace y por qué:
#
#   1. Sube solo los archivos **versionados** de salidas/web. Así nunca viajan
#      node_modules, .next ni el .env local.
#   2. Sincroniza con rsync --delete, excluyendo .env: lo que se borró del repo
#      desaparece del servidor, pero el .env del servidor (que no está en Git)
#      sobrevive.
#   3. Reconstruye la imagen. Las variables NEXT_PUBLIC_* se incrustan en
#      tiempo de compilación: reiniciar el contenedor no basta.
#   4. Verifica que el dominio responda y que los CTA lleven número de WhatsApp.
#
# Es idempotente: correrlo dos veces seguidas deja el mismo resultado.
#
# Requisitos: acceso SSH al host `velo-vps` (~/.ssh/config), git, tar y curl.
# Ver infra/README.md y la decisión D-0014.

set -euo pipefail

HOST="${VELO_VPS_HOST:-velo-vps}"
DESTINO="${VELO_VPS_RUTA:-/opt/web-velo}"
DOMINIO="${VELO_DOMINIO:-velasquezlopez.com}"
STAGING="/tmp/web-velo-nuevo"

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FUENTE="$RAIZ/salidas/web"

paso()  { printf '\n\033[1;34m==>\033[0m %s\n' "$1"; }
aviso() { printf '\033[1;33m[aviso]\033[0m %s\n' "$1"; }
error() { printf '\033[1;31m[error]\033[0m %s\n' "$1" >&2; }

cd "$FUENTE"

paso "Estado del repositorio"
if [ -n "$(git status --porcelain -- .)" ]; then
  aviso "hay cambios sin commitear en salidas/web; se publica el estado del disco"
fi
printf '    commit %s\n' "$(git rev-parse --short HEAD)"

paso "Empaquetando salidas/web"
ARCHIVOS="$(git ls-files)"
[ -n "$ARCHIVOS" ] || { error "git ls-files no devolvió nada en $FUENTE"; exit 1; }
printf '    %s archivos versionados\n' "$(printf '%s\n' "$ARCHIVOS" | wc -l | tr -d ' ')"

paso "Subiendo a $HOST:$STAGING"
ssh "$HOST" "rm -rf '$STAGING' && mkdir -p '$STAGING'"
printf '%s\n' "$ARCHIVOS" | tar -czf - -T - | ssh "$HOST" "tar -xzf - -C '$STAGING'"

paso "Sincronizando en $DESTINO (el .env del servidor se preserva)"
ssh "$HOST" "rsync -a --delete --exclude '.env' '$STAGING/' '$DESTINO/' && rm -rf '$STAGING'"

paso "Variables de compilación"
if ssh "$HOST" "grep -q '^NEXT_PUBLIC_WHATSAPP_NUMBER=[0-9]\\+$' '$DESTINO/.env'"; then
  printf '    WhatsApp configurado\n'
else
  aviso "NEXT_PUBLIC_WHATSAPP_NUMBER vacío o mal formado en $DESTINO/.env:"
  aviso "los CTA abrirán WhatsApp sin destinatario. Debe ser el número"
  aviso "internacional sin '+', espacios ni guiones (ej. 573125485893)."
fi

paso "Reconstruyendo la imagen y levantando el contenedor"
ssh "$HOST" "cd '$DESTINO' && docker compose up -d --build"

paso "Verificando https://$DOMINIO"
CODIGO=000
for _ in $(seq 1 20); do
  CODIGO="$(curl -s -o /dev/null -w '%{http_code}' "https://$DOMINIO" || true)"
  [ "$CODIGO" = "200" ] && break
  sleep 3
done
printf '    HTTP %s\n' "$CODIGO"
if [ "$CODIGO" != "200" ]; then
  error "el sitio no responde 200. Revisar: ssh $HOST 'cd $DESTINO && docker compose logs --tail 50'"
  exit 1
fi

NUMERO="$(curl -s "https://$DOMINIO" | grep -o 'wa\.me/[0-9]\+' | sort -u | head -1 || true)"
if [ -n "$NUMERO" ]; then
  printf '    CTA de WhatsApp -> %s\n' "$NUMERO"
else
  aviso "los enlaces de WhatsApp se publicaron sin número"
fi

paso "Landing publicada"
