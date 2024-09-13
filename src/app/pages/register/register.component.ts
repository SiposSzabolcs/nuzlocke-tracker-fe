import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface RegisterObject {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
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
