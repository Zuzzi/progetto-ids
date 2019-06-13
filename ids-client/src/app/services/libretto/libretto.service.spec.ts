import { TestBed } from '@angular/core/testing';

import { LibrettoService } from './libretto.service';

describe('BlockchainLibrettoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibrettoService = TestBed.get(LibrettoService);
    expect(service).toBeTruthy();
  });
});
