# Diseño del prototipo (14 oct 2026, sesión 3)

Hecho con `design-taste-frontend` (taste-skill), `ui-ux-pro-max` y `emil-design-eng`, a partir de `investigacion-redes.md`.

## Decisiones

- **Dirección de taste-skill**: `sentence-as-layout` ("la frase es la composición"), semilla 616806405, guardada en `.taste-skill/direction.json`. Se eligió entre tres direcciones porque Logik ya tiene la frase: *"No hacemos magia, hacemos marketing"*. Las otras dos (`colour-chapters` y `name-as-monument`) servían para cualquier agencia.
- **ui-ux-pro-max** ("marketing agency small business bold"):
  - Se toman la narrativa por capítulos con una acción al final de cada uno, el color propio por capítulo (como alternan negro y rosa en su feed), las esquinas rectas y la tipografía gruesa.
  - Se descartan su cian como acento y Lexend Mega, porque no son de la marca.
- **emil-design-eng**:
  - Botones que ceden a `scale(0.97)` al presionarlos.
  - Curvas `cubic-bezier(0.23, 1, 0.32, 1)`.
  - Ninguna animación de interfaz pasa de 300 ms.
  - Escalonado de 60 a 80 ms.
  - Hover solo con `(hover: hover) and (pointer: fine)`.
  - Transiciones, no keyframes, en lo que se puede interrumpir.
- **Colores** (de la marca; medidos en el logo y en 99 publicaciones):

  | Variable | Valor | Uso |
  |---|---|---|
  | `--ink` | `#141012` | Fondo base. Negro con un toque cálido, nunca `#000` |
  | `--paper` | `#F7F3F1` | Blanco papel |
  | `--pink` | `#FC7CAB` | Rosa de sus publicaciones. Campos de color completos, con texto en `--ink` (8.6:1) |
  | `--pink-logo` | `#FE5F92` | Rosa del logo. Acento y acción principal sobre negro (7.3:1) |
  | `--pink-deep` | `#C2185B` | Texto rosa sobre papel (5.9:1) |

- **Tipografías**: dos como máximo.
  - **Poppins**, la de su marca, en 400, 600 y 800.
  - **Great Vibes**, la versión web de la script de sus diseños, solo en anotaciones a mano (como las de sus historias) y nunca en un titular.
- **Excepciones a las reglas de taste-skill, por la marca**: la script en anotaciones, el destello de cuatro puntas (su motivo en todas las publicaciones) y el tramado de semitonos en las fotos recortadas. Se declaran con `--allow` en el inspector.
- **Backend desde el inicio**: sí, como en Fitness by Evidence. Todo el texto comercial vive en `site_settings` (PostgreSQL), con el contenido inicial en `backend/seeders/initial-content.js`. La landing tiene contenido de respaldo y se ve completa aunque la API no responda. El panel de edición queda para después, como parte de lo que se vende con el mantenimiento.

## La idea

> En esta página, **la notificación de Meta con la que amanecen casi a diario** ("Tu anuncio tiene buen rendimiento: el costo por resultado es 97 % más bajo que el de negocios similares") se vuelve **la prueba de cada sección**: tarjetas de notificación reales, con sus cifras, que llegan como avisos del celular.

Prueba del competidor: otra agencia de Aguascalientes no puede poner esas notificaciones, porque son las capturas que Logik publica en sus historias de "Resultados".

**La interacción principal**: una calculadora de mensajes. El visitante mueve su presupuesto mensual de anuncios ($1,000 a $15,000) y ve cuántas conversaciones de WhatsApp le darían, con el costo por conversación de campañas reales de Logik ($7 a $14). El botón manda a WhatsApp con el presupuesto ya escrito en el mensaje. Sin JavaScript, se lee una tabla fija con tres presupuestos.

**El video** (HyperFrames): se hace al final, con el sitio terminado, para reutilizar su material.
- Ocupa la sección entre Servicios y Trabajo, no el hero.
- Es un montaje de marcas: logos de clientes, sus fotos de producto y sus resultados.
- El hero es tipográfico y lleva un fragmento de su propio reel dentro de la frase, que es lo que pide la dirección.
- Mientras el video no exista, esa sección usa uno de sus videos propios del sitio actual.

## El argumento (una línea por sección)

| Sección | Afirmación | Prueba |
|---|---|---|
| Hero | Hacen marketing que se mide, no magia | Su frase, con su reel dentro, y "6 años · +70 clientes" |
| Resultados | Sus campañas cuestan menos que las de la competencia | Notificaciones reales de Meta (18 % a 97 % más bajo), las doctoras con más de 200 mensajes a menos de $8, y la calculadora |
| Servicios | Lo hacen todo bajo un mismo techo | Seis servicios, cada uno con una foto de su trabajo real |
| Video | Más de 70 marcas | Montaje de logos y trabajo (HyperFrames) |
| Trabajo | Saben de giros muy distintos | Nombres de clientes con una foto de cada uno |
| Proceso | Hay método detrás de cada post | Analizamos, Creamos, Anunciamos, Medimos, con fotos de su oficina y su estudio |
| Paquetes | Empezar cuesta poco | Desde $2,499 al mes, con lo que incluye |
| Testimonio | Los clientes lo dicen | Roberto Chávez y tres más |
| Equipo | Son personas reales y cercanas | Diana, Abigail y el "Marke-team", su oficina y la certificación de Meta |
| Contacto | Hablar con ellas es inmediato | El WhatsApp como tipografía de cartel |
| Cierre | La invitación | "LOGIK" recortado al pie |

## Textos (copy deck)

