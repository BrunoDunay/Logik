// Entrada para Vercel: la API corre como función. Cada instancia reutiliza la app y su conexión.
// Las migraciones y el contenido inicial se aplican aparte (npm run migrate), no en cada arranque.
import { createApp } from '../src/app.js';

export default createApp();
