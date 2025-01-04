# Car Management Frontend

This is the frontend for the car management application built with Angular. It interacts with a .NET backend to manage cars.

## Features
- View the list of cars.
- Add new cars.
- Edit car details.
- Soft delete cars.
- Filter cars by brand, model, or year.

## Setup

1. Clone the repository:
   git clone https://github.com/kawaiiRE/MyFrontendApp
   
2. Install dependencies:

npm install
Start the app:
ng serve
Visit the app at http://localhost:4200.

3. Configuration
Update the API URL in src/app/services/car.service.ts with your backend URL:
private apiUrl = 'http://localhost:5299/api/cars';
Usage
Add a new car by filling the form and clicking 'Add Car'.
Edit a car by clicking 'Edit' next to it.
Delete a car by clicking 'Delete' (soft delete).
Filter cars using the search input.
API Endpoints
GET /api/cars - Get all cars.
POST /api/cars - Add a new car.
PUT /api/cars/{id} - Edit a car.
PATCH /api/cars/{id} - Soft delete a car.