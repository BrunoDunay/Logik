import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';

/**
 * Pulso rosa en el punto donde se hace clic (solo con mouse): un aro que se expande y se desvanece.
 * Cada pulso es un elemento temporal que se borra al terminar su animación.
 */
@Component({
  selector: 'app-click-pulse',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``,
  styles: `
    :host { position: fixed; inset: 0; z-index: 2147483000; pointer-events: none; overflow: hidden; }
    :host ::ng-deep .pulse {
      position: absolute;
      width: 34px;
      height: 34px;
      margin: -17px 0 0 -17px;
      border-radius: 50%;
      border: 2px solid var(--color-pink-logo);
      background: radial-gradient(circle, rgb(254 95 146 / 0.35), transparent 65%);
      animation: click-pulse 650ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    @keyframes click-pulse {
      from { scale: 0.2; opacity: 1; }
      to { scale: 1.6; opacity: 0; border-width: 1px; }
    }
  `,
})
export class ClickPulse {
  constructor() {
    const destroyRef = inject(DestroyRef);
    const host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    afterNextRender(() => {
      const onDown = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse' || event.button !== 0) return;
        const dot = document.createElement('span');
        dot.className = 'pulse';
        dot.style.left = `${event.clientX}px`;
        dot.style.top = `${event.clientY}px`;
        dot.addEventListener('animationend', () => dot.remove(), { once: true });
        host.appendChild(dot);
      };
      window.addEventListener('pointerdown', onDown, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('pointerdown', onDown));
    });
  }
}
