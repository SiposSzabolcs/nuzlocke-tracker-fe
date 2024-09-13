import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PokemonBoxComponent } from './pokemon-box/pokemon-box.component';
import { RouteAccordionComponent } from './route-accordion/route-accordion.component';
import { PokemonService } from '../../services/pokemon-service/pokemon.service';
import { RouteNamesService } from '../../services/route-names/route-names.service';
import { PokemonCacheService } from '../../services/pokemon-cache/pokemon-cache.service';
import { TrainerService } from '../../services/trainer-service/trainer.service';
import { forkJoin, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    PokemonBoxComponent,
    RouteAccordionComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  http = inject(HttpClient);
  pokemonService = inject(PokemonService);
  routeNamesService = inject(RouteNamesService);
  pokemonCacheService = inject(PokemonCacheService);
  trainerService = inject(TrainerService);

  pokemonLists: { [key: number]: { name: string; img: string }[] } = {};
  id = '';

  ngOnInit(): void {
    if (this.trainerService.current_trainer_id === 0) {
      this.trainerService.setTrainerId(this.trainerService.getTrainerId());
    }
    this.getAllInfo();
  }

  ngOnDestroy(): void {
    this.pokemonService.clearPokemonBox();
  }

  getAllInfo() {
    this.pokemonService.changeIsLoading();

    this.http
      .get(
        `http://localhost:8080/trainers/${this.trainerService.current_trainer_id}`
      )
      .subscribe((res: any) => {
        this.routeNamesService.routesList = res.routeIds;
        const fetchedPokemonBox: { name: string; img: string }[] = [];
        const pokemonRequests: Observable<any>[] = [];

        if (res.pokemonBox.length === 0) {
          this.pokemonService.changeIsLoading();
        }

        res.pokemonBox.forEach((pokemonName: string) => {
          const cachedImage =
            this.pokemonCacheService.getCachedImage(pokemonName);

          if (cachedImage) {
            const pokemon = { name: pokemonName, img: cachedImage };
            fetchedPokemonBox.push(pokemon);
            this.pokemonService.addPokemonToBox(pokemon);
          } else {
            const request = this.http
              .get(
                `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
              )
              .pipe(
                switchMap((pokemonRes: any) => {
                  const pokemonImage = pokemonRes.sprites.front_default;
                  this.pokemonCacheService.cacheImage(
                    pokemonName,
                    pokemonImage
                  );

                  const pokemon = { name: pokemonName, img: pokemonImage };
                  fetchedPokemonBox.push(pokemon);
                  this.pokemonService.addPokemonToBox(pokemon);

                  return of(pokemon);
                })
              );
            pokemonRequests.push(request);
          }
        });

        forkJoin(pokemonRequests).subscribe(() => {
          this.pokemonService.changeIsLoading();
        });
      });
  }

  trackPokemon(index: number, pokemon: { name: string; img: string }): string {
    return pokemon.name;
  }

  hoverIn(event: any) {
    event.target.style.filter = 'brightness(1.4)';
  }

  hoverOut(event: any) {
    event.target.style.filter = 'brightness(1)';
  }
}
