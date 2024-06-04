import { TestBed } from '@angular/core/testing';

import { RentPropertyDataService } from './rent-property-data.service';

describe('RentPropertyDataService', () => {
  let service: RentPropertyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentPropertyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
