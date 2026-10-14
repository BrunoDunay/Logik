import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { Reveal } from '../components/reveal/reveal.directive';
import { SectionHeading } from '../components/section-heading/section-heading';
import { BrandsSettings } from '../core/types/settings.model';

const AUTOPLAY_MS = 5200;

/**
 * Carrusel de marcas (referencia: "Carrusel para marcas"): la tarjeta activa crece y muestra la foto
 * de su trabajo teñida con el color de la marca, su logo real y una descripción; las demás esperan en fila.
 * Avanza solo con una barra de progreso, se pausa con el cursor o el foco, y se puede arrastrar.
 */
@Component({
  selector: 'app-brands-carousel',
  imports: [Reveal, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './brands-carousel.html',
  styleUrl: './brands-carousel.css',
})
export class BrandsCarousel {
  readonly content = input.required<BrandsSettings>();

  protected readonly index = linkedSignal({ source: () => this.content().items, computation: () => 0 });
  protected readonly total = computed(() => this.content().items.length);
  protected readonly paused = signal(false);
  /** Cambia en cada avance para reiniciar la animación de la barra de progreso. */
  protected readonly cycle = signal(0);
  protected readonly autoplay = signal(false);

  private timer: ReturnType<typeof setTimeout> | undefined;
  private dragX: number | null = null;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      this.autoplay.set(true);
      this.schedule();
    });
    destroyRef.onDestroy(() => clearTimeout(this.timer));
  }

  protected go(target: number): void {
    const n = this.total();
    if (!n) return;
    this.index.set((target + n) % n);
    this.cycle.update((c) => c + 1);
    this.schedule();
  }

  protected pause(on: boolean): void {
    this.paused.set(on);
    if (on) clearTimeout(this.timer);
    else this.schedule();
  }

  protected pad(n: number): string {
    return n.toString().padStart(2, '0');
  }

  protected down(event: PointerEvent): void {
    this.dragX = event.clientX;
  }

  protected up(event: PointerEvent): void {
    if (this.dragX === null) return;
    const dx = event.clientX - this.dragX;
    this.dragX = null;
    if (Math.abs(dx) > 50) this.go(this.index() + (dx < 0 ? 1 : -1));
  }

  private schedule(): void {
    clearTimeout(this.timer);
    if (!this.autoplay() || this.paused()) return;
    this.timer = setTimeout(() => this.go(this.index() + 1), AUTOPLAY_MS);
  }
}
