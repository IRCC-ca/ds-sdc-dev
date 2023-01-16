import { TestBed } from '@angular/core/testing';

import { IrccDsAngularComponentLibraryService } from './ircc-ds-angular-component-library.service';

describe('IrccDsAngularComponentLibraryService', () => {
  let service: IrccDsAngularComponentLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IrccDsAngularComponentLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
