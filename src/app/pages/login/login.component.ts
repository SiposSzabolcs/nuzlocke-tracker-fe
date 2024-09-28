import { CommonModule } from '@angular/common';
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
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginObject: LoginObject = {
    email: '',
    password: '',
  };
  isLoading = false;

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
    setTimeout(() => {
      this.isLoading = true;
    }, 3000);

    if (mode === 'demo') {
      this.loginObject.email = 'demo@gmail.com';
      this.loginObject.password = 'test123';
    }

    this.http
      .post(
        'https://nuzlocke-tracker-be.onrender.com/auth/authenticate',
        this.loginObject
      )
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
