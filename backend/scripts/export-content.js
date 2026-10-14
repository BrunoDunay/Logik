// Copia el contenido inicial al frontend como respaldo: el sitio se ve completo aunque la API
// no responda. Se corre después de editar seeders/initial-content.js:
//   npm run content:export
import { writeFileSync } from 'node:fs';
import { settings } from '../seeders/initial-content.js';

const target = new URL('../../frontend/src/app/core/config/initial-content.ts', import.meta.url);
const body = `// Generado por backend/scripts/export-content.js a partir de backend/seeders/initial-content.js.
// No lo edites a mano: cambia el seeder y corre \`npm run content:export\` en backend/.
import { SiteSettings } from '../types/settings.model';

export const INITIAL_CONTENT: SiteSettings = ${JSON.stringify(settings, null, 2)};
`;

writeFileSync(target, body);
console.log('Contenido exportado a frontend/src/app/core/config/initial-content.ts');
