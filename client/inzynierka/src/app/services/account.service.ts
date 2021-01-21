import { Injectable } from '@angular/core';

import { ApiHelperService } from './api-helper.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'http://localhost:3000/api/account';
  private getUserDataUrl = this.baseUrl + '/';
  private UserAddressUrl = this.baseUrl + '/address';
  private changePasswordUrl = this.baseUrl + '/change';
  constructor(private helper: ApiHelperService, private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  getUserData(){
    return this.helper.get<any>(this.getUserDataUrl);
  }
  // tslint:disable-next-line:typedef
  getUserAddress(){
    return this.helper.get<any>(this.UserAddressUrl);
  }
  // tslint:disable-next-line:typedef
  updateUserData(user){
    return this.helper.post<any>(this.getUserDataUrl, user);
  }
  // tslint:disable-next-line:typedef
  updatePassword(password){
    return this.helper.post<any>(this.changePasswordUrl, password);
  }
  // tslint:disable-next-line:typedef
  postUserAddress(address){
    return this.helper.post<any>(this.UserAddressUrl, address);
  }
}
