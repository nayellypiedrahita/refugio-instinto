import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapeleraAdopcionComponent } from './papelera-adopcion.component';

describe('PapeleraAdopcionComponent', () => {
  let component: PapeleraAdopcionComponent;
  let fixture: ComponentFixture<PapeleraAdopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PapeleraAdopcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PapeleraAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
