import { SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, signal } from '@angular/core';
import { Post } from '../../core/types/settings.model';

const BURST = Array.from({ length: 10 }, (_, i) => ({ angle: i * 36 + (i % 2 ? 12 : -6), dist: 46 + (i % 3) * 14, size: 10 + (i % 3) * 4 }));

/**
 * Vista previa de cómo se ve la publicación en Instagram. El like no hace nada real:
 * el corazón rebota, suelta una ráfaga de corazones y con doble clic aparece uno grande sobre la imagen.
 */
@Component({
  selector: 'app-ig-post',
  imports: [SlicePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let p = post();
    <article class="ig" [attr.aria-label]="'Publicación de ' + p.account">
      <header class="ig__head">
        <span class="ig__avatar" [class.is-logik]="isLogik()">
          @if (isLogik()) {
            <img src="/brand/icon.png" alt="" width="64" height="64" />
          } @else {
            {{ initial() }}
          }
        </span>
        <span class="ig__who">
          <strong>{{ handle() }}</strong>
          <span>{{ isLogik() ? 'Aguascalientes, México' : 'Diseño de Logik Marketing' }}</span>
        </span>
        <svg class="ig__dots" viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
      </header>

      <div class="ig__media" (dblclick)="like(true)">
        <img [src]="p.image" [alt]="'Publicación: ' + (p.caption | slice: 0 : 90)" width="760" height="950" decoding="async" />
        @if (bigHeart()) {
          @for (k of [bigHeart()]; track k) {
            <svg class="ig__big-heart" viewBox="0 0 24 24" aria-hidden="true"><path [attr.d]="heartPath" /></svg>
          }
        }
      </div>

      <div class="ig__actions">
        <button type="button" class="ig__btn ig__like" [class.is-liked]="liked()" [attr.aria-pressed]="liked()" [attr.aria-label]="liked() ? 'Quitar me gusta' : 'Me gusta'" (click)="like()">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path [attr.d]="heartPath" /></svg>
          @if (burst()) {
            @for (k of [burst()]; track k) {
              <span class="ig__burst" aria-hidden="true">
                @for (b of burstDots; track $index) {
                  <svg [style.--a]="b.angle + 'deg'" [style.--d]="b.dist + 'px'" [style.--s]="b.size + 'px'" viewBox="0 0 24 24"><path [attr.d]="heartPath" /></svg>
                }
              </span>
            }
          }
        </button>
        <span class="ig__btn" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20.7 11.4a8.3 8.3 0 0 1-12.3 7.3L3.5 20.3l1.6-4.8a8.3 8.3 0 1 1 15.6-4.1Z" /></svg></span>
        <span class="ig__btn" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21.5 3.5 10.6 13.6M21.5 3.5l-6.9 17-4-7-7-3.9 17.9-6.1Z" /></svg></span>
        <span class="ig__btn ig__save" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M19 21 12 16l-7 5V4.8C5 3.8 5.8 3 6.8 3h10.4c1 0 1.8.8 1.8 1.8V21Z" /></svg></span>
      </div>

      <p class="ig__likes" aria-live="polite">{{ liked() ? 'Te gusta esta publicación' : 'Toca el corazón o da doble clic' }}</p>

      @if (p.caption) {
        <p class="ig__caption" [class.is-open]="open()">
          <strong>{{ handle() }}</strong> {{ p.caption }}
        </p>
        @if (p.caption.length > 90) {
          <button type="button" class="ig__more" (click)="open.set(!open())">{{ open() ? 'menos' : 'más' }}</button>
        }
      }
      @if (p.permalink) {
        <a class="ig__link" [href]="p.permalink" target="_blank" rel="noopener">Ver en Instagram</a>
      }
    </article>
  `,
  styleUrl: './ig-post.css',
})
export class IgPost {
  readonly post = input.required<Post>();

  protected readonly heartPath =
    'M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3 4.5 6.7 4.5c2 0 3.4 1.1 4.3 2.4l1 1.4 1-1.4c.9-1.3 2.3-2.4 4.3-2.4 3.7 0 5.8 3.8 4.3 7.2C19.5 16.4 12 21 12 21Z';
  protected readonly burstDots = BURST;

  /** El like se reinicia al cambiar de publicación. */
  protected readonly liked = linkedSignal({ source: () => this.post(), computation: () => false });
  protected readonly open = linkedSignal({ source: () => this.post(), computation: () => false });
  protected readonly burst = signal(0);
  protected readonly bigHeart = signal(0);

  protected readonly isLogik = computed(() => this.post().account === 'logikmkt');
  protected readonly handle = computed(() => (this.isLogik() ? 'logikmkt' : this.post().account));
  protected readonly initial = computed(() => this.post().account.trim().charAt(0).toUpperCase());

  protected like(fromImage = false): void {
    if (fromImage) {
      this.bigHeart.update((n) => n + 1);
      if (this.liked()) return;
    }
    const next = fromImage ? true : !this.liked();
    this.liked.set(next);
    if (next) this.burst.update((n) => n + 1);
  }
}
