import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudEnEspecieComponent } from './solicitud-en-especie.component';

describe('SolicitudEnEspecieComponent', () => {
  let component: SolicitudEnEspecieComponent;
  let fixture: ComponentFixture<SolicitudEnEspecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudEnEspecieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudEnEspecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
