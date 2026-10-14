import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { Reveal } from '../../components/reveal/reveal.directive';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { Brand, PostsSettings } from '../../core/types/settings.model';
import { IgPost, PostBrand } from './ig-post';

/** Cuántas tarjetas se ven a cada lado de la central. */
const SIDE = 3;

/**
 * Carrusel tipo "coverflow" (referencia: "Carrusel para publicaciones"), navegado como un catálogo:
 * todas las tarjetas existen siempre y solo cambian de lugar, así que al avanzar se deslizan, giran
 * y la que llega al centro se convierte en una publicación de Instagram (encabezado, like y texto).
 * Se mueve tocando una tarjeta lateral, arrastrando o con las flechas del teclado.
 */
@Component({
  selector: 'app-posts-carousel',
  imports: [IgPost, Reveal, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './posts-carousel.html',
  styleUrl: './posts-carousel.css',
})
export class PostsCarousel {
  readonly content = input.required<PostsSettings>();
  /** Marcas del carrusel de clientes: dan el logo y el color del avatar de cada publicación. */
  readonly brands = input<Brand[]>([]);

  protected readonly category = linkedSignal(() => this.content().categories[0]?.id ?? '');
  protected readonly filtered = computed(() => this.content().items.filter((p) => p.category === this.category()));
  /** La publicación central; vuelve a la primera al cambiar de filtro. */
  protected readonly index = linkedSignal({ source: () => this.filtered(), computation: () => 0 });
  /** Mientras cambia el filtro, el escenario se desvanece antes de mostrar las nuevas tarjetas. */
  protected readonly switching = signal(false);
  protected readonly n = computed(() => this.filtered().length);

  protected readonly brandOf = computed(() => {
    const map = new Map<string, PostBrand>();
    for (const b of this.brands()) map.set(b.name, { logo: b.logo, color: b.color });
    return map;
  });

  /**
   * Cada tarjeta con su distancia a la central, siempre en ciclo: a la izquierda de la primera
   * aparecen las últimas. La tarjeta que da la vuelta (cambia de un extremo al otro) se marca
   * como `jump` para que aparezca en su nuevo lugar con un fundido en vez de cruzar el escenario.
   */
  private previous = new Map<string, number>();
  protected readonly cards = computed(() => {
    const items = this.filtered();
    const n = items.length;
    const index = this.index();
    const half = Math.floor(n / 2);
    const out = items.map((post, i) => {
      const o = ((((i - index + half) % n) + n) % n) - half;
      const before = this.previous.get(post.image);
      const jump = before !== undefined && Math.abs(o - before) > half;
      return { post, i, o, abs: Math.abs(o), hidden: Math.abs(o) > SIDE, jump };
    });
    this.previous = new Map(out.map((c) => [c.post.image, c.o]));
    return out;
  });

  protected readonly counts = computed(() => {
    const map = new Map<string, number>();
    for (const p of this.content().items) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  });

  private dragX: number | null = null;
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected pick(id: string): void {
    if (id === this.category() || this.switching()) return;
    this.switching.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.category.set(id);
      this.switching.set(false);
    }, 340);
  }

  protected go(delta: number): void {
    const n = this.n();
    if (!n) return;
    this.index.set((this.index() + delta + n) % n);
  }

  protected onKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') this.go(1);
    else if (event.key === 'ArrowLeft') this.go(-1);
    else return;
    event.preventDefault();
  }

  protected down(event: PointerEvent): void {
    if ((event.target as HTMLElement).closest('.card.is-center button, .card.is-center a')) return;
    this.dragX = event.clientX;
  }

  protected up(event: PointerEvent): void {
    if (this.dragX === null) return;
    const dx = event.clientX - this.dragX;
    this.dragX = null;
    if (Math.abs(dx) > 50) this.go(dx < 0 ? 1 : -1);
  }
}
