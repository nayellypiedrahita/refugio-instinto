import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAcordeonComponent } from './lista-acordeon.component';

describe('ListaAcordeonComponent', () => {
  let component: ListaAcordeonComponent;
  let fixture: ComponentFixture<ListaAcordeonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaAcordeonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAcordeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
