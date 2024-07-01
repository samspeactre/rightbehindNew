import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffMarketCarouselComponent } from './off-market-carousel.component';

describe('OffMarketCarouselComponent', () => {
  let component: OffMarketCarouselComponent;
  let fixture: ComponentFixture<OffMarketCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffMarketCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffMarketCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
