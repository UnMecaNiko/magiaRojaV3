# Glosario

Términos técnicos usados en esta base de conocimiento, explicados para que cualquier lector (cliente, técnico o modelo) los entienda.

| Término | Definición |
|---|---|
| **Air assist** | Chorro de aire dirigido al punto de corte del láser. Despeja humo y residuos, enfría el material y produce cortes más limpios. El K30 lo trae integrado; la v2 usaba bomba externa. |
| **ADR** | *Architecture Decision Record* — formato para registrar una decisión con su contexto y consecuencias. Usado en `decisiones/`. |
| **BOM** | *Bill of Materials* — lista de materiales/componentes de la máquina. |
| **Bujes lineales** | Casquillos que deslizan sobre ejes/guías lineales; dan soporte de precisión al movimiento (v2/v3). |
| **CNC** | Control Numérico Computarizado: máquina cuyos movimientos se controlan por instrucciones digitales (G-code). |
| **CNC Shield** | Placa de expansión para Arduino que aloja los drivers de motores y expone las conexiones de una CNC. |
| **Driver (de motor paso a paso)** | Circuito que convierte pulsos lógicos en corriente para las bobinas del motor. Ej: A4988 (v1), TMC2209 (v2). Su corriente debe calibrarse. |
| **FAC** | *Fast Axis Collimation* — lente que colima el eje rápido de un diodo láser, concentrando el haz (tecnología del láser de la v2). |
| **Compresión de haz (beam compression)** | Técnica óptica que combina/comprime varios haces de diodo en uno más denso — así logra el K30 30W ópticos con 6 diodos. |
| **Foco fijo / distancia focal** | Distancia a la que el láser concentra su punto mínimo (40 mm en el K30). Se ajusta posicionando la altura del cabezal — de ahí el valor del eje Z motorizado. |
| **Fresado** | Mecanizado por arranque de viruta con una herramienta rotativa. En la v3, mediante el cabezal intercambiable (motor tool). |
| **G-code** | Lenguaje estándar de instrucciones para máquinas CNC (`G1 X10 Y20 F300`…). |
| **GRBL** | Firmware open source de control CNC que corre en Arduino. Interpreta G-code y genera los pulsos de los motores. Configurable vía parámetros `$$`. |
| **Homing** | Rutina que lleva los ejes a una posición de referencia conocida usando finales de carrera. |
| **LaserGRBL** | Software libre de Windows para grabado láser con GRBL. |
| **LightBurn** | Software comercial de diseño y control láser; maneja librerías de materiales. El estándar del flujo láser de la línea. |
| **NEMA 17** | Estándar de tamaño de motor paso a paso (frente de 1.7"). El motor de toda la línea Magia Roja. |
| **Parámetros $$** | Configuración interna de GRBL (pasos/mm, velocidades, aceleraciones…). Se consultan enviando `$$` por consola. |
| **Pasos/mm** | Cuántos pasos del motor equivalen a 1 mm de movimiento del eje. Depende del motor, microstepping y transmisión. |
| **Potencia óptica vs. eléctrica** | Los láseres de diodo se anuncian por consumo eléctrico (80W) pero lo que corta es la potencia óptica de salida (10W en v2, 30W en el K30). La óptica es la que importa. |
| **PWM / TTL** | Señales de control con las que la controladora regula la potencia del láser. |
| **Tornillo helicoidal (husillo)** | Transmisión que convierte rotación en desplazamiento lineal con alta precisión; reemplazó a las correas desde la v2. |
| **UGS** | Universal G-code Sender — software open source para enviar G-code a GRBL. |
| **Workholding** | Cómo se sujeta la pieza de trabajo: mesa perforada + prensas (v1), parrilla honeycomb (v2). |
