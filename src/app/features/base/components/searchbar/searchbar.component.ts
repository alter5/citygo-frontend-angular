import { Component, OnInit } from "@angular/core"
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { Observable } from "rxjs"
import { startWith, map } from "rxjs/operators"
import { MatOptionModule } from "@angular/material/core";
import { NgFor, AsyncPipe } from "@angular/common";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { CitiesService } from "src/app/shared/services/cities.service";

@Component({
    selector: "app-searchbar",
    templateUrl: "./searchbar.component.html",
    styleUrls: ["./searchbar.component.scss"],
    standalone: true,
    imports: [FormsModule, MatAutocompleteModule, ReactiveFormsModule, NgFor, MatOptionModule, AsyncPipe]
})
export class SearchBarComponent implements OnInit {
  control = new FormControl("")
  // streets: string[] = [
  //   "Champs-Élysées",
  //   "Lombard Street",
  //   "Abbey Road",
  //   "Fifth Avenue"
  // ]
  dropdownOptions: Observable<string[]> | undefined

  ngOnInit() {
    this.dropdownOptions = this.control.valueChanges.pipe(
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
