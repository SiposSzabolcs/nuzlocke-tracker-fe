import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, of, switchMap } from 'rxjs';

import { Router, RouterModule } from '@angular/router';
import { TrainerService } from '../../../services/trainer-service/trainer.service';
import { RouteNamesService } from '../../../services/route-names/route-names.service';

@Component({
  selector: 'app-new-trainer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-trainer.component.html',
  styleUrl: './new-trainer.component.css',
})
export class NewTrainerComponent {
  http = inject(HttpClient);
  trainerService = inject(TrainerService);
  routeService = inject(RouteNamesService);
  router = inject(Router);
  id: string | null = null;

  trainerForm = new FormGroup({
    name: new FormControl(''),
  });

  getTrainers() {
    const email = this.trainerService.getEmailFromToken();
    const payload = { email };

    return this.http
      .post<{ id: string }>(
        'https://nuzlocke-tracker-be.onrender.com/users/email',
        payload
      )
      .pipe(
        switchMap((res: { id: string }) => {
          this.id = res.id;
          return of(res);
        }),
        catchError((error) => {
          console.error('Error fetching trainers:', error);
          return of(null);
        })
      );
  }

  handleClick() {
    const trainer = {
      name: this.trainerForm.value.name || '',
      userId: this.id,
      routeIds: this.routeService.kanto_routes,
    };

    this.http
      .post(`https://nuzlocke-tracker-be.onrender.com/trainers`, trainer)
      .subscribe((res: any) => {
        this.trainerService.setTrainerId(res.id);
        localStorage.setItem('lastTrainerId', `${res.id}`);
        this.router.navigateByUrl('dashboard');
      });
  }
}
