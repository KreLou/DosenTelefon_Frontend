import { TestBed } from '@angular/core/testing';

import { CallManagerService } from './call-manager.service';

describe('CallManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CallManagerService = TestBed.get(CallManagerService);
    expect(service).toBeTruthy();
  });
});
