import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token = new BehaviorSubject<string>(null);

  get token() {
    return this._token.asObservable();
  }

  constructor(
    private storage: StorageService,
    private api: ApiService,
    private http: HttpClient,
  ) {}

  updateToken(value: string) {
    this._token.next(value);
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const data = {
        email,
        password,
      };
      const response: any = await this.api.get('user/login', data);
      console.log(response);
      this.setUserData(response?.token, response?.user);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async register(formValue: any): Promise<any> {
    try {
      const data = {
        name: formValue.name,
        email: formValue.email,
        phone: formValue.phone,
        password: formValue.password,
      };
      const response: any = await this.api.post('user/signup', data);
      console.log(response);
      this.setUserData(response?.token, response?.user);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async setUserData(token: string, user: any) {
    const data = {
      email: user.email,
      name: user.name,
      phone: user.phone,
      image: user.image ?? '',
    };
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('user_data', JSON.stringify(data));
  }

  async sendResetPasswordOtp(email: string) {
    try {
      const data = {
        email,
      };
      const response: any = await this.api.get(
        'user/send/password/token',
        data,
      );
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async verifyResetPasswordOtp(email: string, otp: string) {
    try {
      const data = {
        email,
        reset_password_token: otp,
      };
      const response: any = await this.api.get('user/verify/token', data);
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(data: any) {
    try {
      const response: any = await this.api.patch('user/reset/password', data);
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  logout() {}

  async getToken() {
    let token: string = window.localStorage.getItem('token');
    return token;
  }

  isLoggedIn() {
    return from(this.getToken());
  }

  resendOtp() {
    return this.api
      .get('user/send/verification/email')
      .then((response) => {
        return response;
      })
      .catch((e) => {
        throw e;
      });
  }

  async verifyEmailOtp(data: any) {
    try {
      const response = await this.api.patch('user/verify', data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  getUserProfile() {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  }

  updateUserProfileImage(imageUrl: string) {
    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    userData.image = imageUrl;
    localStorage.setItem('user_data', JSON.stringify(userData));
  }

  getCurrentUser() {
    const token = window.localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.user_id;
        return userId;
      } catch (error) {
        console.log('Error decoding token: ', error);
        return null;
      }
    }
    return null;
  }
}
