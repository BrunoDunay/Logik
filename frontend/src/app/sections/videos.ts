import { ChangeDetectionStrategy, Component, ElementRef, computed, input, linkedSignal, signal, viewChild } from '@angular/core';
import { Reveal } from '../components/reveal/reveal.directive';
import { SectionHeading } from '../components/section-heading/section-heading';
import { VideosSettings } from '../core/types/settings.model';

/**
 * Sus videos como una sala: el reproductor a la derecha y, a la izquierda, la lista de miniaturas.
 * Elegir una miniatura cambia el video con un fundido y lo reproduce. La lista se desplaza sola
 * hasta la elegida y tiene su propio scroll cuando hay muchos videos.
 */
@Component({
  selector: 'app-videos',
  imports: [Reveal, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let c = content();
    <section class="videos" id="videos" aria-labelledby="videos-title" (pointermove)="glow($event)">
      <span class="videos__glow" aria-hidden="true"></span>
      <div class="wrap">
        <app-section-heading [title]="c.title" [script]="c.script" [intro]="c.intro" tone="light" headingId="videos-title" />
        @if (current(); as v) {
          <div class="room">
            <ol class="list" role="list" #list appReveal="left" [class.has-scroll]="c.items.length > 4" data-lenis-prevent>
              @for (item of c.items; track item.src; let i = $index) {
                <li>
                  <button type="button" class="thumb" [class.is-current]="i === selected()" [attr.aria-current]="i === selected() ? 'true' : null" (click)="choose(i)">
                    <span class="thumb__img" [class.is-vertical]="item.orientation === 'vertical'">
                      @if (item.poster) {
                        <img [src]="item.poster" alt="" width="320" height="180" loading="lazy" decoding="async" />
                      }
                      <span class="thumb__play" aria-hidden="true">
                        <svg viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5L8 5.5Z" /></svg>
                      </span>
                    </span>
                    <span class="thumb__text">
                      <span class="thumb__num">{{ (i + 1).toString().padStart(2, '0') }}</span>
                      <strong>{{ item.title }}</strong>
                      <span class="thumb__desc">{{ item.description }}</span>
                    </span>
                  </button>
                </li>
              }
            </ol>

            <div class="player" appReveal="zoom" [revealDelay]="150" [class.is-switching]="switching()">
              <!-- Fondo difuminado con la portada: llena los costados de los videos verticales. -->
              @if (v.poster) {
                <img class="player__backdrop" [src]="v.poster" alt="" aria-hidden="true" />
              }
              <video
                #video
                [src]="v.src"
                [poster]="v.poster"
                [controls]="started()"
                playsinline
                preload="metadata"
                [attr.aria-label]="v.title"
                (ended)="started.set(false)"
              ></video>
              @if (!started()) {
                <button type="button" class="player__play" [attr.aria-label]="'Reproducir: ' + v.title" (click)="start()">
                  <span class="player__ring" aria-hidden="true"></span>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5L8 5.5Z" /></svg>
                </button>
              }
              <p class="player__caption">
                <strong>{{ v.title }}</strong>
                <span>{{ v.description }}</span>
              </p>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styleUrl: './videos.css',
})
export class Videos {
  readonly content = input.required<VideosSettings>();
  protected readonly selected = linkedSignal({ source: () => this.content().items, computation: () => 0 });
  /** El video que se muestra: va un paso detrás de la selección para dar tiempo al fundido. */
  protected readonly shown = linkedSignal(() => this.selected());
  protected readonly current = computed(() => this.content().items[this.shown()] ?? null);
  protected readonly started = signal(false);
  protected readonly switching = signal(false);

  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');
  private readonly list = viewChild<ElementRef<HTMLElement>>('list');

  protected choose(i: number): void {
    if (i === this.selected()) {
      this.start();
      return;
    }
    this.selected.set(i);
    this.switching.set(true);
    this.video()?.nativeElement.pause();
    // La lista se acomoda para que la miniatura elegida quede a la vista.
    const item = this.list()?.nativeElement.children[i] as HTMLElement | undefined;
    item?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => {
      this.shown.set(i);
      this.switching.set(false);
      // El clic del usuario permite reproducir con sonido.
      requestAnimationFrame(() => this.start());
    }, 350);
  }

  /** Destello rosa muy tenue que sigue al mouse por la sección (sin pasar por Angular). */
  protected glow(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') return;
    const el = event.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - r.left}px`);
    el.style.setProperty('--my', `${event.clientY - r.top}px`);
  }

  protected start(): void {
    const video = this.video()?.nativeElement;
    if (!video) return;
    this.started.set(true);
    video.muted = false;
    void video.play().catch(() => this.started.set(false));
  }
}
