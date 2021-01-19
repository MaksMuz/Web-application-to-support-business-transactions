import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  resetData = {
    email: ''
  };
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  sendMail() {
    this.auth.resetMail(this.resetData)
      .subscribe(
        res => {
          this.router.navigate(['']);
        },
        err => console.log(err)
      );
  }
}
