import { TestBed } from '@angular/core/testing';

import { XboxService } from './xbox.service';

describe('XboxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XboxService = TestBed.get(XboxService);
    expect(service).toBeTruthy();
  });
});
