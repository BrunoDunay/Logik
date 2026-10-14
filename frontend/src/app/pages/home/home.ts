import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, computed, effect, inject, signal } from '@angular/core';
import { WhatsappFloat } from '../../components/whatsapp-float/whatsapp-float';
import { SITE_URL } from '../../core/config/api.config';
import { SeoService } from '../../core/services/seo.service';
import { SiteContentService } from '../../core/services/site-content.service';
import { SocialNetwork, socialLink, whatsappLink } from '../../core/utils/links';
import { About } from '../../sections/about';
import { BrandsCarousel } from '../../sections/brands-carousel';
import { Contact } from '../../sections/contact';
import { Hero, SocialLink } from '../../sections/hero';
import { Packages } from '../../sections/packages';
import { PostsCarousel } from '../../sections/posts/posts-carousel';
import { Results } from '../../sections/results';
import { Services } from '../../sections/services';
import { NavLink, SiteNav } from '../../sections/site-nav';
import { SiteFooter } from '../../sections/site-footer';
import { Team } from '../../sections/team';
import { Videos } from '../../sections/videos';

const NAV: NavLink[] = [
  { id: 'nosotras', label: 'Nosotras' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'publicaciones', label: 'Contenido' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'paquetes', label: 'Paquetes' },
  { id: 'marcas', label: 'Marcas' },
  { id: 'equipo', label: 'Equipo' },
  { id: 'contacto', label: 'Contacto' },
];

/** Portada: intro del logo, la frase, resultados, contenido, servicios, paquetes, marcas, videos, equipo y contacto. */
@Component({
  selector: 'app-home',
  imports: [Hero, SiteNav, About, Results, PostsCarousel, Services, Packages, BrandsCarousel, Videos, Team, Contact, SiteFooter, WhatsappFloat],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let s = site();
    <app-site-nav [links]="nav" [whatsapp]="whatsapp()" />
    <app-hero [content]="s.hero" [socials]="socials()" [whatsapp]="whatsapp()" />
    <main class="site-chrome">
      <app-about [content]="s.about" />
      <app-results [content]="s.results" />
      <app-posts-carousel [content]="s.posts" [brands]="s.brands.items" />
      <app-services [content]="s.services" />
      <app-packages [content]="s.packages" [whatsapp]="s.contact.whatsapp" />
      <app-brands-carousel [content]="s.brands" />
      <app-videos [content]="s.videos" />
      <app-team [content]="s.team" />
      <app-contact [content]="s.contact" [socials]="socials()" />
    </main>
    <app-site-footer [brand]="s.brand" [closing]="s.closing" [links]="nav" [socials]="socials()" [whatsapp]="whatsapp()" />
    <app-whatsapp-float [href]="whatsapp()" [visible]="pastHero()" />
  `,
})
export class Home {
  private readonly content = inject(SiteContentService);
  protected readonly site = this.content.site;
  protected readonly nav = NAV;
  protected readonly pastHero = signal(false);

  protected readonly whatsapp = computed(() => {
    const { whatsapp, whatsappMessage } = this.site().contact;
    return whatsappLink(whatsapp, whatsappMessage) ?? '#contacto';
  });

  protected readonly socials = computed<SocialLink[]>(() => {
    const { instagram, facebook, tiktok, linkedin } = this.site().contact;
    const list: { network: SocialNetwork; label: string; handle: string | null }[] = [
      { network: 'instagram', label: 'Instagram', handle: instagram },
      { network: 'facebook', label: 'Facebook', handle: facebook },
      { network: 'tiktok', label: 'TikTok', handle: tiktok },
      { network: 'linkedin', label: 'LinkedIn', handle: linkedin },
    ];
    const out: SocialLink[] = list
      .map((s) => ({ icon: s.network, label: s.label, href: socialLink(s.network, s.handle) ?? '' }))
      .filter((s) => s.href);
    return [...out, { icon: 'whatsapp', label: 'WhatsApp', href: this.whatsapp() }];
  });

  constructor() {
    this.content.load();
    const seo = inject(SeoService);
    const siteUrl = inject(SITE_URL);
    effect(() => {
      const { brand, hero, contact } = this.site();
      seo.setPage({
        title: `${brand.name} · ${brand.phrase}`,
        description: `${hero.kicker} en ${hero.location}. ${hero.subtitle}`,
        path: '/',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: brand.name,
          slogan: brand.phrase,
          description: hero.subtitle,
          url: `${siteUrl}/`,
          logo: `${siteUrl}/brand/logo.png`,
          telephone: `+${contact.whatsapp}`,
          email: contact.email ?? undefined,
          address: contact.address
            ? { '@type': 'PostalAddress', streetAddress: contact.address, addressRegion: 'Aguascalientes', addressCountry: 'MX' }
            : undefined,
          sameAs: this.socials().filter((s) => s.icon !== 'whatsapp').map((s) => s.href),
        },
      });
    });

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const onScroll = () => this.pastHero.set(window.scrollY > window.innerHeight * 0.9);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }
}
