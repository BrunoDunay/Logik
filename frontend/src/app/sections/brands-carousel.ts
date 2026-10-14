import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';
import { Reveal } from '../components/reveal/reveal.directive';
import { SectionHeading } from '../components/section-heading/section-heading';
import { BrandsSettings } from '../core/types/settings.model';

const AUTOPLAY_MS = 5200;
/** Tarjetas que pueden verse a la derecha de la activa; las demás esperan ocultas. */
const VISIBLE_AFTER = 7;

/**
 * Carrusel de marcas (referencia: "Carrusel para marcas"): la tarjeta activa crece y muestra la foto
 * de su trabajo teñida con el color de la marca, su logo y una descripción; las demás esperan en fila.
 * Es un ciclo: después de la última sigue la primera, así nunca se queda sin tarjetas.
 * Avanza solo (la barra de progreso es el temporizador), se pausa con el cursor o el foco y se puede arrastrar.
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

  /**
   * Distancia de cada marca a la activa, en ciclo: -1 es la que acaba de salir por la izquierda,
   * 0 la activa y de ahí hacia la derecha. Las lejanas quedan ocultas, así el salto de la que
   * vuelve a la cola no se ve.
   */
  protected readonly slots = computed(() => {
    const n = this.total();
    const index = this.index();
    return this.content().items.map((brand, i) => {
      let o = (((i - index) % n) + n) % n;
      if (o === n - 1 && n > 2) o = -1;
      return { brand, i, o, hidden: o < 0 || o > VISIBLE_AFTER };
    });
  });

  private readonly fill = viewChild<ElementRef<HTMLElement>>('fill');
  private animation: Animation | null = null;
  private autoplay = false;
  private paused = false;
  private dragX: number | null = null;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      this.autoplay = true;
      this.restart();
    });
    destroyRef.onDestroy(() => this.animation?.cancel());
  }

  protected go(target: number): void {
    const n = this.total();
    if (!n) return;
    this.index.set((target + n) % n);
    this.restart();
  }

  protected pause(on: boolean): void {
    this.paused = on;
    if (on) this.animation?.pause();
    else this.animation?.play();
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

  /** La barra se llena en AUTOPLAY_MS y al terminar avanza; pausar la barra pausa el carrusel. */
  private restart(): void {
    this.animation?.cancel();
    const el = this.fill()?.nativeElement;
    if (!this.autoplay || !el) return;
    this.animation = el.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
      duration: AUTOPLAY_MS,
      easing: 'linear',
      fill: 'forwards',
    });
    this.animation.onfinish = () => this.go(this.index() + 1);
    if (this.paused) this.animation.pause();
  }
}
