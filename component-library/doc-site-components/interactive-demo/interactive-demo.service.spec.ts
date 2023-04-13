import { TestBed } from '@angular/core/testing';

import { InteractiveDemoService } from './interactive-demo.service';

describe('InteractiveDemoService', () => {
  let service: InteractiveDemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteractiveDemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
