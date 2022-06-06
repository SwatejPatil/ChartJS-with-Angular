import { TestBed } from '@angular/core/testing';

import { ChartapiService } from './chartapi.service';

describe('ChartapiService', () => {
  let service: ChartapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
