import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollegeDetailsPage } from './college-details.page';

describe('CollegeDetailsPage', () => {
  let component: CollegeDetailsPage;
  let fixture: ComponentFixture<CollegeDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
