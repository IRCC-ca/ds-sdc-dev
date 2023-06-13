import { TestBed } from '@angular/core/testing';

import { LanguageSwitchButtonService } from './language-switch-button.service';

describe('LanguageSwitchService', () => {
  let service: LanguageSwitchButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // service = TestBed.inject(LanguageSwitchButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
