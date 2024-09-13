import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonCacheService {
  private cache = new Map<string, string>();

  getCachedImage(pokemonName: string): string | undefined {
    return this.cache.get(pokemonName);
  }

  cacheImage(pokemonName: string, imageUrl: string): void {
    this.cache.set(pokemonName, imageUrl);
  }
}
