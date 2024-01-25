import { CommonModule } from "@angular/common"
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  type OnInit
} from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { Observable, Subscription, firstValueFrom, switchMap } from "rxjs"
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
export class PageSearchComponent implements OnInit {
  city$: Observable<City | null> | undefined

  // Use this to add maps: https://github.com/angular/components?tab=readme-ov-file

  constructor(
    private route: ActivatedRoute,
    private citiesService: CitiesService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.city$ = this.route.params.pipe(
      switchMap((params) => {
        const id = Number(params["cityId"])
        return this.citiesService.getCityById(id)
      })
    )
  }
}