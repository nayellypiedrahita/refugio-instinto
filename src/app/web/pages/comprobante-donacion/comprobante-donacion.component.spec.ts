import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobanteDonacionComponent } from './comprobante-donacion.component';

describe('ComprobanteDonacionComponent', () => {
  let component: ComprobanteDonacionComponent;
  let fixture: ComponentFixture<ComprobanteDonacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComprobanteDonacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprobanteDonacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
