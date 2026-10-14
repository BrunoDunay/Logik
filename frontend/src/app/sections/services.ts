import { ChangeDetectionStrategy, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { Reveal } from '../components/reveal/reveal.directive';
import { SectionHeading } from '../components/section-heading/section-heading';
import { ServicesSettings } from '../core/types/settings.model';

/**
 * Lista de servicios: cada fila se pinta de rosa al pasar el cursor y una foto del trabajo sigue al mouse.
 * Un clic despliega el detalle (en celular, la foto aparece dentro del detalle).
 */
@Component({
  selector: 'app-services',
  imports: [Reveal, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let c = content();
    <section class="services" id="servicios" aria-labelledby="services-title" (pointermove)="follow($event)" (pointerleave)="hovered.set(null)">
      <div class="wrap">
        <app-section-heading [title]="c.title" [script]="c.script" [intro]="c.intro" headingId="services-title" />
        <ul class="list" role="list">
          @for (s of c.items; track s.title; let i = $index) {
            <li class="row" [class.is-open]="open() === i" [class.is-hovered]="hovered() === i" (pointerenter)="hovered.set(i)" appReveal [revealDelay]="(i % 4) * 60">
              <button type="button" class="row__head" [attr.aria-expanded]="open() === i" [attr.aria-controls]="'service-' + i" (click)="open.set(open() === i ? null : i)">
                <span class="row__num">{{ (i + 1).toString().padStart(2, '0') }}</span>
                <span class="row__title">{{ s.title }}</span>
                <span class="row__summary">{{ s.summary }}</span>
                <span class="row__plus" aria-hidden="true"></span>
              </button>
              <div class="row__body" [id]="'service-' + i">
                <div class="row__inner">
                  <img class="row__photo" [src]="s.image" alt="" width="640" height="480" loading="lazy" decoding="async" />
                  <p>{{ s.detail }}</p>
                </div>
              </div>
            </li>
          }
        </ul>
      </div>
      <div class="cursor-photo" #photo [class.is-on]="hovered() !== null && open() !== hovered()" aria-hidden="true">
        @for (s of c.items; track s.title; let i = $index) {
          <img [src]="s.image" alt="" [class.is-current]="hovered() === i" width="640" height="480" loading="lazy" decoding="async" />
        }
      </div>
    </section>
  `,
  styleUrl: './services.css',
})
export class Services {
  readonly content = input.required<ServicesSettings>();
  protected readonly open = signal<number | null>(null);
  protected readonly hovered = signal<number | null>(null);
  private readonly photo = viewChild.required<ElementRef<HTMLElement>>('photo');

  /** La foto sigue al cursor con transform (sin recalcular el diseño de la página). */
  protected follow(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') return;
    const el = this.photo().nativeElement;
    const host = el.parentElement!.getBoundingClientRect();
    el.style.transform = `translate(${event.clientX - host.left}px, ${event.clientY - host.top}px) translate(-50%, -50%)`;
  }
}
