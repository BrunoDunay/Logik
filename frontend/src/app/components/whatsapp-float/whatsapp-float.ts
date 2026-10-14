import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../icon/icon';

/** Botón fijo de WhatsApp. Aparece al dejar atrás la portada (la página decide con `visible`). */
@Component({
  selector: 'app-whatsapp-float',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      class="float"
      [class.is-visible]="visible()"
      [href]="href()"
      target="_blank"
      rel="noopener"
      [attr.tabindex]="visible() ? null : -1"
      [attr.aria-hidden]="visible() ? null : true"
    >
      <app-icon name="whatsapp" [size]="26" />
      <span class="label">{{ label() }}</span>
    </a>
  `,
  styles: `
    .float {
      position: fixed;
      right: max(var(--gutter), env(safe-area-inset-right));
      bottom: max(var(--gutter), env(safe-area-inset-bottom));
      z-index: var(--z-float);
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      min-height: 3.5rem;
      padding: 0 1.25rem 0 1rem;
      border-radius: var(--radius-pill);
      background: var(--color-pink-logo);
      color: var(--color-ink);
      font-weight: 600;
      text-decoration: none;
      -webkit-tap-highlight-color: transparent;
      opacity: 0;
      transform: translateY(1.5rem);
      pointer-events: none;
      transition:
        opacity var(--duration) var(--ease-out),
        transform var(--duration) var(--ease-out),
        background-color var(--duration-fast) ease;
    }
    .float.is-visible { opacity: 1; transform: none; pointer-events: auto; }
    .float:active { transform: scale(0.96); }
    @media (hover: hover) and (pointer: fine) {
      .float:hover { background: var(--color-paper); }
    }
    /* Solo en celular, donde la barra no muestra enlaces; y solo el ícono, para no tapar el contenido. */
    @media (min-width: 720px) {
      .float { display: none; }
    }
    @media (max-width: 719px) {
      .float { width: 3.5rem; padding: 0; justify-content: center; }
      .label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
    }
  `,
})
export class WhatsappFloat {
  readonly href = input.required<string>();
  readonly visible = input(false);
  readonly label = input('Escríbenos');
}
