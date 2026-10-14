import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, input, signal } from '@angular/core';
import { Logo } from '../components/logo/logo';

export interface NavLink {
  id: string;
  label: string;
}

/**
 * Barra fija: transparente sobre la portada y blanca al bajar; marca la sección visible.
 * En celular, un menú a pantalla completa con los enlaces entrando en cascada.
 */
@Component({
  selector: 'app-site-nav',
  imports: [Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'site-chrome' },
  template: `
    <nav class="nav" [class.is-solid]="solid() || open()" [class.is-open]="open()" aria-label="Principal">
      <a class="nav__brand" href="#inicio" aria-label="Logik Marketing, inicio" (click)="open.set(false)">
        <app-logo [tone]="solid() || open() ? 'dark' : 'light'" />
      </a>
      <ul class="nav__links" role="list">
        @for (link of links(); track link.id; let i = $index) {
          <li [style.--i]="i">
            <a [href]="'#' + link.id" [class.is-active]="active() === link.id" (click)="open.set(false)">{{ link.label }}</a>
          </li>
        }
      </ul>
      <a class="nav__cta" [href]="whatsapp()" target="_blank" rel="noopener">Escríbenos</a>
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

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const onScroll = () => this.solid.set(window.scrollY > window.innerHeight * 0.75);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });

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
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && this.open.set(false);
      window.addEventListener('keydown', onKey);
      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('keydown', onKey);
        observer.disconnect();
      });
    });
  }
}
