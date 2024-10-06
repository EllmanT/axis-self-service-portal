import { TestBed } from '@angular/core/testing';

import { VirtualFiscaServiceService } from './virtual-fisca-service.service';

describe('VirtualFiscaServiceService', () => {
  let service: VirtualFiscaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualFiscaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
