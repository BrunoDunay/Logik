/** Esquema inicial de Logik: cuentas del panel y contenido editable del sitio. */

export async function up({ context: sequelize }) {
  await sequelize.query(`
    CREATE TABLE admins (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email         VARCHAR(160) NOT NULL UNIQUE,
      password_hash VARCHAR(100) NOT NULL,
      name          VARCHAR(120) NOT NULL,
      last_login_at TIMESTAMPTZ,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE site_settings (
      key        VARCHAR(40) PRIMARY KEY,
      value      JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
}

export async function down({ context: sequelize }) {
  await sequelize.query('DROP TABLE IF EXISTS site_settings, admins CASCADE;');
}
