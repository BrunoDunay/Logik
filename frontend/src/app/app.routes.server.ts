import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Renderizado híbrido:
 * - Panel y login: solo en el navegador (contenido privado, sin SEO; la sesión vive en localStorage).
 * - Portada y páginas legales: se prerenderizan al compilar (HTML listo para buscadores y Open Graph).
 *   En el navegador el contenido se vuelve a pedir a la API, así lo editado en el panel se ve sin recompilar.
 * - Lo demás (la página 404) se resuelve en el navegador.
 */
export const serverRoutes: ServerRoute[] = [
  { path: 'panel', renderMode: RenderMode.Client },
  { path: 'login', renderMode: RenderMode.Client },
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'privacidad', renderMode: RenderMode.Prerender },
  { path: 'terminos', renderMode: RenderMode.Prerender },
  { path: 'cookies', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
