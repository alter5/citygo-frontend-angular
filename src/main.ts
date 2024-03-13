/// <reference types="@angular/localize" />

import {
  bootstrapApplication,
  provideProtractorTestingSupport
} from "@angular/platform-browser"
import { provideRouter } from "@angular/router"
import routeConfig from "./app/routes"
import { importProvidersFrom } from "@angular/core"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { GoogleMapsModule } from "@angular/google-maps"
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withJsonpSupport
} from "@angular/common/http"

import { AppComponent } from "./app/app.component"

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([BrowserAnimationsModule, GoogleMapsModule]),
    provideProtractorTestingSupport(),
    provideRouter(routeConfig),
    provideHttpClient(withInterceptorsFromDi(), withJsonpSupport())
  ]
}).catch((err) => console.error(err))
