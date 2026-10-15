import { A11yModule } from '@angular/cdk/a11y';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDragPlaceholder, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { Component, computed, forwardRef, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonField } from './json-field';
import {
  Json,
  JsonObject,
  blankLike,
  isCompactList,
  isObject,
  itemSubtitle,
  itemThumb,
  itemTitle,
  orderedKeys,
} from './panel-fields';

interface Entry {
  item: Json;
  i: number;
  title: string;
  subtitle: string;
  thumb: string | null;
}

/**
 * Lista de elementos del contenido (publicaciones, marcas, servicios…), pensada para listas largas:
 * - Tarjetas en grid con miniatura, título y subtítulo; un clic abre su edición en un panel lateral.
 * - Si los elementos son pequeños (pocos campos, sin imágenes), se editan directo en una tabla.
 * - Se reordena arrastrando la tarjeta (o con los botones subir/bajar, que también sirven con teclado).
 * - Con más de 6 elementos aparece una búsqueda; mientras se busca, el arrastre se pausa.
 * El arreglo se modifica en su lugar: el panel guarda la copia completa de la sección.
 */
@Component({
  selector: 'app-collection',
  imports: [A11yModule, CdkDropList, CdkDrag, CdkDragHandle, CdkDragPlaceholder, FormsModule, forwardRef(() => JsonField)],
  templateUrl: './collection.html',
  styleUrl: './collection.css',
})
export class Collection {
  readonly list = input.required<Json[]>();
  readonly label = input('Elementos');
  /** Profundidad del panel lateral: uno dentro de otro se apila encima. */
  readonly depth = input(0);
  /** Forma de un elemento nuevo cuando la lista está vacía. */
  readonly template = input<JsonObject | null>(null);
  readonly changed = output<void>();

  private readonly document = inject(DOCUMENT);

  /** Cambia con cada modificación: el arreglo se muta en su lugar y las señales no lo ven solas. */
  private readonly version = signal(0);
  protected readonly query = signal('');
  protected readonly openIndex = signal<number | null>(null);
  protected readonly closing = signal(false);
  private lastFocus: HTMLElement | null = null;

  protected readonly compact = computed(() => {
    this.version();
    const list = this.list();
    const template = this.template();
    // Una lista vacía decide su vista por la forma de la plantilla.
    return isCompactList(list.length || !template ? list : [template]);
  });

  protected readonly entries = computed<Entry[]>(() => {
    this.version();
    const q = this.query().trim().toLowerCase();
    return this.list()
      .map((item, i) => ({ item, i, title: itemTitle(item, i), subtitle: itemSubtitle(item), thumb: itemThumb(item) }))
      .filter((e) => !q || `${e.title} ${e.subtitle}`.toLowerCase().includes(q));
  });

  /** Si ningún elemento tiene imagen, las tarjetas son de solo texto (más compactas). */
  protected readonly textual = computed(() => this.entries().every((e) => !e.thumb));

  protected readonly opened = computed(() => {
    this.version();
    const i = this.openIndex();
    if (i === null) return null;
    const item = this.list()[i];
    return item === undefined ? null : { item, i, title: itemTitle(item, i), thumb: itemThumb(item) };
  });

  /** Columnas de la tabla (modo compacto): las claves del primer elemento. */
  protected readonly columns = computed(() => {
    this.version();
    const first = this.list().find(isObject);
    return first ? orderedKeys(first) : [];
  });

  protected asObject(v: Json): JsonObject {
    return v as JsonObject;
  }

  protected keysOf(v: Json): string[] {
    return isObject(v) ? orderedKeys(v) : [];
  }

  protected touch(): void {
    this.version.update((n) => n + 1);
    this.changed.emit();
  }

  protected drop(event: CdkDragDrop<Json[]>): void {
    if (event.previousIndex === event.currentIndex) return;
    moveItemInArray(this.list(), event.previousIndex, event.currentIndex);
    this.touch();
  }

  protected move(i: number, delta: number): void {
    const list = this.list();
    const j = i + delta;
    if (j < 0 || j >= list.length) return;
    moveItemInArray(list, i, j);
    if (this.openIndex() === i) this.openIndex.set(j);
    this.touch();
  }

  protected duplicate(i: number): void {
    const list = this.list();
    list.splice(i + 1, 0, structuredClone(list[i]));
    this.touch();
    if (this.openIndex() !== null) this.openIndex.set(i + 1);
  }

  protected remove(i: number): void {
    if (!confirm(`¿Quitar "${itemTitle(this.list()[i], i)}"?`)) return;
    this.list().splice(i, 1);
    if (this.openIndex() !== null) this.close();
    this.touch();
  }

  /** Agrega un elemento con la misma forma que el primero, pero vacío, y lo abre para editarlo. */
  protected add(): void {
    const list = this.list();
    list.push(list.length ? blankLike(list[0]) : structuredClone(this.template() ?? {}));
    this.query.set('');
    this.touch();
    if (!this.compact()) this.open(list.length - 1);
  }

  protected open(i: number): void {
    this.lastFocus = this.document.activeElement as HTMLElement | null;
    this.closing.set(false);
    this.openIndex.set(i);
    this.document.body.style.overflow = 'hidden';
    // El foco va al panel (no al primer botón) para que el teclado empiece ahí.
    setTimeout(() => this.document.querySelector<HTMLElement>(`.drawer[data-depth="${this.depth()}"] .drawer__sheet`)?.focus());
  }

  protected step(delta: number): void {
    const i = this.openIndex();
    if (i === null) return;
    const n = this.list().length;
    this.openIndex.set((i + delta + n) % n);
  }

  /** Cierra con la animación de salida y devuelve el foco a la tarjeta que lo abrió. */
  protected close(): void {
    if (this.openIndex() === null || this.closing()) return;
    this.closing.set(true);
    setTimeout(() => {
      this.openIndex.set(null);
      this.closing.set(false);
      if (this.depth() === 0) this.document.body.style.overflow = '';
      this.lastFocus?.focus?.();
    }, 280);
  }

  protected onKey(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.stopPropagation();
      this.close();
    }
  }

}
