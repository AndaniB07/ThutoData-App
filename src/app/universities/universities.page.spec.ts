import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitiesPage } from './universities.page';

describe('UniversitiesPage', () => {
  let component: UniversitiesPage;
  let fixture: ComponentFixture<UniversitiesPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(UniversitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
