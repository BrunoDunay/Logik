import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Trazos SVG de 24×24. Las marcas de redes son sus logotipos simplificados en un solo color. */
const PATHS = {
  whatsapp:
    'M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.2 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2c0 1.2.9 2.3 1 2.5.1.1 1.7 2.7 4.2 3.7 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.4Z',
  instagram:
    'M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21.1 8c0-1.5-.4-2.8-1.4-3.8S17.5 2.9 16 2.8c-1.5-.1-6.5-.1-8 0-1.5.1-2.8.4-3.8 1.4S2.9 6.5 2.8 8c-.1 1.5-.1 6.5 0 8 .1 1.5.4 2.8 1.4 3.8s2.3 1.3 3.8 1.4c1.5.1 6.5.1 8 0 1.5-.1 2.8-.4 3.8-1.4s1.3-2.3 1.4-3.8c.1-1.5.1-6.5 0-8Zm-2 9.6a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.4.4s-4.2.1-5.4-.4a3 3 0 0 1-1.7-1.7c-.5-1.2-.4-4-.4-5.4s-.1-4.2.4-5.4a3 3 0 0 1 1.7-1.7c1.2-.5 4-.4 5.4-.4s4.2-.1 5.4.4a3 3 0 0 1 1.7 1.7c.5 1.2.4 4 .4 5.4s.1 4.2-.4 5.4Z',
  facebook:
    'M13.4 21.8v-8.3h2.8l.4-3.3h-3.2V8.1c0-.9.3-1.6 1.6-1.6h1.7V3.6a22 22 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3v2.4H7.2v3.3H10v8.3h3.4Z',
  tiktok:
    'M16.6 2.5h-3.3v13.2a2.8 2.8 0 1 1-2-2.7V9.6a6.1 6.1 0 1 0 5.3 6.1V9a7.8 7.8 0 0 0 4.4 1.4V7a4.4 4.4 0 0 1-4.4-4.5Z',
  arrow: 'M5 12h13m-5-6 6 6-6 6',
  /** Destello de cuatro puntas: el motivo que repiten en todas sus publicaciones. */
  sparkle: 'M12 1.5c.6 5.6 4.9 9.9 10.5 10.5-5.6.6-9.9 4.9-10.5 10.5C11.4 16.9 7.1 12.6 1.5 12 7.1 11.4 11.4 7.1 12 1.5Z',
  play: 'M8 5.5v13l10.5-6.5L8 5.5Z',
  pause: 'M7 5h3.5v14H7zM13.5 5H17v14h-3.5z',
} as const;

export type IconName = keyof typeof PATHS;

/** Íconos de trazo (flecha) y de relleno (marcas, destello). Decorativos salvo que lleven `label`. */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.aria-hidden]': 'label() ? null : true', '[attr.role]': "label() ? 'img' : null", '[attr.aria-label]': 'label()' },
  template: `
    <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" focusable="false">
      @if (stroked()) {
        <path [attr.d]="path()" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      } @else {
        <path [attr.d]="path()" fill="currentColor" />
      }
    </svg>
  `,
  styles: `
    :host { display: inline-flex; flex: none; line-height: 0; }
    svg { display: block; }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input<number | string>(24);
  readonly label = input<string | null>(null);
  protected readonly path = computed(() => PATHS[this.name()]);
  protected readonly stroked = computed(() => this.name() === 'arrow');
}
