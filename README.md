# CityGo - Trips for Any City
CityGo allows users to find vacation routes for any city. It is integrated with Google Maps to give an overview of the trip, as well as navigate it.

The frontend of this application uses Angular and Tailwind.

The backend uses Node.js and PostgreSQL for storing the trips. To view the backend implementation, see the following repo:



## Home Page
The home page allows users to view the most popular trips

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/0ae7fe12-a423-49d1-b728-f9aedadb4a9d" alt="Home Page" width="738">
</p>

The search bar filters trips by city

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/32543e74-189a-4cbf-a3a5-0dc8a7adfdaa" alt="Search bar" width="738">
</p>

The website uses a responsive mobile-first design, and can be viewed in mobile browsers. The navbar links are collapsed into a hamburger menu

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/b3218f5d-ca7d-4738-a441-2767fa8df602" alt="Site responsiveness" width="738">
</p>



## Trip Overview Page
On this page, you can see an overview of the trip.
A preview of the destinations can be easily viewed in the image carousel.

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/853313c0-6755-4c60-a147-4f902bed472b" alt="Site responsiveness" width="738">
</p>


Towards the bottom, you can view trip itinerary in Google Maps.

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/a71fefd0-5be3-41bc-9d4a-b2de996c1daa" alt="Site responsiveness" width="738">
</p>


Finally, after clicking "Start Trip," the user can begin navigating the itinerary on their mobile device. 
This is done by creating a Google Maps Deep Link for the trip which when clicked on, opens the Google Maps app on their device.

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/3dca32fe-c4dc-43b9-aa4a-049a94c7cf48" alt="Site responsiveness" width="250">
</p>


## Creating a Trip
A trip can be created by filling out a form. When submitted, the form sends a tripCreationDTO to the backend which is parsed to add addresses and images to the trip using the Google Maps and Unsplashed APIs.

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/084ced26-612b-43b2-9825-b39e3e0e9c7f" alt="Site responsiveness" width="738">
</p>

For the duration and price, I created a rating input component
It is accessible, and allows for selecting values using the arrow keys on your keyboard

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/07c0604a-ef25-4624-b015-c32f63431155" alt="Site responsiveness" width="738">
</p>

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/2a85c8df-a18b-4171-a4c8-8f0d80dcfe32" alt="Site responsiveness" width="738">
</p>


Code:
```javascript

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      // Decrement current rating
      event.preventDefault()
      const newIndex = this.currentRating - 1
      if (newIndex > 0) {
        this.onClick(newIndex)

        // Focus on next rating button
        const currentElement = event.target as HTMLElement
        const prevElement = currentElement.previousElementSibling as HTMLElement
        prevElement.focus()
      }
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      // Increment current rating
      event.preventDefault()
      const newIndex = this.currentRating
      if (newIndex < this.maxRating) {
        this.onClick(newIndex + 1)

        // Focus on previous rating button
        const currentElement = event.target as HTMLElement
        const nextElement = currentElement.nextElementSibling as HTMLElement
        nextElement.focus()
      }
    }
  }


```

For the trip itinerary, destinations are typed into input fields, which are draggable to be reordered.

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/04ecf94e-4fa0-4335-a6e3-75bc9b1a2a38" alt="Site responsiveness" width="738">
</p>
