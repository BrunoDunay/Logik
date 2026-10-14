import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Reveal } from '../reveal/reveal.directive';

/**
 * Título de sección al estilo de sus publicaciones: una parte en Poppins gruesa y una palabra en script rosa,
 * con un destello que gira detrás. Debajo, una introducción corta.
 */
@Component({
  selector: 'app-section-heading',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-center]': "align() === 'center'", '[class.is-light]': "tone() === 'light'" },
  template: `
    @if (kicker()) {
      <p class="kicker" appReveal="fade"><span class="kicker__dot" aria-hidden="true"></span>{{ kicker() }}</p>
    }
    <h2 class="title" [id]="headingId()" appReveal="blur">
      <span class="title__lead">{{ title() }}</span>
      <span class="title__script script">{{ script() }}</span>
      <svg class="title__spark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5c.6 5.6 4.9 9.9 10.5 10.5-5.6.6-9.9 4.9-10.5 10.5C11.4 16.9 7.1 12.6 1.5 12 7.1 11.4 11.4 7.1 12 1.5Z" /></svg>
    </h2>
    @if (intro()) {
      <p class="intro" appReveal [revealDelay]="120">{{ intro() }}</p>
    }
  `,
  styles: `
    :host { display: grid; gap: var(--space-4); max-width: 48rem; }
    :host(.is-center) { justify-items: center; text-align: center; margin-inline: auto; }
    .title { position: relative; width: fit-content; max-width: 100%; display: flex; flex-wrap: wrap; align-items: baseline; gap: 0 0.28em; font-size: var(--text-xl); }
    :host(.is-center) .title { justify-content: center; }
    .title__script { font-size: 1.3em; padding-inline: 0.04em 0.12em; }
    .title__spark { position: absolute; width: 0.42em; height: 0.42em; right: -0.5em; top: -0.25em; fill: var(--color-pink-logo); animation: spark-spin 6s linear infinite; }
    .kicker { display: inline-flex; align-items: center; gap: 0.6rem; font-size: var(--text-sm); font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--color-pink-deep); }
    .kicker__dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--color-pink-logo); box-shadow: 0 0 0 4px rgb(254 95 146 / 0.18); }
    :host(.is-light) .kicker { color: var(--color-pink-logo); }
    .intro { max-width: 40rem; font-size: var(--text-lg); line-height: 1.45; color: var(--color-text-soft); font-weight: 400; }
    :host(.is-light) .title { color: var(--color-on-ink); }
    :host(.is-light) .intro { color: var(--color-on-ink-soft); }
    @keyframes spark-spin { 0%, 100% { transform: rotate(0) scale(1); } 50% { transform: rotate(90deg) scale(0.7); } }
  `,
})
export class SectionHeading {
  readonly title = input.required<string>();
  readonly script = input.required<string>();
  readonly intro = input<string | null>(null);
  /** Texto pequeño arriba del título, para decir de qué trata la sección. */
  readonly kicker = input<string | null>(null);
  readonly align = input<'start' | 'center'>('start');
  readonly tone = input<'dark' | 'light'>('dark');
  readonly headingId = input<string | null>(null);
}
