import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, input, viewChild } from '@angular/core';
import { Icon, IconName } from '../components/icon/icon';
import { Logo } from '../components/logo/logo';
import { HeroSettings } from '../core/types/settings.model';

export interface SocialLink {
  icon: IconName;
  label: string;
  href: string;
}

const INTRO_SEEN = 'logik-intro-visto';

/**
 * Portada al estilo de la referencia "TURA": negro con una luz suave arriba y el logo como texto principal.
 * Antes de mostrar el sitio, el logo se construye (líneas guía → contorno → relleno → flecha) y se queda aquí.
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
  private readonly sparkEl = viewChild.required<ElementRef<HTMLElement>>('spark');
  private readonly document = inject(DOCUMENT);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const root = this.document.documentElement;
      if (!root.classList.contains('intro-pending')) return;
      void this.playIntro(destroyRef);
    });
  }

  private async playIntro(destroyRef: DestroyRef): Promise<void> {
    const root = this.document.documentElement;
    const finish = () => {
      root.classList.remove('intro-pending');
      try {
        sessionStorage.setItem(INTRO_SEEN, '1');
      } catch {
        /* sin almacenamiento (modo privado): la intro se vuelve a ver la próxima vez */
      }
    };

    const { gsap } = await import('gsap');
    const host = this.logoEl().nativeElement;
    const q = (sel: string) => Array.from(host.querySelectorAll<SVGElement>(sel));
    const letters = q('.logo__letter');
    const subs = q('.logo__sub');
    const arrow = q('.logo__arrow-wrap');
    // La flecha crece desde su esquina inferior izquierda (donde nace de la K), en coordenadas del dibujo.
    const box = (host.querySelector('.logo__arrow') as SVGGraphicsElement).getBBox();
    const arrowOrigin = `${box.x} ${box.y + box.height}`;
    const guides = q('[data-guide]');
    const guideGroup = q('.logo__guides');

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        gsap.set([...letters, ...subs, ...arrow, ...guides, ...guideGroup, this.sparkEl().nativeElement], { clearProps: 'all' });
        finish();
      },
    });

    gsap.set(letters, { fillOpacity: 0, strokeWidth: 1.4, strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(arrow, { opacity: 1, scale: 0, svgOrigin: arrowOrigin });
    gsap.set(subs, { opacity: 0, y: 14 });

    if (/[?&]intro=lento/.test(location.search)) tl.timeScale(0.25);

    tl.fromTo(this.sparkEl().nativeElement, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)' }, 0)
      .to(guideGroup, { opacity: 1, duration: 0.3 }, 0.3)
      .to(guides, { strokeDashoffset: 0, duration: 0.8, stagger: 0.07, ease: 'power2.inOut' }, 0.3)
      .to(this.sparkEl().nativeElement, { scale: 6, opacity: 0, duration: 0.9, ease: 'power2.out' }, 0.55)
      .to(letters, { strokeDashoffset: 0, duration: 0.95, stagger: 0.12, ease: 'power2.inOut' }, 0.7)
      .to(letters, { fillOpacity: 1, duration: 0.5, stagger: 0.08 }, 1.55)
      .to(letters, { strokeWidth: 0, duration: 0.4 }, 2.05)
      .to(arrow, { scale: 1, duration: 0.75, ease: 'back.out(1.7)' }, 1.85)
      .to(subs, { opacity: 1, y: 0, duration: 0.5, stagger: 0.04 }, 2.15)
      .to(guideGroup, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 2.45);

    // Para revisar la animación: "?intro=t1.2" la congela en el segundo 1.2.
    const freeze = /[?&]intro=t(\d+(?:\.\d+)?)/.exec(location.search);
    if (freeze) {
      tl.pause(Number(freeze[1]));
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
      finish();
    });
  }
}
