import { TestBed } from '@angular/core/testing';
import { SolicitudVoluntariadoService } from './solicitud-voluntariado.service';

describe('SolicitudVoluntariadoService', () => {
  let service: SolicitudVoluntariadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudVoluntariadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
