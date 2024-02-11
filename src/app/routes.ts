import { Routes } from "@angular/router"
import { PageHomeComponent } from "./features/home/pages/home/page-home.component"
import { PageSearchComponent } from "./features/search/page-search/page-search.component"
import { PageCreateTripComponent } from "./features/create-trip/page-create-trip/page-create-trip.component"

const routeConfig: Routes = [
  {
    path: "",
    component: PageHomeComponent,
    title: "Home page"
  },
  {
    path: "search/:cityId",
    component: PageSearchComponent,
    title: "Trip details"
  },
  {
    path: "create-trip",
    component: PageCreateTripComponent,
    title: "Create Trip"
  }
  // {
  //   path: 'details/:id',
  //   component: DetailsComponent,
  //   title: 'Home details'
  // }
]

export default routeConfig
