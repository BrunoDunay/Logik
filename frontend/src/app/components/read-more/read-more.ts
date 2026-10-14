import { ChangeDetectionStrategy, Component, ElementRef, input, signal, viewChild } from '@angular/core';

let nextId = 0;

/**
 * Texto corto con "Leer más": el resumen siempre se ve y el detalle se despliega.
 * La altura se anima con la Web Animations API (de la altura real a la nueva), y el texto
 * entra con un fundido y un leve desplazamiento; al cerrar sale primero el texto y luego se recoge.
 * Uso: <app-read-more [more]="texto">Resumen corto</app-read-more>
 */
@Component({
  selector: 'app-read-more',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="summary"><ng-content /></div>
    @if (more()) {
      <div class="more" #panel [id]="id" [class.is-open]="open()" [attr.aria-hidden]="!open()" [attr.inert]="open() ? null : ''">
        @for (p of paragraphs(); track $index; let i = $index) {
          <p [style.--i]="i">{{ p }}</p>
        }
      </div>
      <button type="button" class="toggle" [attr.aria-expanded]="open()" [attr.aria-controls]="id" (click)="toggle()">
        <span class="toggle__labels">
          <span class="toggle__label" [class.is-on]="!open()">{{ moreLabel() }}</span>
          <span class="toggle__label" [class.is-on]="open()" aria-hidden="true">{{ lessLabel() }}</span>
        </span>
        <span class="toggle__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </span>
      </button>
    }
  `,
  styles: `
    :host { display: grid; gap: var(--space-3); justify-items: start; }
    .summary { display: contents; }
    .more { display: grid; gap: var(--space-3); width: 100%; height: 0; overflow: hidden; }
    .more.is-open { height: auto; }
    .more p {
      padding-top: var(--space-1);
      color: inherit;
      opacity: 0;
      translate: 0 12px;
      filter: blur(4px);
      transition: opacity 500ms ease, translate 600ms var(--ease-out), filter 500ms ease;
    }
    .more.is-open p {
      opacity: 0.86;
      translate: 0 0;
      filter: none;
      transition-delay: calc(180ms + var(--i) * 110ms);
    }
    .toggle {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      min-height: 2.75rem;
      padding: 0;
      border: 0;
      background: none;
      color: var(--read-more-color, var(--color-pink-deep));
      font-weight: 600;
      font-size: var(--text-sm);
      -webkit-tap-highlight-color: transparent;
    }
    /* Las dos etiquetas ocupan el mismo lugar y se cruzan deslizándose. */
    .toggle__labels { display: grid; overflow: hidden; padding-bottom: 2px; }
    .toggle__label {
      grid-area: 1 / 1;
      opacity: 0;
      translate: 0 100%;
      transition: opacity 400ms ease, translate 550ms var(--ease-out);
      background: linear-gradient(currentColor, currentColor) left bottom / 0% 2px no-repeat;
    }
    .toggle__label.is-on { opacity: 1; translate: 0 0; }
    .toggle[aria-expanded='true'] .toggle__label:not(.is-on) { translate: 0 -100%; }
    .toggle__icon {
      display: grid;
      place-items: center;
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 50%;
      background: color-mix(in srgb, currentColor 12%, transparent);
      transition: transform 600ms var(--ease-out), background-color 450ms ease, color 450ms ease;
    }
    .toggle[aria-expanded='true'] .toggle__icon { transform: rotate(180deg); }
    .toggle__label { transition: opacity 400ms ease, translate 550ms var(--ease-out), background-size 500ms var(--ease-out); }
    @media (hover: hover) and (pointer: fine) {
      .toggle:hover .toggle__label.is-on { background-size: 100% 2px; }
      .toggle:hover .toggle__icon { background: currentColor; }
      .toggle:hover .toggle__icon svg { color: var(--color-white); }
    }
  `,
})
export class ReadMore {
  readonly more = input<string | null>(null);
  readonly moreLabel = input('Leer más');
  readonly lessLabel = input('Leer menos');
  protected readonly open = signal(false);
  protected readonly id = `read-more-${nextId++}`;
  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');
  private animation: Animation | null = null;

  /** Los saltos de línea dobles del texto separan párrafos. */
  protected paragraphs(): string[] {
    return (this.more() ?? '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  }

  protected toggle(): void {
    const el = this.panel()?.nativeElement;
    const opening = !this.open();
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.open.set(opening);
      return;
    }
    const from = el.getBoundingClientRect().height;
    this.animation?.cancel();
    this.open.set(opening);
    // Mide la altura final con el estado nuevo ya aplicado y anima entre las dos.
    el.style.height = opening ? 'auto' : '0px';
    const to = opening ? el.scrollHeight : 0;
    el.style.height = '';
    this.animation = el.animate([{ height: `${from}px` }, { height: `${to}px` }], {
      duration: opening ? 700 : 600,
      delay: opening ? 0 : 160,
      easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
      fill: 'backwards',
    });
    this.animation.onfinish = () => (this.animation = null);
  }
}
