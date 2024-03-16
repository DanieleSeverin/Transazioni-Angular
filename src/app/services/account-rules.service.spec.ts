import { TestBed } from '@angular/core/testing';

import { AccountRulesService } from './account-rules.service';

describe('AccountRulesService', () => {
  let service: AccountRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
