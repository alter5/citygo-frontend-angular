import { Routes } from "@angular/router"
import { PageHomeComponent } from "./features/home/pages/home/page-home.component"
import { PageCityComponent } from "./features/city/page-city/page-city.component"

const routeConfig: Routes = [
  {
    path: "",
    component: PageHomeComponent,
    title: "Home page"
  },
  {
    path: "city/:id", component: PageCityComponent
  }
  // {
  //   path: 'details/:id',
  //   component: DetailsComponent,
  //   title: 'Home details'
  // }
]

export default routeConfig
