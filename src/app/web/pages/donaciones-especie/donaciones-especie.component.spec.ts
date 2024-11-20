import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonacionesEspecieComponent } from './donaciones-especie.component';

describe('DonacionesEspecieComponent', () => {
  let component: DonacionesEspecieComponent;
  let fixture: ComponentFixture<DonacionesEspecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonacionesEspecieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonacionesEspecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
