import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { Observable } from "rxjs"
import { startWith, map } from "rxjs/operators"
import { MatOptionModule } from "@angular/material/core"
import { NgFor, AsyncPipe } from "@angular/common"
import { MatAutocompleteModule } from "@angular/material/autocomplete"
import { CitiesService } from "src/app/shared/services/cities.service"

// TOOD: Look at the new Angular documentation
/* TODO: Implement these features for the search bar
Starting input string as input
Callback method on text change. This component should be able to return the current input.
    Should emitter be used?
Callback method on dropdown click
    Return id of city
Input: text in search bar
Then, create CitiesSearchBar
  SearchBar should be given "" as starting input
  Should give string[] of cities on text change
  On dropdown click

New
Searchbar:
  State:
    (Output) CurrentText
      - Let the searchbar handle the current text
        -- The parent component should use this to generate a new list of cities
    (Input) StartingInput
      - Use in onInit
    (Input) DropdownOptions
      - ID of city needs to be binded
*/

@Component({
  selector: "app-searchbar",
  templateUrl: "./searchbar.component.html",
  styleUrls: ["./searchbar.component.scss"],
  standalone: true,
  imports: [
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    MatOptionModule,
    AsyncPipe
  ]
})
export class SearchBarComponent implements OnInit {
  // @Input({required: true}) startingText = ""
  @Input() startingText = ""
  currentText = new FormControl("")
  dropdownOptions: Observable<string[]> | undefined
  @Output() textChanged: EventEmitter<string> = new EventEmitter<string>()
  @Output() citySelected: EventEmitter<object> = new EventEmitter<object>()

  selectedCity: number | undefined

  constructor(private citiesService: CitiesService) {}

  ngOnInit() {
    this.currentText.setValue(this.startingText)
    this.currentText.valueChanges.subscribe((text) => {
      if (text === null) {
        this.textChanged.emit("")
      } else {
        this.textChanged.emit(text)
      }
    })
    this.dropdownOptions = this.currentText.valueChanges.pipe(
      startWith(""),
      map((searchTerm) => this.updateAutocompleteResults(searchTerm || ""))
    )
  }

  private updateAutocompleteResults(searchTerm: string): string[] {
    if (searchTerm === "") {
      // Return a list of the most populous cities
    } else {
      const searchTerm = this.normalizeString(searchTerm)
      return
    }
  }

  private normalizeString(value: string): string {
    return value.toLowerCase().replace(/\s/g, "")
  }
}
