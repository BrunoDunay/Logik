import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../components/icon/icon';
import { Reveal } from '../components/reveal/reveal.directive';
import { SectionHeading } from '../components/section-heading/section-heading';
import { Package, PackagesSettings } from '../core/types/settings.model';
import { whatsappLink } from '../core/utils/links';

/**
 * Paquetes en tarjetas blancas sobre negro; el recomendado va en rosa.
 * Al pasar el cursor la tarjeta se inclina en 3D hacia el mouse y las palomitas se dibujan.
 */
@Component({
  selector: 'app-packages',
  imports: [Icon, Reveal, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let c = content();
    <section class="packages" id="paquetes" aria-labelledby="packages-title">
      <div class="wrap">
        <app-section-heading [title]="c.title" [script]="c.script" [intro]="c.intro" align="center" tone="light" headingId="packages-title" />
        <ul class="cards" role="list">
          @for (p of c.items; track p.name; let i = $index) {
            <li class="cell" appReveal [revealDelay]="i * 90">
              <article class="card" [class.is-featured]="p.highlighted" (pointermove)="tilt($event)" (pointerleave)="reset($event)">
              @if (p.highlighted) {
                <span class="card__badge">{{ p.tagline }}</span>
              }
              <h3 class="card__name">{{ p.name }}</h3>
              @if (!p.highlighted) {
                <p class="card__tagline">{{ p.tagline }}</p>
              }
              <p class="card__price">
                @if (p.price) {
                  <span class="card__from">desde</span>
                  <strong>{{ p.price }}</strong>
                  <span class="card__period">{{ p.period }}</span>
                } @else {
                  <strong class="card__quote">A cotizar</strong>
                  <span class="card__period">{{ p.period }}</span>
                }
              </p>
              <ul class="card__features" role="list">
                @for (f of p.features; track f; let j = $index) {
                  <li [style.--j]="j">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" pathLength="1" /></svg>
                    {{ f }}
                  </li>
                }
              </ul>
              <a class="card__cta" [href]="link(p)" target="_blank" rel="noopener">
                Quiero este paquete <app-icon name="arrow" [size]="18" />
              </a>
              </article>
            </li>
          }
        </ul>
        @if (c.note) {
          <p class="note">{{ c.note }}</p>
        }
      </div>
    </section>
  `,
  styleUrl: './packages.css',
})
export class Packages {
  readonly content = input.required<PackagesSettings>();
  readonly whatsapp = input.required<string>();

  protected link(p: Package): string {
    return whatsappLink(this.whatsapp(), `Hola Logik, me interesa el paquete ${p.name}.`) ?? '#contacto';
  }

  protected tilt(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') return;
    const el = event.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width - 0.5;
    const y = (event.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`);
  }

  protected reset(event: PointerEvent): void {
    const el = event.currentTarget as HTMLElement;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }
}
