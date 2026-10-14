import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Renderizado: el sitio público sale del servidor en cada petición (contenido editable + Open Graph).
 * Cuando exista el panel, sus rutas y el login irán aquí con RenderMode.Client.
 */
export const serverRoutes: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Server }];
