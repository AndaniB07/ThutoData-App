import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniversityDetailsPage } from './university-details.page';

describe('UniversityDetailsPage', () => {
  let component: UniversityDetailsPage;
  let fixture: ComponentFixture<UniversityDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
