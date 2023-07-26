import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { HomeComponent } from "./features/home/components/home.component"
import { NavbarComponent } from "./features/base/components/navbar/navbar.component"
import { BaseComponent } from "./features/base/base.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatAutocompleteModule } from "@angular/material/autocomplete"
import { TestThemeComponent } from "./features/base/components/test-theme/test-theme.component"
import { SidebarComponent } from "./features/base/components/sidebar/sidebar.component"
import { SearchBarComponent } from "./features/base/components/searchbar/searchbar.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    BaseComponent,
    TestThemeComponent,
    SidebarComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
