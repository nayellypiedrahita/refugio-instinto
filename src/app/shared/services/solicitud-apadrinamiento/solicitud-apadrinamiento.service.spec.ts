import { TestBed } from '@angular/core/testing';

import { SolicitudApadrinamientoService } from './solicitud-apadrinamiento.service';

describe('SolicitudApadrinamientoService', () => {
  let service: SolicitudApadrinamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudApadrinamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
