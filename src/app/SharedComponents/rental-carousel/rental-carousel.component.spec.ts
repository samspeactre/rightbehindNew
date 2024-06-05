import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalCarouselComponent } from './rental-carousel.component';

describe('RentalCarouselComponent', () => {
  let component: RentalCarouselComponent;
  let fixture: ComponentFixture<RentalCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentalCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentalCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
