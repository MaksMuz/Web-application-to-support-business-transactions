import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {CartService} from '../../../services/cart.service';
import {MessengerService} from '../../../services/messenger.service';

@Component({
  selector: 'app-search-product-list',
  templateUrl: './search-product-list.component.html',
  styleUrls: ['./search-product-list.component.css']
})
export class SearchProductListComponent implements OnInit {

  productsData: any;
  params: any;
  constructor(public authService: AuthService, private productService: ProductService,
              private route: ActivatedRoute, private cartService: CartService, private message: MessengerService) {
    this.route.queryParamMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.getProductsBySearch();
  }

  getProductsBySearch(): void {
    this.route.queryParamMap.subscribe(
      res => {
        // @ts-ignore
        this.params = res.params;
      },
      err => console.log(err)
    );
    console.log(this.params);
    this.productService.getProductsBySearch(this.params)
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
