import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import { environment } from '../../../environments/environment';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-cart',
  templateUrl: './main-cart.component.html',
  styleUrls: ['./main-cart.component.css']
})
export class MainCartComponent implements OnInit {
  quantities = [];
  handler: any;
  constructor(private cartService: CartService, private accountService: AccountService, private router: Router) { }

  trackByCartItems(index: number, item: any) {
    return item._id;
  }

  get cartItems() {
    return this.cartService.getCart();
  }

  get cartTotal() {
    let total = 0;
    this.cartItems.forEach((data, index) => {
      total += data.productPrice * this.quantities[index];
    });
    return total;
  }

  removeProduct(index, product) {
    this.quantities.splice(index, 1);
    this.cartService.removeFromCart(product);
  }

  ngOnInit() {
    this.cartItems.forEach(data => {
      this.quantities.push(1);
    });
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: async stripeToken => {
        let products;
        products = [];
        this.cartItems.forEach((data, index) => {
          products.push({
            product: data._id,
            quantity: this.quantities[index],
          });
        });
        this.cartService.payment(
          {
            totalPrice: this.cartTotal,
            products,
            stripeToken,
          }
        ).subscribe(
          res => {
            if (res.status === 200) {
              this.cartService.clearCart();
            } else {
              console.log('payment fail');
            }
          },
          err => console.log(err)
        );
      },
    });
  }

  /*validate() {
    if (!this.quantities.every(data => data > 0)) {
      console.log('Quantity cannot be less than one.');
      return false;
    }
    this.accountService.getUserAddress()
      .subscribe(
        res => {
          if (res.status === 204){
            this.router.navigate(['/account/address']).then(() => {
              console.log('You need to add your address before making a purchase.');
            });
            return false;
          } else {
            return true;
          }
        });
    return true;
  }*/

  checkout() {
    try {
      if (!this.quantities.every(data => data > 0)) {
        console.log('Quantity cannot be less than one.');
      } else {
        this.accountService.getUserAddress()
          .subscribe(
            res => {
              if (res.status === 204) {
                this.router.navigate(['/account/address']).then(() => {
                  console.log('You need to add your address before making a purchase.');
                });
              } else {
                this.handler.open({
                  name: 'Inzynierka',
                  description: 'Checkout Payment',
                  amount: this.cartTotal * 100,
                  closed: () => {
                  },
                });
              }
            });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
