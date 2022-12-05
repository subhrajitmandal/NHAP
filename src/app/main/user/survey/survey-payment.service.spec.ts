import { TestBed } from '@angular/core/testing';

import { SurveyPaymentService } from './survey-payment.service';

describe('SurveyPaymentService', () => {
  let service: SurveyPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
