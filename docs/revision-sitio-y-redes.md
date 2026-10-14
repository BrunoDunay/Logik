# Revisión del sitio y de las redes de Logik (13 oct 2026)

Hecha con `redesign-existing-projects`, `ui-ux-pro-max` y `agent-browser`. Las redes se revisaron sin iniciar sesión, como las ve un cliente nuevo. Las capturas están en `referencias/redes/` y `referencias/capturas-sitio-actual/`.

## Hallazgo principal

**Sus redes tienen una identidad visual fuerte y el sitio no la refleja.** En Instagram y Facebook usan siempre lo mismo:
- Fondo negro o rosa, con rosa claro y blanco.
- Collage con fotos en tramado de semitonos (halftone), recortes de papel, cinta, estrellas y destellos.
- Letra script rosa (tipo caligrafía) combinada con una sans gruesa en mayúsculas.
- Diagonales, retícula de papel cuadriculado y puntos de semitono.
- Contenido de temporada (Buen Fin, Black Friday, "pelea con Meta").

El sitio en Wix usa otras 10 tipografías y bloques sin relación entre sí. **El prototipo debe llevar el lenguaje de sus redes a la web**, no inventar uno nuevo. Ese es el argumento de venta: "su sitio por fin se ve como su Instagram".

## Datos actualizados de las redes

| Red | Seguidores | Otros datos |
|---|---|---|
| Instagram @logikmkt | 3,924 | Biografía: "Estrategas del mercado digital · Redes sociales con 🫀 y 🧠 · 6 años · +70 clientes · Equipo a nivel nacional". Historias destacadas: Estudio, Resultados, Team, Shootings, Canva create, Meta Certified, Servicios, Reviews, Portafolio |
| TikTok @logikmarketing | 4,110 | **185.8 K me gusta**, sigue a 37 cuentas. Biografía: manejo de redes, contenido creativo, estrategia y resultados |
| Facebook /logikmkt | 4,216 | Publican cada pocos días (la última, hace 6 horas). Correo de Gmail. Tienen horario configurado |

**Contradicciones con el sitio (preguntar a la agencia antes de usarlas):**
- Instagram anuncia el paquete **desde $2,499 al mes** (estrategia, 1 campaña con 4 anuncios, 10 publicaciones, portada de Facebook, análisis y entrega de resultados, primera consulta gratis). El sitio dice **desde $3,499**.
- Instagram dice "6 años · +70 clientes". El sitio muestra más de 30 logos.
- WhatsApp de Instagram: `wa.me/5214492119107`. El sitio usa `wa.link/7qbgst`; confirmar que sea el mismo número.

**Material útil para el prototipo:** sus diseños de Instagram, reels de TikTok (185 K me gusta es prueba social fuerte), historias destacadas de Resultados, Reviews y Team, y la certificación de Meta.

## Auditoría del sitio actual

| Área | Problema | Dato |
|---|---|---|
| SEO | Sin H1 en la portada | 0 H1; los H2 están en mayúsculas o incompletos |
| SEO | Error en la descripción para compartir | `og:description` dice "epresas" |
| SEO | Descripción de 230 caracteres que termina en "¡Contáctanos hoy mismo!" | Se corta en Google |
| Tipografía | 10 familias tipográficas | Poppins, Open Sans, Brandon Grotesque, Helvetica, Playfair, Futura, DIN Next, Roboto, Arial, entre otras |
| Accesibilidad | Botones y enlaces pequeños | 14 de 24 miden menos de 44 × 44 px |
| Accesibilidad | Imágenes sin texto alternativo | 4 de 41 |
| Contraste | Rosa de marca `#FE5F92` sobre blanco | **2.89:1, no pasa AA** (mínimo 4.5:1) |
| Contraste | El mismo rosa sobre negro | 7.27:1, pasa AA y AAA |
| Contenido | Testimonios duplicados, casos de 2021–2022, blog detenido desde oct 2025 | Las redes, en cambio, están al día |

## Dirección de diseño para el prototipo

**`ui-ux-pro-max`** (consulta "digital marketing agency social media small business"):
- Patrón: narrativa con scroll (gancho → problema → proceso → solución → acción final), con acciones al final de cada bloque.
- Colores: rosa `#EC4899` como principal; muy cerca de su `#FE5F92`, lo que confirma la marca.
- Estilo sugerido: brutalismo con Lexend Mega y Public Sans. **No se aplica tal cual**: es demasiado frío para pymes y no se parece a sus redes. Se toma solo la idea de bloques grandes y tipografía con peso.
- Lista de entrega: SVG en vez de emojis como iconos, transiciones de 150 a 300 ms, contraste de 4.5:1, foco visible, respetar `prefers-reduced-motion` y probar en 375, 768, 1024 y 1440 px.

**Decisión propuesta** (combinando `ui-ux-pro-max`, `redesign-existing-projects` y sus redes):
- **Base negra (`#111` o `#141012`, nunca `#000`) con rosa `#FE5F92` como acento.** El rosa pasa el contraste sobre negro. Sobre fondos claros, usar un rosa más oscuro para texto (`#D6336C`, 4.62:1) y dejar `#FE5F92` solo para elementos grandes o decorativos.
- **Tipografías**: Poppins para títulos (ya es su marca), una script para palabras de énfasis (la versión web de la caligrafía de sus diseños) y una sans legible para el cuerpo. Máximo tres, con `@fontsource`.
- **Texturas**: tramado de semitonos, retícula de papel, recortes y estrellas como SVG o CSS, igual que en sus publicaciones.
- **Movimiento**: entradas escalonadas al hacer scroll, stickers que se acomodan y contadores en los números del caso Techani. Todo desactivado con `prefers-reduced-motion`.
- **Evitar**: tres tarjetas iguales en fila, testimonios en carrusel con puntos, tabla de precios de tres torres sin jerarquía, emojis como iconos y gradientes morado/azul.
- **Paquetes**: el recomendado (Emprendedor) se destaca con color, no con más altura. Precio visible en texto, nunca dentro de una imagen.

## Agent Reach

Es una herramienta de línea de comandos en Python, no una skill. Para Facebook e Instagram necesita OpenCLI y la sesión iniciada en Chrome; TikTok no está soportado. **No se instaló**: con `agent-browser` sin sesión se obtuvieron biografías, seguidores, publicaciones recientes y capturas. Solo valdría la pena para leer comentarios o métricas por publicación, y requiere la sesión del usuario.
