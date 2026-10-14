import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Btn } from '../../components/buttons/btn';
import { EstimatorCalc } from '../../components/estimator/estimator';
import { Icon, IconName } from '../../components/icon/icon';
import { MetaNotification } from '../../components/meta-notification/meta-notification';
import { Reveal } from '../../components/reveal/reveal.directive';
import { WhatsappFloat } from '../../components/whatsapp-float/whatsapp-float';
import { API_URL, SITE_URL } from '../../core/config/api.config';
import { INITIAL_CONTENT } from '../../core/config/initial-content';
import { SeoService } from '../../core/services/seo.service';
import { SiteSettings } from '../../core/types/settings.model';
import { EmphasisPipe } from '../../core/utils/emphasis.pipe';
import { SocialNetwork, socialLink, whatsappLink } from '../../core/utils/links';

/** Portada: la frase, la prueba, los servicios, el trabajo, los paquetes, el equipo y el contacto. */
@Component({
  selector: 'app-home',
  imports: [RouterLink, Btn, EstimatorCalc, Icon, MetaNotification, Reveal, WhatsappFloat, EmphasisPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly loaded = toSignal(
    inject(HttpClient)
      .get<Partial<SiteSettings>>(`${inject(API_URL)}/settings`)
      .pipe(catchError(() => of({} as Partial<SiteSettings>))),
    { initialValue: {} as Partial<SiteSettings> },
  );
  /** Contenido de respaldo: la portada se ve completa aunque la API no responda. */
  protected readonly site = computed<SiteSettings>(() => ({ ...INITIAL_CONTENT, ...this.loaded() }));

  protected readonly year = new Date().getFullYear();
  protected readonly whatsapp = computed(() => {
    const { whatsapp, whatsappMessage } = this.site().contact;
    return whatsappLink(whatsapp, whatsappMessage) ?? '#contacto';
  });
  protected readonly packageLink = computed(() =>
    whatsappLink(
      this.site().contact.whatsapp,
      `Hola Logik, me interesa el paquete desde ${this.site().packages.price} al mes.`,
    ) ?? '#contacto',
  );
  protected readonly socials = computed(() => {
    const { instagram, facebook, tiktok } = this.site().contact;
    const items: { network: SocialNetwork; icon: IconName; label: string; handle: string | null }[] = [
      { network: 'instagram', icon: 'instagram', label: 'Instagram', handle: instagram },
      { network: 'facebook', icon: 'facebook', label: 'Facebook', handle: facebook },
      { network: 'tiktok', icon: 'tiktok', label: 'TikTok', handle: tiktok },
    ];
    return items
      .map((item) => ({ ...item, href: socialLink(item.network, item.handle) }))
      .filter((item): item is typeof item & { href: string } => Boolean(item.href));
  });
  /** La cita destacada se reparte en renglones de dos o tres palabras, cada uno de margen a margen. */
  protected readonly quoteLines = computed(() => splitQuote(this.site().testimonials.featured.quote));

  /** Ya se dejó atrás la portada: aparece el botón fijo de WhatsApp. */
  protected readonly pastHero = signal(false);
  /** Las notificaciones de Meta llegan una por una cuando la sección entra en vista. */
  protected readonly notificationsIn = signal(false);
  protected readonly showcasePlaying = signal(true);

  private readonly hero = viewChild<ElementRef<HTMLElement>>('hero');
  private readonly notifications = viewChild<ElementRef<HTMLElement>>('notifications');
  private readonly showcaseVideo = viewChild<ElementRef<HTMLVideoElement>>('showcaseVideo');

  constructor() {
    const seo = inject(SeoService);
    const siteUrl = inject(SITE_URL);
    effect(() => {
      const { brand, hero, contact } = this.site();
      seo.setPage({
        title: `${brand.name} · ${brand.phrase}`,
        description: hero.subtitle,
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
          sameAs: this.socials().map((s) => s.href),
        },
      });
    });

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

      const heroEl = this.hero()?.nativeElement;
      if (heroEl) {
        const observer = new IntersectionObserver(([entry]) => this.pastHero.set(!entry.isIntersecting), {
          rootMargin: '0px 0px -40% 0px',
        });
        observer.observe(heroEl);
        destroyRef.onDestroy(() => observer.disconnect());
      }

      const stack = this.notifications()?.nativeElement;
      if (stack) {
        // Si ya está en pantalla al cargar, se muestran sin esperar.
        if (reduced.matches || stack.getBoundingClientRect().top < window.innerHeight * 0.85) {
          this.notificationsIn.set(true);
        } else {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (!entry.isIntersecting) return;
              this.notificationsIn.set(true);
              observer.disconnect();
            },
            { rootMargin: '0px 0px -20% 0px' },
          );
          observer.observe(stack);
          destroyRef.onDestroy(() => observer.disconnect());
        }
      }

      // Con "reducir movimiento" los videos no se reproducen solos.
      if (reduced.matches) {
        document.querySelectorAll<HTMLVideoElement>('video[autoplay]').forEach((video) => video.pause());
        this.showcasePlaying.set(false);
      }
    });
  }

  /** El título del video se parte en dos: una mitad arriba del cuadro y otra abajo. */
  protected splitHalf(title: string): [string, string] {
    const words = title.trim().split(/\s+/);
    const cut = Math.ceil(words.length / 2);
    return [words.slice(0, cut).join(' '), words.slice(cut).join(' ')];
  }

  protected toggleShowcase(): void {
    const video = this.showcaseVideo()?.nativeElement;
    if (!video) return;
    if (video.paused) {
      void video.play();
      this.showcasePlaying.set(true);
    } else {
      video.pause();
      this.showcasePlaying.set(false);
    }
  }
}

/** "Se interesan no solo por cumplir." → ["Se interesan no", "solo por cumplir."]: dos renglones, como un titular. */
export function splitQuote(quote: string): string[][] {
  const words = quote.trim().split(/\s+/).filter(Boolean);
  if (words.length < 2) return [words];
  const cut = Math.ceil(words.length / 2);
  return [words.slice(0, cut), words.slice(cut)];
}
