import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-page-city",
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-city.component.html',
  styleUrls: ['./page-city.component.scss']
})
export class PageCityComponent {
  cityId: number | undefined;

  constructor(private route: ActivatedRoute) { }

  OnInit(): void {
    this.route.params.subscribe(params => {
      this.cityId = Number(params['id']);
    });
  }
}
