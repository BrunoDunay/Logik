import { z } from 'zod';

// Esquemas de cada sección editable del sitio (rediseño v2). El panel guarda una sección completa a la vez.

const text = (max = 200) => z.string().trim().min(1, 'Este campo es obligatorio').max(max, `Máximo ${max} caracteres`);
const optionalText = (max = 200) =>
  z
    .string()
    .trim()
    .max(max, `Máximo ${max} caracteres`)
    .nullable()
    .default(null)
    .transform((v) => (v === '' ? null : v));
/** Ruta de un archivo de /media o una URL absoluta (Cloudinary). */
const media = z
  .string()
  .trim()
  .regex(/^(\/media\/|https:\/\/)/, 'Debe ser una ruta de /media o una URL https');
const optionalMedia = media.nullable().default(null);
const color = z.string().trim().regex(/^#[0-9a-fA-F]{6}$/, 'Usa un color hexadecimal, por ejemplo #fc7cab');
const provisional = z.boolean().default(false);
const list = (item, max = 30) => z.array(item).max(max, `Máximo ${max} elementos`);
/** Título de sección: una parte normal y otra en letra script. */
const heading = { title: text(60), script: text(60), intro: text(240) };

const brand = z.object({ name: text(80), tagline: text(120), phrase: text(80) });

const hero = z.object({ kicker: text(60), subtitle: text(160), ctaLabel: text(40), location: text(60) });

const stat = z.object({
  value: z.number().nonnegative(),
  prefix: z.string().max(4).default(''),
  suffix: z.string().max(10).default(''),
  label: text(60),
  detail: optionalText(160),
});

const about = z.object({
  lead: text(40),
  accent: text(30),
  script: text(30),
  summary: text(320),
  more: optionalText(900),
  image: media,
  imageAlt: text(160),
  stats: list(stat, 4),
});

const chart = z.object({
  kind: z.enum(['area', 'bars', 'steps', 'dots']),
  title: text(80),
  unit: z.string().max(40).default(''),
  note: text(240),
  markerIndex: z.number().int().nonnegative().nullable().default(null),
  markerLabel: optionalText(40),
  points: list(z.object({ label: text(20), value: z.number().nonnegative(), peak: z.number().nonnegative().nullable().default(null) }), 60),
  steps: list(z.object({ label: text(40), value: z.number().nonnegative(), detail: optionalText(160) }), 6),
  items: list(z.object({ label: text(40), value: z.number().nonnegative(), detail: optionalText(160) }), 30),
});

const results = z.object({
  ...heading,
  cases: list(
    z.object({
      id: z.string().trim().regex(/^[a-z0-9-]+$/, 'Solo minúsculas, números y guiones'),
      tab: text(24),
      client: text(80),
      headline: text(90),
      summary: text(240),
      more: optionalText(600),
      chart,
      kpis: list(stat, 4),
    }),
    6,
  ).min(1),
  isProvisional: provisional,
});

const posts = z.object({
  ...heading,
  categories: list(z.object({ id: z.string().trim().regex(/^[a-z0-9-]+$/), label: text(30) }), 10).min(1),
  items: list(
    z.object({
      image: media,
      category: z.string().trim().min(1),
      account: text(60),
      caption: z.string().trim().max(2200),
      permalink: z.string().url().nullable().default(null),
    }),
    120,
  ),
});

const services = z.object({
  ...heading,
  items: list(z.object({ title: text(60), summary: text(120), detail: text(400), image: media }), 14).min(1),
});

const packages = z.object({
  ...heading,
  items: list(
    z.object({
      name: text(40),
      tagline: text(60),
      price: optionalText(16),
      period: text(20),
      highlighted: z.boolean().default(false),
      features: list(text(80), 12),
    }),
    6,
  ).min(1),
  note: optionalText(200),
  isProvisional: provisional,
});

const brands = z.object({
  ...heading,
  items: list(
    z.object({ name: text(60), category: text(60), description: text(200), logo: media, photo: media, color }),
    30,
  ).min(1),
  isProvisional: provisional,
});

const videos = z.object({
  ...heading,
  items: list(
    z.object({ title: text(60), description: text(160), src: media, poster: optionalMedia, orientation: z.enum(['horizontal', 'vertical']) }),
    6,
  ),
});

const team = z.object({
  ...heading,
  members: list(z.object({ name: text(80), role: text(80), photo: media, summary: text(200), more: optionalText(600) }), 6),
  groupPhoto: optionalMedia,
  groupCaption: optionalText(160),
  isProvisional: provisional,
});

const handle = z
  .string()
  .trim()
  .max(60)
  .transform((v) => v.replace(/^@/, ''))
  .nullable()
  .default(null);

const contact = z.object({
  ...heading,
  whatsapp: z
    .string()
    .trim()
    .transform((v) => v.replace(/\D/g, ''))
    .pipe(z.string().regex(/^\d{10,13}$/, 'Escribe el número con lada, de 10 a 13 dígitos')),
  whatsappMessage: text(200),
  phoneDisplay: text(20),
  email: z.email('Escribe un email válido').nullable().default(null),
  city: text(80),
  address: optionalText(160),
  instagram: handle,
  facebook: handle,
  tiktok: handle,
  isProvisional: provisional,
});

const closing = z.object({ invitation: text(40), ctaLabel: text(40) });

export const settingsSchemas = {
  brand,
  hero,
  about,
  results,
  posts,
  services,
  packages,
  brands,
  videos,
  team,
  contact,
  closing,
};

export const SETTINGS_SECTIONS = Object.keys(settingsSchemas);
