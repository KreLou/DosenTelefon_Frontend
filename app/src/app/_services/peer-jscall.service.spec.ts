import { TestBed } from '@angular/core/testing';

import { PeerJSCallService } from './peer-jscall.service';

describe('PeerJSCallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeerJSCallService = TestBed.get(PeerJSCallService);
    expect(service).toBeTruthy();
  });
});
