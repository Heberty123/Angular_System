import { TestBed } from '@angular/core/testing';

import { ManagementTabGroupService } from './management-tab-group.service';

describe('ManagementTabGroupService', () => {
  let service: ManagementTabGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementTabGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
