/** Tipos y ayudas compartidas por el editor del panel. */
export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
export type JsonObject = { [key: string]: Json };

/** Nombres en español de los campos del contenido; lo que no está aquí se muestra con su nombre técnico. */
export const LABELS: Record<string, string> = {
  name: 'Nombre', tagline: 'Lema', phrase: 'Frase', kicker: 'Texto pequeño superior', subtitle: 'Subtítulo',
  ctaLabel: 'Texto del botón', location: 'Ubicación', lead: 'Primera línea', accent: 'Palabra antes de la script',
  script: 'Palabra en letra script', summary: 'Resumen corto', more: 'Texto de "Leer más"', image: 'Imagen',
  imageAlt: 'Descripción de la imagen', stats: 'Cifras', value: 'Valor', prefix: 'Antes del número', suffix: 'Después del número',
  label: 'Etiqueta', detail: 'Detalle', title: 'Título', intro: 'Introducción', cases: 'Casos', id: 'Identificador',
  tab: 'Nombre de la pestaña', client: 'Cliente', headline: 'Titular', chart: 'Gráfica', kind: 'Tipo de gráfica',
  unit: 'Unidad', note: 'Nota / fuente', markerIndex: 'Marca en el punto número', markerLabel: 'Texto de la marca',
  points: 'Puntos (área)', peak: 'Día más alto', steps: 'Pasos (embudo)', items: 'Elementos', kpis: 'Cifras clave',
  categories: 'Filtros', category: 'Categoría', account: 'Cuenta', caption: 'Texto de la publicación', permalink: 'Enlace a Instagram',
  price: 'Precio (vacío = a cotizar)', period: 'Periodo', highlighted: 'Destacado', features: 'Incluye', description: 'Descripción',
  logo: 'Logotipo', photo: 'Foto', color: 'Color de la marca', src: 'Archivo de video', poster: 'Portada del video',
  orientation: 'Orientación', members: 'Integrantes', role: 'Puesto', photos: 'Fotos', badges: 'Certificaciones',
  whatsapp: 'WhatsApp (con lada)', whatsappMessage: 'Mensaje inicial de WhatsApp', phoneDisplay: 'Teléfono como se muestra',
  email: 'Correo', city: 'Ciudad', address: 'Dirección', instagram: 'Instagram (usuario)', facebook: 'Facebook (usuario)',
  tiktok: 'TikTok (usuario)', linkedin: 'LinkedIn (empresa)', invitation: 'Invitación final', isProvisional: 'Pendiente de confirmar',
};

/** Orden en que se muestran los campos (PostgreSQL guarda el JSON con las claves reordenadas). */
const ORDER = [
  'id', 'tab', 'name', 'title', 'lead', 'accent', 'script', 'kicker', 'invitation', 'client', 'headline', 'category', 'account',
  'role', 'tagline', 'phrase', 'subtitle', 'intro', 'summary', 'description', 'detail', 'more', 'caption', 'price', 'period',
  'highlighted', 'features', 'label', 'value', 'prefix', 'suffix', 'peak', 'kind', 'unit', 'markerIndex', 'markerLabel',
  'points', 'steps', 'items', 'kpis', 'chart', 'cases', 'categories', 'members', 'stats', 'image', 'imageAlt', 'photo', 'logo',
  'color', 'src', 'poster', 'orientation', 'photos', 'badges', 'permalink', 'whatsapp', 'whatsappMessage',
  'phoneDisplay', 'email', 'city', 'address', 'location', 'instagram', 'facebook', 'tiktok', 'linkedin', 'ctaLabel', 'note', 'isProvisional',
];

/** Claves de un objeto en el orden de ORDER; las desconocidas van al final. */
export function orderedKeys(v: object): string[] {
  const rank = (k: string) => (ORDER.includes(k) ? ORDER.indexOf(k) : ORDER.length);
  return Object.keys(v).sort((a, b) => rank(a) - rank(b));
}

