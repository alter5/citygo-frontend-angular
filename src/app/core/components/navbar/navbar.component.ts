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
    MatIconModule
  ]
})
export class NavbarComponent implements OnInit {
  isDarkModeEnabled = false
  isScreenSmall$: Observable<boolean> | null = null
  isMenuOpen = false

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver
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
          console.log("Result: ", result)
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
      result += "dark-theme"
    } else {
      result += "light-theme"
    }

    this.renderer.setAttribute(this.document.body, "class", result)

    localStorage.setItem(
      "isDarkModeEnabled",
      JSON.stringify(this.isDarkModeEnabled)
    )
  }
}
