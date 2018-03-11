import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptInputComponent } from './attempt-input.component';

describe('AttemptInputComponent', () => {
  let component: AttemptInputComponent;
  let fixture: ComponentFixture<AttemptInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttemptInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttemptInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
