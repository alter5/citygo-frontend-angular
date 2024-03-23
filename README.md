# CityGo - Trips for Any City
CityGo allows users to find vacation routes for any city. It is integrated with Google Maps to give an overview of the trip, as well as navigate it.

The backend uses Node.js and PostgreSQL for storing the trips. To view the backend implementation, see the following repo:



## Home Page
The home page allows users to view the most popular trips

![image](https://github.com/alter5/city-go/assets/36527069/0ae7fe12-a423-49d1-b728-f9aedadb4a9d)

The search bar filters trips by city

![image](https://github.com/alter5/city-go/assets/36527069/32543e74-189a-4cbf-a3a5-0dc8a7adfdaa)

The website uses a responsive mobile-first design, and can be viewed in mobile browsers. The navbar links are collapsed into a hamburger menu

![image](https://github.com/alter5/city-go/assets/36527069/b3218f5d-ca7d-4738-a441-2767fa8df602)



## Trip Overview Page
On this page, you can see an overview of the trip.
A preview of the destinations can be easily viewed in the image carousel.

![image](https://github.com/alter5/city-go/assets/36527069/853313c0-6755-4c60-a147-4f902bed472b)

Towards the bottom, you can view trip itinerary in Google Maps.

![image](https://github.com/alter5/city-go/assets/36527069/a71fefd0-5be3-41bc-9d4a-b2de996c1daa)

Finally, upon clicking "Start Trip," the user is able to begin navigating the itinerary on their mobile device. This is done by generating a Google Maps Deep Link containing each destination, which when clicked on, opens the Maps app on their device.

![image](https://github.com/alter5/city-go/assets/36527069/3dca32fe-c4dc-43b9-aa4a-049a94c7cf48)



## Creating a Trip
A trip can be created by filling out a form. When submitted, the form sends a tripCreationDTO to the backend which is parsed to add addresses and images to the trip using the Google Maps and Unsplashed APIs.
![image](https://github.com/alter5/city-go/assets/36527069/084ced26-612b-43b2-9825-b39e3e0e9c7f)

For the duration and price, I created a rating input component
It is accessible, and allows for selecting values using the arrow keys on your keyboard

![image](https://github.com/alter5/city-go/assets/36527069/07c0604a-ef25-4624-b015-c32f63431155)

![image](https://github.com/alter5/city-go/assets/36527069/2a85c8df-a18b-4171-a4c8-8f0d80dcfe32)

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

![image](https://github.com/alter5/city-go/assets/36527069/04ecf94e-4fa0-4335-a6e3-75bc9b1a2a38)

