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

  clickLog(id: any) {
    console.log(id);
  }

  handleClick(id: number, name: string) {
    this.trainerService.setTrainerId(id);
    this.trainerService.setTrainerName(name);
    localStorage.setItem('lastTrainerId', `${id}`);
    localStorage.setItem('lastTrainerName', `${name}`);
    this.router.navigateByUrl('dashboard');
  }

  getTrainers(email: string | null): void {
    const payload = { email };

    this.http
      .post<{ id: string }>('http://localhost:8080/users/email', payload)
      .pipe(
        switchMap((res) =>
          this.http.get<Trainer[]>(
            `http://localhost:8080/trainers/user/${res.id}`
          )
        ),
        catchError((error) => {
          console.error('Error fetching trainers:', error);
          return of([]);
        })
      )
      .subscribe((res: Trainer[]) => {
        this.responseList = res;
      });
  }

  hoverIn(event: any) {
    event.target.style.filter = 'brightness(1.4)';
  }

  hoverOut(event: any) {
    event.target.style.filter = 'brightness(1)';
  }
}
