import { describe, expect, it } from 'vitest';
import { settings } from '../seeders/initial-content.js';
import { SETTINGS_SECTIONS, settingsSchemas } from '../src/validators/settings.schemas.js';

describe('contenido inicial', () => {
  it('trae todas las secciones del sitio', () => {
    expect(Object.keys(settings).sort()).toEqual([...SETTINGS_SECTIONS].sort());
  });

  it.each(SETTINGS_SECTIONS)('la sección "%s" pasa su validación', (section) => {
    const result = settingsSchemas[section].safeParse(settings[section]);
    expect(result.error?.issues ?? []).toEqual([]);
  });
});

describe('validación de secciones', () => {
  it('rechaza una calculadora con el presupuesto inicial fuera de rango', () => {
    const estimator = { ...settings.results.estimator, defaultBudget: 99_000 };
    const result = settingsSchemas.results.safeParse({ ...settings.results, estimator });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].path).toEqual(['estimator', 'defaultBudget']);
  });

  it('limpia el número de WhatsApp y la arroba de las redes', () => {
    const parsed = settingsSchemas.contact.parse({ ...settings.contact, whatsapp: '+52 1 449 211 9107', instagram: '@logikmkt' });
    expect(parsed.whatsapp).toBe('5214492119107');
    expect(parsed.instagram).toBe('logikmkt');
  });

  it('no acepta rutas de imagen fuera de /media ni URLs sin https', () => {
    const items = [{ ...settings.services.items[0], image: 'http://ejemplo.com/foto.jpg' }];
    expect(settingsSchemas.services.safeParse({ ...settings.services, items }).success).toBe(false);
  });
});
