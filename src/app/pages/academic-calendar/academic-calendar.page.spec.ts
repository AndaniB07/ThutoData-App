import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcademicCalendarPage } from './academic-calendar.page';

describe('AcademicCalendarPage', () => {
  let component: AcademicCalendarPage;
  let fixture: ComponentFixture<AcademicCalendarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicCalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
