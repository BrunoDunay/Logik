import Lenis from 'lenis';

/**
 * Scroll suave en toda la página con Lenis: la rueda del mouse y el trackpad se deslizan con inercia,
 * y los enlaces internos (`href="#…"`) viajan con calma, tardando más mientras más lejos está el destino.
 * Mientras corre la intro (html.intro-pending) el scroll queda detenido.
 * Devuelve la función para quitarlo.
 */
export function installSmoothScroll(offset = 72): () => void {
  const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
  const root = document.documentElement;

  let frame = 0;
  const raf = (time: number) => {
    if (root.classList.contains('intro-pending')) lenis.stop();
    else if (lenis.isStopped) lenis.start();
    lenis.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);

  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    const id = link?.getAttribute('href')?.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    history.replaceState(null, '', `#${id}`);
    const y = id === 'inicio' ? 0 : target.getBoundingClientRect().top + window.scrollY - offset;
    const distance = Math.abs(y - window.scrollY);
    lenis.scrollTo(y, {
      duration: Math.min(1.9, 0.8 + distance / 4000),
      easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    });
  };

  document.addEventListener('click', onClick);
  return () => {
    document.removeEventListener('click', onClick);
    cancelAnimationFrame(frame);
    lenis.destroy();
  };
}
