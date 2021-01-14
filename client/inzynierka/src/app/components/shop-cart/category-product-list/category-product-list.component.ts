import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-category-product-list',
  templateUrl: './category-product-list.component.html',
  styleUrls: ['./category-product-list.component.css']
})
export class CategoryProductListComponent implements OnInit {

  productsData: any;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.getProductsFromCategory();
  }

  getProductsFromCategory(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductsFromCategory(categoryId)
      .subscribe(
        res => {
          console.log(res.body.products);
          this.productsData = res.body.products;
        },
        err => console.log(err)
      );
  }

}
