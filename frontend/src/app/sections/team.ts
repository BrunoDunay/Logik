import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReadMore } from '../components/read-more/read-more';
import { Reveal } from '../components/reveal/reveal.directive';
import { SectionHeading } from '../components/section-heading/section-heading';
import { TeamSettings } from '../core/types/settings.model';

/** Las directoras: foto que pasa de blanco y negro a color al pasar el cursor, rol, resumen y "Leer más". */
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
            <li class="member" [appReveal]="i % 2 ? 'right' : 'left'">
              <figure class="member__photo">
                <img [src]="m.photo" [alt]="m.name" width="680" height="1020" loading="lazy" decoding="async" />
                <span class="member__role">{{ m.role }}</span>
              </figure>
              <div class="member__text">
                <h3 class="member__name">{{ m.name }}</h3>
                <app-read-more [more]="m.more">
                  <p>{{ m.summary }}</p>
                </app-read-more>
              </div>
            </li>
          }
        </ul>
        @if (c.groupPhoto) {
          <figure class="group" appReveal="zoom">
            <img [src]="c.groupPhoto" [alt]="c.groupCaption ?? 'El equipo de Logik'" width="562" height="1000" loading="lazy" decoding="async" />
            <figcaption>
              <span class="script">el</span>
              <strong>Marke-team</strong>
              <span>{{ c.groupCaption }}</span>
            </figcaption>
          </figure>
        }
      </div>
    </section>
  `,
  styleUrl: './team.css',
})
export class Team {
  readonly content = input.required<TeamSettings>();
}
