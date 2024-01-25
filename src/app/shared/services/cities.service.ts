import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Observable, catchError, map, of } from "rxjs"
import { City } from "../models/city.model"

@Injectable({
  providedIn: "root"
})
export class CitiesService {
  baseUrl = "http://localhost:3000/api/cities"

  constructor(private http: HttpClient) {}

  getCitiesContainingString(queryString: string): Observable<City[]> {
    const params = new HttpParams().set("queryString", queryString)

    return this.http.get<any>(this.baseUrl + "/search", { params }).pipe(
      map((response) => {
        const cities = response.data as City[]
        return cities
      }),
      catchError((error) => {
        console.error(error)
        return of([])
      })
    )
  }

  getMostPopulousCities(): Observable<City[]> {
    return this.http.get<any>(this.baseUrl + "/mostPopulous").pipe(
      map((response) => {
        const cities = response.data as City[]
        return cities
      }),
      catchError((error) => {
        console.error(error)
        return of([])
      })
    )
  }

  getCityById(cityId: number): Observable<City | null> {
    return this.http.get<any>(this.baseUrl + "/" + cityId).pipe(
      map((response) => {
        if (response.data === null) {
          return null
        } else {
          const city = response.data as City
          return city
        }
      }),
      catchError((error) => {
        console.error(error)
        return of(null)
      })
    )
  }
}
