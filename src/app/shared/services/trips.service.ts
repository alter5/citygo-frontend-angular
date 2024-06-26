import { Injectable } from "@angular/core"
import { HttpClient, HttpParams } from "@angular/common/http"
import { Observable, catchError, map, of } from "rxjs"
import { Trip } from "../models/trip.model"
import { TripCreationDto } from "src/app/features/create-trip/models/tripCreationPayload.model"
import { ApiResponse } from "../models/apiResponse.model"

@Injectable({
  providedIn: "root"
})
export class TripsService {
  baseUrl = "http://localhost:3010/api/trips"

  constructor(private http: HttpClient) {}

  getTripById(tripId: number): Observable<Trip | null> {
    return this.http.get<ApiResponse>(this.baseUrl + "/getTripById/" + tripId).pipe(
      map((response) => {
        if (response.success) {
          return response.data as Trip
        } else {
          throw new Error("Error getting trip by id:\n" + response.error)
        }
      }),
      catchError((error) => {
        console.error(error)
        return of(null)
      })
    )
  }

  getPopularTrips(): Observable<Trip[]> {
    return this.http.get<ApiResponse>(this.baseUrl + "/popularTrips").pipe(
      map((response) => {
        if (response.success) {
          return response.data as Trip[]
        } else {
          throw new Error("Error getting popular trips:\n" + response.error)
        }
      }),
      catchError((error) => {
        console.error(error)
        return of([])
      })
    )
  }

  createTrip(payload: TripCreationDto): Observable<boolean> {
    return this.http
      .post<ApiResponse>(this.baseUrl + "/createTrip", { tripDto: payload })
      .pipe(
        map((response) => {
          if (response.success) {
            return true
          } else {
            throw new Error("Error creating trip:\n" + response.error)
          }
        }),
        catchError((error) => {
          console.error(error)
          return of(false)
        })
      )
  }
}
