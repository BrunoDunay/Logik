import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { ChartItem } from '../../core/types/settings.model';
import { formatNumber, useDraw } from './chart-draw';

/**
 * Barras horizontales de una sola serie, con el valor escrito al final de cada barra.
 * Crecen desde la base en cascada; al pasar el cursor la barra se ilumina y muestra su detalle.
 */
@Component({
  selector: 'app-bar-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="bars" role="list" [class.is-drawn]="drawn()" (pointerleave)="active.set(null)">
      @for (item of rows(); track item.label; let i = $index) {
        <li class="bar" [class.is-active]="active() === i" [class.is-dim]="active() !== null && active() !== i" (pointerenter)="active.set(i)" (focusin)="active.set(i)" tabindex="0">
          <span class="bar__label">{{ item.label }}</span>
          <span class="bar__track">
            <span class="bar__fill" [style.--w]="item.share" [style.--i]="i"></span>
          </span>
          <span class="bar__value">{{ prefix() }}{{ fmt(item.value) }}</span>
          <span class="bar__detail">{{ item.detail }}</span>
        </li>
      }
    </ul>
  `,
  styleUrl: './chart.css',
})
export class BarChart {
  readonly items = input.required<ChartItem[]>();
  readonly prefix = input('');
  protected readonly fmt = formatNumber;
  protected readonly drawn = useDraw(() => this.items());
  protected readonly active = signal<number | null>(null);
  protected readonly rows = computed(() => {
    const max = Math.max(...this.items().map((i) => i.value), 1);
    return this.items().map((i) => ({ ...i, share: i.value / max }));
  });
}
