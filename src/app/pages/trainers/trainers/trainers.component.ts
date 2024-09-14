import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { catchError, of, switchMap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { TrainerService } from '../../../services/trainer-service/trainer.service';

interface Trainer {
  id: number;
  name: string;
  pokemonBox: string[];
  routeIds: number[];
  userId: number;
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
  responseList: Trainer[] = [];

  email = this.trainerService.getEmailFromToken();

  ngOnInit(): void {
    if (this.email) {
      this.getTrainers(this.email);
    } else {
      console.error('Email is null or undefined');
    }
    this.trainerService.setTrainerId(0);
  }

  handleClick(id: number) {
    console.log(id);
    this.trainerService.setTrainerId(id);
    localStorage.setItem('lastTrainerId', `${id}`);
    this.router.navigateByUrl('dashboard');
  }

  getTrainers(email: string | null): void {
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
        console.log('Trainers response:', res);
        this.responseList = res;
      });
  }
}
