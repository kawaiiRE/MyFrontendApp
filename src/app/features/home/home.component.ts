import { Component, OnInit } from '@angular/core'
import { CarService } from '../services/car.service'
import { Car } from '../models/car.model'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { FormsModule } from '@angular/forms'

// import { environment } from '../../../environments/environment';

// import { Feature } from './feature';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  cars: Car[] = []
  filteredCars: Car[] = []
  carsLen = 0
  count = 0
  errorMessage: string | null = null
  filter: string | undefined | '';
  filterString: string | undefined | ''
  newCar: Car = { brand: '', model: '', year: 0, hidden: false }

  constructor (private carService: CarService) {}

  ngOnInit (): void {
    this.loadCars()
  }
  loadCars (): void {
    this.carService.getCars().subscribe(
      (data: Car[]) => {
        this.cars = data
        // this.filteredCars = data.filter(car => car.hidden === false)
        this.filterCars(this.filterString)
        console.log('Cars filteredCars:', this.filteredCars)
        console.log('Cars fetched:', this.cars)
      },
      (error: Car[]) => {
        console.error('Error fetching cars:', error)
      }
    )
  }

  fun (): void {
    // if (isPlatformBrowser(this.platformId)) {
    //   console.log('test')
    //   this.test = 'You are my hero!'
    //   this.count++
    //   this.ngZone.run(() => {
    //     this.cdr.detectChanges();
    //   });

    //   alert('Test message :' + this.test + ' Count :' + this.count)
    // } else {
    //   console.log('This function is not running on the server.');
    // }
    // this.test = 'You are my hero!'
    this.count++
    // this.ngZone.run(() => {
    //   this.cdr.detectChanges();
    // });

    // alert('Test message :' + this.test + ' Count :' + this.count)
  }

  filterCars(filterString?: string): void {
    const lowerCaseFilterString = filterString ? filterString.toLowerCase() : '';
  
      this.filteredCars = this.cars.filter(car => car.hidden === false);
    if (lowerCaseFilterString && lowerCaseFilterString.length > 0) {
      this.filteredCars = this.filteredCars.filter(
        car =>
          car.brand.toLowerCase().includes(lowerCaseFilterString) ||
          car.model.toLowerCase().includes(lowerCaseFilterString) ||
          car.year.toString().includes(lowerCaseFilterString)
      );
    } 
    this.carsLen = this.filteredCars.length
  }
  
  resetFilter (): void {
    this.filterString = ''
    this.filteredCars = this.cars.filter(car => car.hidden === false)
    this.carsLen = this.filteredCars.length
  }

  addCar (): void {
    console.log(this.newCar)
    if (!this.newCar.brand || !this.newCar.model || !this.newCar.year) {
      this.errorMessage = 'Please fill in all fields.'

      return
    }
    this.errorMessage = ''
    this.carService.addCar(this.newCar).subscribe(
      (addedCar: Car) => {
        console.log('Car added successfully:', addedCar)
        this.newCar = { brand: '', model: '', year: 0, hidden: false }
        this.loadCars()
      },
      error => {
        console.error('Error adding car:', error)
      }
    )
  }
  isModalOpen = false
  selectedCar: Car = { brand: '', model: '', year: 0, hidden: false }

  // Open the Edit Modal
  openEditModal (car: Car) {
    this.selectedCar = { ...car } // Copy the car data
    this.isModalOpen = true
  }

  // Close the Modal
  closeModal (event?: MouseEvent) {
    if (event) {
      event.stopPropagation() // Prevent closing if clicked inside the modal
    }
    this.isModalOpen = false
  }

  // Prevent event propagation when clicking inside the modal
  stopPropagation (event: MouseEvent) {
    event.stopPropagation()
  }

  // Handle keyboard events
  onKeyDown (event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal() // Close modal on Escape key
    } else if (event.key === 'Enter') {
      this.updateCar() // Trigger the updateCar() method on Enter key
    }
  }

  // Update car by calling the API
  updateCar () {
    if (this.selectedCar) {
      this.carService.updateCar(this.selectedCar).subscribe(
        updatedCar => {
          console.log('Car updated successfully:', updatedCar)
          this.loadCars()
          this.closeModal()
        },
        error => {
          console.error('Error updating car:', error)
        }
      )
    }
  }

  deleteCar (id?: number) {
    if (id) {
      const car = this.cars.find(car => car.id === id)
      if (car) {
        car.hidden = true
        console.log({ car })
        this.carService.updateCar(car).subscribe(
          updatedCar => {
            console.log('Car updated successfully:', updatedCar)
            this.loadCars()
          },
          error => {
            console.error('Error updating car:', error)
          }
        )
      }
    }
  }
}
