import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudEnviadaComponent } from './solicitud-enviada.component';

describe('SolicitudEnviadaComponent', () => {
  let component: SolicitudEnviadaComponent;
  let fixture: ComponentFixture<SolicitudEnviadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudEnviadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudEnviadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
