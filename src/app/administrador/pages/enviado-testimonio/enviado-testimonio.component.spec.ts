import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviadoTestimonioComponent } from './enviado-testimonio.component';

describe('EnviadoTestimonioComponent', () => {
  let component: EnviadoTestimonioComponent;
  let fixture: ComponentFixture<EnviadoTestimonioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnviadoTestimonioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviadoTestimonioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
