import { Pipe, PipeTransform } from '@angular/core';

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Redes y plataformas que se pintan con su color; las clases `kw--*` están en styles.css. */
const WORDS: [RegExp, string][] = [
  [/\bFacebook\b/g, 'facebook'],
  [/\bInstagram\b/g, 'instagram'],
  [/\bTikToks?\b/g, 'tiktok'],
  [/\bGoogle\b/g, 'google'],
  [/\bWhatsApp\b/g, 'whatsapp'],
  [/\bMeta\b/g, 'meta'],
];

/**
 * Escapa el texto y envuelve los nombres de las redes en un `<span>` con el color de cada marca.
 * Se usa con [innerHTML]; como todo se escapa primero, el texto editado en el panel no puede inyectar etiquetas.
 */
@Pipe({ name: 'brandWords' })
export class BrandWordsPipe implements PipeTransform {
  transform(text: string | null | undefined): string {
    if (!text) return '';
    let out = text.replace(/[&<>"']/g, (char) => ESCAPES[char]!);
    for (const [pattern, name] of WORDS) out = out.replace(pattern, (word) => `<span class="kw kw--${name}">${word}</span>`);
    return out;
  }
}
