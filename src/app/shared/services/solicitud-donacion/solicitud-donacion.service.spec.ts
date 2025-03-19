import { TestBed } from '@angular/core/testing';

import { SolicitudDonacionService } from './solicitud-donacion.service';

describe('SolicitudDonacionService', () => {
  let service: SolicitudDonacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudDonacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
