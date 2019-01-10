import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaAndMaterialComponent } from './formula-and-material.component';

describe('FormulaAndMaterialComponent', () => {
  let component: FormulaAndMaterialComponent;
  let fixture: ComponentFixture<FormulaAndMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaAndMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaAndMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
