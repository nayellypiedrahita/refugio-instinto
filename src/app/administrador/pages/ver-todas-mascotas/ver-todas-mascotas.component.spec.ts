import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTodasMascotasComponent } from './ver-todas-mascotas.component';

describe('VerTodasMascotasComponent', () => {
  let component: VerTodasMascotasComponent;
  let fixture: ComponentFixture<VerTodasMascotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerTodasMascotasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerTodasMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
