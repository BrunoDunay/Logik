import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

/** Nombres en español de los campos del contenido; lo que no está aquí se muestra con su nombre técnico. */
const LABELS: Record<string, string> = {
  name: 'Nombre', tagline: 'Lema', phrase: 'Frase', kicker: 'Texto pequeño superior', subtitle: 'Subtítulo',
  ctaLabel: 'Texto del botón', location: 'Ubicación', lead: 'Primera línea', accent: 'Palabra antes de la script',
  script: 'Palabra en letra script', summary: 'Resumen corto', more: 'Texto de "Leer más"', image: 'Imagen',
  imageAlt: 'Descripción de la imagen', stats: 'Cifras', value: 'Valor', prefix: 'Antes del número', suffix: 'Después del número',
  label: 'Etiqueta', detail: 'Detalle', title: 'Título', intro: 'Introducción', cases: 'Casos', id: 'Identificador',
  tab: 'Nombre de la pestaña', client: 'Cliente', headline: 'Titular', chart: 'Gráfica', kind: 'Tipo de gráfica',
  unit: 'Unidad', note: 'Nota / fuente', markerIndex: 'Marca en el punto número', markerLabel: 'Texto de la marca',
  points: 'Puntos (área)', peak: 'Día más alto', steps: 'Pasos (embudo)', items: 'Elementos', kpis: 'Cifras clave',
  categories: 'Filtros', category: 'Categoría', account: 'Cuenta', caption: 'Texto de la publicación', permalink: 'Enlace a Instagram',
  price: 'Precio (vacío = a cotizar)', period: 'Periodo', highlighted: 'Destacado', features: 'Incluye', description: 'Descripción',
  logo: 'Logotipo', photo: 'Foto', color: 'Color de la marca', src: 'Archivo de video', poster: 'Portada del video',
  orientation: 'Orientación', members: 'Integrantes', role: 'Puesto', groupPhoto: 'Foto del equipo', groupCaption: 'Texto de la foto del equipo',
  whatsapp: 'WhatsApp (con lada)', whatsappMessage: 'Mensaje inicial de WhatsApp', phoneDisplay: 'Teléfono como se muestra',
  email: 'Correo', city: 'Ciudad', address: 'Dirección', instagram: 'Instagram (usuario)', facebook: 'Facebook (usuario)',
  tiktok: 'TikTok (usuario)', linkedin: 'LinkedIn (empresa)', invitation: 'Invitación final', isProvisional: 'Pendiente de confirmar',
};

/** Orden en que se muestran los campos (PostgreSQL guarda el JSON con las claves reordenadas). */
const ORDER = [
  'id', 'tab', 'name', 'title', 'lead', 'accent', 'script', 'kicker', 'invitation', 'client', 'headline', 'category', 'account',
  'role', 'tagline', 'phrase', 'subtitle', 'intro', 'summary', 'description', 'detail', 'more', 'caption', 'price', 'period',
  'highlighted', 'features', 'label', 'value', 'prefix', 'suffix', 'peak', 'kind', 'unit', 'markerIndex', 'markerLabel',
  'points', 'steps', 'items', 'kpis', 'chart', 'cases', 'categories', 'members', 'stats', 'image', 'imageAlt', 'photo', 'logo',
  'color', 'src', 'poster', 'orientation', 'groupPhoto', 'groupCaption', 'permalink', 'whatsapp', 'whatsappMessage',
  'phoneDisplay', 'email', 'city', 'address', 'location', 'instagram', 'facebook', 'tiktok', 'linkedin', 'ctaLabel', 'note', 'isProvisional',
];

/** Claves de un objeto en el orden de ORDER; las desconocidas van al final. */
export function orderedKeys(v: object): string[] {
  const rank = (k: string) => (ORDER.includes(k) ? ORDER.indexOf(k) : ORDER.length);
  return Object.keys(v).sort((a, b) => rank(a) - rank(b));
}

const LONG = new Set(['summary', 'more', 'detail', 'description', 'caption', 'intro', 'note', 'subtitle', 'groupCaption']);
const MEDIA = new Set(['image', 'photo', 'logo', 'poster', 'groupPhoto']);

/**
 * Campo del editor de contenido, recursivo: muestra el control adecuado según el tipo del valor
 * y modifica el objeto padre en su lugar (el editor guarda una copia y la envía completa).
 */
@Component({
  selector: 'app-json-field',
  imports: [FormsModule],
  template: `
    @let v = parent()[key()];
    @if (isArray(v)) {
      <fieldset class="group">
        <legend>{{ label() }} <span class="count">{{ v.length }}</span></legend>
        @for (item of v; track $index; let i = $index) {
          <div class="item">
            <div class="item__bar">
              <span class="item__title">{{ itemTitle(item, i) }}</span>
              <button type="button" (click)="move(v, i, -1)" [disabled]="i === 0" aria-label="Subir">↑</button>
              <button type="button" (click)="move(v, i, 1)" [disabled]="i === v.length - 1" aria-label="Bajar">↓</button>
              <button type="button" class="danger" (click)="remove(v, i)" aria-label="Quitar">✕</button>
            </div>
            @if (isObject(item)) {
              @for (k of keys(item); track k) {
                <app-json-field [parent]="item" [key]="k" (changed)="changed.emit()" />
              }
            } @else {
              <app-json-field [parent]="asObject(v)" [key]="'' + i" [labelOverride]="'Elemento ' + (i + 1)" (changed)="changed.emit()" />
            }
          </div>
        }
        <button type="button" class="add" (click)="add(v)">+ Agregar</button>
      </fieldset>
    } @else if (isObject(v)) {
      <fieldset class="group">
        <legend>{{ label() }}</legend>
        @for (k of keys(v); track k) {
          <app-json-field [parent]="v" [key]="k" (changed)="changed.emit()" />
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
        } @else if (isLong(v)) {
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
  readonly changed = output<void>();

  protected label(): string {
    return this.labelOverride() ?? LABELS[this.key()] ?? this.key();
  }

  protected isArray(v: Json): v is Json[] {
    return Array.isArray(v);
  }

  protected isObject(v: Json): v is JsonObject {
    return v !== null && typeof v === 'object' && !Array.isArray(v);
  }

  protected asObject(v: Json[]): JsonObject {
    return v as unknown as JsonObject;
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

  protected itemTitle(item: Json, i: number): string {
    if (this.isObject(item)) {
      const name = item['name'] ?? item['title'] ?? item['label'] ?? item['tab'] ?? item['account'];
      if (typeof name === 'string' && name) return `${i + 1}. ${name}`;
    }
    return `${i + 1}.`;
  }

  protected set(value: Json): void {
    this.parent()[this.key()] = value;
    this.changed.emit();
  }

  protected move(list: Json[], i: number, delta: number): void {
    const j = i + delta;
    if (j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
    this.changed.emit();
  }

  protected remove(list: Json[], i: number): void {
    if (!confirm('¿Quitar este elemento?')) return;
    list.splice(i, 1);
    this.changed.emit();
  }

  /** Agrega un elemento con la misma forma que el primero, pero vacío. */
  protected add(list: Json[]): void {
    const blank = (v: Json): Json => {
      if (Array.isArray(v)) return [];
      if (v !== null && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)]));
      if (typeof v === 'number') return 0;
      if (typeof v === 'boolean') return false;
      return '';
    };
    list.push(list.length ? blank(list[0]) : '');
    this.changed.emit();
  }
}
