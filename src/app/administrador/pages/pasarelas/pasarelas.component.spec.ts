import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasarelasComponent } from './pasarelas.component';

describe('PasarelasComponent', () => {
  let component: PasarelasComponent;
  let fixture: ComponentFixture<PasarelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasarelasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasarelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
