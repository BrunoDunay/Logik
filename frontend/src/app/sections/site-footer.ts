import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, input, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../components/icon/icon';
import { Logo } from '../components/logo/logo';
import { buildLogo } from '../components/logo/logo-build';
import { BrandSettings, ClosingSettings, ContactSettings } from '../core/types/settings.model';
import { SocialLink } from './hero';
import { NavLink } from './site-nav';

/**
 * Pie de página: invitación final, logo (se construye como el del hero cuando entra en pantalla
 * y se ilumina con el cursor), secciones, contacto, redes y enlaces legales.
 */
@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, Icon, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer site-chrome">
      <div class="wrap footer__invite">
        <p class="footer__invitation">{{ closing().invitation }}</p>
        <a class="footer__cta" [href]="whatsapp()" target="_blank" rel="noopener">
          <span>{{ closing().ctaLabel }}</span>
          <span class="footer__cta-icon" aria-hidden="true"><app-icon name="arrow" [size]="18" /></span>
        </a>
      </div>

      <div class="wrap footer__grid">
        <div class="footer__brand">
          <a class="footer__logo" href="#inicio" aria-label="Logik Marketing, volver arriba" (pointerenter)="rebuild()" #logo>
            <app-logo tone="light" [glow]="true" />
          </a>
          <p class="footer__phrase">{{ brand().phrase }}</p>
        </div>

        <nav class="footer__col" aria-label="Secciones">
          <p class="footer__title">Secciones</p>
          @for (l of links(); track l.id) {
            <a class="footer__link" [href]="'#' + l.id">{{ l.label }}</a>
          }
        </nav>

        <div class="footer__col">
          <p class="footer__title">Contacto</p>
          <a class="footer__link" [href]="whatsapp()" target="_blank" rel="noopener">WhatsApp {{ contact().phoneDisplay }}</a>
          @if (contact().email) {
            <a class="footer__link" [href]="'mailto:' + contact().email">{{ contact().email }}</a>
          }
          <span class="footer__text">{{ contact().city }}</span>
          <ul class="footer__socials" role="list">
            @for (s of socials(); track s.href) {
              <li>
                <a [class]="'footer__social footer__social--' + s.icon" [href]="s.href" target="_blank" rel="noopener" [attr.aria-label]="s.label">
                  <app-icon [name]="s.icon" [size]="17" />
                </a>
              </li>
            }
          </ul>
        </div>

        <nav class="footer__col" aria-label="Legal">
          <p class="footer__title">Legal</p>
          <a class="footer__link" routerLink="/privacidad">Aviso de privacidad</a>
          <a class="footer__link" routerLink="/terminos">Términos y condiciones</a>
          <a class="footer__link" routerLink="/cookies">Política de cookies</a>
        </nav>
      </div>

      <div class="wrap footer__legal">
        <span>© {{ year }} {{ brand().name }}. Hecho en Aguascalientes.</span>
        <a class="footer__link footer__top" href="#inicio">Volver arriba <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  `,
  styleUrl: './site-footer.css',
})
export class SiteFooter {
  readonly brand = input.required<BrandSettings>();
  readonly closing = input.required<ClosingSettings>();
  readonly contact = input.required<ContactSettings>();
  readonly links = input<NavLink[]>([]);
  readonly socials = input<SocialLink[]>([]);
  readonly whatsapp = input.required<string>();
  protected readonly year = new Date().getFullYear();

  private readonly logo = viewChild.required<ElementRef<HTMLElement>>('logo');

  constructor() {
    const destroyRef = inject(DestroyRef);
    // El logo se construye la primera vez que el pie entra en pantalla.
    afterNextRender(() => {
      const el = this.logo().nativeElement;
      el.classList.add('is-waiting');
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          void this.build();
        },
        { rootMargin: '0px 0px -15% 0px' },
      );
      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  private building = false;
  private built = false;

  /** Al pasar el cursor por el logo, se vuelve a construir (si ya terminó la anterior). */
  protected rebuild(): void {
    if (this.built && !this.building) void this.build();
  }

  private async build(): Promise<void> {
    this.building = true;
    const el = this.logo().nativeElement;
    const { gsap } = await import('gsap');
    const tl = buildLogo(gsap, el, { sweep: 1.1 });
    el.classList.remove('is-waiting');
    await tl.then();
    this.building = false;
    this.built = true;
  }
}
