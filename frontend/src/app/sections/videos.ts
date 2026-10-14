import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Reveal } from '../components/reveal/reveal.directive';
import { SectionHeading } from '../components/section-heading/section-heading';
import { VideosSettings } from '../core/types/settings.model';

/**
 * Sus videos: al pasar el cursor se reproducen en silencio como vista previa;
 * al hacer clic se reproducen con sonido y controles.
 */
@Component({
  selector: 'app-videos',
  imports: [Reveal, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let c = content();
    <section class="videos" id="videos" aria-labelledby="videos-title">
      <div class="wrap">
        <app-section-heading [title]="c.title" [script]="c.script" [intro]="c.intro" tone="light" headingId="videos-title" />
        <ul class="grid" role="list">
          @for (v of c.items; track v.src; let i = $index) {
            <li class="video" [class.is-vertical]="v.orientation === 'vertical'" [class.is-playing]="playing() === i" appReveal="zoom" [revealDelay]="i * 100">
              <div class="video__frame" (pointerenter)="preview($event, true)" (pointerleave)="preview($event, false)">
                <video
                  [src]="v.src"
                  [poster]="v.poster"
                  [controls]="playing() === i"
                  muted
                  loop
                  playsinline
                  preload="metadata"
                  [attr.aria-label]="v.title"
                ></video>
                @if (playing() !== i) {
                  <button type="button" class="video__play" [attr.aria-label]="'Reproducir: ' + v.title" (click)="play($event, i)">
                    <span class="video__ring" aria-hidden="true"></span>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5L8 5.5Z" /></svg>
                  </button>
                }
              </div>
              <div class="video__text">
                <h3>{{ v.title }}</h3>
                <p>{{ v.description }}</p>
              </div>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styleUrl: './videos.css',
})
export class Videos {
  readonly content = input.required<VideosSettings>();
  protected readonly playing = signal<number | null>(null);

  protected preview(event: PointerEvent, on: boolean): void {
    if (event.pointerType !== 'mouse') return;
    const video = (event.currentTarget as HTMLElement).querySelector('video');
    if (!video || this.playing() !== null) return;
    if (on && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) void video.play().catch(() => undefined);
    else video.pause();
  }

  protected play(event: Event, i: number): void {
    const video = (event.currentTarget as HTMLElement).parentElement?.querySelector('video');
    document.querySelectorAll<HTMLVideoElement>('.videos video').forEach((v) => v !== video && v.pause());
    this.playing.set(i);
    if (!video) return;
    video.muted = false;
    video.currentTime = 0;
    void video.play().catch(() => undefined);
  }
}
