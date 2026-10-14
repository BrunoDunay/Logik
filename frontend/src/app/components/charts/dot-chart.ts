import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, signal } from '@angular/core';
import { ChartItem } from '../../core/types/settings.model';
import { useDraw } from './chart-draw';

const W = 720;
const H = 220;
const PAD = { left: 24, right: 24, axis: 176 };
const R = 11;

type Tip = ChartItem & { cx: number; cy: number };

/**
 * Gráfica de puntos en una escala de 0 a 100 %: cada punto es una notificación real.
 * Los valores repetidos se apilan hacia arriba. Los puntos caen en cascada al entrar en pantalla.
 */
@Component({
  selector: 'app-dot-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="frame" [class.is-drawn]="drawn()">
      <svg [attr.viewBox]="'0 0 ' + w + ' ' + h" role="img" [attr.aria-label]="ariaLabel()">
        @for (t of ticks; track t) {
          <line class="grid" [attr.x1]="x(t)" [attr.x2]="x(t)" y1="16" [attr.y2]="pad.axis" />
          <text class="axis" [attr.x]="x(t)" [attr.y]="pad.axis + 24" text-anchor="middle">{{ t }} %</text>
        }
        <line class="baseline" [attr.x1]="pad.left" [attr.x2]="w - pad.right" [attr.y1]="pad.axis" [attr.y2]="pad.axis" />
        @for (d of dots(); track $index; let i = $index) {
          <circle
            class="dot-mark"
            [class.is-active]="active() === i"
            [attr.cx]="d.cx"
            [attr.cy]="d.cy"
            [attr.r]="r"
            [style.--i]="i"
            tabindex="0"
            (pointerenter)="active.set(i)"
            (pointerleave)="active.set(null)"
            (focus)="active.set(i)"
            (blur)="active.set(null)"
          />
        }
      </svg>
      @if (tipAt(); as d) {
        <div class="tip" [class.is-on]="!!activeDot()" [style.left.%]="(d.cx / w) * 100" [style.top.%]="(d.cy / h) * 100">
          <strong>{{ d.value }} % más bajo</strong>
          <span class="tip__soft">{{ d.label }} · {{ d.detail }}</span>
        </div>
      }
    </div>
  `,
  styleUrl: './chart.css',
})
export class DotChart {
  readonly items = input.required<ChartItem[]>();
  readonly ariaLabel = input('Gráfica de puntos');
  protected readonly w = W;
  protected readonly h = H;
  protected readonly pad = PAD;
  protected readonly r = R;
  protected readonly ticks = [0, 25, 50, 75, 100];
  protected readonly drawn = useDraw(() => this.items());
  protected readonly active = signal<number | null>(null);

  protected x(v: number): number {
    return PAD.left + (v / 100) * (W - PAD.left - PAD.right);
  }

  /** Apila los puntos que caerían encima de otro (a menos de un diámetro de distancia). */
  protected readonly dots = computed(() => {
    const placed: { cx: number; cy: number }[] = [];
    return this.items().map((item) => {
      const cx = this.x(item.value);
      let level = 0;
      while (placed.some((p) => Math.abs(p.cx - cx) < R * 2 + 2 && p.cy === PAD.axis - R - 4 - level * (R * 2 + 4))) level++;
      const cy = PAD.axis - R - 4 - level * (R * 2 + 4);
      placed.push({ cx, cy });
      return { ...item, cx, cy };
    });
  });
  protected readonly activeDot = computed(() => {
    const i = this.active();
    return i === null ? null : this.dots()[i];
  });

  /** El tooltip recuerda el último punto para desvanecerse en su lugar en vez de desaparecer de golpe. */
  protected readonly tipAt = linkedSignal<Tip | null, Tip | null>({
    source: this.activeDot,
    computation: (now, previous) => now ?? previous?.value ?? null,
  });
}
