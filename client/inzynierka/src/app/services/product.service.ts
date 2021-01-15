import { Injectable } from '@angular/core';

import { Product } from '../models/product';
import {ApiHelperService} from './api-helper.service';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // TODO: populate products from an API
  products: Product[] = [
    new Product(1, 'Product 1', 'This is the product 1 description. This product is very cool! strasznie dlugi jest ten tekst i przez to jest nierowny innym i trzeba uzyc slice', 100, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKlrHN6Sizak1hA8BxG5S5Hr4omWSy-ESTbg&usqp=CAU'),
    new Product(2, 'Product 2', 'This is the product 2 description. This product is very cool!', 350, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaMtcbwcyGq8ISkPtGIvcdboipbZLLs17i-w&usqp=CAU'),
    new Product(3, 'Product 3', 'This is the product 3 description. This product is very cool!', 420, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKlrHN6Sizak1hA8BxG5S5Hr4omWSy-ESTbg&usqp=CAU'),
    new Product(4, 'Product 4', 'This is the product 4 description. This product is very cool!', 666, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaMtcbwcyGq8ISkPtGIvcdboipbZLLs17i-w&usqp=CAU'),
    new Product(5, 'Product 5', 'This is the product 5 description. This product is very cool!', 700, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKlrHN6Sizak1hA8BxG5S5Hr4omWSy-ESTbg&usqp=CAU'),
    new Product(6, 'Product 6', 'This is the product 6 description. This product is very cool!', 110, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaMtcbwcyGq8ISkPtGIvcdboipbZLLs17i-w&usqp=CAU'),
    new Product(7, 'Product 7', 'This is the product 7 description. This product is very cool!', 900, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKlrHN6Sizak1hA8BxG5S5Hr4omWSy-ESTbg&usqp=CAU'),
    new Product(8, 'Product 8', 'This is the product 8 description. This product is very cool!', 1000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaMtcbwcyGq8ISkPtGIvcdboipbZLLs17i-w&usqp=CAU'),
  ];

  private baseUrl = 'http://localhost:3000/api/product';

  constructor(private helper: ApiHelperService) { }

  getProducts(): Product[] {
    // TODO: populate products from an API and return an observable
    return this.products;
  }

  getMyProducts(){
    const url = 'http://localhost:3000/api/addProduct';
    return this.helper.get<any>(url);
  }

  getAllProducts(){
    return this.helper.get<any>(this.baseUrl);
  }

  getProductView(productId){
    const url = this.baseUrl + '/' + productId;
    return this.helper.get<any>(url);
  }

  getProductsFromCategory(categoryId){
    const url = this.baseUrl + '/category/' + categoryId;
    return this.helper.get<any>(url);
  }

  getProductsByPrice(params){
    const parameters = new HttpParams()
      .set('valueFrom', params.valueFrom)
      .set('valueTo', params.valueTo);
    const url = this.baseUrl + '/price?';
    return this.helper.gett<any>(url, {parameters});
  }

  addProduct(product){
    const url = 'http://localhost:3000/api/addProduct';
    return this.helper.post<any>(url, product);
  }
}
