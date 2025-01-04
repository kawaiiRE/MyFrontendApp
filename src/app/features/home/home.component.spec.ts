import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpMock: HttpTestingController; // To mock HTTP requests
  let carService: CarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule], // Add HttpClientTestingModule
      providers: [
        CarService, // Provide CarService as usual
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController); // Inject HttpTestingController
    carService = TestBed.inject(CarService); // Inject CarService

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch cars from the service and return an array', () => {
    const dummyCars: Car[] = []; // Can be empty or contain car objects

    carService.getCars().subscribe((cars) => {
      expect(Array.isArray(cars)).toBe(true); // Check if the result is an array
    });

    const req = httpMock.expectOne('http://localhost:5299/api/cars');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCars); // Simulate a response (empty array in this case)
  });

  afterEach(() => {
    httpMock.verify(); // Verify that there are no outstanding HTTP requests
  });
});
