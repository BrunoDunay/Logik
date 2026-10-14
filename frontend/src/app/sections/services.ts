import { ChangeDetectionStrategy, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { Reveal } from '../components/reveal/reveal.directive';
import { SectionHeading } from '../components/section-heading/section-heading';
import { ServicesSettings } from '../core/types/settings.model';
import { BrandWordsPipe } from '../core/utils/brand-words.pipe';

/**
 * Los servicios que ofrece Logik, en lista. Al pasar el cursor la fila se pinta de rosa y una foto
 * pequeña acompaña al mouse (a un lado, sin taparlo). Al abrir un servicio, la fila se vuelve una
 * tarjeta blanca que se levanta, con el título en rosa, el detalle y su foto.
 */
@Component({
  selector: 'app-services',
  imports: [Reveal, SectionHeading, BrandWordsPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let c = content();
    <section class="services" id="servicios" aria-labelledby="services-title" (pointermove)="follow($event)" (pointerleave)="hovered.set(null)">
      <div class="wrap">
        <app-section-heading kicker="Servicios de Logik" [title]="c.title" [script]="c.script" [intro]="c.intro" headingId="services-title" />
        <ul class="list" role="list" [attr.aria-label]="c.items.length + ' servicios'">
          @for (s of c.items; track s.title; let i = $index) {
            <li class="row" [class.is-open]="open() === i" [class.is-hovered]="hovered() === i" (pointerenter)="hovered.set(i)" appReveal [revealDelay]="(i % 4) * 60">
              <button type="button" class="row__head" [attr.aria-expanded]="open() === i" [attr.aria-controls]="'service-' + i" (click)="toggle(i)">
                <span class="row__num">{{ (i + 1).toString().padStart(2, '0') }}</span>
                <span class="row__title" [innerHTML]="s.title | brandWords"></span>
                <span class="row__summary" [innerHTML]="s.summary | brandWords"></span>
                <span class="row__plus" aria-hidden="true"></span>
              </button>
              <div class="row__body" [id]="'service-' + i" [attr.inert]="open() === i ? null : ''">
                <div class="row__inner">
                  <p class="row__detail" [innerHTML]="s.detail | brandWords"></p>
                  <img class="row__photo" [src]="s.image" alt="" width="640" height="480" loading="lazy" decoding="async" />
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

  protected toggle(i: number): void {
    this.open.set(this.open() === i ? null : i);
  }

  /** La foto va abajo a la derecha del cursor (no lo tapa) y se mueve con transform. */
  protected follow(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') return;
    const el = this.photo().nativeElement;
    const host = el.parentElement!.getBoundingClientRect();
    el.style.transform = `translate(${event.clientX - host.left + 28}px, ${event.clientY - host.top + 20}px)`;
  }
}
