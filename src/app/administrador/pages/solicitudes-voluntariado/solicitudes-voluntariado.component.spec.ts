import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesVoluntariadoComponent } from './solicitudes-voluntariado.component';

describe('SolicitudesVoluntariadoComponent', () => {
  let component: SolicitudesVoluntariadoComponent;
  let fixture: ComponentFixture<SolicitudesVoluntariadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudesVoluntariadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesVoluntariadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
