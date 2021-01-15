import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-price-product-list',
  templateUrl: './price-product-list.component.html',
  styleUrls: ['./price-product-list.component.css']
})
export class PriceProductListComponent implements OnInit {

  productsData: any;
  params: any;
  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.getProductsByPrice();
  }

  getProductsByPrice(): void {
    this.route.queryParamMap.subscribe(
        res => {
          this.params = res.params;
        },
        err => console.log(err)
    );
    console.log(this.params);
    this.productService.getProductsByPrice(this.params)
      .subscribe(
        res => {
          console.log(res.body.products);
          this.productsData = res.body.products;
       },
        err => console.log(err)
      );
  }
}
