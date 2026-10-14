# Proyecto Logik: propuesta de página web

Contexto heredado de una conversación anterior (13 oct 2026), iniciada en la carpeta `PROYECTOS/Germain`.

## Objetivo del usuario

El usuario hace páginas web. Una conocida trabaja en **Logik Marketing** (https://www.logikmkt.com), una agencia de marketing digital, y ya le comentó de sus servicios. La idea es:

- Convencer a la agencia de incluir **la venta de páginas web** a sus clientes, con el usuario como quien las construye. Opcionalmente, también modificaciones y mantenimiento en casos específicos.
- No busca necesariamente entrar a su plantilla. Le sirve que lo contacten como **externo** cuando un cliente contrate ese servicio, y está abierto a distintos flujos de trabajo: por proyecto, marca blanca, comisión o mantenimiento mensual.
- Para convencerlas, quiere presentarse con **un prototipo de la propia página de Logik**, ya que la actual no es tan atractiva visualmente.

## Estado actual (actualizado el 13 oct 2026, fin de la sesión 2)

Al retomar en otro equipo, leer en este orden: este archivo, después `docs/revision-sitio-y-redes.md` y por último las capturas de `referencias/`.

**Hecho**
1. Análisis de la marca y del sitio actual (secciones de abajo).
2. Se acordó la forma de trabajar: el mismo stack y la misma estructura que Fitness by Evidence y Armando Ovalle (ver "Forma de trabajar").
3. Se instalaron las skills de diseño en `.claude/skills/`: `ui-ux-pro-max`, `design-taste-frontend` y `redesign-existing-projects`.
4. Revisión del sitio y de las redes con esas skills, en `docs/revision-sitio-y-redes.md`. **Conclusión: el prototipo debe trasladar a la web el lenguaje visual de sus redes** (negro con rosa, collage con semitonos, script con sans gruesa), porque el sitio actual no se parece a su Instagram.

**Pendiente de decidir con el usuario**
- Si el prototipo lleva backend y panel desde el inicio. La recomendación es crear `frontend/` y `backend/` completos, pero construir primero la portada y los paquetes con el contenido en `seeders/initial-content.js`; el panel de edición queda como parte de lo que se vende con el mantenimiento.
- Si se copia la skill `itshover-icons` desde `PROYECTOS/Germain/.claude/skills/` (no viaja con este repositorio; está en el repositorio `BrunoDunay/Panel-administrativo-web-Fitness`).
- Precio real del paquete de entrada: Instagram dice $2,499 y el sitio, $3,499.

**Siguiente paso**: crear la estructura del proyecto (Angular 22 + SSR y Express 5 + PostgreSQL) y construir la portada primero para celular, aplicando `design-taste-frontend` con la dirección de `docs/revision-sitio-y-redes.md`.

**Repositorios con estrella del usuario, evaluados para este proyecto**

| Repositorio | Utilidad aquí |
|---|---|
| `nextlevelbuilder/ui-ux-pro-max-skill` | **Instalada**. Sistema de diseño, contraste y lista de revisión |
| `Leonxlnx/taste-skill` | **Instalada** (`design-taste-frontend` y `redesign-existing-projects`). Dirección de arte y revisión de capturas |
| `vercel-labs/agent-browser` | **Instalada**. Capturas, extracción de material y pruebas visuales |
| `greensock/gsap-skills` | Alta, si las animaciones de scroll se hacen con GSAP (funciona en Angular) |
| `LottieFiles/motion-design-skill` | Alta. Principios de tiempos y curvas, sin importar la librería |
| `emilkowalski/skills` | Media. Detalles de interacción y pulido |
| `pbakaus/impeccable` | Media. Lenguaje de diseño y revisión |
| `zanwei/design-dna` | Media. Extrae los tokens de diseño de capturas, útil para pasar el estilo de sus publicaciones de Instagram a variables CSS |
| `itshover/itshover` | Media. Iconos animados; ya hay una adaptación a Angular en Germain |
| `heygen-com/hyperframes` / `Barty-Bart/motion-graphics` | Solo para un video de la propuesta, no para el sitio |
| `magicuidesign/magicui` | Es de React; solo sirve como inspiración |
| `Hainrixz/claude-webkit` | Baja. Genera sitios para quien no programa |
| `DietrichGebert/ponytail` | General, no específico de diseño |
| `Panniantong/Agent-Reach` | **Instalada** (sesión 3). Facebook e Instagram vía OpenCLI con la sesión de Chrome; no soporta TikTok. Ver "Herramientas" |

Ya se analizó la marca (resumen abajo).

## La agencia

- **Logik Marketing**, de Aguascalientes, México. Agencia 100 % digital enfocada en pequeñas y medianas empresas, con clientes en Chihuahua, Zacatecas, Guanajuato, CDMX y Jalisco.
- **Dos socias**; la marca habla en femenino ("Conoce más de nosotras").
  - **Diana Maldonado Medina**: Lic. en Mercadotecnia, 29 años, 5 años de experiencia. Publicidad pagada (Meta, TikTok, LinkedIn y Google Ads). Más de 50 marcas.
  - **Abigail Alcántara**: Lic. en Mercadotecnia, 26 años, más de 5 años de experiencia, maestría en Marketing y Medios Digitales. Community management, contenido, fotografía de producto. Más de 60 empresas.
- **Certificación**: Meta Certified Media Buying Professional.
- **Servicios**: manejo de redes; asesoría mercadológica; Facebook, Google y TikTok Ads; manual de identidad; logotipo y naming; **creación de páginas web** (solo una línea de texto, sin portafolio); fotografía de producto.
- **Paquetes** (desde **$3,499 al mes**):
  - **Facebook Plus**: Facebook, 10 publicaciones al mes, 1 campaña.
  - **Emprendedor**: Facebook e Instagram, 12 publicaciones (incluye 5 reels), stories, 1 campaña, sesión de contenido de 1 hora.
  - **Paquete'n Redes**: Facebook, Instagram y TikTok, 18 publicaciones (incluye 8 reels), 2 campañas, remarketing.
  - Cada paquete tiene un botón "QUIERO MÁS INFO".
- **Clientes visibles** (más de 30 logos): Hampton by Hilton Aguascalientes Downtown, GASE Dental Group, Techani, Novedades y Cosméticos, agencias de viajes Likaan y Shekinah, Pepe's Burgers, Taquería La Patrona, Desperrucados, Estamos Bien Podcast, Creative Studio, entre otros.
- **Caso con números** (Techani, 2021–2022): +67 % de resultados con la mitad del presupuesto, alcance +100 %, interacción +95 %.
- **Testimonios**: 6. Los de Dumar Sotelo y Xochitl Serna tienen **el mismo texto duplicado**.
- **Contacto**:
  - WhatsApp: http://wa.link/7qbgst
  - Correo: logikmarketing1@gmail.com
  - Facebook: /logikmkt
  - Instagram: @logikmkt
  - TikTok: @logikmarketing
  - LinkedIn: /company/logikmarketing
- **Blog** ("Tendencias Digitales"): última entrada del 31 oct 2025, con muy pocas visitas. Una entrada dice "tus clientes ya no te buscan en Google, te buscan en Instagram y TikTok". **No venderles "necesitas página web" a secas**; plantearlo como complemento de sus campañas.

## Identidad visual

- **Logo**: "LOGIK" en negro con una flecha rosa en la "K" y "MARKETING" espaciado debajo. Archivo: `https://static.wixstatic.com/media/1cd776_6521503937f846849b8b885a8c8ebb30~mv2.png`
- **Colores**: rosa principal ≈ `#FE5F92`, rosa claro ≈ `#F9B5CF`, negro y gris oscuro ≈ `#4A4A4A` (pie de página).
- **Tipografía**: Poppins en títulos. También usa Playfair Display itálica en algunos detalles ("Potencializa hoy tus redes!").
- **Frase**: **"No hacemos magia, hacemos Marketing"**. Muy buena, y hoy está escondida en un banner al final de la página de paquetes.
- **Material propio aprovechable** (alojado en Wix, en `static.wixstatic.com/media/1cd776_...`):
  - Fotografía de producto: helados, joyería, cosméticos, pasteles, habitaciones de hotel.
  - Diseños para redes por cliente.
  - Videos verticales.
  - Fotos del equipo.

## Problemas de la página actual (hecha en Wix)

- **Diseño**:
  - Cada sección tiene un estilo distinto (negro, rosa, gris, blanco, rayas) y usa más de 8 tipografías.
  - En paquetes, todo el texto tiene fondo rosa resaltado renglón por renglón y casi no se lee. El precio solo está dentro de una imagen.
  - "Conoce un poco de nosotras" está en blanco sobre blanco. Las biografías del equipo no se ven en escritorio, solo en celular.
  - El formulario deja media sección vacía y la barra de búsqueda no aporta.
  - En celular, el texto justificado deja huecos grandes y el chat de Messenger tapa contenido.
- **Credibilidad**:
  - Testimonios duplicados.
  - Casos de 2021–2022.
  - Blog detenido desde octubre de 2025.
  - Correo de Gmail en vez de uno con su dominio.
  - Aviso de privacidad en otro subdominio (`logikmarketing1.wixsite.com`).
  - Errores: "Potencializa", y "epresas" en la descripción que se ve al compartir el link.
- **Técnico**:
  - Sin H1 en la portada.
  - 219 peticiones, 101 scripts y alrededor de 1.6 MB.

Las capturas están en `referencias/capturas-sitio-actual/`.

## Estrategia de la propuesta

1. **Argumento principal: landing pages para sus campañas**. Diana compra anuncios de Meta; una página de aterrizaje rápida, con el pixel de Meta y WhatsApp, mejora el costo por resultado. Así el servicio apoya su negocio principal en vez de competir con él.
2. **Ejecutar el servicio web que ya venden**. Hoy lo prometen sin poder mostrarlo. Ellas venden y el usuario construye, por proyecto o en marca blanca, con mantenimiento opcional.
3. **Su propia página como muestra**. Si su sitio se ve bien, cada cliente que lo visite ve el trabajo del usuario.
4. **Prever quién edita después**. Hoy ellas mismas editan en Wix; la propuesta debe dejar claro si los cambios los hace el usuario con mantenimiento o ellas con algún editor sencillo.

## Prototipo propuesto (pendiente de construir)

Rediseño de la **portada y la página de paquetes**, solo con material real de ellas:
- Su frase como mensaje principal.
- Servicios en tarjetas.
- Paquetes legibles, con el precio visible.
- Portafolio por cliente, con sus fotos y diseños.
- Casos con números.
- El equipo con sus biografías y la certificación de Meta.
- Testimonios sin duplicados.
- WhatsApp como acción principal.
- Diseñado primero para celular.

Opcional: una landing de ejemplo para alguno de sus clientes (por ejemplo Techani) para demostrar la idea de las campañas.

**Aún no se decide**: la tecnología del prototipo, la estructura final ni el material exacto a usar.

## Forma de trabajar (igual que Fitness by Evidence y Armando Ovalle)

Referencias: `PROYECTOS/Germain` (Fitness by Evidence) y `PROYECTOS/Página web fotografía` (Armando Ovalle Wedding Studio). Ante la duda, copiar cómo lo resolvieron ellos.

**Estructura del repositorio**
```
/
├── frontend/     Angular 22 + SSR (sitio público y panel)
├── backend/      Node.js + Express 5 + PostgreSQL (API REST)
├── referencias/  Capturas y material de diseño
├── netlify.toml  Despliegue del frontend
└── README.md     En español: requisitos, base de datos, backend, frontend, producción
```

**Frontend** (Angular 22, TypeScript 6, Vitest, Prettier con `printWidth: 100` y comillas simples)
- Componentes standalone con `ChangeDetectionStrategy.OnPush`, signals (`input()`, `signal`, `computed`, `inject()`) y control de flujo `@if` / `@for`.
- Plantilla y estilos en línea para componentes pequeños; `.html` y `.css` aparte para páginas grandes. Los nombres de archivo no llevan sufijo (`home.ts`, clase `Home`).
- `src/app/`: `components/` (reutilizables: `buttons/btn`, `icon`, `reveal`, `skeletons`, `toast`, `whatsapp-float`, etc.), `core/` (`config`, `guards`, `interceptors`, `services` y `services/api`, `types/*.model.ts`, `utils`), `layouts/` (`public-layout`, `panel-layout`) y `pages/` (incluye `pages/panel/` con `panel.routes.ts`).
- `styles.css` global con todo el sistema de diseño en variables (`--color-*`, `--text-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--ease-*`, `--z-*`). Ningún color fuera de las variables. Fuentes autoalojadas con `@fontsource` (subconjunto latino).
- Rutas con carga diferida, panel protegido con `canMatch: [authGuard]`. SSR híbrido en `app.routes.server.ts`: el panel y el login solo en el navegador; el sitio público con SSR.
- `provideClientHydration` con `withEventReplay`, `withHttpTransferCacheOptions` y los interceptores `ssrTimeout`, `auth` y `error`. Servicios `SeoService` y `SettingsStore`. Usar esqueletos de carga en lugar de indicadores giratorios.
- `environments/environment.ts` y `environment.development.ts` con `apiUrl` y `siteUrl`.

**Backend** (ESM, Node 22 o superior, sin TypeScript)
- `src/`: `app.js` (helmet, cors con lista blanca y JSON), `server.js` (conecta, migra, inicializa datos y arranca), `config/` (`env`, `database`, `migrate`, `initialize-data`), `controllers/`, `middlewares/` (`validate`, `require-auth`, `error-handler`), `models/` (Sequelize, `*.model.js` + `index.js`), `routes/`, `services/`, `utils/` (`app-error`, `dates-mx`, etc.) y `validators/` (zod, `*.schemas.js`).
- Migraciones con Umzug en `migrations/000N-descripcion.js` (SQL directo, `up` y `down`). Contenido inicial en `seeders/initial-content.js`, que solo se carga si las tablas están vacías. Pruebas con Vitest y Supertest en `tests/`.
- Validación con `validate({ body, query, params })` y resultado en `req.valid`. Errores con `AppError` / `notFound()`, con mensajes en español para el usuario.
- Autenticación con JWT y bcrypt. Cuenta inicial creada desde `.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`). Imágenes en Cloudinary, con `uploads/` local en desarrollo.
- Scripts: `dev` (`node --watch --env-file=.env`), `start`, `migrate`, `migrate:down` y `test`.

