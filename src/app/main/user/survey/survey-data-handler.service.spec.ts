import { TestBed } from '@angular/core/testing';

import { SurveyDataHandlerService } from './survey-data-handler.service';

describe('SurveyDataHandlerService', () => {
  let service: SurveyDataHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyDataHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
