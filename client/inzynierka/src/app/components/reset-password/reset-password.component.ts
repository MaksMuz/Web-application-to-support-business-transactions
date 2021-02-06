import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PasswordValidator } from '../../shared/validators/password.validator';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessengerService} from '../../services/messenger.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;

  resetData = {
  password: ''
};

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,
              private route: ActivatedRoute, private message: MessengerService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: ['', [Validators.minLength(8)]],
      password2: ['', [Validators.required]]
    }, {
      validator: PasswordValidator('password', 'password2')
    });
  }

  reset() {
    const token = this.route.snapshot.paramMap.get('token');
    this.auth.resetPassword(token, this.resetData)
      .subscribe(
        res => {
          this.router.navigate(['login']);
          this.message.info(res.body.message);
        },
        err => this.message.info(err.error)
      );
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.resetData.password = this.form.value.password;
    this.reset();
  }

}
