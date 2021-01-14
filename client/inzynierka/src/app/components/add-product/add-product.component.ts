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
  images;
  categories: any;

  constructor(private filterService: FiltersService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  fileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productData.productImage = file;
    }
  }

  addProduct() {
    const formdata = new FormData();
    formdata.append('productImage', this.productData.productImage);
    formdata.append('productTitle', this.productData.productTitle);
    formdata.append('productDescription', this.productData.productDescription);
    formdata.append('productPrice', this.productData.productPrice.toString());
    formdata.append('productCategory', this.productData.productCategory);
    this.productService.addProduct(formdata)
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
