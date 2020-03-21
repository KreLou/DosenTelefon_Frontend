import { TestBed } from '@angular/core/testing';

import { UserLoaderService } from './user-loader.service';

describe('UserLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserLoaderService = TestBed.get(UserLoaderService);
    expect(service).toBeTruthy();
  });
});
