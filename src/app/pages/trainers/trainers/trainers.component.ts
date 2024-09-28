import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { catchError, of, switchMap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { TrainerService } from '../../../services/trainer-service/trainer.service';
import { Notyf } from 'notyf';

interface Trainer {
  id: number;
  name: string;
  pokemonBox: string[];
  routeIds: number[];
  userId: number;
  game: string;
}

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [JsonPipe, CommonModule, RouterModule],
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css'],
})
export class TrainersComponent implements OnInit {
  http = inject(HttpClient);
  trainerService = inject(TrainerService);
  router = inject(Router);
  notyf = new Notyf({
    position: {
      x: 'right',
      y: 'top',
    },
    types: [
      {
        type: 'success',
        background: '#4CAF50',
      },
      {
        type: 'error',
        background: '#FF6B6B',
      },
    ],
  });
  responseList: Trainer[] = [];
  isLoading = false;

  email = this.trainerService.getEmailFromToken();

  ngOnInit(): void {
    if (this.email) {
      this.getTrainers(this.email);
    } else {
      console.error('Email is null or undefined');
    }
    this.trainerService.setTrainerId(0);
  }

  deleteTrainer(id: number) {
    this.http
      .delete(`https://nuzlocke-tracker-be.onrender.com/trainers/${id}`)
      .subscribe({
        next: () => {
          this.removeFromResponseList(id);
          this.notyf.success('Trainer removed.');
        },
        error: (err) => {
          console.error('Error deleting trainer:', err);
        },
      });
  }

  removeFromResponseList(id: number) {
    this.responseList = this.responseList.filter((item) => item.id !== id);
  }

  handleClick(id: number, name: string) {
    this.trainerService.setTrainerId(id);
    this.trainerService.setTrainerName(name);
    localStorage.setItem('lastTrainerId', `${id}`);
    localStorage.setItem('lastTrainerName', `${name}`);
    this.router.navigateByUrl('dashboard');
  }

  getTrainers(email: string | null): void {
    this.isLoading = true;
    const payload = { email };

    this.http
      .post<{ id: string }>(
        'https://nuzlocke-tracker-be.onrender.com/users/email',
        payload
      )
      .pipe(
        switchMap((res) =>
          this.http.get<Trainer[]>(
            `https://nuzlocke-tracker-be.onrender.com/trainers/user/${res.id}`
          )
        ),
        catchError((error) => {
          console.error('Error fetching trainers:', error);
          return of([]);
        })
      )
      .subscribe((res: Trainer[]) => {
        this.isLoading = false;
        this.responseList = res;
      });
  }

  hoverIn(event: any) {
    event.target.style.filter = 'brightness(1.08)';
  }

  hoverOut(event: any) {
    event.target.style.filter = 'brightness(1)';
  }
}
