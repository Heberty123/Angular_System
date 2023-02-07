import { TestBed } from '@angular/core/testing';

import { SelectedTabService } from './selected-tab.service';

describe('SelectedTabService', () => {
  let service: SelectedTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
