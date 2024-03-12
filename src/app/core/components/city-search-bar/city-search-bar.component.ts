import { AfterContentInit, Component, Input, OnInit, Output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { InputAutocompleteComponent } from "src/app/shared/components/input-autocomplete/input-autocomplete.component"
import { CitiesService } from "src/app/shared/services/cities.service"
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap
} from "rxjs"
import { City } from "src/app/shared/models/city.model"
import { DropdownOption } from "src/app/shared/components/input-autocomplete/dropdown-option.model"
import { FormControl } from "@angular/forms"
import { EventEmitter } from "@angular/core"

@Component({
  selector: "app-city-search-bar",
  standalone: true,
  imports: [CommonModule, InputAutocompleteComponent],
  templateUrl: "./city-search-bar.component.html",
  styleUrls: ["./city-search-bar.component.scss"]
})
export class CitySearchBarComponent implements OnInit {
  @Input() inputFormControl!: FormControl
  dropdownOptions$: Observable<DropdownOption[]> | undefined
  @Output() citySelected = new EventEmitter<DropdownOption>()

  constructor(private citiesService: CitiesService) {}

  ngOnInit(): void {
    // TODO: Add input property for returning only city id in formcontrol. If no city selected, add red border to input field
    if (this.inputFormControl === undefined) {
      this.inputFormControl = new FormControl("")
    }
    this.dropdownOptions$ = this.inputFormControl.valueChanges.pipe(
      startWith(this.inputFormControl ? this.inputFormControl.value : ""),
      debounceTime(300),
      distinctUntilChanged(),
      map((val: string | DropdownOption) => {
        if (typeof val === "string") {
          return val
        } else {
          // A dropdown option was selected in the autocomplete
          val = val as DropdownOption
          return val.textToDisplay
        }
      }),
      switchMap((searchText: string) => {
        return this.getDropdownOptions(searchText)
      })
    )
  }

  private getDropdownOptions(searchText: string): Observable<DropdownOption[]> {
    let cities$ = null
    if (searchText !== "") {
      cities$ = this.citiesService.getCitiesContainingString(searchText)
    } else {
      cities$ = this.citiesService.getMostPopulousCities()
    }

    return cities$.pipe(
      map((cities: City[]) => {
        return this.mapCitiesToDropdownOptions(cities)
      })
    )
  }

  private mapCitiesToDropdownOptions(cities: City[]): DropdownOption[] {
    return cities.map((city) => ({
      id: city.id,
      textToDisplay: city.city_name
    }))
  }

  private normalizeString(value: string): string {
    if (value === null) {
      return ""
    }
    return value.toLowerCase().replace(/[^\w\s]/g, "")
  }

  onSelectedCity(selectedDropdownOption: DropdownOption) {
    this.citySelected.emit(selectedDropdownOption)
  }
}
