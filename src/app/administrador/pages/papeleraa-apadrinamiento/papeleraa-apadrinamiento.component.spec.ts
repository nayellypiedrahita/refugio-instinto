import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapeleraaApadrinamientoComponent } from './papeleraa-apadrinamiento.component';

describe('PapeleraaApadrinamientoComponent', () => {
  let component: PapeleraaApadrinamientoComponent;
  let fixture: ComponentFixture<PapeleraaApadrinamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PapeleraaApadrinamientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PapeleraaApadrinamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
