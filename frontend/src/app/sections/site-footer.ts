import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../components/icon/icon';
import { Logo } from '../components/logo/logo';
import { BrandSettings, ClosingSettings } from '../core/types/settings.model';
import { SocialLink } from './hero';
import { NavLink } from './site-nav';

/** Cierre: invitación, enlaces y el logo grande, que también se ilumina con el cursor. */
@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, Icon, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer site-chrome">
      <div class="wrap footer__top">
        <div class="footer__invite">
          <p class="footer__invitation">{{ closing().invitation }}</p>
          <a class="footer__cta" [href]="whatsapp()" target="_blank" rel="noopener">{{ closing().ctaLabel }} <app-icon name="arrow" [size]="18" /></a>
        </div>
        <nav class="footer__links" aria-label="Secciones">
          @for (l of links(); track l.id) {
            <a [href]="'#' + l.id">{{ l.label }}</a>
          }
        </nav>
        <ul class="footer__socials" role="list">
          @for (s of socials(); track s.href) {
            <li><a [href]="s.href" target="_blank" rel="noopener" [attr.aria-label]="s.label"><app-icon [name]="s.icon" [size]="18" /></a></li>
          }
        </ul>
      </div>
      <div class="wrap footer__logo">
        <app-logo tone="light" [glow]="true" />
      </div>
      <div class="wrap footer__legal">
        <span>© {{ year }} {{ brand().name }} · {{ brand().phrase }}</span>
        <a routerLink="/privacidad">Aviso de privacidad</a>
        <a href="#inicio" class="footer__top-link">Volver arriba ↑</a>
      </div>
    </footer>
  `,
  styleUrl: './site-footer.css',
})
export class SiteFooter {
  readonly brand = input.required<BrandSettings>();
  readonly closing = input.required<ClosingSettings>();
  readonly links = input<NavLink[]>([]);
  readonly socials = input<SocialLink[]>([]);
  readonly whatsapp = input.required<string>();
  protected readonly year = new Date().getFullYear();
}
