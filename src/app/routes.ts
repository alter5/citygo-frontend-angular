import { Routes } from "@angular/router"
import { HomeComponent } from "./features/home/components/home.component"
const routeConfig: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "Home page"
  }
  // {
  //   path: 'details/:id',
  //   component: DetailsComponent,
  //   title: 'Home details'
  // }
]

export default routeConfig
