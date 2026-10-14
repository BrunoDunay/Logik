import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="missing">
      <h1>Esta página no existe.</h1>
      <p>Pero tu marketing sí puede crecer.</p>
      <a routerLink="/">Volver al inicio</a>
    </main>
  `,
  styles: `
    .missing {
      display: grid;
      gap: var(--space-5);
      align-content: center;
      min-height: 100svh;
      padding: var(--gutter);
    }
    h1 { font-size: var(--text-xl); max-width: 12ch; }
    a { justify-self: start; color: var(--color-pink-logo); font-weight: 600; min-height: 2.75rem; display: inline-flex; align-items: center; }
  `,
})
export class NotFound {
  constructor() {
    inject(SeoService).setPage({ title: 'Página no encontrada · Logik Marketing', noindex: true });
  }
}
