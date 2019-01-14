import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3SineWavePlanningComponent } from './d3-sine-wave-planning.component';

describe('D3SineWavePlanningComponent', () => {
  let component: D3SineWavePlanningComponent;
  let fixture: ComponentFixture<D3SineWavePlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3SineWavePlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3SineWavePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
