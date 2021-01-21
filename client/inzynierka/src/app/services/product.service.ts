import { Injectable } from '@angular/core';

import {ApiHelperService} from './api-helper.service';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:3000/api/product';

  constructor(private helper: ApiHelperService) { }

  getMyProducts(){
    const url = 'http://localhost:3000/api/addProduct';
    return this.helper.get<any>(url);
  }

  deleteProduct(productId) {
    const url = 'http://localhost:3000/api/addProduct/' + productId;
    return this.helper.delete<any>(url);
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

  getProductsBySearch(params){
    const parameters = new HttpParams()
      .set('reg', params.reg);
    const url = this.baseUrl + '/search?';
    return this.helper.gett<any>(url, {parameters});
  }

  addProduct(product){
    const url = 'http://localhost:3000/api/addProduct';
    return this.helper.post<any>(url, product);
  }
}
