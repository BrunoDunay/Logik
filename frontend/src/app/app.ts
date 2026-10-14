import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClickPulse } from './components/click-pulse/click-pulse';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ClickPulse],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<router-outlet /><app-click-pulse />`,
})
export class App {}
