import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from 'src/app/shared/components/searchbar/search-bar.component';
import { CitiesService } from 'src/app/shared/services/cities.service';
import { Observable } from 'rxjs';
import { City } from 'src/app/shared/models/city.model';

@Component({
  selector: 'app-city-search-bar',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './city-search-bar.component.html',
  styleUrls: ['./city-search-bar.component.scss']
})
export class CitySearchBarComponent implements OnInit{

  dropdownOptions$: Observable<City>

  constructor(private citiesService: CitiesService){}

  ngOnInit(): void {
    // TODO: Check if the searchbar component emits empty string upon initialization
    // this.updateDropdownOptions("")
    ;
  }

  onTextChanged(searchText: string) {
    this.updateDropdownOptions(searchText)
  }

  updateDropdownOptions(searchText: string) {
// TODO: Use observable like this: https://nehalist.io/working-with-models-in-angular/
    // TODO: would there be a memory leak if I create a new observable in emit handler each time,
    //    instead of directly adding observable to template with async pipe?
    if (searchText === "") {
      // return list of most populous cities

    }
    else {
      // call cities service with text, and pass through input field the returned cities
    }
  }
}
