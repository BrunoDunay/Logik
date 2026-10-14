# Rediseño v2 (14 oct 2026, sesión 4)

Reemplaza la dirección `sentence-as-layout` de `diseno-prototipo.md`: el usuario pidió un rediseño completo a partir de sus referencias (`referencias/Referencias web/`) y de los diseños de Instagram que eligió (`referencias/Referencias para diseño/`).

## Qué manda en cada decisión

1. **Las referencias del usuario**:
   - Hero estilo "TURA".
   - Carrusel coverflow para publicaciones.
   - Carrusel estilo Salomon para marcas.
   - Video de una "A" que se construye, como base de la intro.
2. **Sus diseños de Instagram**:
   - Blanco o papel como base.
   - Campos rosas.
   - Recortes en blanco y negro con semitono.
   - Script rosa en las palabras clave.
   - Destello de cuatro puntas.
3. **Las skills**:
   - `ui-ux-pro-max` para accesibilidad y la lista de revisión.
   - `emil-design-eng` para curvas, duraciones y respuesta al toque.
   - `dataviz` para las gráficas: validé el contraste del rosa con su script y por eso van sobre negro.
   - Las reglas de taste-skill (sin script ni sombras) ya no aplican.

## Equilibrio de color

El usuario pidió que el blanco esté siempre presente. Las secciones alternan así:

| Sección | Fondo |
|---|---|
| Hero, Paquetes, Videos y Cierre | Negro |
| Nosotras, Contenido, Marcas y Equipo | Blanco |
| Resultados | Papel |
| Servicios | Rosa claro |
| Contacto | Rosa |

## Piezas principales

- **Intro**:
  - El logo, vectorizado del PNG original con `scripts/trace-logo.py`, se construye en unos 3 s: punto de luz, líneas guía y círculos, contorno de cada letra, relleno, flecha que crece desde la K y "MARKETING".
  - Se ve una vez por sesión. Con `?intro` en la URL se repite, con `?intro=lento` va a un cuarto de velocidad y con `?intro=t1.5` se congela en el segundo 1.5 (para revisarla).
  - Se omite con "reducir movimiento", y un clic o una tecla la saltan.
- **Hero**: el logo con un brillo que sigue al mouse, recortado a la forma del logo. Al pasar el cursor, la flecha sube y las letras se levantan.
- **Resultados**:
  - Techani: área del alcance diario, digitalizada de la gráfica de Meta.
  - GASE: pasos del anuncio a la cita.
  - Clínicas: barras del costo por conversación.
  - Meta: puntos con 15 notificaciones reales.
  - Todas con tooltip y tabla de datos.
- **Publicaciones**: 19 propias, con su texto real de Instagram, y 34 diseños para clientes por giro. La central se ve como publicación de Instagram, con like y ráfaga de corazones.
- **Marcas**: 9 tarjetas con foto del trabajo, color de la marca y su logo real (los logos blancos de su sitio actual).
- **Panel** (`/login` y `/panel`): edita las 12 secciones con un formulario generado desde la forma del contenido.

## Pendiente de confirmar con la agencia

- Precios de Emprendedor, Paquete'n Redes y Flash; que Facebook Plus sea el de $2,499.
- Descripciones de las marcas y permiso para usar sus nombres, logos y cifras.
- Nombres de las campañas en la gráfica de clínicas.
- Si se quieren los logos a color: hoy son las versiones blancas de su sitio.
