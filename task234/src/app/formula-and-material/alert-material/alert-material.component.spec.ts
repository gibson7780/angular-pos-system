import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMaterialComponent } from './alert-material.component';

describe('AlertMaterialComponent', () => {
  let component: AlertMaterialComponent;
  let fixture: ComponentFixture<AlertMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
