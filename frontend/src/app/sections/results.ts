import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, computed, inject, input, linkedSignal, signal, viewChildren } from '@angular/core';
import { AreaChart } from '../components/charts/area-chart';
import { BarChart } from '../components/charts/bar-chart';
import { DotChart } from '../components/charts/dot-chart';
import { StepsChart } from '../components/charts/steps-chart';
import { formatNumber } from '../components/charts/chart-draw';
import { CountUp } from '../components/count-up/count-up.directive';
import { ReadMore } from '../components/read-more/read-more';
import { Reveal } from '../components/reveal/reveal.directive';
import { SectionHeading } from '../components/section-heading/section-heading';
import { ResultsSettings } from '../core/types/settings.model';

/**
 * Casos de éxito en pestañas; cada uno con su gráfica real, cifras clave y "Leer más".
 * Al cambiar de pestaña el caso actual sale y el nuevo entra por partes: texto, tarjeta y gráfica.
 */
@Component({
  selector: 'app-results',
  imports: [AreaChart, BarChart, DotChart, StepsChart, CountUp, ReadMore, Reveal, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './results.html',
  styleUrl: './results.css',
})
export class Results {
  readonly content = input.required<ResultsSettings>();

  protected readonly activeId = linkedSignal(() => this.content().cases[0]?.id ?? '');
  protected readonly active = computed(() => this.content().cases.find((c) => c.id === this.activeId()) ?? this.content().cases[0]);
  protected readonly activeIndex = computed(() => Math.max(0, this.content().cases.findIndex((c) => c.id === this.activeId())));
  protected readonly fmt = formatNumber;

  /** Caso que se muestra; va un paso detrás de la pestaña para dar tiempo a la salida. */
  protected readonly shownId = linkedSignal(() => this.content().cases[0]?.id ?? '');
  protected readonly shown = computed(() => this.content().cases.filter((c) => c.id === this.shownId()));
  protected readonly leaving = signal(false);
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected select(id: string): void {
    if (id === this.activeId()) return;
    this.activeId.set(id);
    this.leaving.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.shownId.set(id);
      this.leaving.set(false);
    }, 320);
  }

  /** Brillo suave que sigue al cursor sobre la tarjeta de la gráfica (sin pasar por Angular). */
  protected glow(event: PointerEvent): void {
    const el = event.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - r.left}px`);
    el.style.setProperty('--my', `${event.clientY - r.top}px`);
  }

  private readonly tabs = viewChildren<ElementRef<HTMLButtonElement>>('tab');

  /** Flechas izquierda/derecha entre pestañas, como pide el patrón de pestañas de WAI-ARIA. */
  protected onKey(event: KeyboardEvent): void {
    const cases = this.content().cases;
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (this.activeIndex() + delta + cases.length) % cases.length;
    this.select(cases[next].id);
    this.tabs()[next]?.nativeElement.focus();
  }
}
