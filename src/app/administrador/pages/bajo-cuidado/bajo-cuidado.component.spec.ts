import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajoCuidadoComponent } from './bajo-cuidado.component';

describe('BajoCuidadoComponent', () => {
  let component: BajoCuidadoComponent;
  let fixture: ComponentFixture<BajoCuidadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BajoCuidadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajoCuidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
