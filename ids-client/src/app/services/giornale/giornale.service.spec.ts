import { TestBed } from '@angular/core/testing';

import { GiornaleService } from './giornale.service';

describe('GiornaleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GiornaleService = TestBed.get(GiornaleService);
    expect(service).toBeTruthy();
  });
});
