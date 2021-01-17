import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-category-product-list',
  templateUrl: './category-product-list.component.html',
  styleUrls: ['./category-product-list.component.css']
})
export class CategoryProductListComponent implements OnInit {

  productsData: any;

  constructor(public authService: AuthService, private productService: ProductService,
              private route: ActivatedRoute, private cartService: CartService) {
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

  handleAddToCart(product): void {
    this.cartService.addToCart(product);
  }
}
