import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedCoursesPage } from './saved-courses.page';

describe('SavedCoursesPage', () => {
  let component: SavedCoursesPage;
  let fixture: ComponentFixture<SavedCoursesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCoursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
