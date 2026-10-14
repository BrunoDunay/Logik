type Gsap = typeof import('gsap').gsap;
type Timeline = ReturnType<Gsap['timeline']>;

export interface BuildOptions {
  /** Segundos que tarda la luz en recorrer LOGIK. */
  sweep?: number;
}

/**
 * Construye el logo que está dentro de `host`:
 * 1. una luz recorre LOGIK de izquierda a derecha y las letras aparecen a su paso;
 * 2. la flecha llega en diagonal y termina de formar la K, con un destello al encajar;
 * 3. MARKETING se revela con un barrido más corto.
 * Devuelve la línea de tiempo para combinarla con lo demás (el fondo, el resto del sitio).
 */
export function buildLogo(gsap: Gsap, host: HTMLElement, options: BuildOptions = {}): Timeline {
  const t = options.sweep ?? 1.5;
  const svg = host.querySelector('svg')!;
  const big = svg.querySelector<SVGGElement>('.logo__big')!;
  const small = svg.querySelector<SVGGElement>('.logo__small')!;
  const letters = Array.from(svg.querySelectorAll<SVGElement>('.logo__letter, .logo__sub'));
  const arrow = svg.querySelector<SVGGElement>('.logo__arrow-wrap')!;
  const [maskBig, maskSmall] = Array.from(svg.querySelectorAll<SVGMaskElement>('[data-logo-mask]'));
  const glow = svg.querySelector<SVGGElement>('.logo__glow');
  const gradient = svg.querySelector<SVGRadialGradientElement>('[data-logo="glow-gradient"]')!;
  const tip = (svg.querySelector('.logo__arrow') as SVGGraphicsElement).getBBox();

  const tl = gsap.timeline({
    onComplete: () => {
      big.removeAttribute('mask');
      small.removeAttribute('mask');
      gsap.set([...letters, arrow], { clearProps: 'all' });
      if (glow) gsap.set(glow, { clearProps: 'all' });
    },
  });

  /** Barrido de una máscara; si hay destello, su centro viaja con el borde de la luz. */
  const sweep = (group: SVGGElement, mask: SVGMaskElement, to: number, cy: number, duration: number) => {
    const fill = mask.querySelector('[data-fill]')!;
    const edge = mask.querySelector('[data-edge]')!;
    const p = { edge: -200 };
    const paint = () => {
      fill.setAttribute('width', String(Math.max(0, p.edge + 60)));
      edge.setAttribute('x', String(p.edge));
      if (glow) {
        gradient.setAttribute('cx', String(p.edge + 70));
        gradient.setAttribute('cy', String(cy));
      }
    };
    group.setAttribute('mask', `url(#${mask.id})`);
    paint();
    return gsap.to(p, { edge: to, duration, ease: 'power2.inOut', onUpdate: paint });
  };

  // Estado inicial: las letras quedan ocultas por sus máscaras y la flecha fuera de su lugar.
  gsap.set(letters, { fillOpacity: 1, opacity: 1 });
  gsap.set(arrow, { opacity: 0, x: -150, y: 150 });
  if (glow) gsap.set(glow, { transition: 'none', opacity: 1 });

  tl.add(sweep(big, maskBig, 940, 110, t), 0)
    .to(arrow, { opacity: 1, duration: 0.3, ease: 'none' }, t - 0.2)
    .to(arrow, { x: 0, y: 0, duration: 0.85, ease: 'expo.out' }, t - 0.2)
    .add(sweep(small, maskSmall, 980, 270, 0.75), t + 0.45);

  if (glow) {
    // El destello salta a la punta de la flecha cuando encaja, y luego se apaga.
    tl.call(() => {
      gradient.setAttribute('cx', String(tip.x + tip.width * 0.7));
      gradient.setAttribute('cy', String(tip.y + tip.height * 0.3));
    }, [], t + 0.2)
      .fromTo(glow, { opacity: 0.4 }, { opacity: 1, duration: 0.18, ease: 'power2.out' }, t + 0.2)
      .to(glow, { opacity: 0, duration: 0.9, ease: 'power2.inOut' }, t + 0.45);
  }

  return tl;
}
