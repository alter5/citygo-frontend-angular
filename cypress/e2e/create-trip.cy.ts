describe("Home", () => {
  beforeEach(() => {
    cy.visit("/createTrip")
  })

  it("has the correct title", () => {
    cy.title().should("equal", "Create Trip")
  })

  it("should create a trip", () => {
    const fieldIdBase = "field-create-trip-"
    const trip = {
      title: "Tour of Las Vegas",
      city: "Las Vegas",
      description: "Explore the city of Las Vegas in just 3 days",
      duration: 3,
      priceRange: 2,
      destinations: ["The Strip", "The Venetian", "Fremont Street Experience"]
    }

    cy.get(fieldIdBase + "title").type(trip.title)
    cy.get(fieldIdBase + "city").type(trip.city)
    cy.get(fieldIdBase + "description").type(trip.description)

    // get field-create-trip-duration, and then get all the elements with data-testid="input-rating-button", and click the second button
    cy.get(fieldIdBase + "duration")
      .find("[data-testid=input-rating-button]")
      .eq(trip.duration - 1)
      .click()
    cy.get(fieldIdBase + "price-range")
      .find("[data-testid=input-rating-button]")
      .eq(trip.priceRange - 1)
      .click()

    // Type in the destinations for the trip
    cy.get(fieldIdBase + "destinations")
      .find("[data-testid=input-draggable-option]")
      .each((inputElement, i) => {
        cy.wrap(inputElement).type(trip.destinations[i])
      })
  })

  it("should redirect to trip details page when a trip overview card is clicked", () => {
    // Click on the first trip overview card
    cy.get("app-trip-overview-card").first().click()

    // Check if the URL now contains '/tripDetails'
    cy.url().should("include", "/tripDetails")
  })

  it("should have a working new trip button", () => {
    cy.get("app-button-new-trip").click()
    cy.url().should("include", "/createTrip")
  })
})
