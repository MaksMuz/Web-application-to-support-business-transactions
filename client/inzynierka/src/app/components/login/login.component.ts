import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {MessengerService} from '../../services/messenger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  loginUserData = {
    email: '',
    password: ''
  };
  constructor(private auth: AuthService, private router: Router, private message: MessengerService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  loginUser() {
    this.auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.body.token);
          this.router.navigate(['']);
        },
        err => this.message.info(err.error)
      );
  }
}
