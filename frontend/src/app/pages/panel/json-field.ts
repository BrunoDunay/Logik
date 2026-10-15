import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDragPlaceholder, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, forwardRef, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Collection } from './collection';
import { Json, JsonObject, LONG, MEDIA, TEMPLATES, isObject, labelOf, orderedKeys } from './panel-fields';

export { orderedKeys } from './panel-fields';

/**
 * Campo del editor de contenido, recursivo: muestra el control adecuado según el tipo del valor
 * y modifica el objeto padre en su lugar (el panel guarda una copia y la envía completa).
 * - Lista de objetos → tarjetas o tabla (`app-collection`).
 * - Lista de textos → renglones que se reordenan arrastrando.
 * - Objeto → grupo con sus campos.
 */
@Component({
  selector: 'app-json-field',
  imports: [FormsModule, CdkDropList, CdkDrag, CdkDragHandle, CdkDragPlaceholder, forwardRef(() => Collection)],
  host: { '[class.is-compact]': 'compact()' },
  template: `
    @let v = parent()[key()];
    @if (isArray(v)) {
      @if (hasObjects(v)) {
        <app-collection [list]="v" [label]="label()" [depth]="depth()" [template]="template()" (changed)="changed.emit()" />
      } @else {
        <fieldset class="group">
          <legend>{{ label() }} <span class="count">{{ v.length }}</span></legend>
          <ol class="strings" cdkDropList (cdkDropListDropped)="dropString(v, $event)" role="list">
            @for (item of v; track $index; let i = $index) {
              <li class="string" cdkDrag cdkDragPreviewContainer="parent">
                <span class="string__handle" cdkDragHandle aria-hidden="true" title="Arrastrar">
                  <svg viewBox="0 0 24 24"><circle cx="9" cy="7" r="1.5" /><circle cx="15" cy="7" r="1.5" /><circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" /><circle cx="9" cy="17" r="1.5" /><circle cx="15" cy="17" r="1.5" /></svg>
                </span>
                <input [attr.aria-label]="label() + ' ' + (i + 1)" [ngModel]="item ?? ''" (ngModelChange)="setAt(v, i, $event)" />
                <button type="button" class="icon-btn" (click)="moveString(v, i, -1)" [disabled]="i === 0" aria-label="Subir">
                  <svg viewBox="0 0 24 24"><path d="m6 15 6-6 6 6" /></svg>
                </button>
                <button type="button" class="icon-btn is-danger" (click)="removeString(v, i)" aria-label="Quitar">
                  <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" /></svg>
                </button>
                <div class="string__placeholder" *cdkDragPlaceholder></div>
              </li>
            }
          </ol>
          <button type="button" class="add" (click)="addString(v)">+ Agregar</button>
        </fieldset>
      }
    } @else if (isObj(v)) {
      <fieldset class="group">
        <legend>{{ label() }}</legend>
        @for (k of keys(v); track k) {
          <app-json-field [parent]="v" [key]="k" [depth]="depth()" (changed)="changed.emit()" />
        }
      </fieldset>
    } @else if (typeof v === 'boolean') {
      <label class="switch">
        <input type="checkbox" [ngModel]="v" (ngModelChange)="set($event)" />
        <span class="switch__track" aria-hidden="true"></span>
        {{ label() }}
      </label>
    } @else if (typeof v === 'number' || numberish()) {
      <label class="field">
        <span>{{ label() }}</span>
        <input type="number" step="any" [ngModel]="v" (ngModelChange)="set($event === '' || $event === null ? null : +$event)" />
      </label>
    } @else if (key() === 'color') {
      <label class="field">
        <span>{{ label() }}</span>
        <span class="color"><input type="color" [ngModel]="v" (ngModelChange)="set($event)" /><input [ngModel]="v" (ngModelChange)="set($event)" /></span>
      </label>
    } @else {
      <label class="field">
        <span>{{ label() }}</span>
        @if (isMedia()) {
          <span class="media">
            @if (v) {
              <img [src]="v" alt="" />
            }
            <input [ngModel]="v ?? ''" (ngModelChange)="set($event || null)" placeholder="/media/… o https://…" />
          </span>
        } @else if (isLong(v) && !compact()) {
          <textarea rows="4" [ngModel]="v ?? ''" (ngModelChange)="set($event)"></textarea>
        } @else {
          <input [ngModel]="v ?? ''" (ngModelChange)="set($event)" />
        }
      </label>
    }
  `,
  styleUrl: './json-field.css',
})
export class JsonField {
  readonly parent = input.required<JsonObject>();
  readonly key = input.required<string>();
  readonly labelOverride = input<string | null>(null);
  /** Profundidad de paneles laterales en la que vive este campo. */
  readonly depth = input(0);
  /** Dentro de una fila de tabla: etiqueta pequeña y sin áreas de texto grandes. */
  readonly compact = input(false);
  readonly changed = output<void>();

  protected label(): string {
    return this.labelOverride() ?? labelOf(this.key());
  }

  protected isArray(v: Json): v is Json[] {
    return Array.isArray(v);
  }

  protected isObj(v: Json): v is JsonObject {
    return isObject(v);
  }

  /** Lista de objetos: si está vacía, se reconoce por su nombre (TEMPLATES conoce su forma). */
  protected hasObjects(v: Json[]): boolean {
    return v.some(isObject) || (!v.length && this.key() in TEMPLATES);
  }

  protected template(): JsonObject | null {
    return TEMPLATES[this.key()] ?? null;
  }

  protected keys(v: JsonObject): string[] {
    return orderedKeys(v);
  }

  protected isMedia(): boolean {
    return MEDIA.has(this.key());
  }

  protected isLong(v: Json): boolean {
    return LONG.has(this.key()) || (typeof v === 'string' && v.length > 90);
  }

  /** Campos numéricos que pueden estar vacíos (null), como "Marca en el punto número". */
  protected numberish(): boolean {
    return ['markerIndex', 'peak', 'value'].includes(this.key());
  }

  protected set(value: Json): void {
    this.parent()[this.key()] = value;
    this.changed.emit();
  }

  protected setAt(list: Json[], i: number, value: string): void {
    list[i] = value;
    this.changed.emit();
  }

  protected dropString(list: Json[], event: CdkDragDrop<unknown>): void {
    if (event.previousIndex === event.currentIndex) return;
    moveItemInArray(list, event.previousIndex, event.currentIndex);
    this.changed.emit();
  }

  protected moveString(list: Json[], i: number, delta: number): void {
    const j = i + delta;
    if (j < 0 || j >= list.length) return;
    moveItemInArray(list, i, j);
    this.changed.emit();
  }

  protected removeString(list: Json[], i: number): void {
    list.splice(i, 1);
    this.changed.emit();
  }

  protected addString(list: Json[]): void {
    list.push('');
    this.changed.emit();
  }
}
