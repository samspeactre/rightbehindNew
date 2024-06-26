import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentPopupComponent } from './rent-popup.component';

describe('RentPopupComponent', () => {
  let component: RentPopupComponent;
  let fixture: ComponentFixture<RentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
