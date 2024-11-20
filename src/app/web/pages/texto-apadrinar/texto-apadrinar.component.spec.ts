import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoApadrinarComponent } from './texto-apadrinar.component';

describe('TextoApadrinarComponent', () => {
  let component: TextoApadrinarComponent;
  let fixture: ComponentFixture<TextoApadrinarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextoApadrinarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextoApadrinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
