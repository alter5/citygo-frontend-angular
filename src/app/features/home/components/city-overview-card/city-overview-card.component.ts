import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-city-overview-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: "./city-overview-card.component.html",
  styleUrls: ['./city-overview-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityOverviewCardComponent { }
