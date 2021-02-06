import {Component, OnInit} from '@angular/core';

import { ProductService } from '../../../services/product.service';
import { MessengerService } from '../../../services/messenger.service';
import {AuthService} from '../../../services/auth.service';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productsData: any;

  constructor(public authService: AuthService, private productService: ProductService,
              private message: MessengerService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProducts()
      .subscribe(
        res => {
          console.log(res.body.products);
          this.productsData = res.body.products;
        },
        err => this.message.info(err.error)
      );
  }

  handleAddToCart(product): void {
    this.cartService.addToCart(product);
    this.message.info('You can add only one product by button');
  }

}
