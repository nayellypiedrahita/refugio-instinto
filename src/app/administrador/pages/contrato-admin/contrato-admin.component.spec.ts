import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoAdminComponent } from './contrato-admin.component';

describe('ContratoAdminComponent', () => {
  let component: ContratoAdminComponent;
  let fixture: ComponentFixture<ContratoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContratoAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
