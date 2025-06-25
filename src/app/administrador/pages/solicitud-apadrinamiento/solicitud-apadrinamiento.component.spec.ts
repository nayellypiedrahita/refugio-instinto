import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudApadrinamientoComponent } from './solicitud-apadrinamiento.component';

describe('SolicitudApadrinamientoComponent', () => {
  let component: SolicitudApadrinamientoComponent;
  let fixture: ComponentFixture<SolicitudApadrinamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudApadrinamientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudApadrinamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
