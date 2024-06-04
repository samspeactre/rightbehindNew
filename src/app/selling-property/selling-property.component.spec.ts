import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingPropertyComponent } from './selling-property.component';

describe('SellingPropertyComponent', () => {
  let component: SellingPropertyComponent;
  let fixture: ComponentFixture<SellingPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellingPropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellingPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
