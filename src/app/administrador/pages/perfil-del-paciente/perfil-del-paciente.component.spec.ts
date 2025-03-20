import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDelPacienteComponent } from './perfil-del-paciente.component';

describe('PerfilDelPacienteComponent', () => {
  let component: PerfilDelPacienteComponent;
  let fixture: ComponentFixture<PerfilDelPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilDelPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilDelPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
