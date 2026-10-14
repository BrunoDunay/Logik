import { z } from 'zod';

// Esquemas de cada sección editable del sitio. El panel guarda una sección completa a la vez.

const text = (max = 200) => z.string().trim().min(1, 'Este campo es obligatorio').max(max, `Máximo ${max} caracteres`);
const optionalText = (max = 200) => z.string().trim().max(max, `Máximo ${max} caracteres`).nullable().default(null);
/** Ruta de un archivo de /media o una URL absoluta (Cloudinary). */
const media = z
  .string()
  .trim()
  .regex(/^(\/media\/|https:\/\/)/, 'Debe ser una ruta de /media o una URL https');
const optionalMedia = media.nullable().default(null);
const provisional = z.boolean().default(false);

const brand = z.object({ name: text(80), tagline: text(120), phrase: text(80) });

const hero = z.object({
  titleStart: text(40),
  titleEnd: text(40),
  subtitle: text(220),
  ctaLabel: text(40),
  facts: z.array(text(40)).max(4),
  reelVideo: optionalMedia,
  reelPoster: optionalMedia,
  reelAlt: text(160),
});

const results = z.object({
  title: text(60),
  annotation: optionalText(40),
  intro: text(220),
  notifications: z
    .array(z.object({ percent: z.number().int().min(1).max(99), time: text(20) }))
    .max(6),
  highlight: z.object({ value: text(12), label: text(80), note: text(160) }),
  estimator: z
    .object({
      title: text(80),
      minCost: z.number().positive(),
      maxCost: z.number().positive(),
      minBudget: z.number().int().positive(),
      maxBudget: z.number().int().positive(),
      step: z.number().int().positive(),
      defaultBudget: z.number().int().positive(),
      note: text(220),
      ctaLabel: text(40),
    })
    .refine((e) => e.minCost <= e.maxCost, { path: ['maxCost'], message: 'El costo máximo debe ser mayor o igual al mínimo' })
    .refine((e) => e.minBudget < e.maxBudget, { path: ['maxBudget'], message: 'El presupuesto máximo debe ser mayor al mínimo' })
    .refine((e) => e.defaultBudget >= e.minBudget && e.defaultBudget <= e.maxBudget, {
      path: ['defaultBudget'],
      message: 'El presupuesto inicial debe estar entre el mínimo y el máximo',
    }),
  isProvisional: provisional,
});

const imageItem = { image: media, imageAlt: text(160) };

const services = z.object({
  title: text(60),
  items: z.array(z.object({ title: text(60), description: text(260), ...imageItem })).min(1).max(8),
});

const showcase = z.object({ title: text(80), video: optionalMedia, poster: optionalMedia, caption: text(120) });

const work = z.object({
  lead: text(40),
  items: z.array(z.object({ name: text(60), image: optionalMedia })).min(1).max(24),
  note: text(200),
  isProvisional: provisional,
});

const processSection = z.object({
  steps: z.array(z.object({ verb: text(16), text: text(160), ...imageItem })).min(2).max(5),
});

const packages = z.object({
  lead: text(40),
  price: text(16),
  period: text(20),
  includes: text(320),
  ctaLabel: text(40),
  others: z.array(z.object({ name: text(40), description: text(200), price: optionalText(16) })).max(5),
  note: optionalText(160),
  isProvisional: provisional,
});

const testimonials = z.object({
  featured: z.object({ quote: text(90), name: text(60), role: text(40), source: text(60) }),
  items: z.array(z.object({ quote: text(200), name: text(60) })).max(6),
});

const team = z.object({
  body: text(400),
  second: optionalText(400),
  portrait: media,
  portraitAlt: text(160),
  facts: z.array(text(40)).max(3),
  photos: z.array(z.object({ src: media, alt: text(160) })).max(4),
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
  intro: text(160),
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
  results,
  services,
  showcase,
  work,
  process: processSection,
  packages,
  testimonials,
  team,
  contact,
  closing,
};

export const SETTINGS_SECTIONS = Object.keys(settingsSchemas);
