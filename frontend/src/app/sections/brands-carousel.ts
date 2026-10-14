import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
} from '@angular/core';
import { Reveal } from '../components/reveal/reveal.directive';
import { SectionHeading } from '../components/section-heading/section-heading';
import { BrandsSettings } from '../core/types/settings.model';

/** Tarjetas que pueden verse a la derecha de la activa; las demás esperan ocultas. */
const VISIBLE_AFTER = 7;

/**
 * Carrusel de marcas (referencia: "Carrusel para marcas"): la tarjeta activa crece y muestra la foto
 * de su trabajo teñida con el color de la marca, su logo y una descripción; las demás esperan en fila.
 * Es un ciclo: después de la última sigue la primera, así nunca se queda sin tarjetas.
 * Solo avanza cuando la persona lo pide: con las flechas, tocando una tarjeta o arrastrando.
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

  private dragX: number | null = null;

  protected go(target: number): void {
    const n = this.total();
    if (!n) return;
    this.index.set((target + n) % n);
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
}
