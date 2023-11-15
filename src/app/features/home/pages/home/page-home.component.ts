import { Component } from "@angular/core"
import { TestThemeComponent } from "../../components/test-theme/test-theme.component";

@Component({
    selector: "app-home",
    templateUrl: "./page-home.component.html",
    styleUrls: ["./page-home.component.scss"],
    standalone: true,
    imports: [TestThemeComponent]
})
export class PageHomeComponent {}
