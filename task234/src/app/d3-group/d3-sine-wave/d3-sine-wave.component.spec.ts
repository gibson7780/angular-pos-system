import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3SineWaveComponent } from './d3-sine-wave.component';

describe('D3SineWaveComponent', () => {
  let component: D3SineWaveComponent;
  let fixture: ComponentFixture<D3SineWaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3SineWaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3SineWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
