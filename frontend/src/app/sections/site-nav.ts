import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  input,
  signal,
  viewChild,
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
 * Al pasar el cursor por un enlace se dibuja un trazo rosa a mano alzada; la sección activa lo deja dibujado.
 * El logo se vuelve a construir al pasar el cursor sobre él.
 * En celular, un menú a pantalla completa con los enlaces entrando en cascada.
 */
@Component({
  selector: 'app-site-nav',
  imports: [Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'site-chrome' },
  template: `
    <nav class="nav" [class.is-solid]="solid() || open()" [class.is-open]="open()" aria-label="Principal">
      <a class="nav__brand" [class.is-ready]="brandReady()" href="#inicio" aria-label="Logik Marketing, inicio" (click)="open.set(false)" (pointerenter)="rebuild()" #brand>
        <app-logo [tone]="solid() || open() ? 'dark' : 'light'" [glow]="true" />
      </a>
      <ul class="nav__links" id="nav-menu" role="list">
        @for (link of links(); track link.id; let i = $index) {
          <li [style.--i]="i">
            <a
              [href]="'#' + link.id"
              [class.is-active]="active() === link.id"
              [attr.aria-current]="active() === link.id ? 'true' : null"
              (click)="open.set(false)"
            >
              <span class="nav__label">{{ link.label }}</span>
              <svg class="nav__squiggle" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true"><path d="M2 8.5C14 3 24 3.5 36 7s22 3.5 34-1 20-3 28 1.5" pathLength="1" /></svg>
            </a>
          </li>
        }
      </ul>
      <a class="nav__cta" [href]="whatsapp()" target="_blank" rel="noopener">
        <span>Escríbenos</span>
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

  private readonly brand = viewChild.required<ElementRef<HTMLElement>>('brand');
  private readonly intro = inject(IntroService);
  private readonly rendered = signal(false);
  /** El logo del navbar se muestra hasta que su construcción arranca, para que no parpadee. */
  protected readonly brandReady = signal(false);
  private building = false;

  constructor() {
    const destroyRef = inject(DestroyRef);

    // El logo se construye una vez, cuando la intro del hero termina (o al cargar, si no hubo intro).
    let built = false;
    effect(() => {
      if (!this.rendered() || !this.intro.done() || built) return;
      built = true;
      void this.build(0.35);
    });

    afterNextRender(() => {
      this.rendered.set(true);
      const onScroll = () => this.solid.set(window.scrollY > window.innerHeight * 0.75);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
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
        window.removeEventListener('keydown', onKey);
        removeSmoothScroll();
        observer.disconnect();
      });
    });
  }

  /** Al pasar el cursor por el logo, se vuelve a construir (si no se está construyendo ya). */
  protected rebuild(): void {
    if (!this.brandReady() || this.building) return;
    void this.build(0);
  }

  private async build(delay: number): Promise<void> {
    this.building = true;
    const { gsap } = await import('gsap');
    const tl = buildLogo(gsap, this.brand().nativeElement, { sweep: 0.9 }).delay(delay);
    // Las máscaras ya ocultan las letras: el contenedor puede mostrarse sin parpadeo.
    this.brandReady.set(true);
    // then() espera al final sin reemplazar el onComplete de buildLogo.
    await tl.then();
    this.building = false;
  }
}
