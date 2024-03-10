import { Component, OnInit, Inject, Renderer2 } from "@angular/core"
import { NgIf, AsyncPipe, DOCUMENT, NgOptimizedImage } from "@angular/common"
import { RouterModule } from "@angular/router"
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"

import {
  MatSlideToggleChange,
  MatSlideToggleModule
} from "@angular/material/slide-toggle"
import { CitySearchBarComponent } from "../city-search-bar/city-search-bar.component"
import { Observable, map } from "rxjs"
import { Router } from "@angular/router"
import { DropdownOption } from "src/app/shared/components/input-autocomplete/dropdown-option.model"
import { ImageLoadableComponent } from "src/app/shared/components/image-loadable/image-loadable.component"
import { ThemePalette } from "@angular/material/core"

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  standalone: true,
  imports: [
    RouterModule,
    CitySearchBarComponent,
    MatSlideToggleModule,
    NgIf,
    AsyncPipe,
    NgOptimizedImage,
    MatButtonModule,
    MatIconModule,
    ImageLoadableComponent
  ]
})
export class NavbarComponent implements OnInit {
  isDarkModeEnabled = false
  isScreenSmall$: Observable<boolean> | null = null
  isMenuOpen = false

  toggleColor: ThemePalette = "primary"

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isDarkModeEnabled = JSON.parse(
      localStorage.getItem("isDarkModeEnabled") || "false"
    )
    this.changeTheme()

    this.isScreenSmall$ = this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        map((result) => {
          return result.matches
        })
      )
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen

    if (this.isMenuOpen === true) {
      this.renderer.setStyle(document.body, "overflow", "hidden")
    } else {
      this.renderer.setStyle(document.body, "overflow", "visible")
    }
  }

  handleDarkModeToggle({ checked }: MatSlideToggleChange): void {
    this.isDarkModeEnabled = checked
    this.changeTheme()
  }

  changeTheme(): void {
    let result = "mat-app-background mat-typograph "

    if (this.isDarkModeEnabled === true) {
      // Note: in styles.scss, the base light theme is used for core style properties.
      // The dark theme only tweaks certain colors.
      result += "dark"
    } else {
      result += "light"
    }

    this.renderer.setAttribute(this.document.body, "class", result)

    localStorage.setItem(
      "isDarkModeEnabled",
      JSON.stringify(this.isDarkModeEnabled)
    )
  }

  onCitySelected(selectedDropdownOption: DropdownOption): void {
    this.router.navigate(["tripDetails/", selectedDropdownOption.id])
  }
}
