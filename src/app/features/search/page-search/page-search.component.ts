import { CommonModule } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  type OnInit
} from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { Subscription } from "rxjs"
import { City } from "src/app/shared/models/city.model"
import { CitiesService } from "src/app/shared/services/cities.service"

@Component({
  selector: "app-page-search",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./page-search.component.html",
  styleUrls: ["./page-search.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageSearchComponent implements OnInit, OnDestroy {
  cityId: number | undefined
  city: City | null = null
  citySubscription: Subscription | undefined

  // Use this to add maps: https://github.com/angular/components?tab=readme-ov-file

  paramsSubscription$: Subscription | undefined

  constructor(private route: ActivatedRoute, private citiesService: CitiesService) {}

  ngOnInit(): void {
    this.paramsSubscription$ = this.route.params.subscribe((params) => {
      const id = Number(params["cityId"])
      this.changeCity(id)
    })
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription$) {
      this.paramsSubscription$.unsubscribe()
    }

    if (this.citySubscription) {
      this.citySubscription.unsubscribe()
    }
  }

  changeCity(cityId: number): void {
    this.cityId = cityId
    console.log(this.cityId)

    this.citySubscription = this.citiesService.getCityById(this.cityId).subscribe((city)=>{
      this.city = city
      console.log("City:", city)
      console.log("this.city:", city)
    })
  }
}
