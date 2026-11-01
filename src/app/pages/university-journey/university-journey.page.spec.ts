import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniversityJourneyPage } from './university-journey.page';

describe('UniversityJourneyPage', () => {
  let component: UniversityJourneyPage;
  let fixture: ComponentFixture<UniversityJourneyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityJourneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
