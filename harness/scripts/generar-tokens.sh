#!/usr/bin/env bash
#
# Genera el CSS del sistema de diseño desde la fuente de la verdad.
#
#   comercial/identidad/tokens.yaml  ──>  salidas/web/app/tokens.css
#
#   ./harness/scripts/generar-tokens.sh            # regenera
#   ./harness/scripts/generar-tokens.sh --verificar # falla si está desactualizado
#
# Por qué bash y no node: la máquina donde se escribe este repo no tiene node,
# python ni docker — la web se compila en el VPS (ver infra/desplegar-landing.sh,
# que sube solo archivos versionados). Un generador que no se puede ejecutar
# donde se edita el repo se pudre; este corre con lo que ya hay.
#
# Por eso `tokens.css` se COMMITEA: es un artefacto generado, pero tiene que
# viajar al VPS como archivo versionado. `--verificar` existe para que nadie
# lo edite a mano sin que se note.
#
# El parser NO es un parser de YAML general: entiende la forma concreta de
# tokens.yaml y falla ruidosamente si esa forma cambia. Es deliberado — un
# parser a medias que adivina es peor que uno que se planta.

set -euo pipefail

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
FUENTE="$RAIZ/comercial/identidad/tokens.yaml"
DESTINO="$RAIZ/salidas/web/app/tokens.css"

VERIFICAR=0
for arg in "$@"; do
  case "$arg" in
    --verificar) VERIFICAR=1 ;;
    -h|--help)
      awk 'NR==1 {next} /^#/ {sub(/^# ?/, ""); print; next} {exit}' "${BASH_SOURCE[0]}"
      exit 0 ;;
    *) printf 'opción desconocida: %s (usa --help)\n' "$arg" >&2; exit 2 ;;
  esac
done

[ -f "$FUENTE" ] || { printf '[error] no existe %s\n' "$FUENTE" >&2; exit 1; }

