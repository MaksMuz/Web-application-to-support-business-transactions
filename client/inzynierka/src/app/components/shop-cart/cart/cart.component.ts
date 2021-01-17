import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartItems();
  }

  get cartItems() {
    return this.cartService.getCart();
  }

  trackByCartItems(index: number, item: any) {
    return item._id;
  }
}
// ngOnInit(): void {
  // product: Product
  // this.msg.getMsg().subscribe((product) => {
  //  console.log(product);
  //  console.log('in cart.component ngOnInit');
  //  this.addProductToCart(product);
  // });
// }

  /*getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }*/

  // product: Product
/*  addProductToCart(product): boolean {
    const cart: any = this.getCart();
    if (cart.find(data => JSON.stringify(data) === JSON.stringify(product))) {
      return false;
    } else {
      cart.push(product);
      this.cartItemsCount++;
      localStorage.setItem('cart', JSON.stringify(cart));
      return true;
    }
    let productExists = false;
    for (let i in this.cartItems) {
      if (this.cartItems[i].id === product._id) {
        this.cartItems[i].quantity++;
        productExists = true;
        break;
      }
    }

    if (!productExists) {
      this.cartItems.push({
        id: product._id,
        productName: product.productTitle,
        quantity: 1,
        price: product.productPrice
      });
    }
    // if (this.cartItems.length === 0) {
    //   this.cartItems.push({
    //     productId: product.id,
    //     productName: product.name,
    //     quantity: 1,
    //     price: product.price
    //   });
    // } else {
    //   for (const i in this.cartItems) {
    //     if (this.cartItems[i].productId === product.id) {
    //       this.cartItems[i].quantity++;
    //     } else {
    //       this.cartItems.push({
    //         productId: product.id,
    //         productName: product.name,
    //         quantity: 1,
    //         price: product.price
    //       });
    //     }
    //   }
    // }
    this.cartTotal = 0;
    this.cartItems.forEach(item => {
      this.cartTotal += (item.quantity * item.price);
    }); */
