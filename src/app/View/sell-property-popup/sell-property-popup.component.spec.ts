import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPropertyPopupComponent } from './sell-property-popup.component';

describe('SellPropertyPopupComponent', () => {
  let component: SellPropertyPopupComponent;
  let fixture: ComponentFixture<SellPropertyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellPropertyPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellPropertyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
