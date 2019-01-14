import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3LinePlanningComponent } from './d3-line-planning.component';

describe('D3LinePlanningComponent', () => {
  let component: D3LinePlanningComponent;
  let fixture: ComponentFixture<D3LinePlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3LinePlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3LinePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
