import bcrypt from 'bcrypt';
import { env } from './env.js';
import { sequelize } from './database.js';
import { Admin, SiteSetting } from '../models/index.js';
import { BCRYPT_ROUNDS } from '../controllers/auth.controller.js';
import * as content from '../../seeders/initial-content.js';

/** Crea la cuenta del panel si todavía no existe ninguna. */
async function ensureAdmin() {
  if (await Admin.count()) return false;
  await Admin.create({
    email: env.ADMIN_EMAIL.toLowerCase(),
    name: env.ADMIN_NAME,
    passwordHash: await bcrypt.hash(env.ADMIN_PASSWORD, BCRYPT_ROUNDS),
  });
  return true;
}

/**
 * Cuenta de soporte: una segunda cuenta para quien da mantenimiento, independiente de la de la agencia.
 * Se crea si no existe; si ya existe no se toca (su contraseña se cambia desde el panel).
 */
async function ensureSupportAdmin() {
  if (!env.SUPPORT_ADMIN_EMAIL) return false;
  const email = env.SUPPORT_ADMIN_EMAIL.toLowerCase();
  if (await Admin.count({ where: { email } })) return false;
  await Admin.create({ email, name: env.SUPPORT_ADMIN_NAME, passwordHash: await bcrypt.hash(env.SUPPORT_ADMIN_PASSWORD, BCRYPT_ROUNDS) });
  return true;
}

/** Inserta solo las secciones de contenido que falten (nunca sobrescribe lo editado). */
async function seedSettings(transaction) {
  const existing = new Set((await SiteSetting.findAll({ attributes: ['key'], transaction })).map((s) => s.key));
  const missing = Object.entries(content.settings).filter(([key]) => !existing.has(key));
  await SiteSetting.bulkCreate(missing.map(([key, value]) => ({ key, value })), { transaction });
  return missing.length;
}

/** Idempotente: se puede ejecutar en cada arranque sin duplicar ni pisar datos. */
export async function initializeData() {
  const adminCreated = await ensureAdmin();
  const supportCreated = await ensureSupportAdmin();
  const settings = await sequelize.transaction((transaction) => seedSettings(transaction));
  return { adminCreated, supportCreated, settings };
}
