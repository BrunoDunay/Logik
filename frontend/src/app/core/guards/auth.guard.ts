import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** El panel solo se descarga con sesión; sin ella se manda al login. */
export const authGuard: CanMatchFn = () => {
  const auth = inject(AuthService);
  return auth.isLoggedIn() ? true : inject(Router).createUrlTree(['/login']);
};

/** Con sesión abierta, el login lleva directo al panel. */
export const guestGuard: CanMatchFn = () => {
  const auth = inject(AuthService);
  return auth.isLoggedIn() ? inject(Router).createUrlTree(['/panel']) : true;
};
