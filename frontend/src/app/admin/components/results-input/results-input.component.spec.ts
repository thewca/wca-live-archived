import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsInputComponent } from './results-input.component';

describe('ResultsInputComponent', () => {
  let component: ResultsInputComponent;
  let fixture: ComponentFixture<ResultsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
