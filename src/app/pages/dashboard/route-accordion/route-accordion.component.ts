import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonImageComponent } from '../pokemon-image/pokemon-image.component';
import { PokemonBoxComponent } from '../pokemon-box/pokemon-box.component';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../../services/pokemon-service/pokemon.service';
import { PokemonCacheService } from '../../../services/pokemon-cache/pokemon-cache.service';
import { RouteNamesService } from '../../../services/route-names/route-names.service';
import { TrainerService } from '../../../services/trainer-service/trainer.service';

@Component({
  selector: 'app-route-accordion',
  templateUrl: './route-accordion.component.html',
  styleUrls: ['./route-accordion.component.css'],
  standalone: true,
  imports: [
    PokemonImageComponent,
    PokemonBoxComponent,
    LoadingComponent,
    CommonModule,
  ],
})
export class RouteAccordionComponent {
  pokemonService = inject(PokemonService);
  pokemonCacheService = inject(PokemonCacheService);
  routeNamesService = inject(RouteNamesService);
  trainerService = inject(TrainerService);
  droppedDown = false;
  isLoading = true;

  @Input() routesList: any[] = [];
  @Input() pokemonLists: { [key: number]: { name: string; img: string }[] } =
    {};
  @Input() game: string | null = '';
  pokemonBox = this.pokemonService.pokemonBox;

  constructor(private http: HttpClient) {}

  trackPokemon(index: number, pokemon: { name: string }): string {
    return pokemon.name;
  }

  getLocation(id: number) {
    this.droppedDown = !this.droppedDown;
    this.isLoading = true;

    if (this.droppedDown === true) {
      this.http
        .get(`https://pokeapi.co/api/v2/location-area/${id}`)
        .subscribe((res: any) => {
          const pokemonInRegion: { name: string; img: string }[] = [];
          let pendingRequests = 0;

          res.pokemon_encounters.forEach((encounter: any) => {
            encounter.version_details.forEach((versionDetail: any) => {
              if (versionDetail.version.name === this.game) {
                const pokemonName = encounter.pokemon.name;
                if (!this.checkPokemonInBox(pokemonName)) {
                  const cachedImage =
                    this.pokemonCacheService.getCachedImage(pokemonName);
                  if (cachedImage) {
                    pokemonInRegion.push({
                      name: pokemonName,
                      img: cachedImage,
                    });
                    this.pokemonLists[id] = pokemonInRegion;
                  } else {
                    pendingRequests++;
                    this.http
                      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                      .subscribe((pokemonRes: any) => {
                        const pokemonImage = pokemonRes.sprites.front_default;

                        this.pokemonCacheService.cacheImage(
                          pokemonName,
                          pokemonImage
                        );

                        pokemonInRegion.push({
                          name: pokemonName,
                          img: pokemonImage,
                        });

                        this.pokemonLists[id] = pokemonInRegion;
                        pendingRequests--;

                        if (pendingRequests === 0) {
                          this.isLoading = false;
                          console.log(pokemonInRegion.length);
                        }
                      });
                  }
                }
              }
            });
          });
          if (pendingRequests === 0) {
            this.isLoading = false;
            console.log(pokemonInRegion.length);
          }
        });
    }
  }

  checkPokemonInBox(pokemonName: string) {
    for (const pokemon of this.pokemonBox) {
      if (pokemonName === pokemon.name) {
        return true;
      }
    }
    return false;
  }

  hoverIn(event: any) {
    event.target.style.filter = 'brightness(1.4)';
  }

  hoverOut(event: any) {
    event.target.style.filter = 'brightness(1)';
  }
}
