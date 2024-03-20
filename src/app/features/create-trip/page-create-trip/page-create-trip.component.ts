import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, OnDestroy, type OnInit } from "@angular/core"
import { FormCreateTripComponent } from "../form-create-trip/form-create-trip.component"
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms"

import { CitiesService } from "src/app/shared/services/cities.service"
import { TripsService } from "src/app/shared/services/trips.service"
import { TripCreationDto } from "../models/tripCreationPayload.model"
import { ChangeDetectorRef } from "@angular/core"
import { BehaviorSubject, Subscription } from "rxjs"

import { OverlayLoadingComponent } from "src/app/shared/components/overlay-loading/overlay-loading.component"
import { Router } from "@angular/router"

@Component({
  selector: "app-page-create-trip",
  standalone: true,
  imports: [CommonModule, FormCreateTripComponent, OverlayLoadingComponent],
  templateUrl: "./page-create-trip.component.html",
  styleUrls: ["./page-create-trip.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageCreateTripComponent implements OnInit, OnDestroy {
  tripFormGroup: FormGroup = new FormGroup({})
  createTripResponseSubscription: Subscription | undefined
  isLoading = new BehaviorSubject<boolean>(false)

  constructor(
    private formBuilder: FormBuilder,
    private citiesService: CitiesService,
    private cdr: ChangeDetectorRef,
    private tripsService: TripsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tripFormGroup = this.formBuilder.group({
      title: ["New York in One Day", Validators.required],
      city_id: ["891", Validators.required],
      // TODO: Delete the extra destination
      destinations: this.formBuilder.array([
        "Times Square",
        "Empire State Bulding",
        "Statue of Liberty"
      ]),
      description: ["This is a fun trip!", Validators.required],
      price_range: [4, Validators.required],
      duration: [2, Validators.required]
    })
  }

  ngOnDestroy(): void {
    if (this.createTripResponseSubscription) {
      this.createTripResponseSubscription.unsubscribe()
    }
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

    const tripCreationDto: TripCreationDto = {
      title: formData.title,
      city_id: formData.city_id,
      destinations: formData.destinations,
      description: formData.description,
      price_range: formData.price_range,
      duration: formData.duration
    }

    this.isLoading.next(true)
    this.createTripResponseSubscription = this.tripsService
      .createTrip(tripCreationDto)
      .subscribe((success) => {
        this.isLoading.next(false)
        if (success) {
          this.router.navigate(["/"])
        } else {
          // Do nothing
        }
      })
  }
}
