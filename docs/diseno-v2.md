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
- **Hero**: el logo con un destello que sigue al mouse, recortado a la forma del logo. Nada se mueve: solo se ilumina.
- **Resultados**:
  - Techani: área del alcance diario, digitalizada de la gráfica de Meta.
  - GASE: pasos del anuncio a la cita.
  - Clínicas: barras del costo por conversación.
  - Meta: puntos con 15 notificaciones reales.
  - Todas con tooltip y tabla de datos.
- **Publicaciones**: 33 propias, con su texto real de Instagram, y 28 diseños para clientes por giro (solo de marcas con logo identificado). Las tarjetas no se recrean: se deslizan y la del centro se despliega como publicación de Instagram, con like y ráfaga de corazones. El avatar usa el logo y color de cada marca.
- **Marcas**: 31 tarjetas en ciclo infinito; 9 con foto del trabajo y 22 solo con color y logo (los logos blancos de su sitio actual).
- **Panel** (`/login` y `/panel`): edita las 12 secciones con un formulario generado desde la forma del contenido.

## Pulido de la sesión 5 (pedido del usuario)

- **Intro**: empieza en blanco y se oscurece; una luz recorre LOGIK y las letras aparecen a su paso (máscara SVG con borde degradado y el destello viajando con ella); la flecha llega en diagonal y encaja en la K; luego MARKETING y al final el resto del hero en cascada. La construcción está en `components/logo/logo-build.ts` y la usan el hero, el navbar y el pie.
- **Movimiento**: nada instantáneo. Tokens de duración más largos (180 a 1100 ms), scroll suave con GSAP para los enlaces internos (`core/utils/smooth-scroll.ts`), apariciones con desenfoque y escala.
- **Cursores**: la flecha del logo reflejada para que apunte como cursor y una mano rosa, sin borde (`public/cursor/`).
- **Colores de redes**: Facebook, Instagram, TikTok, Google, WhatsApp y Meta se pintan con su color en Servicios (`core/utils/brand-words.pipe.ts`), en tonos que se leen sobre blanco.
- **Favicon**: la K negra con la flecha rosa sobre blanco, generada de los trazos del logo (`scripts/build-icon.py`).
- **Equipo**: biografías originales del sitio actual y la insignia Meta Certified Media Buying Professional de Diana, recortada de su historia de Instagram.
- **Páginas legales**: `/privacidad`, `/terminos` y `/cookies`, con textos base.

## Pendiente de confirmar con la agencia

- Textos de las páginas legales (son una base para México; conviene que los revise un abogado).
- La insignia de Meta es un recorte de su historia; pedirles el archivo oficial en alta resolución (lo descargan de su perfil de certificación).
- Giro y descripción de las 22 marcas nuevas; varias dicen "Marca local" porque el logo no indica a qué se dedican.

- Precios de Emprendedor, Paquete'n Redes y Flash; que Facebook Plus sea el de $2,499.
- Descripciones de las marcas y permiso para usar sus nombres, logos y cifras.
- Nombres de las campañas en la gráfica de clínicas.
- Si se quieren los logos a color: hoy son las versiones blancas de su sitio.
