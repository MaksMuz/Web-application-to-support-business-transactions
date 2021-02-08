/* tslint:disable:typedef */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import {MessengerService} from '../../services/messenger.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  namePattern = '[A-Za-z]*';
  lastNamePattern = '[a-zA-Z ]*';


  registerUserData = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    samePassword: '',
  };
  constructor(private auth: AuthService, private router: Router, private message: MessengerService) { }

  ngOnInit(): void {
  }

  registerUser() {
    if (this.registerUserData.password === this.registerUserData.samePassword) {
      console.log(this.registerUserData);
      this.auth.registerUser(this.registerUserData)
        .subscribe(
          res => {
            localStorage.setItem('token', res.body.token);
            this.router.navigate(['account']);
          },
          err => this.message.info(err.error)
        );
    } else {
      this.message.info('Password doesn\'t match');
    }
  }
}
