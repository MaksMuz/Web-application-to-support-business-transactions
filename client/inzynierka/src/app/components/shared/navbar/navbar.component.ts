import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {MessengerService} from '../../../services/messenger.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  reg: string;
  constructor(public authService: AuthService, private router: Router, private message: MessengerService) {
  }

  ngOnInit(): void {
  }

  search(): void {
    if (this.reg)
    {
      this.router.navigate(['shop/search'], { queryParams: { reg: this.reg } });
    } else {
      this.message.info('Search shouldn\'t be empty if you want find something');
    }
  }

}
