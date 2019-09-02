import { TestBed, async, inject } from '@angular/core/testing';

import { ContrattoGuard } from './contratto.guard';

describe('ContrattoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContrattoGuard]
    });
  });

  it('should ...', inject([ContrattoGuard], (guard: ContrattoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
