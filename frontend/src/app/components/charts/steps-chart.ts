import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ChartItem } from '../../core/types/settings.model';
import { CountUp } from '../count-up/count-up.directive';
import { useDraw } from './chart-draw';

/**
 * Embudo como secuencia de cifras (no barras: 72,000 y 5 no caben en una misma escala honesta).
 * Cada paso cuenta hacia arriba al entrar en pantalla.
 */
@Component({
  selector: 'app-steps-chart',
  imports: [CountUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol class="steps" role="list" [class.is-drawn]="drawn()">
      @for (s of rows(); track s.label; let i = $index; let last = $last) {
        <li class="step" [style.--i]="i" tabindex="0">
          <span class="step__value" [appCountUp]="s.value"></span>
          <span class="step__label">{{ s.label }}</span>
          <span class="step__detail">{{ s.detail }}</span>
        </li>
        @if (!last) {
          <li class="step__arrow" aria-hidden="true" [style.--i]="i">
            <svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 12h13m-5-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </li>
        }
      }
    </ol>
  `,
  styleUrl: './chart.css',
})
export class StepsChart {
  readonly steps = input.required<ChartItem[]>();
  protected readonly drawn = useDraw(() => this.steps());
  protected readonly rows = computed(() => this.steps());
}
