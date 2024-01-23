import { TestBed } from '@angular/core/testing';

import { BusinessLogicServiceService } from './business-logic-service.service';

describe('BusinessLogicServiceService', () => {
  let service: BusinessLogicServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessLogicServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
