import { Routes } from "@angular/router"
import { PageHomeComponent } from "./features/home/pages/home/page-home.component"

const routeConfig: Routes = [
  {
    path: "",
    component: PageHomeComponent,
    title: "Home page"
  }
  // {
  //   path: 'details/:id',
  //   component: DetailsComponent,
  //   title: 'Home details'
  // }
]

export default routeConfig
