import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BursaryDetailsPage } from './bursary-details.page';

describe('BursaryDetailsPage', () => {
  let component: BursaryDetailsPage;
  let fixture: ComponentFixture<BursaryDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BursaryDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
