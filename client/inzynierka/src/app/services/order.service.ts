import { Injectable } from '@angular/core';
import {ApiHelperService} from './api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:3000/api/order';

  constructor(private helper: ApiHelperService) { }

  getMyOrders(){
    return this.helper.get<any>(this.baseUrl);
  }

  getOrderView(orderId){
    const url = this.baseUrl + '/' + orderId;
    return this.helper.get<any>(url);
  }
}
