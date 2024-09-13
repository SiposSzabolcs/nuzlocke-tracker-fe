import { TestBed } from '@angular/core/testing';

import { PokemonCacheService } from './pokemon-cache.service';

describe('PokemonCacheService', () => {
  let service: PokemonCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
