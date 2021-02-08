import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PasswordValidator } from '../../shared/validators/password.validator';
import {MessengerService} from '../../services/messenger.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  form: FormGroup;

  namePattern = '[A-Za-z]*';

  userSettings = {
    name: '',
    lastName: '',
    email: '',
  };

  newPassword = {
    password: ''
  };

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(private fb: FormBuilder, public accountService: AccountService,
              private router: Router, private message: MessengerService) { }

  ngOnInit(): void {
    this.getUserSettings();
    this.form = this.fb.group({
      password: ['', [Validators.minLength(8)]],
      password2: ['', [Validators.required]]
    }, {
      validator: PasswordValidator('password', 'password2')
    });
  }

  getUserSettings(): void {
    this.accountService.getUserData()
      .subscribe(
        res => {
          const userData = res.body.userData;
          this.userSettings.name = userData.name;
          this.userSettings.lastName = userData.lastName;
          this.userSettings.email = userData.email;
        },
        err => this.message.info(err.error)
      );
  }

  update(): void {
    this.accountService.updateUserData(this.userSettings)
      .subscribe(
        res => {
          this.router.navigate(['account']);
          this.message.info(res.body.message);
        },
        err => this.message.info(err.error)
      );
  }

  get f() {
    return this.form.controls;
  }

  updatePassword(): void {
    this.accountService.updatePassword(this.newPassword)
      .subscribe(
        res => {
          this.router.navigate(['account']);
          this.message.info(res.body.message);
        },
        err => this.message.info(err.error)
      );
  }

  submit() {
    this.newPassword.password = this.form.value.password;
    this.updatePassword();
  }

}
