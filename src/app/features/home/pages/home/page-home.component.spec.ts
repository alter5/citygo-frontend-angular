import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from "@angular/core/testing"
import { PageHomeComponent } from "./page-home.component"
import { TripsService } from "src/app/shared/services/trips.service"
import { of } from "rxjs"
import { Router } from "@angular/router"
import { RouterTestingModule } from "@angular/router/testing"

describe("PageHomeComponent", () => {
  let component: PageHomeComponent
  let fixture: ComponentFixture<PageHomeComponent>
  let tripsService: TripsService
  let router: Router

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, PageHomeComponent],
      providers: [
        {
          provide: TripsService,
          useValue: {
            getPopularTrips: () => of(tripsService.getMockTrips())
          }
        }
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHomeComponent)
    component = fixture.componentInstance
    tripsService = TestBed.inject(TripsService)
    router = TestBed.inject(Router)
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should call getPopularTrips on init, and render trip cards", fakeAsync(() => {
    spyOn(tripsService, "getPopularTrips").and.callThrough()
    component.ngOnInit()
    tick() // Wait for the observable to emit the mock trips

    expect(tripsService.getPopularTrips).toHaveBeenCalled()
    expect(component.trips$).toBeDefined()

    const renderedCards = fixture.nativeElement.querySelectorAll(".trip-card")
    expect(renderedCards.length).toBe(4) // Check if 4 card components were rendered

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let latestTrips: any[] = []
    component.trips$.subscribe(trips => {
      latestTrips = trips
    })
    expect(latestTrips).toEqual(tripsService.getMockTrips()) // Check the latest value emitted by trips$
  }))

  it('should display "New Trip" button', () => {
    const buttonElement = fixture.nativeElement.querySelector(".button-new-trip")
    expect(buttonElement).toBeTruthy()
    expect(buttonElement.textContent).toContain("New Trip")
  })
})