generar() {
  awk '
    # Ojo con el orden: un valor de color (#e32636) parece un comentario YAML.
    # Por eso los valores entrecomillados se cortan en su comilla de cierre y
    # nunca pasan por el borrado de comentarios; y ese borrado exige un espacio
    # antes del "#", como manda YAML.
    function limpiar(s,   idx) {
      gsub(/^[ \t]+/, "", s)
      if (substr(s, 1, 1) == "\"") {
        s = substr(s, 2)
        idx = index(s, "\"")
        if (idx > 0) s = substr(s, 1, idx - 1)
        return s
      }
      sub(/[ \t]+#.*$/, "", s)
      gsub(/[ \t]+$/, "", s)
      return s
    }
    function emitir(prefijo, clave, valor) {
      printf "  --%s%s: %s;\n", prefijo, clave, valor
    }

    BEGIN {
      capa = ""; seccion = ""; pendiente = ""; n = 0
      print "/* ---------------------------------------------------------------"
      print " * GENERADO — no editar a mano."
      print " *"
      print " * Fuente: comercial/identidad/tokens.yaml"
      print " * Regenerar: ./harness/scripts/generar-tokens.sh"
      print " * Verificar: ./harness/scripts/generar-tokens.sh --verificar"
      print " *"
      print " * Los componentes consumen SOLO tokens semánticos (--fondo, --texto,"
      print " * --acento...) y las clases de rol tipográfico (.t-*). Usar una"
      print " * primitiva (--color-rojo-500) directamente rompe la posibilidad de"
      print " * cambiar la marca sin tocar componentes."
      print " * --------------------------------------------------------------- */"
      print ""
      print ":root {"
    }

    # Capas de primer nivel
    /^primitivas:/ { capa = "prim"; next }
    /^semanticas:/ { capa = "sem";  next }
    /^(version|actualizado|reglas):/ { capa = ""; next }

    # Secciones de segundo nivel (dos espacios)
    /^  [a-z-]+:[ \t]*$/ {
      if (capa == "") next
      seccion = $0
      gsub(/[ :]/, "", seccion)
      pendiente = ""
      next
    }

    capa == "" { next }

    # --- PRIMITIVAS -------------------------------------------------------
    # Forma A, plana:      "    sm: 0.875rem"
    # Forma B, con nota:   "    rojo-500:" / "      valor: \"#e32636\""
    capa == "prim" {
      if (match($0, /^    [A-Za-z0-9"_-]+:[ \t]*$/)) {        # abre forma B
        pendiente = $0; gsub(/[ :\t]/, "", pendiente)
        next
      }
      if (match($0, /^      valor:/) && pendiente != "") {     # cierra forma B
        v = $0; sub(/^      valor:/, "", v); v = limpiar(v)
        if (v != "") { emitir(seccion "-", pendiente, v); n++ }
        ultima = pendiente
        pendiente = ""
        next
      }
      # `movil:` es la variante del mismo token bajo el punto de quiebre chico.
      # Se emite como <token>-movil para que el media query la consuma en vez
      # de repetir el clamp a mano.
      if (match($0, /^      movil:/) && ultima != "") {
        v = $0; sub(/^      movil:/, "", v); v = limpiar(v)
        if (v != "") { emitir(seccion "-", ultima "-movil", v); n++ }
        next
      }
      if (match($0, /^    "?[A-Za-z0-9_-]+"?:[ \t]*[^ \t]/)) { # forma A
        linea = $0; sub(/^    /, "", linea)
        idx = index(linea, ":")
        k = substr(linea, 1, idx - 1); gsub(/"/, "", k)
        v = limpiar(substr(linea, idx + 1))
        # `movil:` y `nota:` van indentados a 6, no entran acá.
        if (v != "") { emitir(seccion "-", k, v); n++ }
        next
      }
      next
    }

    # --- SEMÁNTICAS: solo color (los roles de texto se emiten como clases) --
    capa == "sem" && seccion == "color" {
      # El comentario al margen es opcional: sin él, `acento: rojo-500  # ...`
      # no casaba y el token se perdía en silencio.
      if (match($0, /^    [a-z-]+:[ \t]*[a-z0-9-]+[ \t]*(#.*)?$/)) {
        linea = $0; sub(/^    /, "", linea)
        idx = index(linea, ":")
        k = substr(linea, 1, idx - 1)
        v = limpiar(substr(linea, idx + 1))
        emitir("", k, "var(--color-" v ")"); n++
      }
      next
    }

    capa == "sem" && seccion == "tipografia" {
      if (match($0, /^    [a-z-]+:/)) {
        linea = $0; sub(/^    /, "", linea)
        idx = index(linea, ":")
        k = substr(linea, 1, idx - 1)
        v = limpiar(substr(linea, idx + 1))
        emitir("fuente-", k, v); n++
      }
      next
    }

    END {
      print "}"
      if (n < 60) {
        printf "[error] solo se emitieron %d tokens; la forma de tokens.yaml cambió\n", n > "/dev/stderr"
        exit 1
      }
      printf "[ok] %d tokens emitidos\n", n > "/dev/stderr"
    }
  ' "$FUENTE"

  # --- Roles tipográficos como clases -------------------------------------
  # Se emiten aparte porque un rol agrupa cuatro propiedades que deben
  # aplicarse juntas; como variables sueltas se volverían a separar.
  awk '
    function limpiar(s,   idx) {
      gsub(/^[ \t]+/, "", s)
      if (substr(s, 1, 1) == "\"") {
        s = substr(s, 2); idx = index(s, "\"")
        if (idx > 0) s = substr(s, 1, idx - 1)
        return s
      }
      sub(/[ \t]+#.*$/, "", s); gsub(/[ \t]+$/, "", s)
      return s
    }
    function esNumero(s) { return s ~ /^[0-9]+(\.[0-9]+)?$/ }
    function cerrar() {
      if (rol == "") return
      printf "\n.t-%s {\n", rol
      if (tamano   != "") printf "  font-size: var(--tamano-%s);\n", tamano
      if (peso     != "") printf "  font-weight: var(--peso-%s);\n", peso
      if (inter    != "") printf "  line-height: %s;\n", (esNumero(inter) ? inter : "var(--interlinea-" inter ")")
      if (espaciado!= "") printf "  letter-spacing: var(--espaciado-letra-%s);\n", espaciado
      if (transf   != "") printf "  text-transform: %s;\n", transf
      print "}"
      rol = ""; tamano = ""; peso = ""; inter = ""; espaciado = ""; transf = ""
    }
    BEGIN { dentro = 0; rol = "" }
    /^semanticas:/ { capa = "sem"; next }
    /^primitivas:/ { capa = "prim"; next }
    capa == "sem" && /^  texto:[ \t]*$/ { dentro = 1; next }
    capa == "sem" && /^  [a-z-]+:[ \t]*$/ { if (dentro) { cerrar(); dentro = 0 } next }
    dentro && /^    [a-z-]+:[ \t]*$/ {
      cerrar()
      rol = $0; gsub(/[ :\t]/, "", rol)
      next
    }
    dentro && /^      [a-z-]+:/ {
      linea = $0; sub(/^      /, "", linea)
      idx = index(linea, ":")
      k = substr(linea, 1, idx - 1)
      v = limpiar(substr(linea, idx + 1))
      if (k == "tamano")          tamano = v
      else if (k == "peso")       peso = v
      else if (k == "interlinea") inter = v
      else if (k == "espaciado-letra") espaciado = v
      else if (k == "transformar") transf = v
      next
    }
    END { cerrar() }
  ' "$FUENTE"
}

TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

generar > "$TMP"

# Integridad referencial: toda var(--X) que el CSS usa tiene que estar definida
# en el propio archivo. Esta comprobación existe porque la primera versión del
# generador emitió las semánticas apuntando a primitivas de color que se había
# comido el borrado de comentarios: el CSS era válido y el sitio habría quedado
# sin color, en silencio. Las --font-* son la excepción legítima: las define
# next/font en layout.tsx.
HUERFANAS="$(
  { grep -oE 'var\(--[a-z0-9-]+\)' "$TMP" | sed 's/^var(//; s/)$//' | sort -u > "$TMP.usa"
    grep -oE '^  --[a-z0-9-]+:'     "$TMP" | sed 's/^  //; s/:$//' | sort -u > "$TMP.def"
    comm -23 "$TMP.usa" "$TMP.def" | grep -v '^--font-' || true
  }
)"
rm -f "$TMP.usa" "$TMP.def"
if [ -n "$HUERFANAS" ]; then
  printf '[error] el CSS referencia tokens que no define:\n%s\n' "$HUERFANAS" >&2
  exit 1
fi

# Cobertura: todo token semántico de color del YAML tiene que haber salido al
# CSS. Va aparte del chequeo anterior porque un token semántico que se pierde no
# deja ninguna referencia rota — simplemente no existe, y el componente que lo
# use hereda `initial`. Así se detectó que los `--acento*` se perdían por un
# comentario al margen.
ESPERADOS="$(awk '
  /^semanticas:/ { capa=1 } /^primitivas:/ { capa=0 }
  capa && /^  color:[ \t]*$/ { dentro=1; next }
  capa && /^  [a-z-]+:[ \t]*$/ { dentro=0 }
  dentro && /^    [a-z-]+:[ \t]*[a-z0-9-]+/ { s=$1; sub(/:$/,"",s); print s }
' "$FUENTE" | sort -u)"
FALTANTES=""
for t in $ESPERADOS; do
  grep -qE "^  --$t:" "$TMP" || FALTANTES="$FALTANTES $t"
done
if [ -n "$FALTANTES" ]; then
  printf '[error] tokens semánticos del YAML que no llegaron al CSS:%s\n' "$FALTANTES" >&2
  exit 1
fi

if [ "$VERIFICAR" = 1 ]; then
  if [ ! -f "$DESTINO" ]; then
    printf '[error] no existe %s — corre el generador sin --verificar\n' "$DESTINO" >&2
    exit 1
  fi
  if diff -q "$TMP" "$DESTINO" >/dev/null; then
    printf '[ok] tokens.css está al día con tokens.yaml\n'
  else
    printf '[error] tokens.css NO corresponde a tokens.yaml:\n' >&2
    diff "$DESTINO" "$TMP" >&2 || true
    exit 1
  fi
else
  cp "$TMP" "$DESTINO"
  printf '[ok] escrito %s\n' "$DESTINO"
fi
