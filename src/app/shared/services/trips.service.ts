import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable, catchError, map, of } from "rxjs"
import { Trip } from "../models/trip.model"
import { TripCreationDto } from "src/app/features/create-trip/models/tripCreationPaylod.model"

@Injectable({
  providedIn: "root"
})
export class TripsService {
  baseUrl = "http://localhost:3002/api/cities"

  constructor(private http: HttpClient) {}

  getAllTrips(): Observable<Trip[]> {
    return this.http.get(this.baseUrl + "/trips").pipe(
      map((response) => {
        return response as Trip[]
      }),
      catchError((error) => {
        console.log(error)
        return of([])
      })
    )
  }

  createTrip(dto: TripCreationDto): void {
    ;
  }
}
