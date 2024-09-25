import { Component, inject } from '@angular/core';
import { PokemonImageComponent } from '../pokemon-image/pokemon-image.component';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';
import { faArrowUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PokemonService } from '../../../services/pokemon-service/pokemon.service';

@Component({
  selector: 'app-pokemon-box',
  templateUrl: './pokemon-box.component.html',
  styleUrls: ['./pokemon-box.component.css'],
  standalone: true,
  imports: [
    PokemonImageComponent,
    LoadingComponent,
    FontAwesomeModule,
    CommonModule,
  ],
})
export class PokemonBoxComponent {
  pokemonService = inject(PokemonService);
  faArrowUp = faArrowUp;
  faTrash = faTrash;

  pokemonBox = this.pokemonService.pokemonBox;
  deleteState = false;
  evolveState = false;

  changeDeleteState() {
    this.evolveState = false;
    this.deleteState = !this.deleteState;
  }

  changeEvolveState() {
    this.deleteState = false;
    this.evolveState = !this.evolveState;
  }

  trackPokemon(index: number, pokemon: { name: string }): string {
    return pokemon.name;
  }

  async handlePokemonClick(pokemon: { name: string }) {
    if (this.deleteState) {
      this.pokemonService.deletePokemon(pokemon.name);
      this.pokemonService.removePokemonFromBox(pokemon.name);
      this.deleteState = false;
    } else if (this.evolveState) {
      const evolution = await this.pokemonService.canPokemonEvolve(
        pokemon.name
      );
      if (typeof evolution === 'string') {
        this.pokemonService.evolvePokemon(pokemon.name, evolution);
        await this.pokemonService.evolvePokemonInBox(pokemon.name, evolution);
        this.evolveState = false;
      } else {
        this.evolveState = false;
      }
    } else {
      window.open(
        `https://pokemondb.net/pokedex/${pokemon.name.toLowerCase()}`,
        '_blank'
      );
    }
  }

  hoverIn(event: any) {
    event.target.style.filter = 'brightness(1.4)';
  }

  hoverOut(event: any) {
    event.target.style.filter = 'brightness(1)';
  }
}
