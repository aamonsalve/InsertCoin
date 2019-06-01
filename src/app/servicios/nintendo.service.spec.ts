import { TestBed } from '@angular/core/testing';

import { NintendoService } from './nintendo.service';

describe('NintendoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NintendoService = TestBed.get(NintendoService);
    expect(service).toBeTruthy();
  });
});
