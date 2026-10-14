import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '../../components/logo/logo';
import { AuthService } from '../../core/services/auth.service';
import { SeoService } from '../../core/services/seo.service';
import { SiteContentService } from '../../core/services/site-content.service';
import { SectionKey, SiteSettings } from '../../core/types/settings.model';
import { JsonField, orderedKeys } from './json-field';

const SECTIONS: { key: SectionKey; label: string; hint: string }[] = [
  { key: 'hero', label: 'Portada', hint: 'Textos alrededor del logo' },
  { key: 'about', label: 'Nosotras', hint: 'La frase, el resumen y las cifras' },
  { key: 'results', label: 'Resultados', hint: 'Casos, gráficas y cifras clave' },
  { key: 'posts', label: 'Contenido', hint: 'Carrusel de publicaciones' },
  { key: 'services', label: 'Servicios', hint: 'Lista de servicios' },
  { key: 'packages', label: 'Paquetes', hint: 'Precios y lo que incluye cada uno' },
  { key: 'brands', label: 'Marcas', hint: 'Carrusel de clientes' },
  { key: 'videos', label: 'Videos', hint: 'Videos de la sección' },
  { key: 'team', label: 'Equipo', hint: 'Directoras y Marke-team' },
  { key: 'contact', label: 'Contacto', hint: 'WhatsApp, correo y redes' },
  { key: 'closing', label: 'Cierre', hint: 'Invitación final' },
  { key: 'brand', label: 'Marca', hint: 'Nombre y frase' },
];

/** Panel de edición del contenido: una sección a la vez, con el formulario generado a partir de su forma. */
@Component({
  selector: 'app-panel',
  imports: [RouterLink, Logo, JsonField],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel {
  private readonly content = inject(SiteContentService);
  protected readonly auth = inject(AuthService);
  protected readonly sections = SECTIONS;
  protected readonly selected = signal<SectionKey>('hero');
  protected readonly current = computed(() => SECTIONS.find((s) => s.key === this.selected())!);

  /** Copia de trabajo de la sección; se reemplaza al cambiar de sección o al guardar. */
  protected draft: Record<string, unknown> = {};
  protected readonly dirty = signal(false);
  protected readonly saving = signal(false);
  protected readonly message = signal<{ kind: 'ok' | 'error'; text: string; fields?: Record<string, string> } | null>(null);

  constructor() {
    this.content.load();
    inject(SeoService).setPage({ title: 'Panel · Logik Marketing', noindex: true });
    effect(() => {
      const key = this.selected();
      this.draft = structuredClone(this.content.site()[key]) as unknown as Record<string, unknown>;
      this.dirty.set(false);
    });
  }

  protected select(key: SectionKey): void {
    if (key === this.selected()) return;
    if (this.dirty() && !confirm('Tienes cambios sin guardar en esta sección. ¿Salir sin guardar?')) return;
    this.message.set(null);
    this.selected.set(key);
  }

  protected keys(): string[] {
    return orderedKeys(this.draft);
  }

  protected save(): void {
    const key = this.selected();
    this.saving.set(true);
    this.message.set(null);
    this.content.save(key, this.draft as unknown as SiteSettings[typeof key]).subscribe({
      next: () => {
        this.saving.set(false);
        this.dirty.set(false);
        this.message.set({ kind: 'ok', text: 'Guardado. El sitio ya muestra los cambios.' });
      },
      error: (error: unknown) => {
        this.saving.set(false);
        const body = error instanceof HttpErrorResponse ? error.error?.error : null;
        this.message.set({
          kind: 'error',
          text: body?.message ?? 'No se pudo guardar. Revisa tu conexión e intenta de nuevo.',
          fields: body?.fields,
        });
      },
    });
  }

  protected fieldErrors(): { path: string; text: string }[] {
    const fields = this.message()?.fields ?? {};
    return Object.entries(fields).map(([path, text]) => ({ path, text }));
  }
}
