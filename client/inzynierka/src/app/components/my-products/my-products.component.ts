import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  productsData: any;

  constructor(private productService: ProductService) { }

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
        err => console.log(err)
      );
  }
}
