import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimoniosDePeluditosComponent } from './testimonios-de-peluditos.component';

describe('TestimoniosDePeluditosComponent', () => {
  let component: TestimoniosDePeluditosComponent;
  let fixture: ComponentFixture<TestimoniosDePeluditosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestimoniosDePeluditosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimoniosDePeluditosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
