import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

/**
 * Estado de la intro del logo. `index.html` pone `html.intro-pending` antes de pintar;
 * el hero la reproduce y llama a `finish()`. El navbar espera a `done()` para construir su logo.
 */
@Injectable({ providedIn: 'root' })
export class IntroService {
  private readonly root = inject(DOCUMENT).documentElement;
  readonly done = signal(!this.root.classList.contains('intro-pending'));

  constructor() {
    // Si el tiempo de seguridad de index.html quita la clase, también cuenta como terminada.
    if (this.done() || typeof MutationObserver === 'undefined') return;
    const observer = new MutationObserver(() => {
      if (this.root.classList.contains('intro-pending')) return;
      this.done.set(true);
      observer.disconnect();
    });
    observer.observe(this.root, { attributes: true, attributeFilter: ['class'] });
  }

  finish(): void {
    this.root.classList.remove('intro-pending');
    try {
      sessionStorage.setItem('logik-intro-visto', '1');
    } catch {
      /* sin almacenamiento (modo privado): la intro se vuelve a ver la próxima vez */
    }
    this.done.set(true);
  }
}
