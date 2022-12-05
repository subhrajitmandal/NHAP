import { TestBed } from '@angular/core/testing';

import { UserLoggedInfoService } from './user-logged-info.service';

describe('UserLoggedInfoService', () => {
  let service: UserLoggedInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLoggedInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
