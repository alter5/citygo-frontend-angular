import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-create-trip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-create-trip.component.html',
  styleUrls: ['./form-create-trip.component.scss']
})
export class FormCreateTripComponent {
  @Input() tripFormGroup: FormGroup | undefined
}
