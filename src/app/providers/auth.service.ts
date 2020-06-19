import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserAuth = false;

  constructor(private http: HttpClient) {
    this.isUserAuth = this.isAuthenticated();
  }

  addUser(data: any): Observable<any> {
    return this.http
      .post('http://localhost:3333/api/user/new', data)
      .pipe(catchError((err) => throwError(err)));
  }

  loginUser(data: any): Observable<any> {
    return this.http
      .post('http://localhost:3333/api/user/login', data)
      .pipe(
        map((data) => {
          this.presistCredentials(data);
          return data;
        })
      )
      .pipe(catchError((err) => throwError(err)));
  }

  logoutUser() {
    this.deleteCredentials();
    return true;
  }

  isAuthenticated(): boolean {
    let isAuth = false;
    if (this.getUserToken()) {
      isAuth = true;
    }
    return isAuth;
  }

  getUserToken() {
    return localStorage.getItem('token') || false;
  }

  getUserDataSession() {
    const user = {
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('userName'),
      email: localStorage.getItem('email')
    };
    return user;
  }

  private presistCredentials(data: any) {
    const userId = data.user[0].id;
    const userName = data.user[0].username;
    const email = data.user[0].email;
    const token = data.token;

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('email', email);
    localStorage.setItem('userName', userName);
  }

  private deleteCredentials() {
    localStorage.clear();
  }
}