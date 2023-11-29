import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core"
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { Observable } from "rxjs"
import { startWith, map } from "rxjs/operators"
import { MatOptionModule } from "@angular/material/core"
import { NgFor, NgIf, AsyncPipe } from "@angular/common"
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
    NgIf,
    MatOptionModule,
    AsyncPipe
  ]
})
export class SearchBarComponent implements OnInit {
  // @Input({required: true}) startingText = ""
  @Input() formControl!: FormControl;
  @Input() dropdownOptions: DropdownOption[] | null = []
  @Output() dropdownOptionSelected: EventEmitter<object> = new EventEmitter<object>()

  ngOnInit() {
    ;
  }

}
