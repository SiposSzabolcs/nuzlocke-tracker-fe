import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOut, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TrainerService } from '../../services/trainer-service/trainer.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  faSignOut = faSignOut;
  faArrowLeft = faArrowLeft;

  router = inject(Router);
  trainerService = inject(TrainerService);

  current_trainer_id = localStorage.getItem('lastTrainerName');

  handleClick(): void {
    let endpoint = this.extractEndpoint();

    localStorage.setItem('lastTrainerName', '');
    localStorage.setItem('lastTrainerId', '');
    this.trainerService.setTrainerId('');
    this.trainerService.setTrainerName('');

    if (endpoint === 'trainers') {
      this.router.navigateByUrl('');
    } else if (endpoint === 'dashboard') {
      this.router.navigateByUrl('trainers');
    }
  }

  extractEndpoint() {
    const url = this.router.url;
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
}
