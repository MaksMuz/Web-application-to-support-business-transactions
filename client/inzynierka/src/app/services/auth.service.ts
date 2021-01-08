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

  constructor(private http: HttpClient, private router: Router, private helper: ApiHelperService) { }

  // tslint:disable-next-line:typedef
  registerUser(user: any){
    return this.helper.post<any>(this.registerUrl, user);
  }
  // tslint:disable-next-line:typedef
  loginUser(user){
    return this.helper.post<any>(this.loginUrl, user);
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
