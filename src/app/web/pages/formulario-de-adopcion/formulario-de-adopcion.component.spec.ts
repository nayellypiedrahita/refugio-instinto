import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDeAdopcionComponent } from './formulario-de-adopcion.component';

describe('FormularioDeAdopcionComponent', () => {
  let component: FormularioDeAdopcionComponent;
  let fixture: ComponentFixture<FormularioDeAdopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioDeAdopcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioDeAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
