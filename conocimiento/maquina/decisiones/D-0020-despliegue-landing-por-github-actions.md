# D-0020 — La landing se publica con un push a `main`, no a mano

- **Fecha**: 2026-09-18
- **Ámbito**: Repositorio / Infraestructura
- **Estado**: ✅ Vigente
- **Decisor**: Nicolas Velasquez

## Contexto

Hasta hoy publicar https://velasquezlopez.com era correr
[`infra/desplegar-landing.sh`](../../../infra/desplegar-landing.sh) desde el
equipo de trabajo. El script ya era idempotente y verificaba el sitio, pero
dependía de que alguien estuviera delante: un agente en Windows no comparte el
alias SSH de WSL, y un cambio en `main` no llegaba al VPS solo.

Se midió el ciclo el 2026-09-18: 97 s de punta a punta, de los cuales 77 s son
`docker compose up --build` en el VPS (1 vCPU). `npm ci` se rehízo entero
porque `node:24-alpine` es un tag flotante y en seis semanas Docker Hub había
publicado otro digest.

Alternativas:

1. Seguir desplegando a mano con el script.
2. **Corte 1:** el mismo script, disparado por GitHub Actions al hacer push a
   `main`. La imagen se sigue construyendo en el VPS.
3. **Corte 2:** construir la imagen en Actions, empujarla a un registry y que
   el VPS solo haga `pull`. Más rápido en el servidor; más piezas.

## Decisión

Corte 1. Un workflow [`.github/workflows/deploy-landing.yml`](../../../.github/workflows/deploy-landing.yml)
corre `desplegar-landing.sh` cuando cambia la landing (o a mano con
`workflow_dispatch`). La llave SSH de CI vive como secret `VELO_VPS_SSH_KEY`;
no está en git. El Dockerfile fija `node:24-alpine` a un digest.

## Motivos

- El script ya es la fuente de la verdad. Duplicar sus pasos en YAML divergiría.
- El repo es **público**: un workflow en `pull_request` usaría el secret con
  código de un fork. Por eso solo corre en `push` a `main` y en disparo
  manual.
- Construir fuera del VPS (corte 2) recorta el reloj de verdad, pero obliga a
  un registry y a cambiar cómo entra el `.env` de producción. Se deja para
  cuando el corte 1 esté estable.

## Consecuencias

- ✅ Un `git push` a `main` que toque `salidas/web/**` publica el sitio.
- ✅ El digest fijado evita que un `npm ci` de 36 s reaparezca porque Alpine
  se actualizó en silencio.
- ✅ `.dockerignore` saca el `.env` del contexto de build: las `NEXT_PUBLIC_*`
  entran por ARG, no copiadas a una capa.
- ⚠️ El secret es una llave **root**. Quien tenga permiso de Actions en este
  repo entra al VPS. Revocarla es borrar la línea de `authorized_keys` y rotar
  el secret.
- ⚠️ `fail2ban` vigila SSH. Si un runner de GitHub entra mal unas veces, su IP
  (efímera) puede quedar baneada y el workflow falla sin que el script tenga
  la culpa.
- ⏳ Corte 2: construir la imagen fuera del VPS.
- ⏳ Usuario sin privilegios con `sudo` y `PermitRootLogin no` (ya pendiente
  en la ficha del VPS).
