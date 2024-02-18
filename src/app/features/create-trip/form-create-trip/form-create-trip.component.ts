import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormGroup, FormArray, ReactiveFormsModule } from "@angular/forms"
import { InputAutocompleteComponent } from "src/app/shared/components/input-autocomplete/input-autocomplete.component"
import { FormControlPipe } from "src/app/shared/pipes/form-control.pipe"

@Component({
  selector: "app-form-create-trip",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputAutocompleteComponent, FormControlPipe],
  templateUrl: "./form-create-trip.component.html",
  styleUrls: ["./form-create-trip.component.scss"]
})
export class FormCreateTripComponent {
  @Input() tripFormGroup!: FormGroup

  get destinations() {
    return this.tripFormGroup.get("destinations") as FormArray
  }

  onSubmit() {;}
}
