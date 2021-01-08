/* tslint:disable:typedef */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { PasswordValidator } from '../../shared/validators/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  registerUserData = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    samePassword: '',
  };
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = fb.group({
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]]
    }, {
      validator: PasswordValidator('password', 'password2')
    });
  }

  ngOnInit(): void {
  }

  // todo: check if user by mail exists

  async registerUser() {
    console.log(this.registerUserData);
    this.auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['account']);
        },
        err => console.log(err)
      );
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
  }
}
