<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/6a3e2d75-04c8-4f7e-8be5-f78724bb53d6" alt="CityGo Logo" width="250">
</p>

# CityGo - Trips for Any City
CityGo allows users to find vacation routes for any city. It is integrated with Google Maps to allow users to navigate the trip on their device.

### Tech Stack:
* The frontend of this application uses Angular, Angular Material, and Tailwind.
* The backend uses Node.js and PostgreSQL for storing the trips. To view the backend implementation, see this [repo](https://github.com/alter5/citygo-backend-node "CityGo backend repo"). 


## Home Page
The home page allows users to view the most popular trips

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/0ae7fe12-a423-49d1-b728-f9aedadb4a9d" alt="Home Page" width="738">
</p>

Use the search bar to filter trips by city

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/32543e74-189a-4cbf-a3a5-0dc8a7adfdaa" alt="Search bar" width="738">
</p>

The website uses a responsive mobile-first design, and can be viewed in mobile browsers. The navbar links are collapsed into a hamburger menu

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/b3218f5d-ca7d-4738-a441-2767fa8df602" alt="Site responsiveness" width="400">
</p>



## Trip Overview Page
View the details of a trip in the overview page.

A preview of the destinations can be viewed in the image carousel at the top.

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/853313c0-6755-4c60-a147-4f902bed472b" alt="Site responsiveness" width="738">
</p>


Towards the bottom, you can view trip itinerary in Google Maps.

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/a71fefd0-5be3-41bc-9d4a-b2de996c1daa" alt="Site responsiveness" width="738">
</p>


Finally, click "Start Trip" to begin navigating the itinerary on your mobile device. 
The button uses a Google Maps "deep link" containing the trip itinary. When clicked on, it opens the Google Maps app on your device.

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/3dca32fe-c4dc-43b9-aa4a-049a94c7cf48" alt="Site responsiveness" width="250">
</p>


## Creating a Trip
Users can create a trip can be created by filling out a form. 
When submitted, the form sends a tripCreationDTO to the backend which is parsed to add addresses and images to the trip using the Google Maps and Unsplashed APIs.

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/084ced26-612b-43b2-9825-b39e3e0e9c7f" alt="Site responsiveness" width="738">
</p>

A custom rating input component is used for the duration and price fields.
It is accessible, allowing you to change the value by using the arrow keys on a keyboard.

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/07c0604a-ef25-4624-b015-c32f63431155" alt="Site responsiveness" width="300">
</p>

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/2a85c8df-a18b-4171-a4c8-8f0d80dcfe32" alt="Site responsiveness" width="300">
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

The trip itinerary is typed into an list of input fields, which can be reordered by dragging and dropping.

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/04ecf94e-4fa0-4335-a6e3-75bc9b1a2a38" alt="Site responsiveness" width="700">
</p>
