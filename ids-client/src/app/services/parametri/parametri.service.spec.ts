import { TestBed } from '@angular/core/testing';

import { ParametriService } from './parametri.service';

describe('ParametriService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParametriService = TestBed.get(ParametriService);
    expect(service).toBeTruthy();
  });
});
