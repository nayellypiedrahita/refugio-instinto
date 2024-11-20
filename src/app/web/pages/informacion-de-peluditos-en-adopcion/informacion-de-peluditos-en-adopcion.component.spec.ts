import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionDePeluditosEnAdopcionComponent } from './informacion-de-peluditos-en-adopcion.component';

describe('InformacionDePeluditosEnAdopcionComponent', () => {
  let component: InformacionDePeluditosEnAdopcionComponent;
  let fixture: ComponentFixture<InformacionDePeluditosEnAdopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformacionDePeluditosEnAdopcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionDePeluditosEnAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
