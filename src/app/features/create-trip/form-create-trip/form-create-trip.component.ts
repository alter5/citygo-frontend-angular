import { Component, Input, Output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormGroup, FormArray, ReactiveFormsModule } from "@angular/forms"
import { InputAutocompleteComponent } from "src/app/shared/components/input-autocomplete/input-autocomplete.component"
import { FormControlPipe } from "src/app/shared/pipes/form-control.pipe"
import { EventEmitter } from "@angular/core"
import { InputLargeComponent } from "src/app/shared/components/input-large/input-large.component"
import { InputRatingComponent } from "src/app/shared/components/input-rating/input-rating.component"
import { InputDraggableOptionsComponent } from "src/app/shared/components/input-draggable-options/input-draggable-options.component"
import { FormArrayPipe } from "src/app/shared/pipes/form-array.pipe"
import { InputBasicComponent } from "src/app/shared/components/input-basic/input-basic.component"
import { CitySearchBarComponent } from "src/app/core/components/city-search-bar/city-search-bar.component"

@Component({
  selector: "app-form-create-trip",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputAutocompleteComponent,
    FormControlPipe,
    FormArrayPipe,
    InputLargeComponent,
    InputRatingComponent,
    InputDraggableOptionsComponent,
    InputBasicComponent,
    CitySearchBarComponent
  ],
  templateUrl: "./form-create-trip.component.html",
  styleUrls: ["./form-create-trip.component.scss"]
})
export class FormCreateTripComponent {
  @Input() tripFormGroup!: FormGroup
  @Output() clickedAddDestination = new EventEmitter<void>()

  get destinations() {
    return this.tripFormGroup.get("destinations") as FormArray
  }

  onClickAddDestination() {
    this.clickedAddDestination.emit()
  }

  onSubmit() {;}
}
