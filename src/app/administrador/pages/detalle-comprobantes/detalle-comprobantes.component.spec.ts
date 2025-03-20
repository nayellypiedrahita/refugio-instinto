import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleComprobantesComponent } from './detalle-comprobantes.component';

describe('DetalleComprobantesComponent', () => {
  let component: DetalleComprobantesComponent;
  let fixture: ComponentFixture<DetalleComprobantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleComprobantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleComprobantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
