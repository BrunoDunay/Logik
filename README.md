# Logik Marketing: propuesta de sitio web

Prototipo del nuevo sitio de [Logik Marketing](https://www.logikmkt.com), agencia de marketing digital de Aguascalientes. Lleva a la web el lenguaje visual de sus redes y su frase: *"No hacemos magia, hacemos marketing"*.

- `frontend/`: Angular 22 con SSR. Es el sitio público.
- `backend/`: Node.js, Express 5 y PostgreSQL. API REST con el contenido editable.
- `referencias/`: material de la marca (capturas, publicaciones e historias de Instagram, imágenes del sitio actual).
- `docs/`: investigación y decisiones de diseño.
- `scripts/build-media.py`: prepara las fotos y videos de `frontend/public/media` a partir de `referencias/`.

## Requisitos

- Node.js 22 o superior (probado con 24).
- PostgreSQL 16 o superior.
- Para regenerar el material: Python 3.12 con Pillow, y ffmpeg.

## Base de datos

Crea un usuario y una base para el proyecto (en `psql`, como `postgres`):

```sql
CREATE USER logik_app WITH PASSWORD 'una-contraseña-segura';
CREATE DATABASE logik OWNER logik_app;
```

Las tablas se crean solas al arrancar el backend (migraciones con Umzug).

## Backend

```bash
cd backend
cp .env.example .env   # y completa DATABASE_URL, JWT_SECRET y ADMIN_PASSWORD
npm install
npm run dev            # http://localhost:3000/api
```

Al arrancar aplica las migraciones, crea la cuenta del panel (si no existe) y carga el contenido inicial de `seeders/initial-content.js` (solo las secciones que falten; nunca sobrescribe lo editado).

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor con recarga automática |
| `npm start` | Servidor de producción |
| `npm run migrate` / `npm run migrate:down` | Aplica o revierte migraciones |
| `npm test` | Pruebas (las de integración necesitan `TEST_DATABASE_URL` con una base desechable) |
| `npm run content:export` | Copia el contenido inicial al frontend como respaldo |

**Contenido**: todo el texto comercial vive en la tabla `site_settings`, una fila por sección (`hero`, `results`, `services`, `packages`, etc.). `GET /api/settings` lo entrega sin sesión; `PUT /api/settings/:section` lo guarda con sesión, validado con zod (`src/validators/settings.schemas.js`).

## Frontend

```bash
cd frontend
npm install
npm start              # http://localhost:4200
```

Si la API no responde, la portada usa el contenido de respaldo (`src/app/core/config/initial-content.ts`, generado con `npm run content:export` en el backend), así que siempre se ve completa.

## Producción

Está desplegado en Vercel, conectado a este repositorio: **cada push a `main` publica los cambios**.

| Parte | Dónde | Proyecto |
|---|---|---|
| Sitio (Angular, prerenderizado) | https://logik-marketing.vercel.app | Vercel `logik-marketing`, carpeta `frontend/` |
| API (Express como función) | https://logik-api-nine.vercel.app/api | Vercel `logik-api`, carpeta `backend/` (`api/index.js`) |
| Base de datos | Neon, proyecto `logik` (us-east-1) | PostgreSQL 17 |

- Las variables de la API (`DATABASE_URL`, `JWT_SECRET`, `ADMIN_*`, `CORS_ORIGINS`…) están en el proyecto de Vercel, no en el repositorio.
- Las migraciones no corren en cada arranque de la función: si se agrega una, aplícala con
  `DATABASE_URL=<la de Neon> DATABASE_SSL=true npm run migrate` desde `backend/`.
- La portada y las páginas legales se prerenderizan al compilar; en el navegador el contenido se vuelve a pedir a la API,
  así que lo que se edita en el panel se ve sin recompilar.
- `netlify.toml` queda como alternativa (SSR en Netlify con la API en otro servicio).
