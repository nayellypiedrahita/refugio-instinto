import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapeleraEspecieComponent } from './papelera-especie.component';

describe('PapeleraEspecieComponent', () => {
  let component: PapeleraEspecieComponent;
  let fixture: ComponentFixture<PapeleraEspecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PapeleraEspecieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PapeleraEspecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
