import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuImagenHaSidoEnviadaComponent } from './tu-imagen-ha-sido-enviada.component';

describe('TuImagenHaSidoEnviadaComponent', () => {
  let component: TuImagenHaSidoEnviadaComponent;
  let fixture: ComponentFixture<TuImagenHaSidoEnviadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TuImagenHaSidoEnviadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuImagenHaSidoEnviadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
