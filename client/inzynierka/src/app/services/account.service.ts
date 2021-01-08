import { Injectable } from '@angular/core';

import { ApiHelperService } from './api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  user: any;
  constructor(private helper: ApiHelperService) { }

  // tslint:disable-next-line:typedef
  getUserData() {
      if (localStorage.getItem('token')) {
        const data = this.helper.get(
          'http://localhost:3000/api/account'
        );
        this.user = data;
        console.log(this.user);
      } else {
        console.log('error in account.service');
      }
  }
}
