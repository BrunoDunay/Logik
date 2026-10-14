import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { Logo } from '../components/logo/logo';
import { buildLogo } from '../components/logo/logo-build';
import { IntroService } from '../core/services/intro.service';
import { installSmoothScroll } from '../core/utils/smooth-scroll';

export interface NavLink {
  id: string;
  label: string;
}

/**
 * Barra fija: transparente sobre la portada y blanca al bajar.
 * El logo se construye igual que el del hero en cuanto termina la intro.
 * En escritorio, una píldora se desliza bajo el enlace con el cursor y vuelve a la sección activa.
 * En celular, un menú a pantalla completa con los enlaces entrando en cascada.
 */
@Component({
  selector: 'app-site-nav',
  imports: [Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'site-chrome' },
  template: `
    <nav class="nav" [class.is-solid]="solid() || open()" [class.is-open]="open()" aria-label="Principal">
      <a class="nav__brand" [class.is-ready]="brandReady()" href="#inicio" aria-label="Logik Marketing, inicio" (click)="open.set(false)" #brand>
        <app-logo [tone]="solid() || open() ? 'dark' : 'light'" [glow]="true" />
      </a>
      <ul class="nav__links" role="list" (pointerleave)="hovered.set(null)">
        <li class="nav__pill" aria-hidden="true" [class.is-on]="!!pill()" [style.--x.px]="pill()?.x ?? 0" [style.--w.px]="pill()?.w ?? 0"></li>
        @for (link of links(); track link.id; let i = $index) {
          <li [style.--i]="i">
            <a
              #item
              [href]="'#' + link.id"
              [class.is-active]="active() === link.id"
              [attr.aria-current]="active() === link.id ? 'true' : null"
              (pointerenter)="hovered.set(link.id)"
              (focus)="hovered.set(link.id)"
              (blur)="hovered.set(null)"
              (click)="open.set(false)"
            >
              <span class="nav__roll" [attr.data-text]="link.label">{{ link.label }}</span>
            </a>
          </li>
        }
      </ul>
      <a class="nav__cta" [href]="whatsapp()" target="_blank" rel="noopener">
        <span class="nav__roll" data-text="Escríbenos">Escríbenos</span>
      </a>
      <button type="button" class="nav__burger" [attr.aria-expanded]="open()" aria-controls="nav-menu" (click)="open.set(!open())">
        <span class="visually-hidden">{{ open() ? 'Cerrar menú' : 'Abrir menú' }}</span>
        <span class="nav__burger-line"></span>
        <span class="nav__burger-line"></span>
      </button>
    </nav>
  `,
  styleUrl: './site-nav.css',
})
export class SiteNav {
  readonly links = input.required<NavLink[]>();
  readonly whatsapp = input.required<string>();

  protected readonly solid = signal(false);
  protected readonly open = signal(false);
  protected readonly active = signal<string | null>(null);
  protected readonly hovered = signal<string | null>(null);

  private readonly items = viewChildren<ElementRef<HTMLAnchorElement>>('item');
  private readonly brand = viewChild.required<ElementRef<HTMLElement>>('brand');
  private readonly intro = inject(IntroService);
  private readonly rendered = signal(false);
  /** El logo del navbar se muestra hasta que su construcción arranca, para que no parpadee. */
  protected readonly brandReady = signal(false);
  /** Cambia al redimensionar para volver a medir la píldora. */
  private readonly layout = signal(0);

  /** Posición de la píldora: bajo el enlace con el cursor o, si no hay, bajo la sección activa. */
  protected readonly pill = computed(() => {
    this.layout();
    if (!this.rendered()) return null;
    const id = this.hovered() ?? this.active();
    const index = this.links().findIndex((l) => l.id === id);
    const el = this.items()[index]?.nativeElement;
    return el ? { x: el.offsetLeft, w: el.offsetWidth } : null;
  });

  constructor() {
    const destroyRef = inject(DestroyRef);

    // El logo se construye una vez, cuando la intro del hero termina (o al cargar, si no hubo intro).
    let built = false;
    effect(() => {
      if (!this.rendered() || !this.intro.done() || built) return;
      built = true;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.brandReady.set(true);
        return;
      }
      void import('gsap')
        .then(({ gsap }) => buildLogo(gsap, this.brand().nativeElement, { sweep: 0.9 }).delay(0.35))
        .finally(() => this.brandReady.set(true));
    });

    afterNextRender(() => {
      this.rendered.set(true);
      const onScroll = () => this.solid.set(window.scrollY > window.innerHeight * 0.75);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      const onResize = () => this.layout.update((n) => n + 1);
      window.addEventListener('resize', onResize, { passive: true });
      // Las fuentes cambian el ancho de los enlaces: se mide otra vez cuando terminan de cargar.
      void document.fonts?.ready.then(onResize);
      const removeSmoothScroll = installSmoothScroll();

      // La sección que ocupa el centro de la pantalla es la activa.
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) if (entry.isIntersecting) this.active.set(entry.target.id);
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      for (const link of this.links()) {
        const el = document.getElementById(link.id);
        if (el) observer.observe(el);
      }
      const hero = document.getElementById('inicio');
      if (hero) observer.observe(hero);
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && this.open.set(false);
      window.addEventListener('keydown', onKey);
      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('keydown', onKey);
        removeSmoothScroll();
        observer.disconnect();
      });
    });
  }
}
