import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPreviewComponent } from './sell-preview.component';

describe('SellPreviewComponent', () => {
  let component: SellPreviewComponent;
  let fixture: ComponentFixture<SellPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
