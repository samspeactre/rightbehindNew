import { TestBed } from '@angular/core/testing';

import { DashNavService } from './dash-nav.service';

describe('DashNavService', () => {
  let service: DashNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
