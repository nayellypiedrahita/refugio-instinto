import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPacienteMascotasComponent } from './formulario-paciente-mascotas.component';

describe('FormularioPacienteMascotasComponent', () => {
  let component: FormularioPacienteMascotasComponent;
  let fixture: ComponentFixture<FormularioPacienteMascotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioPacienteMascotasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioPacienteMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
