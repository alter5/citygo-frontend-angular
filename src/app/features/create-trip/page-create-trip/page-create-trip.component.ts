import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, type OnInit } from "@angular/core"
import { FormCreateTripComponent } from "../form-create-trip/form-create-trip.component"
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  AbstractControl
} from "@angular/forms"
import { Trip } from "src/app/shared/models/trip.model"

import { CitiesService } from "src/app/shared/services/cities.service"
import { TripCreationPayload } from "../models/tripCreationPaylod.model"
import { ChangeDetectorRef } from "@angular/core"

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

  constructor(
    private formBuilder: FormBuilder,
    private citiesService: CitiesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tripFormGroup = this.formBuilder.group({
      title: ["hi", Validators.required],
      city_id: ["", Validators.required],
      // TODO: Delete the extra destination
      destinations: this.formBuilder.array(["", "", ""]),
      description: ["", Validators.required],
      price_range: [3, Validators.required],
      duration: [3, Validators.required]
    })
  }

  get destinations() {
    return this.tripFormGroup.get("destinations") as FormArray
  }

  addDestination() {
    this.destinations.push(this.formBuilder.control(""))
  }

  onSubmit(): void {
    if (this.tripFormGroup.invalid) {
      return
    }

    const formData = this.tripFormGroup.value

    const payload: TripCreationPayload = {
      title: formData.title,
      city_id: formData.city_id,
      destinations: formData.destinations,
      description: formData.description,
      price_range: formData.price_range,
      duration: formData.duration
    }

    console.log("🚀 ~ PageCreateTripComponent ~ onSubmit ~ payload:", payload)
  }
}