export const LONG = new Set(['summary', 'more', 'detail', 'description', 'caption', 'intro', 'note', 'subtitle']);
export const MEDIA = new Set(['image', 'photo', 'logo', 'poster']);

export function labelOf(key: string): string {
  return LABELS[key] ?? key;
}

export function isObject(v: Json | undefined): v is JsonObject {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

/** Título de una tarjeta: el primer campo de nombre que tenga texto. */
export function itemTitle(item: Json, i: number): string {
  if (isObject(item)) {
    // Publicaciones: la cuenta se repite, así que el título es el inicio de su texto.
    const caption = item['caption'];
    if (typeof caption === 'string' && caption.trim()) return snippet(caption);
    for (const k of ['name', 'title', 'tab', 'label', 'account', 'client', 'headline', 'imageAlt']) {
      const v = item[k];
      if (typeof v === 'string' && v.trim()) return v.trim();
    }
  }
  if (typeof item === 'string' && item.trim()) return item.trim();
  return `Elemento ${i + 1}`;
}

/** Primera frase de un texto largo, sin emojis sueltos al inicio, en máximo 60 caracteres. */
function snippet(text: string): string {
  const line = text.replace(/^[^\p{L}\p{N}¿¡"]+/u, '').split(/\n|(?<=[.!?])\s/)[0].trim();
  return line.length > 60 ? `${line.slice(0, 57).trimEnd()}…` : line || text.slice(0, 60);
}

/** Línea secundaria de una tarjeta (categoría, puesto, precio…). */
export function itemSubtitle(item: Json): string {
  if (!isObject(item)) return '';
  if (typeof item['caption'] === 'string' && typeof item['account'] === 'string') {
    return [item['account'], item['category']].filter((x) => typeof x === 'string' && x).join(' · ');
  }
  for (const k of ['category', 'role', 'client', 'tagline', 'price', 'value', 'summary', 'description', 'caption', 'detail']) {
    const v = item[k];
    if (typeof v === 'number') return String(v);
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return '';
}

/** Miniatura de una tarjeta: la primera imagen del elemento (o la portada de un video). */
export function itemThumb(item: Json): string | null {
  if (!isObject(item)) return null;
  for (const k of ['image', 'photo', 'poster', 'logo']) {
    const v = item[k];
    if (typeof v === 'string' && v) return v;
  }
  if (Array.isArray(item['photos']) && isObject(item['photos'][0])) {
    const first = item['photos'][0]['image'];
    if (typeof first === 'string') return first;
  }
  return null;
}

/**
 * Una lista se edita en tabla (filas con sus campos a la vista) cuando sus elementos son pequeños:
 * hasta 4 campos, todos de texto o número y sin imágenes. Si no, se muestra como tarjetas.
 */
export function isCompactList(list: Json[]): boolean {
  const first = list.find(isObject);
  if (!first) return false;
  const keys = Object.keys(first);
  return keys.length <= 4 && keys.every((k) => !MEDIA.has(k) && (first[k] === null || typeof first[k] !== 'object'));
}

/** Forma de los elementos de listas que pueden quedar vacías (sin un elemento de muestra para copiar). */
export const TEMPLATES: Record<string, JsonObject> = {
  badges: { image: '', label: '' },
  photos: { image: '', imageAlt: '' },
  kpis: { label: '', value: 0, prefix: '', suffix: '', detail: '' },
  // Datos de las gráficas de Resultados.
  items: { label: '', value: 0, detail: '' },
  steps: { label: '', value: 0, detail: '' },
  points: { label: '', value: 0, peak: null },
};

/** Copia vacía con la misma forma, para "Agregar". */
export function blankLike(v: Json): Json {
  if (Array.isArray(v)) return [];
  if (isObject(v)) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blankLike(x)]));
  if (typeof v === 'number') return 0;
  if (typeof v === 'boolean') return false;
  if (v === null) return null;
  return '';
}
