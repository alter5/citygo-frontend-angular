import { Routes } from "@angular/router"
import { PageHomeComponent } from "./features/home/pages/home/page-home.component"
import { PageCreateTripComponent } from "./features/create-trip/page-create-trip/page-create-trip.component"
import { PageTripDetailsComponent } from "./features/trip-details/pages/page-trip-details/page-trip-details.component"

const routeConfig: Routes = [
  {
    path: "",
    component: PageHomeComponent,
    title: "Home page"
  },
  {
    path: "tripDetails/:tripId",
    component: PageTripDetailsComponent,
    title: "Trip details"
  },
  {
    path: "createTrip",
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
