import { getSections, saveSection } from '../services/settings.service.js';
import { SETTINGS_SECTIONS, settingsSchemas } from '../validators/settings.schemas.js';
import { AppError } from '../utils/app-error.js';

/** Todo el contenido del sitio público, sin sesión. */
export async function getPublicSettings(_req, res) {
  res.set('Cache-Control', 'public, max-age=60');
  res.json(await getSections(SETTINGS_SECTIONS));
}

/** Guarda una sección completa desde el panel. */
export async function updateSettings(req, res) {
  const schema = settingsSchemas[req.params.section];
  if (!schema) throw new AppError(404, `La sección "${req.params.section}" no existe.`, 'NOT_FOUND');
  res.json(await saveSection(req.params.section, schema.parse(req.body ?? {})));
}
