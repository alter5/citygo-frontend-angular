import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-page-create-trip',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './page-create-trip.component.html',
  styleUrls: ['./page-create-trip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageCreateTripComponent implements OnInit {

  ngOnInit(): void { }

}
