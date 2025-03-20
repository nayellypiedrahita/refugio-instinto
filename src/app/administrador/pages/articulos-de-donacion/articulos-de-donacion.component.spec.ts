import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosDeDonacionComponent } from './articulos-de-donacion.component';

describe('ArticulosDeDonacionComponent', () => {
  let component: ArticulosDeDonacionComponent;
  let fixture: ComponentFixture<ArticulosDeDonacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticulosDeDonacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticulosDeDonacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
