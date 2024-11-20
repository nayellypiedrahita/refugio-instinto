import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDeApadrinamientoComponent } from './formulario-de-apadrinamiento.component';

describe('FormularioDeApadrinamientoComponent', () => {
  let component: FormularioDeApadrinamientoComponent;
  let fixture: ComponentFixture<FormularioDeApadrinamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioDeApadrinamientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioDeApadrinamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
