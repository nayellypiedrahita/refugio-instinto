import { TestBed } from '@angular/core/testing';

import { DonacionMonetariaService } from './donacion-monetaria.service';

describe('DonacionMonetariaService', () => {
  let service: DonacionMonetariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonacionMonetariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
