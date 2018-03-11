import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiAttemptInputComponent } from './multi-attempt-input.component';

describe('MultiAttemptInputComponent', () => {
  let component: MultiAttemptInputComponent;
  let fixture: ComponentFixture<MultiAttemptInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiAttemptInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiAttemptInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
