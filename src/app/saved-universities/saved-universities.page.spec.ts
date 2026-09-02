import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedUniversitiesPage } from './saved-universities.page';

describe('SavedUniversitiesPage', () => {
  let component: SavedUniversitiesPage;
  let fixture: ComponentFixture<SavedUniversitiesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedUniversitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
