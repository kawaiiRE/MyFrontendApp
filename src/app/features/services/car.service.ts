import { Injectable, Inject, PLATFORM_ID } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Car } from '../models/car.model'
import { isPlatformBrowser } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:5299/api/cars'

  constructor (
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  getCars (): Observable<Car[]> {
    console.log('getting cars')

    if (isPlatformBrowser(this.platformId)) {
      const headers = new HttpHeaders({
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0'
      })

      return this.http.get<Car[]>(this.apiUrl, { headers }).pipe(
        catchError(error => {
          console.error('Error fetching cars:', error)
          throw error
        })
      )
    } else {
      console.log('SSR: HTTP request not executed')
      // Return an empty observable or dummy data when in SSR context
      
      return of([])
    }
  }

  addCar (car: Car): Observable<Car> {
    console.log('adding car')

    if (isPlatformBrowser(this.platformId)) {
      return this.http.post<Car>(this.apiUrl, car).pipe(
        catchError(error => {
          console.error('Error adding car:', error)
          throw error // Log the error
        })
      )
    } else {
      console.log('SSR: HTTP request not executed')
      
      return of({} as Car) // Prevent post on server side
    }
  }

  // Update a car by ID
  updateCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${car.id}`, car);
  }

  // Delete a car by ID (soft delete)
  deleteCar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}`, { hidden: true });
  }
}
