import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Observable, catchError, map, of } from "rxjs"
import { City } from "../models/city.model"
import { ApiResponse } from "../models/apiResponse.model"

@Injectable({
  providedIn: "root"
})
export class CitiesService {
  baseUrl = "http://localhost:3002/api/cities"

  constructor(private http: HttpClient) {}

  getCitiesContainingString(queryString: string): Observable<City[]> {
    const params = new HttpParams().set("queryString", queryString)

    return this.http
      .get<ApiResponse>(this.baseUrl + "/search", { params })
      .pipe(
        map((response) => {
          if (response.success) {
            const cities = response.data as City[]
            return cities
          } else {
            throw new Error(response.error)
          }
        }),
        catchError((error) => {
          console.error(error)
          return of([])
        })
      )
  }

  getMostPopulousCities(): Observable<City[]> {
    return this.http.get<ApiResponse>(this.baseUrl + "/mostPopulous").pipe(
      map((response) => {
        if (response.success) {
          const cities = response.data as City[]
          return cities
        } else {
          throw new Error(response.error)
        }
      }),
      catchError((error) => {
        console.error(error)
        return of([])
      })
    )
  }

  getCityById(cityId: number): Observable<City | null> {
    return this.http.get<ApiResponse>(this.baseUrl + "/" + cityId).pipe(
      map((response) => {
        if (response.success) {
          if (response.data === null) {
            throw new Error(
              "No city was found with the following id: " + cityId
            )
          }
          const city = response.data as City
          return city
        } else {
          throw new Error(response.error)
        }
      }),
      catchError((error) => {
        console.error(error)
        return of(null)
      })
    )
  }
}
