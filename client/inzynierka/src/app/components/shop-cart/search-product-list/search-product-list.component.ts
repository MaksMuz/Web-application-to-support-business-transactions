import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-product-list',
  templateUrl: './search-product-list.component.html',
  styleUrls: ['./search-product-list.component.css']
})
export class SearchProductListComponent implements OnInit {

  productsData: any;
  params: any;
  constructor(private productService: ProductService, private route: ActivatedRoute) {
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
        err => console.log(err)
      );
  }

}
