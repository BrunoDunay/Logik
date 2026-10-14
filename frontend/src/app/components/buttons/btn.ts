import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * - `solid`: rosa del logo, la acción principal sobre fondos oscuros.
 * - `ink`: negro, la acción principal sobre los campos rosas o de papel.
 * - `light`: papel, sobre fotografías.
 */
export type BtnVariant = 'solid' | 'ink' | 'light';

/**
 * Botón del sitio: píldora plana de un solo color, de 48px de alto o más.
 * Uso: <a appBtn href="…">…</a> o <button appBtn variant="ink">…</button>
 */
@Component({
  selector: 'button[appBtn], a[appBtn]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'btn',
    '[class.btn--solid]': "variant() === 'solid'",
    '[class.btn--ink]': "variant() === 'ink'",
    '[class.btn--light]': "variant() === 'light'",
    '[class.btn--block]': 'block()',
  },
  template: `<ng-content />`,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-3);
      min-height: 3.25rem;
      padding: 0.75rem 1.75rem;
      border: 0;
      border-radius: var(--radius-pill);
      font-family: var(--font-sans);
      font-size: var(--text-base);
      font-weight: 600;
      line-height: 1.2;
      letter-spacing: -0.01em;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--duration-fast) ease,
        color var(--duration-fast) ease,
        transform var(--duration-press) var(--ease-out);
    }
    /* La interfaz responde al toque: el botón cede un poco al presionarlo. */
    :host(:active) {
      transform: scale(0.97);
    }
    :host(.btn--block) {
      display: flex;
      width: 100%;
    }
    :host(.btn--solid) {
      background: var(--color-pink-logo);
      color: var(--color-ink);
    }
    :host(.btn--ink) {
      background: var(--color-ink);
      color: var(--color-paper);
    }
    :host(.btn--light) {
      background: var(--color-paper);
      color: var(--color-ink);
    }
    @media (hover: hover) and (pointer: fine) {
      :host(.btn--solid:hover) {
        background: var(--color-paper);
      }
      :host(.btn--ink:hover) {
        background: var(--color-ink-2);
        color: var(--color-pink);
      }
      :host(.btn--light:hover) {
        background: var(--color-pink);
      }
    }
  `,
})
export class Btn {
  readonly variant = input<BtnVariant>('solid');
  readonly block = input(false);
}
