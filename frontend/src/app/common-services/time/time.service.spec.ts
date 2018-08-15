import { TestBed, inject } from '@angular/core/testing';

import { TimeService } from './time.service';

describe('TimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeService]
    });
  });

  it('should be created', inject([TimeService], (service: TimeService) => {
    expect(service).toBeTruthy();
  }));

  it('should convert from centiseconds to string to display', inject([TimeService], (service: TimeService) => {
    let tests = [
      { input: -1, expected: 'DNF' },
      { input: -2, expected: 'DNS' },
      { input: 79, expected: '0.79' },
      { input: 525, expected: '5.25' },
      { input: 2525, expected: '25.25' },
      { input: 7505, expected: '1:15.05' },
      { input: 360000, expected: '60:00.00' }
    ];
    tests.forEach(test => {
      expect(service.centiToDisplay(test.input)).toEqual(test.expected);
    });
  }));

  it('should convert from displaystring to centiseconds', inject([TimeService], (service: TimeService) => {
    let tests = [
      { input: -1, expected: 'DNF' },
      { input: -2, expected: 'DNS' },
      { input: 79, expected: '0.79' },
      { input: 525, expected: '5.25' },
      { input: 2525, expected: '25.25' },
      { input: 7505, expected: '1:15.05' },
      { input: 360000, expected: '60:00.00' }
    ];
    tests.forEach(test => {
      expect(service.displayToCenti(test.expected)).toEqual(test.input);
    });
  }));
});
