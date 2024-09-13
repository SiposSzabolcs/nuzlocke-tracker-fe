import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface LoginObject {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObject: LoginObject = {
    email: '',
    password: '',
  };

  http = inject(HttpClient);
  router = inject(Router);

  isFormInvalid(): boolean {
    return !this.loginObject.email || !this.loginObject.password;
  }

  onLogin() {
    this.http
      .post('http://localhost:8080/auth/authenticate', this.loginObject)
      .subscribe((res: any) => {
        if (res.result) {
          alert('Login Success');
          localStorage.setItem('angular18Token', res.token);
          this.router.navigateByUrl('trainers');
        } else {
          alert(res.msg);
        }
      });
  }
}
