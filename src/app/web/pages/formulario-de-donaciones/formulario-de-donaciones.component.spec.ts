import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDeDonacionesComponent } from './formulario-de-donaciones.component';

describe('FormularioDeDonacionesComponent', () => {
  let component: FormularioDeDonacionesComponent;
  let fixture: ComponentFixture<FormularioDeDonacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioDeDonacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioDeDonacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
