import { Component } from "@angular/core"
import { TestThemeComponent } from "../../components/test-theme/test-theme.component";
import { CityOverviewCardComponent } from "../../components/city-overview-card/city-overview-card.component";

@Component({
    selector: "app-home",
    templateUrl: "./page-home.component.html",
    styleUrls: ["./page-home.component.scss"],
    standalone: true,
    imports: [TestThemeComponent, CityOverviewCardComponent]
})
export class PageHomeComponent {}
