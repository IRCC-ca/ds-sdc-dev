import { TestBed } from '@angular/core/testing';

import { LanguageSwitchService } from './language-switch.service';

describe('LanguageSwitchServiceService', () => {
  let service: LanguageSwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageSwitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
