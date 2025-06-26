import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestimonioComponent } from './add-testimonio.component';

describe('AddTestimonioComponent', () => {
  let component: AddTestimonioComponent;
  let fixture: ComponentFixture<AddTestimonioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTestimonioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTestimonioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
