import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { API_URL } from '../config/api.config';

export interface AdminSession {
  token: string;
  expiresAt: string;
  admin: { id: string; email: string; name: string };
}

const STORAGE_KEY = 'logik-panel-session';

/** Sesión del panel: el JWT vive en localStorage y caduca con la fecha que da la API. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly session = signal<AdminSession | null>(this.restore());

  readonly admin = computed(() => this.session()?.admin ?? null);
  readonly token = computed(() => {
    const s = this.session();
    return s && new Date(s.expiresAt).getTime() > Date.now() ? s.token : null;
  });
  readonly isLoggedIn = computed(() => this.token() !== null);

  login(email: string, password: string): Observable<AdminSession> {
    return this.http.post<AdminSession>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap((session) => {
        this.session.set(session);
        if (this.isBrowser) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      }),
    );
  }

  logout(redirect = true): void {
    this.session.set(null);
    if (this.isBrowser) localStorage.removeItem(STORAGE_KEY);
    if (redirect) void this.router.navigate(['/login']);
  }

  private restore(): AdminSession | null {
    if (!this.isBrowser) return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AdminSession) : null;
    } catch {
      return null;
    }
  }
}
