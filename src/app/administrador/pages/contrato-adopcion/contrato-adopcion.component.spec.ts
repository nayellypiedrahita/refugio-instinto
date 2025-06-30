import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoAdopcionComponent } from './contrato-adopcion.component';

describe('ContratoAdopcionComponent', () => {
  let component: ContratoAdopcionComponent;
  let fixture: ComponentFixture<ContratoAdopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContratoAdopcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratoAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
