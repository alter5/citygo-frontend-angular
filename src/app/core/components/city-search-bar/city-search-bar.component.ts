import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from 'src/app/shared/components/searchbar/search-bar.component';

@Component({
  selector: 'app-city-search-bar',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './city-search-bar.component.html',
  styleUrls: ['./city-search-bar.component.scss']
})
export class CitySearchBarComponent {
  onTextChanged(searchText: string) {
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
