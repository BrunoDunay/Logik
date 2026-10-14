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
  it('rechaza una gráfica con un tipo desconocido', () => {
    const cases = [{ ...settings.results.cases[0], chart: { ...settings.results.cases[0].chart, kind: 'pastel' } }];
    const result = settingsSchemas.results.safeParse({ ...settings.results, cases });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].path).toEqual(['cases', 0, 'chart', 'kind']);
  });

  it('rechaza un color de marca que no es hexadecimal', () => {
    const items = [{ ...settings.brands.items[0], color: 'azul' }];
    expect(settingsSchemas.brands.safeParse({ ...settings.brands, items }).success).toBe(false);
  });

  it('convierte un precio vacío en "a cotizar" (null)', () => {
    const items = [{ ...settings.packages.items[0], price: '' }];
    expect(settingsSchemas.packages.parse({ ...settings.packages, items }).items[0].price).toBeNull();
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
