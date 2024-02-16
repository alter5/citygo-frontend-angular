import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, type OnInit } from "@angular/core"
import { FormCreateTripComponent } from "../form-create-trip/form-create-trip.component"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"

@Component({
  selector: "app-page-create-trip",
  standalone: true,
  imports: [CommonModule, FormCreateTripComponent],
  templateUrl: "./page-create-trip.component.html",
  styleUrls: ["./page-create-trip.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageCreateTripComponent implements OnInit {
  tripFormGroup: FormGroup = new FormGroup({})

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.tripFormGroup = this.formBuilder.group({
      name: ["", Validators.required],
      state: ["", Validators.required],
      population: ["", Validators.required],
      sights: this.formBuilder.array([])
    })
  }
}
