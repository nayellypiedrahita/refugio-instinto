import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonacionesMonetariasComponent } from './donaciones-monetarias.component';

describe('DonacionesMonetariasComponent', () => {
  let component: DonacionesMonetariasComponent;
  let fixture: ComponentFixture<DonacionesMonetariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonacionesMonetariasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonacionesMonetariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
