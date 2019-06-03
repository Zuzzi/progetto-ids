import { TestBed } from '@angular/core/testing';

import { BlockchainLibrettoService } from './blockchain-libretto.service';

describe('BlockchainLibrettoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlockchainLibrettoService = TestBed.get(BlockchainLibrettoService);
    expect(service).toBeTruthy();
  });
});
