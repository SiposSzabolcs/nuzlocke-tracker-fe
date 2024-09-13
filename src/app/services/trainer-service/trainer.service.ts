import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  current_trainer_id: number | string = 0;
  private tokenKey: string = 'angular18Token';
  private lastTrainerIdKey: string = 'lastTrainerId';

  constructor() {}

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public getTrainerId(): string {
    const lastTrainerId = localStorage.getItem(this.lastTrainerIdKey);
    return lastTrainerId !== null ? lastTrainerId : '0';
  }

  setTrainerId(id: number | string) {
    if (id) {
      this.current_trainer_id = id;
    }
  }

  getEmailFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.sub || null;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }
}
