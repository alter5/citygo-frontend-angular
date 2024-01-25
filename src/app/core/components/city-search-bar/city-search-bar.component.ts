import { AfterContentInit, Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { SearchBarComponent } from "src/app/shared/components/searchbar/search-bar.component"
import { CitiesService } from "src/app/shared/services/cities.service"
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap
} from "rxjs"
import { City } from "src/app/shared/models/city.model"
import { DropdownOption } from "src/app/shared/components/searchbar/dropdown-option.model"
import { FormControl } from "@angular/forms"
import { Router } from "@angular/router"

@Component({
  selector: "app-city-search-bar",
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: "./city-search-bar.component.html",
  styleUrls: ["./city-search-bar.component.scss"]
})
export class CitySearchBarComponent implements OnInit {
  formControl: FormControl = new FormControl("")
  dropdownOptions$: Observable<DropdownOption[]> = new Observable<
    DropdownOption[]
  >()

  constructor(private router: Router, private citiesService: CitiesService) {}

  ngOnInit(): void {
    this.dropdownOptions$ = this.formControl.valueChanges.pipe(
      startWith(""),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchText: string) => {
        return this.getDropdownOptions(searchText)
      })
    )
  }

  private getDropdownOptions(searchText: string): Observable<DropdownOption[]> {
    let cities$ = null
    if (searchText === "") {
      cities$ = this.citiesService.getMostPopulousCities()
    } else {
      cities$ = this.citiesService.getCitiesContainingString(searchText)
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
    console.log(value)
    if (value === null) {
      return ""
    }
    return value.toLowerCase().replace(/[^\w\s]/g, "")
  }

  onSelectedCity(selectedDropdownOption: DropdownOption) {
    console.log("🚀 ~ CitySearchBarComponent ~ onSelectedCity ~ onSelectedCity:")
    console.log(selectedDropdownOption.id)
    this.router.navigate(["/search", selectedDropdownOption.id])
  }
}