**Navegación**: Logik (logo) · Resultados · Servicios · Paquetes · Equipo · [Escríbenos]

**Hero**
- H1: "No hacemos magia, [reel] hacemos marketing."
- Apoyo: "Agencia de marketing digital en Aguascalientes. Redes, contenido y campañas de Meta para pymes de todo México."
- Botón: "Agenda tu consulta gratis" (WhatsApp)
- Dato: "6 años · +70 clientes · equipo a nivel nacional"

**Resultados**
- H2: "Así amanecemos casi a diario."
- Anotación en script: "¡resultados reales!"
- Notificaciones: 97 %, 96 %, 85 %, 64 % y 41 % más bajo que negocios similares.
- Cifra: "+200 mensajes al mes, a menos de $8 cada uno". Nota: "Dos clínicas, campañas de agosto y septiembre."
- Calculadora: "¿Cuántos mensajes te daría tu presupuesto?" · "Con $3,000 al mes: entre 214 y 428 conversaciones." · Nota: "Estimación con el costo por conversación de campañas reales de Logik ($7 a $14). Cada giro es distinto." · Botón: "Quiero esos mensajes"

**Servicios**
- H2: "Todo tu marketing, en un solo equipo."
- Filas:
  1. **Manejo de redes**: Facebook, Instagram y TikTok con calendario, publicaciones, historias y respuesta a tu comunidad.
  2. **Contenido y fotografía**: grabamos reels y fotografía de producto en nuestro estudio o en tu negocio.
  3. **Campañas de publicidad**: Meta, Google y TikTok Ads, con planeación de medios y optimización semanal. Certificadas por Meta.
  4. **Identidad de marca**: logotipo, naming y manual de identidad para que tu marca se vea igual en todos lados.
  5. **Páginas web y landing pages**: sitios rápidos para tus campañas, con pixel de Meta y botón de WhatsApp, para que cada anuncio termine en una venta.
  6. **Asesoría mercadológica**: análisis situacional, FODA y estrategia para saber a quién hablarle y cómo.

**Video**: "Más de 70 marcas ya crecen con nosotras." (lo dice el video; la sección solo lleva el reproductor y una línea)

**Trabajo**: "Hemos hecho crecer: Hampton by Hilton [foto], Techani [foto], GASE Dental Group [foto], Secret Plus [foto], Desperrucados [foto], Novedades y Cosméticos [foto], Li-Kaan, Shekinah Amma, Pepe's Burgers, La Patrona, Olaya, Camelia, Holistik, Glüu, Sr. Sorbete y Plan B." Nota: "Más de 70 marcas en Aguascalientes, Chihuahua, Zacatecas, Guanajuato, CDMX y Jalisco, desde 2020."

**Proceso** (cuatro paneles a pantalla completa):
- **Analizamos**: "Revisamos tu negocio, tu competencia y tus números antes de publicar nada."
- **Creamos**: "Grabamos y diseñamos en nuestro estudio, con un calendario aprobado por ti."
- **Anunciamos**: "Lanzamos campañas con un presupuesto claro y las optimizamos cada semana."
- **Medimos**: "Cada mes recibes un reporte con lo que funcionó y lo que vamos a mejorar."

**Paquetes**
- Frase: "Tus redes, desde [$2,499] al mes."
- Incluye: "Estrategia integral, 10 publicaciones, una campaña con 4 anuncios, portada de Facebook, análisis situacional y reporte de resultados. La primera consulta es gratis."
- Botón: "Quiero este paquete"
- Otros (lista sencilla, precio pendiente de confirmar): Emprendedor (Facebook e Instagram, 12 publicaciones con 5 reels, historias, 1 campaña y sesión de contenido de 1 hora) · Paquete'n Redes (Facebook, Instagram y TikTok, 18 publicaciones con 8 reels, 2 campañas y remarketing) · Paquete Flash (contenido profesional y una campaña).
- Nota: "El presupuesto para anuncios se paga aparte, directo a Meta."

**Testimonio**
- Cita: "Se interesan no solo por cumplir." · Roberto Chávez · Cliente · Recomendación en Facebook.
- Tres más, pequeñas: Xochitl Serna, César Eduardo Quezada y Alejandro Egure.

**Equipo**
- Párrafo con foto como letra capitular: "**Diana Maldonado y Abigail Alcántara** fundaron Logik hace seis años con una idea sencilla: que una pyme de Aguascalientes pudiera tener el mismo marketing que una gran marca. Diana compra los anuncios (Meta Certified Media Buying Professional) y Abigail dirige el contenido y la fotografía. Hoy son un equipo de mujeres con oficina y estudio propios, al que ellas llaman el Marke-team."
- Datos: "Jesús Gómez Portugal, Ags." · "Desde 2020" · "Lunes a viernes"

**Contacto**
- Arriba: "Cuéntanos de tu negocio por WhatsApp. Te respondemos el mismo día."
- Display: "449 211 9107" (enlace a WhatsApp)
- Abajo: "logikmarketing1@gmail.com · Aguascalientes, México" · Instagram, Facebook, TikTok

**Cierre**: "¿Empezamos este mes?" + botón "Agenda tu consulta gratis" + LOGIK recortado al pie, con "Aviso de privacidad" y "© 2026 Logik Marketing".

## Pendiente de confirmar con la agencia

- Precios de Emprendedor, Paquete'n Redes y Flash.
- Que `wa.me/5214492119107` sea el número de ventas (Facebook muestra 449 186 2972).
- El año de inicio (se infiere 2020 de "6 años").
- El horario.
- Permiso para usar los nombres de los clientes y las cifras de sus campañas.
- Los nombres y roles del resto del equipo.
