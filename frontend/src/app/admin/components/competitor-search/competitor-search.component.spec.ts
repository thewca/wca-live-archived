import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorSearchComponent } from './competitor-search.component';

describe('CompetitorSearchComponent', () => {
  let component: CompetitorSearchComponent;
  let fixture: ComponentFixture<CompetitorSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitorSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
