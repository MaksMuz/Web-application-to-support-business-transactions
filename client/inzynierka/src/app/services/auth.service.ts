/* tslint:disable:typedef */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {ApiHelperService} from './api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/authorization';
  private registerUrl = this.baseUrl + '/register';
  private loginUrl = this.baseUrl + '/login';
  private resetUrl = this.baseUrl + '/resetpassword';

  constructor(private http: HttpClient, private router: Router, private helper: ApiHelperService) { }

  // tslint:disable-next-line:typedef
  registerUser(user: any){
    return this.helper.post<any>(this.registerUrl, user);
  }

  resetPassword(token, user: any){
    const url = this.resetUrl + '/' + token;
    return this.helper.put<any>(url, user);
  }
  // tslint:disable-next-line:typedef
  loginUser(user){
    return this.helper.post<any>(this.loginUrl, user);
  }

  resetMail(user){
    return this.helper.post<any>(this.resetUrl, user);
  }
  // tslint:disable-next-line:typedef
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  // tslint:disable-next-line:typedef
  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  // tslint:disable-next-line:typedef
  getToken() {
    return localStorage.getItem('token');
  }
}
