import { DestroyRef, ElementRef, afterNextRender, effect, inject, signal } from '@angular/core';

const MXN = new Intl.NumberFormat('es-MX', { maximumFractionDigits: 2 });

export const formatNumber = (v: number) => MXN.format(v);

/** "72000" → "72 mil", "13426" → "13.4 mil"; para ejes y etiquetas cortas. */
export function formatShort(v: number): string {
  if (v >= 1000) return `${MXN.format(Math.round(v / 100) / 10)} mil`;
  return MXN.format(v);
}

/** Redondea hacia arriba a un número "limpio" para el máximo del eje (5, 10, 15 mil…). */
export function niceMax(v: number): number {
  if (v <= 0) return 1;
  const exp = Math.pow(10, Math.floor(Math.log10(v)));
  const steps = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  return (steps.find((s) => s * exp >= v) ?? 10) * exp;
}

/**
 * Estado de "dibujado" de una gráfica: pasa a verdadero cuando entra en pantalla y se reinicia
 * cada vez que cambian sus datos (al cambiar de pestaña la gráfica se vuelve a dibujar).
 * En el servidor y con "reducir movimiento", la gráfica sale ya dibujada.
 */
export function useDraw(trigger: () => unknown) {
  const drawn = signal(true);
  const host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
  const destroyRef = inject(DestroyRef);
  let visible = false;
  let ready = false;

  const replay = () => {
    drawn.set(false);
    requestAnimationFrame(() => requestAnimationFrame(() => drawn.set(true)));
  };

  afterNextRender(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    ready = true;
    drawn.set(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || visible) return;
        visible = true;
        replay();
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    observer.observe(host);
    destroyRef.onDestroy(() => observer.disconnect());
  });

  effect(() => {
    trigger();
    if (ready && visible) replay();
  });

  return drawn;
}
