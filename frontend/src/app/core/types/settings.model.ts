/** Contenido editable del sitio (tabla site_settings). Refleja backend/src/validators/settings.schemas.js. */

export interface Provisional {
  /** Datos por confirmar con la agencia. */
  isProvisional?: boolean;
}

/** Título de sección: una parte normal y otra en letra script. */
export interface SectionHeading {
  title: string;
  script: string;
  intro: string;
}

export interface Stat {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  detail?: string | null;
}

export interface BrandSettings {
  name: string;
  tagline: string;
  phrase: string;
}

export interface HeroSettings {
  kicker: string;
  subtitle: string;
  ctaLabel: string;
  location: string;
}

export interface AboutSettings {
  lead: string;
  accent: string;
  script: string;
  summary: string;
  more: string | null;
  image: string;
  imageAlt: string;
  stats: Stat[];
}

export type ChartKind = 'area' | 'bars' | 'steps' | 'dots';

export interface ChartPoint {
  label: string;
  value: number;
  peak?: number | null;
}

export interface ChartItem {
  label: string;
  value: number;
  detail?: string | null;
}

export interface ChartData {
  kind: ChartKind;
  title: string;
  unit: string;
  note: string;
  markerIndex: number | null;
  markerLabel: string | null;
  points: ChartPoint[];
  steps: ChartItem[];
  items: ChartItem[];
}

export interface ResultCase {
  id: string;
  tab: string;
  client: string;
  headline: string;
  summary: string;
  more: string | null;
  chart: ChartData;
  kpis: Stat[];
}

export interface ResultsSettings extends SectionHeading, Provisional {
  cases: ResultCase[];
}

export interface Post {
  image: string;
  category: string;
  account: string;
  caption: string;
  permalink: string | null;
}

export interface PostsSettings extends SectionHeading {
  categories: { id: string; label: string }[];
  items: Post[];
}

export interface Service {
  title: string;
  summary: string;
  detail: string;
  image: string;
}

export interface ServicesSettings extends SectionHeading {
  items: Service[];
}

export interface Package {
  name: string;
  tagline: string;
  price: string | null;
  period: string;
  highlighted: boolean;
  features: string[];
}

export interface PackagesSettings extends SectionHeading, Provisional {
  items: Package[];
  note: string | null;
}

export interface Brand {
  name: string;
  category: string;
  description: string;
  logo: string;
  photo: string;
  color: string;
}

export interface BrandsSettings extends SectionHeading, Provisional {
  items: Brand[];
}

export interface Video {
  title: string;
  description: string;
  src: string;
  poster: string | null;
  orientation: 'horizontal' | 'vertical';
}

export interface VideosSettings extends SectionHeading {
  items: Video[];
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  summary: string;
  more: string | null;
}

export interface TeamSettings extends SectionHeading, Provisional {
  members: TeamMember[];
  groupPhoto: string | null;
  groupCaption: string | null;
}

export interface ContactSettings extends SectionHeading, Provisional {
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
  about: AboutSettings;
  results: ResultsSettings;
  posts: PostsSettings;
  services: ServicesSettings;
  packages: PackagesSettings;
  brands: BrandsSettings;
  videos: VideosSettings;
  team: TeamSettings;
  contact: ContactSettings;
  closing: ClosingSettings;
}

export type SectionKey = keyof SiteSettings;
