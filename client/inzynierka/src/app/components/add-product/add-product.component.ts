import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {FiltersService} from '../../services/filters.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productData = {
    productTitle: '',
    productDescription: '',
    productPrice: 0,
    productCategory: '',
    productImage: null
  };

  categories: any;

  constructor(private filterService: FiltersService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  addProduct() {
    console.log(this.productData);
    this.productService.addProduct(this.productData)
      .subscribe(
        res => {
          this.router.navigate(['account']);
        },
        err => console.log(err)
      );
  }

  getCategories(): void {
    this.filterService.getCategories()
      .subscribe(
        res => {
          this.categories = res.body.categories;
        },
        err => console.log(err)
      );
  }
}
