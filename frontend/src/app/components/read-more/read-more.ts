import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

let nextId = 0;

/**
 * Texto corto con "Leer más": el resumen siempre se ve y el detalle se despliega con una animación de altura.
 * Uso: <app-read-more [more]="texto">Resumen corto</app-read-more>
 */
@Component({
  selector: 'app-read-more',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="summary"><ng-content /></div>
    @if (more()) {
      <div class="more" [class.is-open]="open()" [id]="id" [attr.aria-hidden]="!open()">
        <div class="more__inner"><p>{{ more() }}</p></div>
      </div>
      <button type="button" class="toggle" [attr.aria-expanded]="open()" [attr.aria-controls]="id" (click)="open.set(!open())">
        <span>{{ open() ? lessLabel() : moreLabel() }}</span>
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </button>
    }
  `,
  styles: `
    :host { display: grid; gap: var(--space-3); justify-items: start; }
    .summary { display: contents; }
    .more {
      display: grid;
      grid-template-rows: 0fr;
      width: 100%;
      transition: grid-template-rows var(--duration-slow) var(--ease-out), opacity var(--duration-slow) ease;
      opacity: 0;
    }
    .more.is-open { grid-template-rows: 1fr; opacity: 1; }
    .more__inner { overflow: hidden; }
    .more__inner p { padding-top: var(--space-1); color: inherit; opacity: 0.86; }
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
    .toggle span { background: linear-gradient(currentColor, currentColor) left bottom / 0% 2px no-repeat; transition: background-size var(--duration) var(--ease-out); padding-bottom: 2px; }
    .toggle svg { transition: transform var(--duration) var(--ease-out); }
    .toggle[aria-expanded='true'] svg { transform: rotate(180deg); }
    @media (hover: hover) and (pointer: fine) {
      .toggle:hover span { background-size: 100% 2px; }
    }
  `,
})
export class ReadMore {
  readonly more = input<string | null>(null);
  readonly moreLabel = input('Leer más');
  readonly lessLabel = input('Leer menos');
  protected readonly open = signal(false);
  protected readonly id = `read-more-${nextId++}`;
}
