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

## Nota de ejecución (2026-09-18)

Se midió el ciclo **a mano** (`./infra/desplegar-landing.sh` desde Git Bash):
**97 s**, de ellos 77 s en el VPS. `npm ci` fueron 36 s porque el tag flotante
`node:24-alpine` había cambiado de digest en seis semanas.

Luego se encendió el workflow y se midió otra vez:

| Run | Qué pasó | Tiempo |
|---|---|---|
| [35417890073](https://github.com/UnMecaNiko/magiaRojaV3/actions/runs/35417890073) | SSH al VPS ok. `./infra/desplegar-landing.sh` → exit 126 | 9 s |
| [35417933299](https://github.com/UnMecaNiko/magiaRojaV3/actions/runs/35417933299) | Publicado. Pie con `data-deploy="gha"` | **1 m 3 s** |

Aprendizajes, para no repetirlos:

1. **Los `.sh` editados en Windows entran a git como `100644`.** En el runner
   de Ubuntu `./script.sh` es «Permission denied». Hay que
   `git update-index --chmod=+x` **y** invocarlos con `bash script.sh` — el
   segundo cubre el caso si el bit se vuelve a perder. `generar-tokens.sh`
   también: el script de deploy lo llama por ruta, no con `bash`.
2. **WSL no es el SSH de este equipo.** El alias `velo-vps` vive en
   `C:\Users\nicol\.ssh\config`. `bash` de WSL no resuelve el hostname; usar
   ese config con `-F` falló con `Host key verification failed`. Git Bash sí
   entra. Un agente que despliegue a mano tiene que usar Git Bash u OpenSSH
   de Windows, no WSL.
3. **`main` local tenía un commit de 8 días sin empujar** («Sincroniza la
   librería de componentes UI»). El primer `git push` de CI se lo llevó
   también. Antes de encender un deploy automático, `git log origin/main..HEAD`.
4. El filtro `paths:` del workflow funciona: un push que solo tocó
   `harness/planeacion/changelog.md` **no** redesplegó.
5. El secret es root. `fail2ban` no bloqueó el runner en esta prueba; si lo
   hace, el síntoma será timeout de SSH, no un error del script.
