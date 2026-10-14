import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  // ---- Páginas legales: una sola plantilla, el documento va en data ----
  ...(['privacidad', 'terminos', 'cookies'] as const).map((doc) => ({
    path: doc,
    data: { doc },
    loadComponent: () => import('./pages/legal/legal').then((m) => m.Legal),
  })),
  // ---- Panel de contenido (sin sesión ni siquiera se descarga) ----
  {
    path: 'login',
    canMatch: [guestGuard],
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'panel',
    canMatch: [authGuard],
    loadComponent: () => import('./pages/panel/panel').then((m) => m.Panel),
  },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound) },
];
