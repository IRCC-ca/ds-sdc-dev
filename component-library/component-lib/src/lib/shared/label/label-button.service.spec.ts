import { TestBed } from '@angular/core/testing';

import { LabelButtonService } from './label-button.service';

describe('LabelButtonService', () => {
  let service: LabelButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
