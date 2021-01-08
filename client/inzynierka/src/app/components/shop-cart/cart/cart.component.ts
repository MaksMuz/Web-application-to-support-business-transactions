import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../../../services/messenger.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [
  //  { id: 1, productId: 1, productName: 'test1', quantity: 4, price: 100},
  //  { id: 2, productId: 3, productName: 'test3', quantity: 5, price: 150},
  //  { id: 3, productId: 2, productName: 'test2', quantity: 1, price: 10},
  //  { id: 4, productId: 4, productName: 'test4', quantity: 2, price: 320},
  ];

  cartTotal = 0;

  constructor(private msg: MessengerService) { }

  ngOnInit(): void {

    this.msg.getMsg().subscribe((product: Product) => {
      this.addProductToCart(product);
    });
  }

  addProductToCart(product: Product): void {
    let productExists = false;
    for (let i in this.cartItems) {
      if (this.cartItems[i].productId === product.id) {
        this.cartItems[i].quantity++;
        productExists = true;
        break;
      }
    }

    if (!productExists) {
      this.cartItems.push({
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price
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
    });
  }

}
