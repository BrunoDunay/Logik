// Recorre la API contra una base real. Requiere TEST_DATABASE_URL (base desechable: se vacía al empezar).
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

const enabled = Boolean(process.env.TEST_DATABASE_URL);

describe.skipIf(!enabled)('API', () => {
  let app;
  let sequelize;
  let token;

  beforeAll(async () => {
    ({ sequelize } = await import('../src/config/database.js'));
    await sequelize.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
    await (await import('../src/config/migrate.js')).runPendingMigrations();
    await (await import('../src/config/initialize-data.js')).initializeData();
    app = (await import('../src/app.js')).createApp();

    const login = await request(app).post('/api/auth/login').send({ email: 'panel@example.com', password: 'test-password-123' });
    token = login.body.token;
  }, 60_000);

  afterAll(() => sequelize?.close());

  it('el sitio lee su contenido sin sesión', async () => {
    const res = await request(app).get('/api/settings');
    expect(res.status).toBe(200);
    expect(res.body.brand.phrase).toBe('No hacemos magia, hacemos marketing.');
    expect(res.body.packages.items[0].price).toBe('$2,499');
    expect(res.body.results.cases.map((c) => c.id)).toEqual(['techani', 'gase', 'clinicas', 'meta']);
  });

  it('exige sesión para editar', async () => {
    const res = await request(app).put('/api/settings/closing').send({ invitation: 'Hola', ctaLabel: 'Escríbenos' });
    expect(res.status).toBe(401);
  });

  it('guarda una sección válida y rechaza una inválida', async () => {
    const ok = await request(app)
      .put('/api/settings/closing')
      .set('Authorization', `Bearer ${token}`)
      .send({ invitation: '¿Platicamos?', ctaLabel: 'Escríbenos' });
    expect(ok.status).toBe(200);
    expect((await request(app).get('/api/settings')).body.closing.invitation).toBe('¿Platicamos?');

    const bad = await request(app).put('/api/settings/closing').set('Authorization', `Bearer ${token}`).send({ invitation: '' });
    expect(bad.status).toBe(400);
    expect(bad.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('no reinicia el contenido editado al volver a arrancar', async () => {
    await (await import('../src/config/initialize-data.js')).initializeData();
    expect((await request(app).get('/api/settings')).body.closing.invitation).toBe('¿Platicamos?');
  });
});
