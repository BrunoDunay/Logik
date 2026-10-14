import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, signal } from '@angular/core';
import { Reveal } from '../../components/reveal/reveal.directive';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { PostsSettings } from '../../core/types/settings.model';
import { IgPost } from './ig-post';

/** Cuántas tarjetas se ven a cada lado de la central. */
const SIDE = 3;

/**
 * Carrusel tipo "coverflow" (referencia: "Carrusel para publicaciones"): filtros por giro arriba,
 * la publicación central se ve como en Instagram y las demás se apilan en perspectiva a los lados.
 * Se mueve con las flechas, el teclado, arrastrando o tocando una tarjeta lateral.
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

  protected readonly category = linkedSignal(() => this.content().categories[0]?.id ?? '');
  protected readonly filtered = computed(() => this.content().items.filter((p) => p.category === this.category()));
  /** La publicación central; vuelve a la primera al cambiar de filtro. */
  protected readonly index = linkedSignal({ source: () => this.filtered(), computation: () => 0 });
  protected readonly current = computed(() => this.filtered()[this.index()] ?? null);
  protected readonly categoryIndex = computed(() => Math.max(0, this.content().categories.findIndex((c) => c.id === this.category())));

  /** Tarjetas laterales visibles con su desplazamiento respecto a la central (-3 … 3, sin el 0). */
  protected readonly sides = computed(() => {
    const items = this.filtered();
    const out: { post: (typeof items)[number]; offset: number; i: number }[] = [];
    for (let offset = -SIDE; offset <= SIDE; offset++) {
      if (offset === 0) continue;
      const i = this.index() + offset;
      if (i >= 0 && i < items.length) out.push({ post: items[i], offset, i });
    }
    return out;
  });

  protected readonly counts = computed(() => {
    const map = new Map<string, number>();
    for (const p of this.content().items) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  });

  private dragX: number | null = null;
  protected readonly dragging = signal(false);

  protected go(delta: number): void {
    const n = this.filtered().length;
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
    if ((event.target as HTMLElement).closest('button, a')) return;
    this.dragX = event.clientX;
  }

  protected up(event: PointerEvent): void {
    if (this.dragX === null) return;
    const dx = event.clientX - this.dragX;
    this.dragX = null;
    if (Math.abs(dx) > 50) this.go(dx < 0 ? 1 : -1);
  }
}
