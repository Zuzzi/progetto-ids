import { TestBed } from '@angular/core/testing';

import { SalService } from './sal.service';

describe('SalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalService = TestBed.get(SalService);
    expect(service).toBeTruthy();
  });
});
