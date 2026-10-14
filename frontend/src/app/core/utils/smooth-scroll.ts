/**
 * Scroll suave con GSAP para todos los enlaces internos (`href="#…"`) de la página:
 * arranca y frena con calma, y tarda más mientras más lejos está el destino.
 * Respeta "reducir movimiento" (salta directo). Devuelve la función para quitarlo.
 */
export function installSmoothScroll(offset = 72): () => void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  const onClick = async (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    const id = link?.getAttribute('href')?.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    history.replaceState(null, '', `#${id}`);

    const y = id === 'inicio' ? 0 : target.getBoundingClientRect().top + window.scrollY - offset;
    if (reduced.matches) {
      window.scrollTo(0, y);
      return;
    }
    const [{ gsap }, { ScrollToPlugin }] = await Promise.all([import('gsap'), import('gsap/ScrollToPlugin')]);
    gsap.registerPlugin(ScrollToPlugin);
    const distance = Math.abs(y - window.scrollY);
    const duration = Math.min(1.8, 0.7 + distance / 4000);
    gsap.to(window, { scrollTo: { y, autoKill: true }, duration, ease: 'power3.inOut' });
  };

  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}
