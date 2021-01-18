import { Injectable } from '@angular/core';
import {ApiHelperService} from './api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private paymentUrl = 'http://localhost:3000/api/order/payment';
  cartItems = 0;
  constructor(private helper: ApiHelperService) { }

  getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(product): boolean {
    const cart: any = this.getCart();
    if (cart.find(data => JSON.stringify(data) === JSON.stringify(product))) {
      return false;
    } else {
      cart.push(product);
      this.cartItems++;
      localStorage.setItem('cart', JSON.stringify(cart));
      return true;
    }
  }

  removeFromCart(product): void {
    let cart: any = this.getCart();
    if (cart.find(data => JSON.stringify(data) === JSON.stringify(product))) {
      cart = cart.filter(data => JSON.stringify(data) !== JSON.stringify(product));
      this.cartItems--;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  clearCart(): void {
    this.cartItems = 0;
    localStorage.setItem('cart', '[]');
  }

  payment(bodyPayment) {
    return this.helper.post<any>(this.paymentUrl, bodyPayment);
  }
}
