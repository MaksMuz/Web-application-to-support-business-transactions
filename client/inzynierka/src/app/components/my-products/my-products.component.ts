import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {MessengerService} from '../../services/messenger.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  productsData: any;

  constructor(private productService: ProductService, private message: MessengerService) { }

  ngOnInit(): void {
    this.getMyProducts();
  }

  getMyProducts() {
    this.productService.getMyProducts()
      .subscribe(
        res => {
          console.log(res.body);
          this.productsData = res.body.products;
        },
        err => this.message.info(err.error)
      );
  }

  removeProduct(productId) {
    this.productService.deleteProduct(productId)
      .subscribe(
      res => {
        console.log(res);
        this.getMyProducts();
        this.message.info(res.body.message);
      },
      err => this.message.info(err.error)
    );
  }
}
