import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core"
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { Observable } from "rxjs"
import { startWith, map } from "rxjs/operators"
import { MatOptionModule } from "@angular/material/core"
import { NgFor, AsyncPipe } from "@angular/common"
import { MatAutocompleteModule } from "@angular/material/autocomplete"
import { DropdownOption } from "./dropdown-option.model"
// import { ng}

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
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
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
export class SearchBarComponent implements OnInit, OnChanges {
  // @Input({required: true}) startingText = ""
  @Input() currentText = ""
  @Input() dropdownOptions: DropdownOption[] | null = []
  @Output() textChanged: EventEmitter<string> = new EventEmitter<string>()
  @Output() citySelected: EventEmitter<object> = new EventEmitter<object>()

  formControl = new FormControl("")
  selectedCity: number | undefined

  ngOnInit() {
    this.formControl.valueChanges.subscribe((text) => {
      if (text === null) {
        this.textChanged.emit("")
      } else {
        this.textChanged.emit(this.normalizeString(text))
      }
    })
  }

  ngOnChanges(): void {
    // Update the text in the input field without triggering the valueChanges callback function
    this.formControl.patchValue(this.currentText)
  }

  private normalizeString(value: string): string {
    return value.toLowerCase().replace(/\s/g, "")
  }
}
