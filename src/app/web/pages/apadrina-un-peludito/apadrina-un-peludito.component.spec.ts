import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApadrinaUnPeluditoComponent } from './apadrina-un-peludito.component';

describe('ApadrinaUnPeluditoComponent', () => {
  let component: ApadrinaUnPeluditoComponent;
  let fixture: ComponentFixture<ApadrinaUnPeluditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApadrinaUnPeluditoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApadrinaUnPeluditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
