import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../services/cart.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public authService: AuthService, private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  get cartItems() {
    return this.cartService.getCart();
  }
}
