import { Component } from "@angular/core"
import { TestThemeComponent } from "../";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    standalone: true,
    imports: [TestThemeComponent]
})
export class HomeComponent {}
