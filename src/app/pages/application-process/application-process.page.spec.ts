import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationProcessPage } from './application-process.page';

describe('ApplicationProcessPage', () => {
  let component: ApplicationProcessPage;
  let fixture: ComponentFixture<ApplicationProcessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationProcessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
