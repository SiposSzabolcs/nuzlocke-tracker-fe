import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, firstValueFrom, of, switchMap, tap } from 'rxjs';

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
    console.log(email);
    const payload = { email };

    this.http
      .post<{ id: string }>('http://localhost:8080/users/email', payload)
      .pipe(
        switchMap((res: { id: string }) => {
          console.log(res);
          this.id = res.id;
          console.log(this.id);
          return of(res);
        }),
        catchError((error) => {
          console.error('Error fetching trainers:', error);
          return of(null);
        })
      );
  }

  async getId() {
    const email = this.trainerService.getEmailFromToken();
    console.log(email);
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
    console.log(userId);

    const trainer = {
      name: this.trainerForm.value.name || '',
      userId,
      routeIds: this.routeService.kanto_routes,
      game: 'firered',
    };

    console.log(trainer);

    this.http
      .post(`http://localhost:8080/trainers`, trainer)
      .subscribe((res: any) => {
        console.log(res);
        this.trainerService.setTrainerId(res.id);
        localStorage.setItem('lastTrainerId', `${res.id}`);
        this.router.navigateByUrl('dashboard');
      });
  }
}
