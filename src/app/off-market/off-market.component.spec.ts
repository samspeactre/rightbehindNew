import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffMarketComponent } from './off-market.component';

describe('OffMarketComponent', () => {
  let component: OffMarketComponent;
  let fixture: ComponentFixture<OffMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffMarketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
