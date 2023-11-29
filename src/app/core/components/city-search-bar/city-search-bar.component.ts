import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { SearchBarComponent } from "src/app/shared/components/searchbar/search-bar.component"
import { CitiesService } from "src/app/shared/services/cities.service"
import { Observable, map } from "rxjs"
import { City } from "src/app/shared/models/city.model"
import { DropdownOption } from "src/app/shared/components/searchbar/dropdown-option.model"
import { FormControl } from "@angular/forms"

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

  constructor(private citiesService: CitiesService) {}

  ngOnInit(): void {
    // TODO: Check if the searchbar component emits empty string upon initialization
    this.updateDropdownOptions("")

    this.formControl.valueChanges.subscribe((text) => {
      text = this.normalizeString(text)
      this.updateDropdownOptions(text)
    })
  }

  private updateDropdownOptions(searchText: string) {
    if (searchText === "") {
      // TODO: Return list of most populous cities instead
      searchText = "New Yo"
    }

    // return list of most populous cities
    const cities$ = this.citiesService.getCitiesContainingString(searchText)

    this.dropdownOptions$ = cities$.pipe(
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
}
