/** Contenido editable del sitio (tabla site_settings). Refleja backend/src/validators/settings.schemas.js. */

export interface Provisional {
  /** Datos por confirmar con la agencia. */
  isProvisional?: boolean;
}

export interface MediaItem {
  image: string;
  imageAlt: string;
}

export interface BrandSettings {
  name: string;
  tagline: string;
  phrase: string;
}

export interface HeroSettings {
  titleStart: string;
  titleEnd: string;
  subtitle: string;
  ctaLabel: string;
  facts: string[];
  reelVideo: string | null;
  reelPoster: string | null;
  reelAlt: string;
}

export interface Notification {
  percent: number;
  time: string;
}

export interface Estimator {
  title: string;
  minCost: number;
  maxCost: number;
  minBudget: number;
  maxBudget: number;
  step: number;
  defaultBudget: number;
  note: string;
  ctaLabel: string;
}

export interface ResultsSettings extends Provisional {
  title: string;
  annotation: string | null;
  intro: string;
  notifications: Notification[];
  highlight: { value: string; label: string; note: string };
  estimator: Estimator;
}

export interface ServicesSettings {
  title: string;
  items: (MediaItem & { title: string; description: string })[];
}

export interface ShowcaseSettings {
  title: string;
  video: string | null;
  poster: string | null;
  caption: string;
}

export interface WorkSettings extends Provisional {
  lead: string;
  items: { name: string; image: string | null }[];
  note: string;
}

export interface ProcessSettings {
  steps: (MediaItem & { verb: string; text: string })[];
}

export interface PackagesSettings extends Provisional {
  lead: string;
  price: string;
  period: string;
  includes: string;
  ctaLabel: string;
  others: { name: string; description: string; price: string | null }[];
  note: string | null;
}

export interface TestimonialsSettings {
  featured: { quote: string; name: string; role: string; source: string };
  items: { quote: string; name: string }[];
}

export interface TeamSettings extends Provisional {
  body: string;
  second: string | null;
  portrait: string;
  portraitAlt: string;
  facts: string[];
  photos: { src: string; alt: string }[];
}

export interface ContactSettings extends Provisional {
  intro: string;
  whatsapp: string;
  whatsappMessage: string;
  phoneDisplay: string;
  email: string | null;
  city: string;
  address: string | null;
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
}

export interface ClosingSettings {
  invitation: string;
  ctaLabel: string;
}

export interface SiteSettings {
  brand: BrandSettings;
  hero: HeroSettings;
  results: ResultsSettings;
  services: ServicesSettings;
  showcase: ShowcaseSettings;
  work: WorkSettings;
  process: ProcessSettings;
  packages: PackagesSettings;
  testimonials: TestimonialsSettings;
  team: TeamSettings;
  contact: ContactSettings;
  closing: ClosingSettings;
}
