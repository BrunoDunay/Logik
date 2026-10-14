import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, input, signal } from '@angular/core';
import { LOGO_PATHS, LOGO_VIEWBOX } from './logo-paths';

const BIG = ['l', 'o', 'g', 'i', 'k'] as const;
const SMALL = ['m', 'a', 'r', 'k2', 'e', 't', 'i2', 'n', 'g2'] as const;

let nextId = 0;

/**
 * Logo de Logik en SVG, vectorizado del original (scripts/trace-logo.py).
 * - `tone`: letras claras (sobre negro) u oscuras (sobre blanco); la flecha siempre en rosa.
 * - `glow`: brillo que sigue al mouse, recortado a la forma exacta del logo.
 * - `guides`: líneas de construcción que usa la animación de entrada (ocultas por defecto).
 * Al pasar el cursor, la flecha sube un poco y las letras se levantan en cascada.
 */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'logo',
    '[class.logo--light]': "tone() === 'light'",
    '[class.logo--glowing]': 'glowOn()',
    '(pointermove)': 'track($event)',
    '(pointerleave)': 'glowOn.set(false)',
  },
  template: `
    <svg [attr.viewBox]="viewBox" [attr.aria-label]="label()" role="img" overflow="visible">
      <defs>
        <radialGradient [attr.id]="glowId" gradientUnits="userSpaceOnUse" [attr.cx]="gx()" [attr.cy]="gy()" r="150">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0.95" />
          <stop offset="0.45" stop-color="#ffd0e0" stop-opacity="0.45" />
          <stop offset="1" stop-color="#ffd0e0" stop-opacity="0" />
        </radialGradient>
      </defs>

      @if (guides()) {
        <!-- Líneas de construcción: base, altura de mayúsculas, diagonales de la flecha y círculos de O y G. -->
        <g class="logo__guides" data-logo="guides" aria-hidden="true">
          <line data-guide x1="-260" y1="219" x2="1086" y2="219" pathLength="1" />
          <line data-guide x1="-260" y1="2" x2="1086" y2="2" pathLength="1" />
          <line data-guide x1="-260" y1="110" x2="1086" y2="110" pathLength="1" />
          <line data-guide x1="560" y1="420" x2="900" y2="-80" pathLength="1" />
          <line data-guide x1="610" y1="420" x2="950" y2="-80" pathLength="1" />
          <circle data-guide cx="225" cy="110" r="113" pathLength="1" />
          <circle data-guide cx="455" cy="110" r="113" pathLength="1" />
          <circle data-guide cx="455" cy="110" r="60" pathLength="1" />
        </g>
      }

      <g class="logo__big">
        @for (key of big; track key) {
          <path class="logo__letter" [attr.data-logo]="key" [attr.d]="paths[key]" pathLength="1" />
        }
      </g>
      <g class="logo__arrow-wrap" data-logo="arrow-wrap"><path class="logo__arrow" data-logo="arrow" [attr.d]="paths.arrow" pathLength="1" /></g>
      <g class="logo__small">
        @for (key of small; track key) {
          <path class="logo__sub" [attr.data-logo]="key" [attr.d]="paths[key]" />
        }
      </g>

      @if (glow()) {
        <g class="logo__glow" [attr.fill]="'url(#' + glowId + ')'" aria-hidden="true">
          @for (key of all; track key) {
            <path [attr.d]="paths[key]" />
          }
        </g>
      }
    </svg>
  `,
  styleUrl: './logo.css',
})
export class Logo {
  readonly tone = input<'light' | 'dark'>('dark');
  readonly glow = input(false);
  readonly guides = input(false);
  readonly label = input('Logik Marketing');

  protected readonly viewBox = LOGO_VIEWBOX;
  protected readonly paths = LOGO_PATHS;
  protected readonly big = BIG;
  protected readonly small = SMALL;
  protected readonly all = [...BIG, 'arrow', ...SMALL] as const;
  protected readonly glowId = `logo-glow-${nextId++}`;

  protected readonly glowOn = signal(false);
  private readonly point = signal({ x: 0, y: 0 });
  protected readonly gx = computed(() => this.point().x);
  protected readonly gy = computed(() => this.point().y);

  private readonly host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
  private readonly box = LOGO_VIEWBOX.split(' ').map(Number);

  /** Lleva el centro del brillo al punto del cursor, en coordenadas del dibujo. */
  protected track(event: PointerEvent): void {
    if (!this.glow() || event.pointerType === 'touch') return;
    const svg = this.host.querySelector('svg');
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    this.point.set({
      x: ((event.clientX - rect.left) / rect.width) * this.box[2],
      y: ((event.clientY - rect.top) / rect.height) * this.box[3],
    });
    this.glowOn.set(true);
  }
}
