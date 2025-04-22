import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapeleraAdopcionesComponent } from './papelera-adopciones.component';

describe('PapeleraAdopcionesComponent', () => {
  let component: PapeleraAdopcionesComponent;
  let fixture: ComponentFixture<PapeleraAdopcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PapeleraAdopcionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PapeleraAdopcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
