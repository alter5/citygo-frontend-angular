import { Component } from "@angular/core"
import { TestThemeComponent } from "../../base/components/test-theme/test-theme.component";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    standalone: true,
    imports: [TestThemeComponent]
})
export class HomeComponent {}
