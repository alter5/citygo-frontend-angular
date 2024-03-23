<div align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/6a3e2d75-04c8-4f7e-8be5-f78724bb53d6" alt="CityGo Logo" width="250">
</div>

# Introduction
CityGo allows users to find vacation routes for any city. It is integrated with Google Maps to allow users to navigate the trip on their device.

### Tech Stack:
* The frontend of this application uses Angular, Angular Material, and Tailwind.
* The backend uses Node.js and PostgreSQL for storing the trips. To view the backend implementation, see this [repo](https://github.com/alter5/citygo-backend-node "CityGo backend repo"). 

<div align="center">
    <img style="width: 26%" src="https://github.com/alter5/citygo-frontend-angular/assets/36527069/58de0cf0-ef43-4c6e-b6b5-3d100d170fc6" alt="Image 1"">
    <img style="width: 26%" src="https://github.com/alter5/citygo-frontend-angular/assets/36527069/971bd6ab-9cd0-47f1-ac9e-bed1c221500a" alt="Image 2"">
    <img style="width: 24%" src="https://github.com/alter5/citygo-frontend-angular/assets/36527069/4c0b2e9a-063d-4333-9794-6e636aa46864" alt="Image 3">
    <img style="width: 12%"" src="https://github.com/alter5/city-go/assets/36527069/3dca32fe-c4dc-43b9-aa4a-049a94c7cf48" alt="Image 3">
</div>



## Home Page
The home page displays the most popular trips.
<div align="left" style="display: flex; flex-direction: column;">
  <img style="width: 600px" src="https://github.com/alter5/citygo-frontend-angular/assets/36527069/58de0cf0-ef43-4c6e-b6b5-3d100d170fc6" alt="Image 2">
</div>

&nbsp;<br>
Use the search bar to filter trips by city
<div align="left" style="display: flex; flex-direction: column;">
  <img style="width: 600px" src="https://github.com/alter5/city-go/assets/36527069/32543e74-189a-4cbf-a3a5-0dc8a7adfdaa" alt="Image 2">
</div>


&nbsp;<br>
The website displays a shimmer effect when loading data
* This is done by using an array of dummy objects, and checking if certain properties are null

It also comes with a dark mode toggle
* This is done by using the Tailwind [tw-colors](https://github.com/L-Blondy/tw-colors "tw-colors repo") plugin, which lets you create shared classes for multiple theme palettes. (show code snippet)

<div align="center">
    <img style="width: 49%" src="https://github.com/alter5/citygo-frontend-angular/assets/36527069/f6a076f1-2920-46c4-b7d5-3cb5d9e9c526" alt="Image 1"">
    <img style="width: 49%" src="https://github.com/alter5/citygo-frontend-angular/assets/36527069/5d971b68-28e2-4f10-9d25-e993d15d11b0" alt="Image 2"">
</div>

&nbsp;<br>
The website is responsive, and uses a mobile-first design.
* The navbar links are placed in a hamburger-style menu
<p align="left">
  <img src="https://github.com/alter5/citygo-frontend-angular/assets/36527069/3be40a86-7cac-4778-a631-51faf3952602" alt="Site responsiveness" width="400">
</p>



## Trip Overview Page
View the details of a trip in the overview page.

A preview of the destinations can be viewed in the image carousel at the top.

<p align="center">
  <img src="https://github.com/alter5/citygo-frontend-angular/assets/36527069/971bd6ab-9cd0-47f1-ac9e-bed1c221500a" alt="Site responsiveness" width="738">
</p>

Towards the bottom, you can view trip itinerary in Google Maps.

<p align="center">
  <img src="https://github.com/alter5/citygo-frontend-angular/assets/36527069/c00e7d6e-892d-41f5-b5b8-f3e35f64d97f" alt="Site responsiveness" width="738">
</p>

Finally, by clicking "Start Trip" you can begin navigating the itinerary on your mobile device. 
* The button uses a Google Maps "deep link" containing the trip itinerary. When clicked on, it opens the Google Maps app on your device.

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/3dca32fe-c4dc-43b9-aa4a-049a94c7cf48" alt="Site responsiveness" width="250">
</p>



## Creating a Trip
Users can create a trip can be created by filling out a form. 
* When submitted, the form sends a tripCreationDto to the backend 
* This DTO is parsed to add addresses and images to the trip using the Google Maps and Unsplashed APIs.

<p align="center">
  <img src="https://github.com/alter5/citygo-frontend-angular/assets/36527069/4c0b2e9a-063d-4333-9794-6e636aa46864" alt="Site responsiveness" width="738">
</p>

The trip itinerary is typed into an list of input fields, which can be reordered by dragging and dropping.

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/04ecf94e-4fa0-4335-a6e3-75bc9b1a2a38" alt="Site responsiveness" width="600">
</p>

A custom rating input component is used for the duration and price fields.
* It is accessible, allowing you to change the value by using the arrow keys on a keyboard.

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/07c0604a-ef25-4624-b015-c32f63431155" alt="Site responsiveness" width="300">
</p>

<p align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/2a85c8df-a18b-4171-a4c8-8f0d80dcfe32" alt="Site responsiveness" width="300">
</p>
