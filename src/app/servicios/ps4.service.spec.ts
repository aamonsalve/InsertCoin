import { TestBed } from '@angular/core/testing';

import { Ps4Service } from './ps4.service';

describe('Ps4Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Ps4Service = TestBed.get(Ps4Service);
    expect(service).toBeTruthy();
  });
});
