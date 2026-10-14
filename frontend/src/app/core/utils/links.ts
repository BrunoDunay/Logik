/** Enlace de WhatsApp con el mensaje ya escrito. */
export function whatsappLink(phone: string | null | undefined, message?: string | null): string | null {
  const digits = (phone ?? '').replace(/\D/g, '');
  if (!digits) return null;
  const text = message?.trim() ? `?text=${encodeURIComponent(message.trim())}` : '';
  return `https://wa.me/${digits}${text}`;
}

const SOCIAL_BASE = {
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  tiktok: 'https://www.tiktok.com/@',
} as const;

export type SocialNetwork = keyof typeof SOCIAL_BASE;

/** Perfil de una red a partir de su usuario (con o sin @) o de una URL completa. */
export function socialLink(network: SocialNetwork, handle: string | null | undefined): string | null {
  const value = (handle ?? '').trim();
  if (!value) return null;
  if (/^https?:\/\//.test(value)) return value;
  return `${SOCIAL_BASE[network]}${value.replace(/^@/, '')}`;
}
