import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobantesYPasarelasComponent } from './comprobantes-y-pasarelas.component';

describe('ComprobantesYPasarelasComponent', () => {
  let component: ComprobantesYPasarelasComponent;
  let fixture: ComponentFixture<ComprobantesYPasarelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComprobantesYPasarelasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprobantesYPasarelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
