import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarAgregarTestimonioComponent } from './aceptar-agregar-testimonio.component';

describe('AceptarAgregarTestimonioComponent', () => {
  let component: AceptarAgregarTestimonioComponent;
  let fixture: ComponentFixture<AceptarAgregarTestimonioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AceptarAgregarTestimonioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AceptarAgregarTestimonioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
