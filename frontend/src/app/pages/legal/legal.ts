import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INITIAL_CONTENT } from '../../core/config/initial-content';
import { SeoService } from '../../core/services/seo.service';

/** Aviso de privacidad. Texto base pendiente de revisión legal por la agencia. */
@Component({
  selector: 'app-legal',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="legal">
      <a class="legal__back" routerLink="/">← Volver al inicio</a>
      <h1>Aviso de privacidad</h1>
      <p class="legal__draft">Pendiente de confirmar: este texto es una base y debe revisarlo la agencia.</p>
      <p>
        {{ brand.name }}, con domicilio en {{ contact.address }}, es responsable del uso de los datos personales
        que nos compartes por WhatsApp, correo o redes sociales.
      </p>
      <h2>Para qué usamos tus datos</h2>
      <p>
        Solo para responder tus mensajes, preparar una cotización y darte el servicio que contrates. No vendemos ni
        compartimos tus datos con terceros, salvo las plataformas necesarias para el servicio (por ejemplo, Meta para tus
        campañas).
      </p>
      <h2>Tus derechos</h2>
      <p>
        Puedes pedir en cualquier momento que corrijamos o eliminemos tus datos escribiendo a
        <a [href]="'mailto:' + contact.email">{{ contact.email }}</a>.
      </p>
    </main>
  `,
  styles: `
    .legal {
      display: grid;
      gap: var(--space-5);
      max-width: 44rem;
      min-height: 100svh;
      align-content: start;
      padding: var(--space-8) var(--gutter);
    }
    .legal__back { justify-self: start; display: inline-flex; align-items: center; min-height: 2.75rem; }
    h1 { font-size: var(--text-xl); }
    h2 { margin-top: var(--space-5); font-size: var(--text-lg); letter-spacing: var(--tracking-tight); }
    .legal__draft { color: var(--color-pink-logo); font-weight: 600; }
  `,
})
export class Legal {
  protected readonly brand = INITIAL_CONTENT.brand;
  protected readonly contact = INITIAL_CONTENT.contact;

  constructor() {
    inject(SeoService).setPage({ title: `Aviso de privacidad · ${this.brand.name}`, path: '/privacidad' });
  }
}
