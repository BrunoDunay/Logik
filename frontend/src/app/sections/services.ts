import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Reveal } from '../components/reveal/reveal.directive';
import { SectionHeading } from '../components/section-heading/section-heading';
import { ServicesSettings } from '../core/types/settings.model';
import { BrandWordsPipe } from '../core/utils/brand-words.pipe';

/**
 * Los servicios que ofrece Logik, en lista. Al pasar el cursor la fila se pinta de rosa.
 * Al abrir un servicio, la fila se vuelve una tarjeta blanca que se levanta: el detalle sube
 * y la foto (completa, en su proporción) se revela de abajo hacia arriba.
 */
@Component({
  selector: 'app-services',
  imports: [Reveal, SectionHeading, BrandWordsPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let c = content();
    <section class="services" id="servicios" aria-labelledby="services-title">
      <div class="wrap">
        <app-section-heading kicker="Servicios de Logik" [title]="c.title" [script]="c.script" [intro]="c.intro" headingId="services-title" />
        <ul class="list" role="list" [attr.aria-label]="c.items.length + ' servicios'">
          @for (s of c.items; track s.title; let i = $index) {
            <li class="row" [class.is-open]="open() === i" appReveal [revealDelay]="(i % 4) * 60">
              <button type="button" class="row__head" [attr.aria-expanded]="open() === i" [attr.aria-controls]="'service-' + i" (click)="toggle(i)">
                <span class="row__num">{{ (i + 1).toString().padStart(2, '0') }}</span>
                <span class="row__title" [innerHTML]="s.title | brandWords"></span>
                <span class="row__summary" [innerHTML]="s.summary | brandWords"></span>
                <span class="row__toggle" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="m6.5 9.5 5.5 5.5 5.5-5.5" /></svg>
                </span>
              </button>
              <div class="row__body" [id]="'service-' + i" [attr.inert]="open() === i ? null : ''">
                <div class="row__inner">
                  <p class="row__detail" [innerHTML]="s.detail | brandWords"></p>
                  <figure class="row__figure">
                    <img class="row__photo" [src]="s.image" alt="" loading="lazy" decoding="async" />
                  </figure>
                </div>
              </div>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styleUrl: './services.css',
})
export class Services {
  readonly content = input.required<ServicesSettings>();
  protected readonly open = signal<number | null>(null);

  protected toggle(i: number): void {
    this.open.set(this.open() === i ? null : i);
  }
}
