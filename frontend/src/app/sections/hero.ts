import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, input, viewChild } from '@angular/core';
import { Icon, IconName } from '../components/icon/icon';
import { Logo } from '../components/logo/logo';
import { buildLogo } from '../components/logo/logo-build';
import { IntroService } from '../core/services/intro.service';
import { HeroSettings } from '../core/types/settings.model';

export interface SocialLink {
  icon: IconName;
  label: string;
  href: string;
}

/**
 * Portada al estilo de la referencia "TURA": negro con una luz suave arriba y el logo como texto principal.
 * Intro: la pantalla empieza en blanco y se oscurece mientras una luz va creando LOGIK;
 * luego la flecha encaja en la K, aparece MARKETING y al final el resto del sitio.
 */
@Component({
  selector: 'app-hero',
  imports: [Logo, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  readonly content = input.required<HeroSettings>();
  readonly socials = input<SocialLink[]>([]);
  readonly whatsapp = input.required<string>();

  private readonly logoEl = viewChild.required<ElementRef<HTMLElement>>('logo');
  private readonly heroEl = viewChild.required<ElementRef<HTMLElement>>('hero');
  private readonly veilEl = viewChild.required<ElementRef<HTMLElement>>('veil');
  private readonly intro = inject(IntroService);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (this.intro.done()) return;
      void this.playIntro(destroyRef);
    });
  }

  private async playIntro(destroyRef: DestroyRef): Promise<void> {
    const { gsap } = await import('gsap');
    const host = this.logoEl().nativeElement;
    const veil = this.veilEl().nativeElement;
    const guides = Array.from(host.querySelectorAll<SVGElement>('[data-guide]'));
    const guideGroup = host.querySelector<SVGElement>('.logo__guides')!;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set([veil, guideGroup, ...guides], { clearProps: 'all' });
        // El resto del hero entra en cascada; las secciones de abajo aparecen con su propia transición.
        const chrome = Array.from(this.heroEl().nativeElement.querySelectorAll<HTMLElement>('.site-chrome'));
        gsap.fromTo(
          chrome,
          { opacity: 0, y: 16, transition: 'none' },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', clearProps: 'all' },
        );
        this.intro.finish();
      },
    });
    if (/[?&]intro=lento/.test(location.search)) tl.timeScale(0.25);

    // Blanco → negro; las líneas guía se trazan mientras tanto y se apagan cuando el logo ya está.
    tl.fromTo(veil, { opacity: 1 }, { opacity: 0, duration: 1.3, ease: 'power2.inOut' }, 0.1)
      .to(guideGroup, { opacity: 1, duration: 0.4 }, 0.3)
      .to(guides, { strokeDashoffset: 0, duration: 1.1, stagger: 0.08, ease: 'power2.inOut' }, 0.3)
      .add(buildLogo(gsap, host, { sweep: 1.6 }), 0.7)
      .to(guideGroup, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 2.6);

    // Para revisar la animación: "?intro=t1.2" la congela en el segundo 1.2.
    const freeze = /[?&]intro=t(\d+(?:\.\d+)?)/.exec(location.search);
    if (freeze) {
      tl.pause(Number(freeze[1]), false);
      return;
    }

    // Un clic, una tecla o un toque saltan la intro.
    const skip = () => tl.progress(1);
    const opts: AddEventListenerOptions = { once: true };
    window.addEventListener('pointerdown', skip, opts);
    window.addEventListener('keydown', skip, opts);
    destroyRef.onDestroy(() => {
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
      tl.kill();
      this.intro.finish();
    });
  }
}
