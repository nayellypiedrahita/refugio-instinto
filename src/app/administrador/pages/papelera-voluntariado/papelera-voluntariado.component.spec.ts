import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapeleraVoluntariadoComponent } from './papelera-voluntariado.component';

describe('PapeleraVoluntariadoComponent', () => {
  let component: PapeleraVoluntariadoComponent;
  let fixture: ComponentFixture<PapeleraVoluntariadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PapeleraVoluntariadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PapeleraVoluntariadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
