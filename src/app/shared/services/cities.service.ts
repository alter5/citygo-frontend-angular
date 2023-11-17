import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Observable, catchError, map, of } from "rxjs"
import { City } from "../models/city.model"

@Injectable({
  providedIn: "root"
})
export class CitiesService {
  baseUrl = "http://localhost:3000/api/cities/"

  constructor(private http: HttpClient) {}

  getCitiesContainingString(queryString: string): Observable<City[]> {
    const params = new HttpParams().set("queryString", queryString)

    return this.http.get<any>(this.baseUrl + "search", { params }).pipe(
      map((response) => {
        const cities = response.result as City[]
        return cities
      }),
      catchError(() => {
        return of([])
      })
    )
  }
}
