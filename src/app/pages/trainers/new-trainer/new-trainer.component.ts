import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, firstValueFrom, of } from 'rxjs';

import { Router } from '@angular/router';
import { TrainerService } from '../../../services/trainer-service/trainer.service';
import { RouteNamesService } from '../../../services/route-names/route-names.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-trainer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-trainer.component.html',
  styleUrl: './new-trainer.component.css',
})
export class NewTrainerComponent {
  http = inject(HttpClient);
  trainerService = inject(TrainerService);
  routeService = inject(RouteNamesService);
  router = inject(Router);
  routes: number[] | undefined = [];
  id: string | null = null;
  selectedGame: string | null = '';

  gameOptions = [
    {
      id: 'firered',
      value: 'firered',
      label: 'Fire Red',
      image: 'firered.jpg',
    },
    {
      id: 'leafgreen',
      value: 'leafgreen',
      label: 'Leaf Green',
      image: 'leafgreen.jpg',
    },
    {
      id: 'soulsilver',
      value: 'soulsilver',
      label: 'Soul Silver',
      image: 'soulsilver.jpg',
    },
    {
      id: 'heartgold',
      value: 'heartgold',
      label: 'Heart Gold',
      image: 'heartgold.jpg',
    },
    {
      id: 'ruby',
      value: 'ruby',
      label: 'Ruby',
      image: 'ruby.jpg',
    },
    {
      id: 'sapphire',
      value: 'sapphire',
      label: 'Sapphire',
      image: 'sapphire.jpg',
    },
    {
      id: 'diamond',
      value: 'diamond',
      label: 'Diamond',
      image: 'diamond.jpg',
    },
    {
      id: 'pearl',
      value: 'pearl',
      label: 'Pearl',
      image: 'pearl.jpg',
    },
    {
      id: 'black',
      value: 'black',
      label: 'Black',
      image: 'black.jpg',
    },
    {
      id: 'white',
      value: 'white',
      label: 'White',
      image: 'white.jpg',
    },
    {
      id: 'x',
      value: 'x',
      label: 'X',
      image: 'x.jpg',
    },
    {
      id: 'y',
      value: 'y',
      label: 'Y',
      image: 'y.jpg',
    },
  ];

  trainerForm = new FormGroup({
    name: new FormControl(''),
    version: new FormControl(''),
  });

  isFormInvalid(): boolean {
    return !this.trainerForm.value.name || !this.trainerForm.value.version;
  }

  constructor() {
    this.trainerForm.get('version')?.valueChanges.subscribe((value) => {
      this.selectedGame = value;
    });
  }

  async getId() {
    const email = this.trainerService.getEmailFromToken();
    const payload = { email };

    try {
      const response = await firstValueFrom(
        this.http
          .post<{ id: string }>('http://localhost:8080/users/email', payload)
          .pipe(
            catchError((error) => {
              console.error('Error fetching userId:', error);
              return of(null);
            })
          )
      );
      return response ? response.id : null;
    } catch (error) {
      console.error('Error in getId:', error);
      return null;
    }
  }

  async handleClick() {
    let userId = await this.getId();

    if (this.trainerForm.value.version) {
      this.routes = this.routeService.getRoutes(this.trainerForm.value.version);
    }

    const trainer = {
      name: this.trainerForm.value.name || '',
      userId,
      routeIds: this.routes,
      game: this.trainerForm.value.version || '',
    };

    this.http
      .post(`http://localhost:8080/trainers`, trainer)
      .subscribe((res: any) => {
        this.trainerService.setTrainerId(res.id);
        this.trainerService.setTrainerName(res.name);
        localStorage.setItem('lastTrainerId', `${res.id}`);
        localStorage.setItem('lastTrainerName', `${res.name}`);
        this.router.navigateByUrl('dashboard');
      });
  }

  hoverIn(event: any) {
    event.target.style.filter = 'brightness(1.08)';
  }

  hoverOut(event: any) {
    event.target.style.filter = 'brightness(1)';
  }
}
