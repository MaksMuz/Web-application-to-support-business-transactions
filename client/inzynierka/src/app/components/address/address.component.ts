import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';
import {MessengerService} from '../../services/messenger.service';

class Address {
  country: string;
  province: string;
  city: string;
  shipAddress: string;
  postCode: string;
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  letterPattern = '[A-Za-z]*';
  postCodePattern = '^[0-9]{2}-[0-9]{3}';
  addressPattern = '^[A-Za-z]+ [0-9]{1,}/[0-9]{0,3}';
  address: Address = {
    country: '',
    province: '',
    city: '',
    shipAddress: '',
    postCode: ''
  };

  constructor(private accountService: AccountService, private router: Router, private message: MessengerService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.accountService.getUserAddress()
      .subscribe(
        res => {
          if (res.status === 204){
            this.address.country = '';
            this.address.province = '';
            this.address.city = '';
            this.address.shipAddress = '';
            this.address.postCode = '';
          } else {

            this.address.country = res.body.address.country;
            this.address.province = res.body.address.province;
            this.address.city = res.body.address.city;
            this.address.shipAddress = res.body.address.shipAddress;
            this.address.postCode = res.body.address.postCode;
          }
          },
        err => this.message.info(err.error)
      );
  }

  updateUserAddress(): void {
    console.log(this.address);
    this.accountService.postUserAddress(this.address)
        .subscribe(
          res => {
              this.router.navigate(['account']);
              this.message.info(res.body.message);
          },
          err => this.message.info(err.error)
      );
  }

}

