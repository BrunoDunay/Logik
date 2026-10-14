import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Notificación de Meta Ads tal como llega al celular (es un fragmento de interfaz real: `data-ui`).
 * Las cifras son las de las capturas que Logik publica en sus historias de "Resultados".
 */
@Component({
  selector: 'app-meta-notification',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-ui': '', role: 'img', '[attr.aria-label]': 'label()' },
  template: `
    <span class="app" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M5.6 15.9c0 1.2.3 2 .8 2.5.6.6 1.5.5 2.3-.3.9-.9 2-2.8 2.9-4.3l1.2-2c1-1.5 2.2-3.3 3.6-3.3 1.9 0 3.4 2.2 3.4 5.5 0 2-.8 3.1-2.2 3.1-1.3 0-2-.9-3.2-3l-1.1-1.9-.7 1.1.8 1.4c1.4 2.4 2.5 3.7 4.3 3.7 2.3 0 3.6-1.9 3.6-4.6 0-4.3-2.2-7.3-5.1-7.3-1.8 0-3.2 1.3-4.6 3.4-1.5-2.1-2.7-3.4-4.4-3.4-2.8 0-4.9 3.6-4.9 7.3Zm1.6-.1c0-2.7 1.4-5.6 3.2-5.6 1 0 1.8.8 3 2.6l-1.3 2c-1.2 2-2 3.1-2.9 3.1-1.3 0-2-.8-2-2.1Z"/></svg>
    </span>
    <span class="body" aria-hidden="true">
      <span class="top"><span class="title">Tu anuncio tiene buen rendimiento</span><span class="time">{{ time() }}</span></span>
      <span class="text">El costo por resultado es un {{ percent() }} % más bajo que el de negocios como el tuyo.</span>
    </span>
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.75rem;
      align-items: start;
      padding: 0.85rem 1rem;
      border-radius: var(--radius-ui);
      background: var(--color-ui);
      color: var(--color-ui-text);
      box-shadow: var(--shadow-float);
      font-size: 0.9375rem;
      line-height: 1.3;
      letter-spacing: -0.01em;
    }
    .app {
      display: grid;
      place-items: center;
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 0.6rem;
      background: var(--color-ui-brand);
      color: var(--color-ui);
    }
    .body { display: grid; gap: 0.15rem; min-width: 0; }
    .top { display: flex; justify-content: space-between; gap: 0.75rem; }
    .title { font-weight: 600; }
    .time { flex: none; color: var(--color-ui-soft); font-size: 0.8125rem; }
    .text { color: var(--color-ui-text); }
  `,
})
export class MetaNotification {
  readonly percent = input.required<number>();
  readonly time = input('ahora');
  protected label = () =>
    `Notificación de Meta Ads: el costo por resultado es un ${this.percent()} % más bajo que el de negocios similares.`;
}
