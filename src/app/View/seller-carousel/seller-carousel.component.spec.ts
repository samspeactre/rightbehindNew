import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCarouselComponent } from './seller-carousel.component';

describe('SellerCarouselComponent', () => {
  let component: SellerCarouselComponent;
  let fixture: ComponentFixture<SellerCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
