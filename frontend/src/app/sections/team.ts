import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReadMore } from '../components/read-more/read-more';
import { Reveal } from '../components/reveal/reveal.directive';
import { SectionHeading } from '../components/section-heading/section-heading';
import { TeamSettings } from '../core/types/settings.model';

/**
 * Las directoras: foto mediana que pasa de blanco y negro a color al pasar el cursor, su puesto,
 * su biografía original (resumen y "Leer más") y las insignias de sus certificaciones.
 */
@Component({
  selector: 'app-team',
  imports: [ReadMore, Reveal, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let c = content();
    <section class="team" id="equipo" aria-labelledby="team-title">
      <div class="wrap">
        <app-section-heading [title]="c.title" [script]="c.script" [intro]="c.intro" align="center" headingId="team-title" />
        <ul class="members" role="list">
          @for (m of c.members; track m.name; let i = $index) {
            <li class="member" appReveal="up" [revealDelay]="i * 150">
              <figure class="member__photo">
                <img [src]="m.photo" [alt]="m.name" width="680" height="850" loading="lazy" decoding="async" />
                <figcaption class="member__role">{{ m.role }}</figcaption>
              </figure>
              <div class="member__text">
                <h3 class="member__name">{{ m.name }}</h3>
                @if (m.badges.length) {
                  <ul class="badges" role="list" aria-label="Certificaciones">
                    @for (b of m.badges; track b.label) {
                      <li class="badge">
                        <img [src]="b.image" [alt]="b.label" width="96" height="96" loading="lazy" decoding="async" />
                        <span class="badge__label">{{ b.label }}</span>
                      </li>
                    }
                  </ul>
                }
                <app-read-more [more]="m.more">
                  <p>{{ m.summary }}</p>
                </app-read-more>
              </div>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styleUrl: './team.css',
})
export class Team {
  readonly content = input.required<TeamSettings>();
}
