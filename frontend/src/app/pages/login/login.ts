import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Logo } from '../../components/logo/logo';
import { AuthService } from '../../core/services/auth.service';
import { SeoService } from '../../core/services/seo.service';

/** Inicio de sesión del panel. */
@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="login">
      <form class="card" (submit)="submit($event)">
        <a routerLink="/" class="card__logo" aria-label="Volver al sitio"><app-logo [glow]="false" /></a>
        <h1>Panel de contenido</h1>
        <p class="card__hint">Edita los textos, fotos y datos del sitio.</p>
        <label>
          <span>Correo</span>
          <input type="email" name="email" autocomplete="username" [(ngModel)]="email" required />
        </label>
        <label>
          <span>Contraseña</span>
          <input type="password" name="password" autocomplete="current-password" [(ngModel)]="password" required />
        </label>
        @if (error()) {
          <p class="card__error" role="alert">{{ error() }}</p>
        }
        <button type="submit" [disabled]="loading()">{{ loading() ? 'Entrando…' : 'Entrar' }}</button>
      </form>
    </main>
  `,
  styles: `
    .login { display: grid; place-items: center; min-height: 100svh; padding: var(--gutter); background: var(--color-ink); }
    .card { display: grid; gap: var(--space-4); width: min(100%, 25rem); padding: var(--space-7) var(--space-6); border-radius: var(--radius-lg); background: var(--color-white); box-shadow: var(--shadow-lg); animation: page-in 500ms var(--ease-out); }
    .card__logo { width: 9rem; }
    h1 { font-size: 1.8rem; }
    .card__hint { color: var(--color-text-soft); font-size: var(--text-sm); margin-top: calc(var(--space-3) * -1); }
    label { display: grid; gap: var(--space-1); }
    label span { font-size: var(--text-sm); font-weight: 600; }
    input { min-height: 3rem; padding: 0.7rem 0.9rem; border: 1.5px solid var(--color-line); border-radius: var(--radius-sm); font-size: 1rem; transition: border-color var(--duration-fast) ease, box-shadow var(--duration-fast) ease; }
    input:focus { outline: none; border-color: var(--color-pink-logo); box-shadow: 0 0 0 4px rgb(254 95 146 / 0.16); }
    .card__error { color: #8e1c1c; font-weight: 600; font-size: var(--text-sm); }
    button { min-height: 3.25rem; border: 0; border-radius: var(--radius-pill); background: var(--color-ink); color: var(--color-white); font-weight: 600; transition: background-color var(--duration-fast) ease, transform var(--duration-press) var(--ease-out); }
    button:hover:not(:disabled) { background: var(--color-pink-logo); color: var(--color-ink); }
    button:active { transform: scale(0.97); }
    button:disabled { opacity: 0.6; }
  `,
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected email = '';
  protected password = '';
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  constructor() {
    inject(SeoService).setPage({ title: 'Entrar al panel · Logik Marketing', noindex: true });
  }

  protected submit(event: Event): void {
    event.preventDefault();
    this.loading.set(true);
    this.error.set(null);
    this.auth.login(this.email, this.password).subscribe({
      next: () => void this.router.navigate(['/panel']),
      error: (e: unknown) => {
        this.loading.set(false);
        this.error.set(
          e instanceof HttpErrorResponse && e.status !== 0 ? (e.error?.error?.message ?? 'No se pudo entrar.') : 'No hay conexión con el servidor.',
        );
      },
    });
  }
}
