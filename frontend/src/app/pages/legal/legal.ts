import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Logo } from '../../components/logo/logo';
import { SeoService } from '../../core/services/seo.service';
import { SiteContentService } from '../../core/services/site-content.service';
import { LEGAL_DOCS, LEGAL_UPDATED, LegalDocId } from './legal-docs';

/**
 * Páginas legales (aviso de privacidad, términos y cookies) con una misma plantilla.
 * El documento llega por la ruta (`data: { doc }`). Los textos son una base pendiente de revisión.
 */
@Component({
  selector: 'app-legal',
  imports: [RouterLink, RouterLinkActive, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let d = page();
    <header class="bar">
      <a class="bar__logo" routerLink="/" aria-label="Logik Marketing, inicio"><app-logo /></a>
      <nav class="bar__docs" aria-label="Documentos legales">
        @for (item of docs; track item.id) {
          <a [routerLink]="'/' + item.id" routerLinkActive="is-active" ariaCurrentWhenActive="page">{{ item.short }}</a>
        }
      </nav>
    </header>
    <main class="legal">
      <a class="legal__back" routerLink="/">← Volver al inicio</a>
      <p class="legal__kicker">Actualizado el {{ updated }}</p>
      <h1>{{ d.title }}</h1>
      <p class="legal__draft">Pendiente de confirmar: este texto es una base y debe revisarlo la agencia.</p>
      <p class="legal__intro">{{ fill(d.intro) }}</p>
      @for (s of d.sections; track s.title; let i = $index) {
        <section class="legal__section" [style.--i]="i">
          <h2><span>{{ (i + 1).toString().padStart(2, '0') }}</span> {{ s.title }}</h2>
          @for (p of s.paragraphs; track $index) {
            <p>{{ fill(p) }}</p>
          }
        </section>
      }
    </main>
  `,
  styles: `
    :host { display: block; min-height: 100svh; background: var(--color-paper); }
    .bar {
      position: sticky; top: 0; z-index: var(--z-nav);
      display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-3);
      padding: 0.8rem var(--gutter);
      background: rgb(255 255 255 / 0.92); box-shadow: 0 1px 0 var(--color-line);
      -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
    }
    .bar__logo { width: 6.5rem; }
    .bar__docs { display: flex; gap: var(--space-1); }
    .bar__docs a {
      display: inline-flex; align-items: center; min-height: 2.5rem; padding: 0 0.9rem;
      border-radius: var(--radius-pill); font-size: var(--text-sm); font-weight: 500;
      transition: background-color 500ms ease, color 500ms ease;
    }
    .bar__docs a.is-active { background: var(--color-ink); color: var(--color-white); }
    @media (hover: hover) and (pointer: fine) {
      .bar__docs a:not(.is-active):hover { background: var(--color-blush); color: var(--color-pink-deep); }
    }
    .legal {
      display: grid; gap: var(--space-4); max-width: 46rem; margin-inline: auto; align-content: start;
      padding: var(--space-7) var(--gutter) var(--space-9);
    }
    .legal__back {
      justify-self: start; display: inline-flex; align-items: center; min-height: 2.75rem; color: var(--color-text-soft);
      transition: color 450ms ease, translate 500ms var(--ease-out);
    }
    @media (hover: hover) and (pointer: fine) { .legal__back:hover { color: var(--color-pink-deep); translate: -4px 0; } }
    .legal__kicker { font-size: var(--text-xs); letter-spacing: 0.18em; text-transform: uppercase; color: var(--color-text-muted); }
    h1 { font-size: var(--text-xl); animation: legal-in 900ms var(--ease-out) backwards; }
    .legal__draft { padding: 0.6rem 1rem; border-radius: var(--radius-sm); background: var(--color-blush); color: var(--color-pink-deep); font-size: var(--text-sm); font-weight: 600; }
    .legal__intro { font-size: var(--text-lg); line-height: 1.5; }
    .legal__section {
      display: grid; gap: var(--space-2); padding-top: var(--space-5); border-top: 1px solid var(--color-line);
      animation: legal-in 800ms var(--ease-out) backwards; animation-delay: calc(150ms + var(--i) * 80ms);
    }
    h2 { display: flex; gap: 0.6rem; align-items: baseline; font-size: var(--text-lg); letter-spacing: var(--tracking-tight); }
    h2 span { font-size: var(--text-sm); color: var(--color-pink-deep); font-variant-numeric: tabular-nums; }
    .legal__section p { color: var(--color-text-soft); }
    @keyframes legal-in { from { opacity: 0; translate: 0 16px; } }
  `,
})
export class Legal {
  /** Viene de `data: { doc }` en la ruta (withComponentInputBinding). */
  readonly doc = input<LegalDocId>('privacidad');

  private readonly content = inject(SiteContentService);
  protected readonly docs = LEGAL_DOCS;
  protected readonly updated = LEGAL_UPDATED;
  protected readonly page = computed(() => LEGAL_DOCS.find((d) => d.id === this.doc()) ?? LEGAL_DOCS[0]);

  constructor() {
    this.content.load();
    const seo = inject(SeoService);
    effect(() => {
      const { name } = this.content.site().brand;
      seo.setPage({ title: `${this.page().title} · ${name}`, path: `/${this.page().id}` });
    });
  }

  /** Reemplaza {name}, {address}, {email} y {city} con los datos de contacto actuales. */
  protected fill(text: string): string {
    const { brand, contact } = this.content.site();
    const values: Record<string, string> = {
      name: brand.name,
      address: contact.address ?? contact.city,
      email: contact.email ?? 'nuestro correo',
      city: contact.city,
    };
    return text.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');
  }
}
