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
    // console.log('getting cars')

    if (isPlatformBrowser(this.platformId)) {
      const headers = new HttpHeaders({
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0'
      })

      return this.http.get<Car[]>(this.apiUrl, { headers }).pipe(
        catchError(error => {
          console.error('error fetching cars:', error)
          throw error
        })
      )
    } else {
      console.log('error')
    
      return of([])
    }
  }

  addCar (car: Car): Observable<Car> {
    // console.log('adding car')

    if (isPlatformBrowser(this.platformId)) {
      return this.http.post<Car>(this.apiUrl, car).pipe(
        catchError(error => {
          console.error('error adding car:', error)
          throw error
        })
      )
    } else {
      console.log('error')
      
      return of({} as Car)
    }
  }

  updateCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${car.id}`, car);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}`, { hidden: true });
  }
}
