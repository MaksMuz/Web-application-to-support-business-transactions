import {Component, Input, OnInit} from '@angular/core';

import { ProductService } from '../../../services/product.service';
import {Product} from '../../../models/product';
import { MessengerService } from '../../../services/messenger.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() product: any;

  productList: Product[] = [];
  productsData: any;

  constructor(private productService: ProductService, private msg: MessengerService) { }

  ngOnInit(): void {
    this.productList = this.productService.getProducts();
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProducts()
      .subscribe(
        res => {
          console.log(res.body.products);
          this.productsData = res.body.products;
        },
        err => console.log(err)
      );
  }


  handleAddToCart(): void {
    this.msg.sendMsg(this.product);
  }

}
