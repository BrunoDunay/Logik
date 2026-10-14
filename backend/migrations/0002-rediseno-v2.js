/**
 * Rediseño v2: las secciones del sitio cambiaron de forma (resultados con gráficas, publicaciones,
 * marcas, videos…). Se borra el contenido de la versión anterior para que el arranque cargue el nuevo
 * desde seeders/initial-content.js. Todavía no había ediciones de la agencia que conservar.
 */

const V1_ONLY = ['showcase', 'work', 'process', 'testimonials'];
const RESHAPED = ['hero', 'results', 'services', 'packages', 'team', 'contact'];

export async function up({ context: sequelize }) {
  await sequelize.query('DELETE FROM site_settings WHERE key IN (:keys)', {
    replacements: { keys: [...V1_ONLY, ...RESHAPED] },
  });
}

export async function down() {
  // El contenido de la v1 sigue en el historial de git (seeders/initial-content.js); no se restaura aquí.
}
