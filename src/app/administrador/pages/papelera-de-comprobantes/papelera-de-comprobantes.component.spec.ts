import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapeleraDeComprobantesComponent } from './papelera-de-comprobantes.component';

describe('PapeleraDeComprobantesComponent', () => {
  let component: PapeleraDeComprobantesComponent;
  let fixture: ComponentFixture<PapeleraDeComprobantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PapeleraDeComprobantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PapeleraDeComprobantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
