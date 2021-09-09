import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import { User } from './User';
import { RegisterUser } from './RegisterUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getToken() {
    return localStorage.getItem('access_token');
  }

  readToken() {
    let token = this.getToken();
    return helper.decodeToken(token);
  }

  isAuthenticated(): boolean {
    let token = this.getToken();
    return token ? true : false;
  }

  login(user: User): Observable<any> {
    return this.http.post(`${environment.userAPIBase}/login`, user);
  }

  logout() {
    localStorage.clear();
  }

  register(registerUser: RegisterUser): Observable<any> {
    /**
     * Converted the username to lowercase because usernames
     * are supposed to be unique. There can't be two users
     * with the same letters in different cases (e.g. "test"
     * and "TEST")
     */
    registerUser.userName = registerUser.userName.toLowerCase();
    return this.http.post(`${environment.userAPIBase}/register`, registerUser);
  }
}
