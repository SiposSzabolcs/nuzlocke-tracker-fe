import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface RegisterObject {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  faArrowLeft = faArrowLeft;

  handleClick() {
    this.router.navigateByUrl('login');
  }

  registerObject: RegisterObject = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };

  http = inject(HttpClient);
  router = inject(Router);

  isFormInvalid(): boolean {
    return (
      !this.registerObject.firstname ||
      !this.registerObject.lastname ||
      !this.registerObject.email ||
      !this.registerObject.password
    );
  }

  onRegister() {
    this.http
      .post('http://localhost:8080/auth/register', this.registerObject)
      .subscribe((res: any) => {
        if (res.result) {
          alert('Registered successfully');
          this.router.navigateByUrl('login');
        } else {
          alert(res.msg);
        }
      });
  }
}
