import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pokemon-image',
  templateUrl: './pokemon-image.component.html',
  styleUrls: ['./pokemon-image.component.css'],
  standalone: true,
})
export class PokemonImageComponent {
  @Input() pokemon: { name: string; img: string } = { name: '', img: '' };
  @Output() hoverIn = new EventEmitter<any>();
  @Output() hoverOut = new EventEmitter<any>();
  @Output() click = new EventEmitter<string>();
}
