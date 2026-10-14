import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, input, signal } from '@angular/core';
import { CountUp } from '../components/count-up/count-up.directive';
import { ReadMore } from '../components/read-more/read-more';
import { Reveal } from '../components/reveal/reveal.directive';
import { AboutSettings } from '../core/types/settings.model';
import { EmphasisPipe } from '../core/utils/emphasis.pipe';

const SPARK = 'M12 1.5c.6 5.6 4.9 9.9 10.5 10.5-5.6.6-9.9 4.9-10.5 10.5C11.4 16.9 7.1 12.6 1.5 12 7.1 11.4 11.4 7.1 12 1.5Z';

/** La frase de la marca como sección propia: qué hacen, con fotos del Marke-team en semitono que rotan solas. */
@Component({
  selector: 'app-about',
  imports: [CountUp, ReadMore, Reveal, EmphasisPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let c = content();
    <section class="about" id="nosotras" aria-labelledby="about-title">
      <div class="wrap about__grid">
        <div class="about__copy">
          <h2 class="about__title" id="about-title">
            <span class="about__lead" appReveal="blur">{{ c.lead }}</span>
            <span class="about__line" appReveal="blur" [revealDelay]="120">
              {{ c.accent }} <span class="script about__script">{{ c.script }}</span>
            </span>
          </h2>
          <div class="about__text" appReveal [revealDelay]="200">
            <app-read-more [more]="c.more">
              <p class="about__summary" [innerHTML]="c.summary | emphasis"></p>
            </app-read-more>
          </div>
          <ul class="about__stats" role="list">
            @for (s of c.stats; track s.label; let i = $index) {
              <li class="about__stat" appReveal [revealDelay]="260 + i * 90">
                <span class="about__stat-value" [appCountUp]="s.value" [prefix]="s.prefix" [suffix]="s.suffix"></span>
                <span class="about__stat-label">{{ s.label }}</span>
              </li>
            }
          </ul>
        </div>

        <figure
          class="about__visual"
          appReveal="zoom"
          [revealDelay]="100"
          (pointerenter)="paused.set(true)"
          (pointerleave)="paused.set(false)"
        >
          <div class="about__blob" aria-hidden="true"></div>
          <div class="about__photo">
            @for (p of c.photos; track p.image; let i = $index) {
              <img
                [src]="p.image"
                [alt]="p.imageAlt"
                [class.is-current]="i === current()"
                [attr.aria-hidden]="i === current() ? null : true"
                width="900"
                height="900"
                loading="lazy"
                decoding="async"
              />
            }
          </div>
          @if (c.photos.length > 1) {
            <div class="about__dots" role="group" aria-label="Fotos del equipo">
              @for (p of c.photos; track p.image; let i = $index) {
                <button
                  type="button"
                  [class.is-current]="i === current()"
                  [attr.aria-label]="'Ver foto ' + (i + 1)"
                  [attr.aria-pressed]="i === current()"
                  (click)="current.set(i)"
                ></button>
              }
            </div>
          }
          @for (s of sparks; track $index) {
            <svg class="about__spark" [style.--x]="s.x" [style.--y]="s.y" [style.--s]="s.s" [style.--d]="s.d" viewBox="0 0 24 24" aria-hidden="true"><path [attr.d]="sparkPath" /></svg>
          }
          <figcaption class="about__badge">
            <span class="script">el</span> Marke-team
          </figcaption>
        </figure>
      </div>
    </section>
  `,
  styleUrl: './about.css',
})
export class About {
  readonly content = input.required<AboutSettings>();
  protected readonly current = signal(0);
  /** Con el cursor encima la foto se queda quieta (y a color). */
  protected readonly paused = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const timer = setInterval(() => {
        const total = this.content().photos.length;
        if (!this.paused() && total > 1 && document.visibilityState === 'visible') this.current.update((i) => (i + 1) % total);
      }, 4800);
      destroyRef.onDestroy(() => clearInterval(timer));
    });
  }
  protected readonly sparkPath = SPARK;
  protected readonly sparks = [
    { x: '6%', y: '8%', s: '2.4rem', d: '0s' },
    { x: '88%', y: '4%', s: '1.6rem', d: '0.6s' },
    { x: '94%', y: '70%', s: '2.8rem', d: '1.2s' },
    { x: '2%', y: '78%', s: '1.4rem', d: '1.8s' },
  ];
}
