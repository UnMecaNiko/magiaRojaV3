# Desarrollos completados

> Registro de lo ya hecho, en orden cronológico inverso. Los ítems llegan aquí desde [plan-de-trabajo.md](plan-de-trabajo.md).

## 2026

### 2026-09-18 — La landing se publica con un push a `main`
- [D-0020](../../conocimiento/maquina/decisiones/D-0020-despliegue-landing-por-github-actions.md): GitHub Actions corre `infra/desplegar-landing.sh`. El primer run falló por el bit de ejecución de los `.sh`; el segundo publicó en 1 m 3 s. Lo que sigue (construir la imagen fuera del VPS) no está en esta lista: es infraestructura, no la fase eléctrica.

### 2026-08-24 — Actualización eléctrica e investigación de mejoras
- Documentada la sesión física del 17 de agosto: tira LED interior a 12 V en el segundo interruptor, mazo móvil fijado, finales NC, Y−/Y+ en serie, Z+ en D12 y homing de tres ejes.
- [D-0018](../../conocimiento/maquina/decisiones/D-0018-finales-carrera-nc-y-en-serie.md): formalizada la topología de límites y cerrado el seguimiento de la alarma por EMI.
- Investigada la cadena portacables definitiva; quedaron definidos criterios y mediciones necesarias, sin inventar una referencia.
- Revaluados drivers y controladora: se mantienen DRV8825 y Arduino/GRBL hasta que pruebas o requisitos medibles justifiquen migrar.

### 2026-08-17 — Puesta en marcha de límites, homing y Vref
- Fin de carrera Z+ instalado en D12/SpnEn; finales X−, Y−, Y+ y Z+ operativos en NC.
- Homing configurado con Z primero y luego X/Y; soft/hard limits reactivados (`$20=1`, `$21=1`).
- Vref ajustado a aproximadamente 0,70 V en los tres DRV8825; queda pendiente validación térmica y bajo carga.
- Configuración `$$` real capturada y recorridos empíricos registrados.

### 2026-07-26 — Dimensiones y oferta comercial definidas
- Confirmadas las dimensiones externas de **500 × 500 mm** y un área útil inicialmente estimada en 400 × 400 mm ([D-0012](../../conocimiento/maquina/decisiones/D-0012-dimensiones-generales-y-area-trabajo.md)); el área quedó reemplazada después por [D-0015](../../conocimiento/maquina/decisiones/D-0015-area-de-trabajo-500x500.md) y por la medición empírica de [D-0017](../../conocimiento/maquina/decisiones/D-0017-area-trabajo-empirica-505x490.md).
- Definidas la identidad **VELO inc** y la cobertura de mantenimiento por seis meses con tres servicios ([D-0013](../../conocimiento/maquina/decisiones/D-0013-identidad-velo-y-plan-mantenimiento.md)).
- Completada la primera landing promocional en `salidas/web/`, con 20 imágenes generadas, contacto medible por WhatsApp y configuración para despliegue en VPS.

### 2026-07-20 — Z sin fin de carrera: límites y homing decididos
- [D-0009](../../conocimiento/maquina/decisiones/D-0009-z-sin-fin-de-carrera-soft-limits.md): GRBL no soporta soft/hard limits por eje (son globales); Z queda fuera del ciclo de homing y `$132` se fija a un valor enorme para neutralizar su soft limit sin afectar a X/Y — cierra parte del pendiente en [plan-de-trabajo.md](plan-de-trabajo.md).

### 2026-07-04 — Creación de la base de conocimiento
- Repositorio estructurado en dos capas (conocimiento + harness) con AGENTS.md como contexto principal.
- Investigada y documentada la ficha del Laser Tree K30 (corrigió la referencia "tri-j30" y detectó el requisito de 24V → decisión de dos rieles).
- Registradas las 6 primeras decisiones (D-0001 a D-0006).
- Confirmado el driver de la controladora: **DRV8825** en los tres ejes ([D-0007](../../conocimiento/maquina/decisiones/D-0007-drivers-drv8825.md)) — cierra el pendiente que quedaba abierto en el plan de trabajo.
- Documentado el linaje v1/v2 en español.

### 2026 (antes del repo) — Fase mecánica de la v3 ✅
- Estructura, ejes X/Y/Z y soporte de cabezal intercambiable construidos (Saul Velasquez).
- ⏳ Detalles por reconstruir — ver [01-construccion-mecanica.md](../../conocimiento/proceso-construccion/v3/01-construccion-mecanica.md).

### 2026 — Venta de la v2
- La CNC Magia Roja v2 se vendió — validación comercial que dio origen a la v3.

## Historial previo

- **2024-06 → 2026**: construcción y operación de la [v2](../../conocimiento/historia/v2.md).
- **2021-10 → 2024-05**: construcción y operación de la [v1](../../conocimiento/historia/v1.md) (>8 h/día en producción).
