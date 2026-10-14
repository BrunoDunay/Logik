import { ChangeDetectionStrategy, Component, computed, effect, input, linkedSignal } from '@angular/core';
import { Btn } from '../buttons/btn';
import { Icon } from '../icon/icon';
import { Estimator } from '../../core/types/settings.model';
import { clampBudget, estimateMessages, formatInt, formatMoney } from '../../core/utils/estimate';
import { whatsappLink } from '../../core/utils/links';

/** Presupuestos de referencia que se leen aunque el deslizador no funcione (sin JavaScript). */
const REFERENCE_BUDGETS = [2000, 5000, 10000];

/**
 * La calculadora de mensajes: el visitante mueve su presupuesto mensual de anuncios y ve cuántas
 * conversaciones de WhatsApp le darían, con el costo por conversación de campañas reales de Logik.
 */
@Component({
  selector: 'app-estimator',
  imports: [Btn, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="question">
      <h3 class="title" [id]="titleId">{{ config().title }}</h3>
      <label class="budget" [for]="inputId">
        <output class="budget-value" [for]="inputId">{{ money(budget()) }}</output>
        <span class="budget-label">al mes en anuncios, tu presupuesto</span>
      </label>
      <input
        class="range"
        type="range"
        [id]="inputId"
        [min]="config().minBudget"
        [max]="config().maxBudget"
        [step]="config().step"
        [value]="budget()"
        [style.--fill]="fill()"
        [attr.aria-describedby]="resultId"
        [attr.aria-valuetext]="money(budget()) + ' al mes'"
        (input)="onInput($event)"
      />
    </div>

    <div class="answer">
      <p class="result" [id]="resultId" aria-live="polite">
        <span class="result-range">{{ int(estimate().low) }}–{{ int(estimate().high) }}</span>
        <span class="result-unit">conversaciones de WhatsApp al mes</span>
      </p>
      <p class="note">{{ config().note }}</p>
      @if (link(); as href) {
        <a appBtn variant="ink" [href]="href" target="_blank" rel="noopener">
          {{ config().ctaLabel }} <app-icon name="arrow" [size]="20" />
        </a>
      }
      <p class="reference">
        Como referencia:
        @for (row of references(); track row.budget; let last = $last) {
          {{ money(row.budget) }} → {{ int(row.low) }} a {{ int(row.high) }}{{ last ? '.' : ' · ' }}
        }
      </p>
    </div>
  `,
  styleUrl: './estimator.css',
})
export class EstimatorCalc {
  readonly config = input.required<Estimator>();
  /** Teléfono y mensaje base para el botón de WhatsApp. */
  readonly whatsapp = input<string | null>(null);

  private static nextId = 0;
  private readonly uid = EstimatorCalc.nextId++;
  protected readonly inputId = `estimator-budget-${this.uid}`;
  protected readonly titleId = `estimator-title-${this.uid}`;
  protected readonly resultId = `estimator-result-${this.uid}`;

  /** Se reinicia al presupuesto inicial si la agencia cambia la configuración desde el panel. */
  protected readonly budget = linkedSignal(() => this.config().defaultBudget);
  protected readonly estimate = computed(() => estimateMessages(this.budget(), this.config()));
  protected readonly fill = computed(() => {
    const { minBudget, maxBudget } = this.config();
    return `${((this.budget() - minBudget) / (maxBudget - minBudget)) * 100}%`;
  });
  protected readonly references = computed(() =>
    REFERENCE_BUDGETS.map((budget) => ({ budget, ...estimateMessages(budget, this.config()) })),
  );
  protected readonly link = computed(() => {
    const { low, high } = this.estimate();
    return whatsappLink(
      this.whatsapp(),
      `Hola Logik, quiero anunciarme con ${this.money(this.budget())} al mes. Vi que podrían ser entre ${this.int(low)} y ${this.int(high)} conversaciones. ¿Me ayudan?`,
    );
  });

  protected readonly money = formatMoney;
  protected readonly int = formatInt;

  constructor() {
    // Un presupuesto inicial mal configurado nunca deja el deslizador fuera de rango.
    effect(() => {
      const fixed = clampBudget(this.budget(), this.config());
      if (fixed !== this.budget()) this.budget.set(fixed);
    });
  }

  protected onInput(event: Event): void {
    this.budget.set(clampBudget(Number((event.target as HTMLInputElement).value), this.config()));
  }
}
