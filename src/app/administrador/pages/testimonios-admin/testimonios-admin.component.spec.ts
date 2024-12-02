import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimoniosAdminComponent } from './testimonios-admin.component';

describe('TestimoniosAdminComponent', () => {
  let component: TestimoniosAdminComponent;
  let fixture: ComponentFixture<TestimoniosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestimoniosAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimoniosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
