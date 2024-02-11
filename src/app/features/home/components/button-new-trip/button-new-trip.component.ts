import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"

@Component({
  selector: 'app-button-new-trip',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './button-new-trip.component.html',
  styleUrls: ['./button-new-trip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonNewTripComponent implements OnInit {

  ngOnInit(): void {
    ;
   }

}
