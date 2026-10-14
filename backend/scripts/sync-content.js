// Reemplaza en la base de datos las secciones indicadas con el contenido de seeders/initial-content.js.
// Sirve en desarrollo, cuando el seeder cambia y la base ya tenía contenido (el arranque nunca lo pisa).
// Uso: npm run content:sync -- about posts brands
// Ojo: lo editado desde el panel en esas secciones se pierde.
import { sequelize } from '../src/config/database.js';
import { SiteSetting } from '../src/models/index.js';
import { settingsSchemas } from '../src/validators/settings.schemas.js';
import { settings } from '../seeders/initial-content.js';

const keys = process.argv.slice(2);
if (!keys.length) {
  console.error('Indica las secciones a reemplazar, por ejemplo: npm run content:sync -- about posts');
  process.exit(1);
}

for (const key of keys) {
  if (!settings[key]) {
    console.error(`No existe la sección "${key}" en el seeder.`);
    process.exit(1);
  }
  const value = settingsSchemas[key].parse(settings[key]);
  await SiteSetting.upsert({ key, value });
  console.log(`Sección "${key}" reemplazada.`);
}
await sequelize.close();
