import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApsCalculatorPage } from './aps-calculator.page';

describe('ApsCalculatorPage', () => {
  let component: ApsCalculatorPage;
  let fixture: ComponentFixture<ApsCalculatorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ApsCalculatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
