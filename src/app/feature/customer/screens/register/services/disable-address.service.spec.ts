import { TestBed } from '@angular/core/testing';

import { DisableComponentsService } from './disable-address.service';

describe('DisableComponentsService', () => {
  let service: DisableComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisableComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
