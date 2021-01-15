import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  reg: string;
  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  search(): void {
    this.router.navigate(['shop/search'], { queryParams: { reg: this.reg } });
  }

}
