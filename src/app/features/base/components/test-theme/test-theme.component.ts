import { Component } from "@angular/core"
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

@Component({
    selector: "app-test-theme",
    templateUrl: "./test-theme.component.html",
    styleUrls: ["./test-theme.component.scss"],
    standalone: true,
    imports: [MatCardModule, MatButtonModule]
})
export class TestThemeComponent {}
