import { bootstrapApplication,provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent,
  {
    providers: [
      importProvidersFrom([BrowserAnimationsModule]),
      provideProtractorTestingSupport(),
      provideRouter(routeConfig),
      provideHttpClient()
    ]
  }
).catch(err => console.error(err));
