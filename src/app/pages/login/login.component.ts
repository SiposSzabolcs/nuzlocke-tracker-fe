import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  loginObject: LoginObject = {
    email: '',
    password: '',
  };

  ngOnInit(): void {
    localStorage.setItem('angular18Token', '');
    localStorage.setItem('lastTrainerId', '');
  }

  http = inject(HttpClient);
  router = inject(Router);

  isFormInvalid(): boolean {
    return !this.loginObject.email || !this.loginObject.password;
  }

  onLogin(mode: string) {
    if (mode === 'demo') {
      this.loginObject.email = 'demo@gmail.com';
      this.loginObject.password = 'test123';
    }

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
