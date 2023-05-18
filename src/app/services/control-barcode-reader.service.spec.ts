import { TestBed } from '@angular/core/testing';

import { ControlBarcodeReaderService } from './control-barcode-reader.service';

describe('ControlBarcodeReaderService', () => {
  let service: ControlBarcodeReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlBarcodeReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
