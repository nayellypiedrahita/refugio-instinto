import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptaUnPeluditoComponent } from './adopta-un-peludito.component';

describe('AdoptaUnPeluditoComponent', () => {
  let component: AdoptaUnPeluditoComponent;
  let fixture: ComponentFixture<AdoptaUnPeluditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdoptaUnPeluditoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptaUnPeluditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
