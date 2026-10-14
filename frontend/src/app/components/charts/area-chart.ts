import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { ChartPoint } from '../../core/types/settings.model';
import { formatNumber, formatShort, niceMax, useDraw } from './chart-draw';

let nextId = 0;
const W = 720;
const H = 330;
const PAD = { top: 24, right: 18, bottom: 40, left: 52 };

/**
 * Área de una sola serie (rosa sobre negro) con línea de 2px, marca vertical opcional ("Llega Logik"),
 * y una mira con tooltip al pasar el cursor. Se dibuja de izquierda a derecha al entrar en pantalla.
 */
@Component({
  selector: 'app-area-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="frame" [class.is-drawn]="drawn()">
      <svg [attr.viewBox]="'0 0 ' + w + ' ' + h" role="img" [attr.aria-label]="ariaLabel()" (pointermove)="hover($event)" (pointerleave)="active.set(null)">
        <defs>
          <clipPath [attr.id]="clipId"><rect class="reveal-rect" [attr.x]="pad.left" y="0" [attr.width]="innerW" [attr.height]="h" /></clipPath>
        </defs>
        @for (t of ticks(); track t.value) {
          <line class="grid" [attr.x1]="pad.left" [attr.x2]="w - pad.right" [attr.y1]="t.y" [attr.y2]="t.y" />
          <text class="axis" [attr.x]="pad.left - 10" [attr.y]="t.y + 4" text-anchor="end">{{ t.label }}</text>
        }
        @for (l of xLabels(); track l.i) {
          <text class="axis" [attr.x]="l.x" [attr.y]="h - 14" text-anchor="middle">{{ l.label }}</text>
        }
        <g [attr.clip-path]="'url(#' + clipId + ')'">
          <path class="area" [attr.d]="areaPath()" />
          <path class="line" [attr.d]="linePath()" />
        </g>
        @if (marker(); as m) {
          <g class="marker">
            <line [attr.x1]="m.x" [attr.x2]="m.x" [attr.y1]="pad.top" [attr.y2]="h - pad.bottom" />
            <rect [attr.x]="m.x - 46" [attr.y]="pad.top - 2" width="92" height="24" rx="12" />
            <text [attr.x]="m.x" [attr.y]="pad.top + 14" text-anchor="middle">{{ m.label }}</text>
          </g>
        }
        @if (activePoint(); as p) {
          <line class="cross" [attr.x1]="p.x" [attr.x2]="p.x" [attr.y1]="pad.top" [attr.y2]="h - pad.bottom" />
          <circle class="dot" [attr.cx]="p.x" [attr.cy]="p.y" r="6" />
        }
        <rect class="hit" [attr.x]="pad.left" [attr.y]="0" [attr.width]="innerW" [attr.height]="h" />
      </svg>
      @if (activePoint(); as p) {
        <div class="tip" [style.left.%]="(p.x / w) * 100" [style.top.%]="(p.y / h) * 100">
          <strong>{{ p.label }}</strong>
          <span>{{ fmt(p.value) }} {{ unit() }}</span>
          @if (p.peak) {
            <span class="tip__soft">Día más alto: {{ fmt(p.peak) }}</span>
          }
        </div>
      }
    </div>
  `,
  styleUrl: './chart.css',
})
export class AreaChart {
  readonly points = input.required<ChartPoint[]>();
  readonly unit = input('');
  readonly markerIndex = input<number | null>(null);
  readonly markerLabel = input<string | null>(null);
  readonly ariaLabel = input('Gráfica de área');

  protected readonly w = W;
  protected readonly h = H;
  protected readonly pad = PAD;
  protected readonly innerW = W - PAD.left - PAD.right;
  protected readonly clipId = `area-clip-${nextId++}`;
  protected readonly fmt = formatNumber;
  protected readonly drawn = useDraw(() => this.points());
  protected readonly active = signal<number | null>(null);

  private readonly max = computed(() => niceMax(Math.max(...this.points().map((p) => p.value), 1)));
  private readonly xs = computed(() => {
    const n = this.points().length;
    return this.points().map((_, i) => PAD.left + (n <= 1 ? 0 : (i / (n - 1)) * this.innerW));
  });
  private readonly y = (v: number) => PAD.top + (1 - v / this.max()) * (H - PAD.top - PAD.bottom);

  protected readonly ticks = computed(() =>
    [0, 0.5, 1].map((f) => ({ value: f * this.max(), y: this.y(f * this.max()), label: formatShort(f * this.max()) })),
  );
  protected readonly xLabels = computed(() => {
    const step = Math.max(1, Math.ceil(this.points().length / 6));
    return this.points()
      .map((p, i) => ({ i, x: this.xs()[i], label: p.label }))
      .filter((_, i) => i % step === 0);
  });
  protected readonly linePath = computed(() => this.points().map((p, i) => `${i ? 'L' : 'M'}${this.xs()[i].toFixed(1)} ${this.y(p.value).toFixed(1)}`).join(''));
  protected readonly areaPath = computed(() => {
    const xs = this.xs();
    if (!xs.length) return '';
    const base = this.y(0);
    return `${this.linePath()}L${xs[xs.length - 1].toFixed(1)} ${base}L${xs[0].toFixed(1)} ${base}Z`;
  });
  protected readonly marker = computed(() => {
    const i = this.markerIndex();
    if (i === null || !this.points()[i]) return null;
    return { x: this.xs()[i], label: this.markerLabel() ?? '' };
  });
  protected readonly activePoint = computed(() => {
    const i = this.active();
    if (i === null) return null;
    const p = this.points()[i];
    return p ? { ...p, x: this.xs()[i], y: this.y(p.value) } : null;
  });

  protected hover(event: PointerEvent): void {
    const svg = event.currentTarget as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * W;
    const xs = this.xs();
    let best = 0;
    for (let i = 1; i < xs.length; i++) if (Math.abs(xs[i] - x) < Math.abs(xs[best] - x)) best = i;
    this.active.set(best);
  }
}