**Despliegue**: frontend en Netlify (SSR como Edge Function con `@netlify/angular-runtime`), API en Render y PostgreSQL en la nube.

**Convenciones**
- Todo en español: interfaz, comentarios, mensajes de commit y README. Código e identificadores en inglés.
- Textos comerciales en la base de datos, editables desde el panel. Lo provisional se marca como "Pendiente de confirmar".
- Se diseña primero para celular y no debe haber desplazamiento horizontal en ningún ancho.
- Commits descriptivos en español, con el formato "Sección: qué cambió".

## Herramientas

- **Skills del proyecto** (copiadas en `.claude/skills/`, viajan con el repositorio):
  - `ui-ux-pro-max` (nextlevelbuilder): sistema de diseño, paletas, tipografías y lista de revisión de UX y accesibilidad. Tiene scripts de búsqueda en Python.
  - `design-taste-frontend` (taste-skill v2): dirección de arte para landings y sitios de marketing, con revisión en navegador para evitar el aspecto "hecho por IA".
  - `redesign-existing-projects` (taste-skill): auditoría y mejora de un sitio existente.
  - `agent-browser` (vercel-labs).
- **En el otro equipo**: la CLI `agent-browser` se instala aparte (`npm i -g agent-browser`, después `agent-browser install`). Las skills ya vienen en el repositorio.
- `agent-browser` v0.39.1 trae su propio Chrome. Antes de usarlo, correr `agent-browser skills get core`. Usar una sesión con nombre: `AGENT_BROWSER_SESSION=logik`.
- Otros repositorios con estrella del usuario, disponibles si hacen falta: gsap-skills, emilkowalski/skills, impeccable, design-dna, LottieFiles/motion-design-skill, itshover, magicui (este es de React, solo como referencia) y hyperframes (video).
- **Agent Reach y OpenCLI** (instalados en el equipo de escritorio, Windows):
  - Python 3.12. Agent Reach vive en un entorno virtual: `%USERPROFILE%\.agent-reach-venv\Scripts\agent-reach.exe`. Se instaló desde `https://github.com/Panniantong/agent-reach/archive/main.zip`, no desde PyPI (ahí hay otro paquete con el mismo nombre).
  - Facebook e Instagram se leen con `opencli` (`npm i -g @jackwener/opencli`) y la extensión OpenCLI de Chrome. Comprobar con `opencli doctor` (debe decir `Extension: connected`).
  - Comandos útiles: `opencli facebook profile logikmkt`, `opencli facebook search "<texto>"`, `opencli instagram profile logikmkt`, `opencli instagram user logikmkt` (publicaciones recientes) y `opencli instagram download`. Siempre con `-f yaml`.
  - Si Instagram responde HTTP 429, no reintentar en seguida: esperar, iniciar sesión de nuevo en Chrome y bajar el ritmo.
- Las páginas del sitio cargan imágenes al hacer scroll. Antes de una captura completa, recorrer la página con scroll.
- La versión de celular de Wix renderiza a 320 px de ancho.
