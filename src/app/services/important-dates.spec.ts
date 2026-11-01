import { TestBed } from '@angular/core/testing';
import { ImportantDates } from './important-dates';

describe('ImportantDates', () => {
  let service: ImportantDates;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportantDates);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
