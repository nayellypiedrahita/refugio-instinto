import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarTestimoniosComponent } from './actualizar-testimonios.component';

describe('ActualizarTestimoniosComponent', () => {
  let component: ActualizarTestimoniosComponent;
  let fixture: ComponentFixture<ActualizarTestimoniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarTestimoniosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarTestimoniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
