import { TestBed } from '@angular/core/testing';

import { AccessbilityDemoFormStateService } from './accessbility-demo-form-state.service';

describe('AccessbilityDemoFormStateService', () => {
  let service: AccessbilityDemoFormStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessbilityDemoFormStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
