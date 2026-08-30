import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BursariesPage } from './bursaries.page';

describe('BursariesPage', () => {
  let component: BursariesPage;
  let fixture: ComponentFixture<BursariesPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(BursariesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
