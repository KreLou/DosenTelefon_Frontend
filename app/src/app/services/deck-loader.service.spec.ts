import { TestBed } from '@angular/core/testing';

import { DeckLoaderService } from './deck-loader.service';

describe('DeckLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeckLoaderService = TestBed.get(DeckLoaderService);
    expect(service).toBeTruthy();
  });
});
