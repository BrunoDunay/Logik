import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icon } from '../components/icon/icon';
import { Reveal } from '../components/reveal/reveal.directive';
import { SectionHeading } from '../components/section-heading/section-heading';
import { ContactSettings } from '../core/types/settings.model';
import { whatsappLink } from '../core/utils/links';
import { SocialLink } from './hero';

/**
 * Contacto: datos y redes a la izquierda, sobre blanco; a la derecha, una tarjeta negra con un mini
 * formulario que arma el mensaje de WhatsApp (no hay servidor de correo: el mensaje sale del teléfono
 * de quien escribe). Cada red se llena con su color al pasar el cursor.
 */
@Component({
  selector: 'app-contact',
  imports: [FormsModule, Icon, Reveal, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let c = content();
    <section class="contact" id="contacto" aria-labelledby="contact-title">
      <div class="wrap contact__grid">
        <div class="contact__info">
          <app-section-heading [title]="c.title" [script]="c.script" [intro]="c.intro" headingId="contact-title" />
          <ul class="channels" role="list">
            <li appReveal>
              <a class="channel" [href]="whatsapp()" target="_blank" rel="noopener">
                <span class="channel__icon"><app-icon name="whatsapp" [size]="22" /></span>
                <span><small>WhatsApp</small>{{ c.phoneDisplay }}</span>
              </a>
            </li>
            @if (c.email) {
              <li appReveal [revealDelay]="80">
                <a class="channel" [href]="'mailto:' + c.email">
                  <span class="channel__icon"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M3.5 6.5h17v11h-17zM3.5 7l8.5 6 8.5-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /></svg></span>
                  <span><small>Correo</small>{{ c.email }}</span>
                </a>
              </li>
            }
            <li appReveal [revealDelay]="160">
              <span class="channel">
                <span class="channel__icon"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 21s-6.5-5.4-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.6 12 21 12 21Z M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" fill="none" stroke="currentColor" stroke-width="1.8" /></svg></span>
                <span><small>Estudio</small>{{ c.address ?? c.city }}</span>
              </span>
            </li>
          </ul>
          <ul class="socials" role="list">
            @for (s of socials(); track s.href; let i = $index) {
              <li appReveal [revealDelay]="200 + i * 70">
                <a [class]="'social social--' + s.icon" [href]="s.href" target="_blank" rel="noopener">
                  <span class="social__icon"><app-icon [name]="s.icon" [size]="18" /></span>
                  <span class="social__label">{{ s.label }}</span>
                </a>
              </li>
            }
          </ul>
        </div>

        <form class="form" (submit)="send($event)" appReveal="zoom">
          <p class="form__title">Escríbenos y te contestamos por WhatsApp</p>
          <label>
            <span>Tu nombre</span>
            <input name="name" autocomplete="name" [(ngModel)]="name" required />
          </label>
          <label>
            <span>Tu negocio</span>
            <input name="business" autocomplete="organization" [(ngModel)]="business" />
          </label>
          <label>
            <span>¿Qué necesitas?</span>
            <textarea name="message" rows="3" [(ngModel)]="message" placeholder="Redes, campañas, fotos, página web…"></textarea>
          </label>
          <button type="submit" class="form__send">
            Enviar por WhatsApp <app-icon name="whatsapp" [size]="20" />
          </button>
          @if (sent()) {
            <p class="form__ok" role="status">Se abrió WhatsApp con tu mensaje. ¡Gracias!</p>
          }
        </form>
      </div>
    </section>
  `,
  styleUrl: './contact.css',
})
export class Contact {
  readonly content = input.required<ContactSettings>();
  readonly socials = input<SocialLink[]>([]);

  protected name = '';
  protected business = '';
  protected message = '';
  protected readonly sent = signal(false);
  protected readonly whatsapp = computed(() => whatsappLink(this.content().whatsapp, this.content().whatsappMessage) ?? '#');

  protected send(event: Event): void {
    event.preventDefault();
    const lines = [
      `Hola Logik, soy ${this.name.trim() || 'un nuevo cliente'}${this.business.trim() ? ` de ${this.business.trim()}` : ''}.`,
      this.message.trim() || 'Quiero agendar mi consulta gratis.',
    ];
    const href = whatsappLink(this.content().whatsapp, lines.join(' '));
    if (href) window.open(href, '_blank', 'noopener');
    this.sent.set(true);
  }
}
