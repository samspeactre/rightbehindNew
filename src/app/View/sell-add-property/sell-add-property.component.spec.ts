import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellAddPropertyComponent } from './sell-add-property.component';

describe('SellAddPropertyComponent', () => {
  let component: SellAddPropertyComponent;
  let fixture: ComponentFixture<SellAddPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellAddPropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellAddPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
