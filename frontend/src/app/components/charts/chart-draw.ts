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
 * Espera un momento antes de dibujar: primero aparece el texto, luego la tarjeta negra y al final la gráfica.
 * En el servidor la gráfica sale ya dibujada.
 */
export function useDraw(trigger: () => unknown) {
  const drawn = signal(true);
  const host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
  const destroyRef = inject(DestroyRef);
  let visible = false;
  let ready = false;

  let timer: ReturnType<typeof setTimeout> | undefined;
  const replay = (delay: number) => {
    drawn.set(false);
    clearTimeout(timer);
    timer = setTimeout(() => requestAnimationFrame(() => drawn.set(true)), delay);
  };

  afterNextRender(() => {
    ready = true;
    drawn.set(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || visible) return;
        visible = true;
        replay(900);
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    observer.observe(host);
    destroyRef.onDestroy(() => {
      observer.disconnect();
      clearTimeout(timer);
    });
  });

  effect(() => {
    trigger();
    if (ready && visible) replay(500);
  });

  return drawn;
}
