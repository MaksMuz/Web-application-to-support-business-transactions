import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    accountUserData = {
        name: '',
        lastName: '',
        picture: ''
    };
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
      this.getUserData();
  }

  getUserData(): void {
      this.accountService.getUserData()
          .subscribe(
              res => {
                  const userData = res.body.userData;
                  this.accountUserData.name = userData.name;
                  this.accountUserData.lastName = userData.lastName;
                  this.accountUserData.picture = userData.picture;
                  },
              err => console.log(err)
          );
  }

}
