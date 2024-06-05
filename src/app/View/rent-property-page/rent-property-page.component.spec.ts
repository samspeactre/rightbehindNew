import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentPropertyPageComponent } from './rent-property-page.component';

describe('RentPropertyPageComponent', () => {
  let component: RentPropertyPageComponent;
  let fixture: ComponentFixture<RentPropertyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentPropertyPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentPropertyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
