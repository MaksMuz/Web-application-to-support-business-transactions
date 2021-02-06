import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {CartService} from '../../services/cart.service';
import {MessengerService} from '../../services/messenger.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  product: any;
  constructor(public authService: AuthService, private productService: ProductService,
              private route: ActivatedRoute, public cartService: CartService, private message: MessengerService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductView(productId)
      .subscribe(
        res => {
          console.log(res.body.product);
          this.product = res.body.product;
        },
        err => this.message.info(err.error)
      );
  }

  handleAddToCart(product): void {
    this.cartService.addToCart(product);
    this.message.info('Product added to cart(If you want more than one go to cart)');
  }
}
