import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardListingsComponent } from './dashboard-listings.component';

describe('DashboardListingsComponent', () => {
  let component: DashboardListingsComponent;
  let fixture: ComponentFixture<DashboardListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardListingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
