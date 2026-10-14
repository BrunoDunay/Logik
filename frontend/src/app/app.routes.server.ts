import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Renderizado híbrido:
 * - Panel y login: solo en el navegador (contenido privado, sin SEO; la sesión vive en localStorage).
 * - Sitio público: SSR en cada petición (contenido editable + Open Graph).
 */
export const serverRoutes: ServerRoute[] = [
  { path: 'panel', renderMode: RenderMode.Client },
  { path: 'login', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Server },
];
