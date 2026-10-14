import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { API_URL } from '../config/api.config';
import { INITIAL_CONTENT } from '../config/initial-content';
import { SectionKey, SiteSettings } from '../types/settings.model';

/**
 * Contenido del sitio. Lo usan la portada y el panel.
 * Empieza con el contenido de respaldo (la portada se ve completa aunque la API no responda)
 * y se reemplaza sección por sección con lo que entrega la API.
 */
@Injectable({ providedIn: 'root' })
export class SiteContentService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);
  private readonly loaded = signal<Partial<SiteSettings>>({});
  private requested = false;

  readonly site = computed<SiteSettings>(() => ({ ...INITIAL_CONTENT, ...this.loaded() }));

  /** Pide el contenido una sola vez (en SSR la respuesta se reutiliza en el navegador). */
  load(): void {
    if (this.requested) return;
    this.requested = true;
    this.http
      .get<Partial<SiteSettings>>(`${this.apiUrl}/settings`)
      .pipe(catchError(() => of({} as Partial<SiteSettings>)))
      .subscribe((data) => this.loaded.set(data ?? {}));
  }

  /** Guarda una sección desde el panel y actualiza la vista al instante. */
  save<K extends SectionKey>(key: K, value: SiteSettings[K]): Observable<SiteSettings[K]> {
    return this.http
      .put<SiteSettings[K]>(`${this.apiUrl}/settings/${key}`, value)
      .pipe(tap((saved) => this.loaded.update((current) => ({ ...current, [key]: saved }))));
  }
}
