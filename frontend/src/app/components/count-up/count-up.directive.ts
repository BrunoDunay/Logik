import { DestroyRef, Directive, ElementRef, afterNextRender, effect, inject, input } from '@angular/core';

const FORMAT = new Intl.NumberFormat('es-MX', { maximumFractionDigits: 2 });

/**
 * Número que cuenta desde cero cuando entra en pantalla.
 * El servidor ya entrega el número final, así que sin JavaScript (o con "reducir movimiento") se lee igual.
 * Uso: <span [appCountUp]="72000" prefix="+" suffix=" %"></span>
 */
@Directive({ selector: '[appCountUp]' })
export class CountUp {
  readonly appCountUp = input.required<number>();
  readonly prefix = input('');
  readonly suffix = input('');
  readonly duration = input(1400);

  private readonly el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;

  constructor() {
    const destroyRef = inject(DestroyRef);
    // El número final se escribe en cuanto llega el valor (también en el servidor).
    effect(() => this.paint(this.appCountUp()));
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          this.run();
        },
        { rootMargin: '0px 0px -12% 0px' },
      );
      observer.observe(this.el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  /** Vuelve a contar (por ejemplo, al cambiar de pestaña en Resultados). */
  run(): void {
    const target = this.appCountUp();
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / this.duration());
      const eased = 1 - Math.pow(1 - t, 4);
      this.paint(target * eased, t < 1);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  private paint(value: number, rounding = false): void {
    const target = this.appCountUp();
    const decimals = Number.isInteger(target) ? 0 : 2;
    const shown = rounding ? Number(value.toFixed(decimals)) : target;
    this.el.textContent = `${this.prefix()}${FORMAT.format(decimals ? shown : Math.round(shown))}${this.suffix()}`;
  }
}
