import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonCacheService } from '../pokemon-cache/pokemon-cache.service';
import { firstValueFrom } from 'rxjs';
import { TrainerService } from '../trainer-service/trainer.service';
import { RouteNamesService } from '../route-names/route-names.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  http = inject(HttpClient);
  routeNames = inject(RouteNamesService);
  pokemonCacheService = inject(PokemonCacheService);
  trainerService = inject(TrainerService);
  pokemonBox: { name: string; img: string }[] = [];
  isLoading = false;

  constructor() {}

  addPokemonToBox(pokemon: { name: string; img: string }) {
    this.pokemonBox.push(pokemon);
  }

  clearPokemonBox() {
    this.pokemonBox = [];
  }

  changeIsLoading() {
    this.isLoading = !this.isLoading;
  }

  removePokemonFromBox(name: string) {
    const index = this.pokemonBox.findIndex((pokemon) => pokemon.name === name);
    if (index !== -1) {
      this.pokemonBox.splice(index, 1);
    }
  }

  deletePokemon(name: string) {
    const payload = {
      pokemonName: name,
    };

    const url = `https://nuzlocke-tracker-be.onrender.com/trainers/${this.trainerService.current_trainer_id}/pokemon`;

    this.http.request('delete', url, { body: payload }).subscribe({});
  }

  evolvePokemon(name: string, evolveName: string) {
    const payload = {
      pokemonName: name,
      evolvedPokemonName: evolveName,
    };

    const url = `https://nuzlocke-tracker-be.onrender.com/trainers/${this.trainerService.current_trainer_id}/pokemon/evolve`;

    this.http.request('put', url, { body: payload }).subscribe();
  }

  addPokemon(name: string, route: number) {
    const payload = {
      pokemonName: name,
    };

    this.http
      .post(
        `https://nuzlocke-tracker-be.onrender.com/trainers/${this.trainerService.current_trainer_id}/pokemon`,
        payload
      )
      .subscribe({
        next: async (response) => {
          try {
            const pokemon = await this.fetchPokemonImage(name.toLowerCase());
            this.addPokemonToBox(pokemon);
          } catch (error) {
            console.error('Error fetching Pokémon image:', error);
          }
        },
        error: (error) => {
          console.error('Error adding Pokémon:', error);
        },
      });

    this.removeRoute(route);
  }

  removeRoute(route: number) {
    this.http
      .delete(
        `https://nuzlocke-tracker-be.onrender.com/trainers/${this.trainerService.current_trainer_id}/routes/${route}`
      )
      .subscribe((res: any) => {});

    this.routeNames.removeRoute(route);
  }

  async evolvePokemonInBox(name: string, evolveName: string) {
    this.removePokemonFromBox(name);
    const pokemon = await this.fetchPokemonImage(evolveName.toLowerCase());
    this.addPokemonToBox(pokemon);
  }

  async canPokemonEvolve(pokemonName: string): Promise<string | boolean> {
    try {
      const pokemonData = await firstValueFrom(
        this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      );

      const speciesData = await firstValueFrom(
        this.http.get<any>(pokemonData.species.url)
      );

      const evolutionData = await firstValueFrom(
        this.http.get<any>(speciesData.evolution_chain.url)
      );

      function checkEvolvesFurther(
        chain: any,
        targetName: string
      ): string | boolean {
        if (chain.species.name === targetName) {
          if (chain.evolves_to.length > 0) {
            return chain.evolves_to[0].species.name;
          }
          return false;
        }

        for (const evolution of chain.evolves_to) {
          const result = checkEvolvesFurther(evolution, targetName);
          if (result) {
            return result;
          }
        }
        return false;
      }

      return checkEvolvesFurther(evolutionData.chain, pokemonName);
    } catch (error) {
      console.error('Error fetching Pokémon evolution data:', error);
      return false;
    }
  }

  private async fetchPokemonImage(
    name: string
  ): Promise<{ name: string; img: string }> {
    const cachedImage = this.pokemonCacheService.getCachedImage(name);

    if (cachedImage) {
      return { name, img: cachedImage };
    }

    try {
      const pokemonRes = await firstValueFrom(
        this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${name}`)
      );
      const pokemonImage = pokemonRes.sprites.front_default;

      this.pokemonCacheService.cacheImage(name, pokemonImage);

      return { name, img: pokemonImage };
    } catch (error) {
      console.error('Error fetching Pokémon image:', error);
      throw error;
    }
  }
}
