import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  faSignOut = faSignOut;

  router = inject(Router);

  handleClick(): void {
    const url = this.router.url;
    const endpoint = this.extractEndpoint(url);

    if (endpoint === 'trainers') {
      this.router.navigateByUrl('');
    } else if (endpoint === 'dashboard') {
      this.router.navigateByUrl('trainers');
    }
  }

  extractEndpoint(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
}
